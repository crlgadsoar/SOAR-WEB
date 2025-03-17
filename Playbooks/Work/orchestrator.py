import json
import database
import socket
import struct
import psycopg2
import traceback
from playbook_map import PLAYBOOK_MAPPING
from incident_map import INCIDENT_MAPPING

class Orchestrator:
    
    def __init__(self):
        with open("config.json", "r") as file:
            self.config = json.load(file)
        
        self.host_ip = self.config["host_ip"]
        self.host_port = self.config["host_port"]
        self.waf_ip = self.config["waf_ip"]
        self.waf_port = self.config["waf_port"]
        self.ndr_ip = self.config["ndr_ip"]
        self.ndr_port = self.config["ndr_port"]
        
        self.database = database.Database()
    def execute_playbook(self, data):
        if not data or "incident_type" not in data:
            print("Invalid data received")
            return

        event_type = data["incident_type"]
        incident = INCIDENT_MAPPING.get(event_type, "unknown")

        playbook_instance = None  # Initialize the variable

        if incident in PLAYBOOK_MAPPING:
            playbook_class = PLAYBOOK_MAPPING[incident]
            playbook_instance = playbook_class(self.waf_ip, self.waf_port) if incident in [
                "OPEN_PORT_SCANS", "DDOS_ATTACK_DETECTED", "PHISHING_EMAIL_DETECTED", 
                "PHISHING_ATTACK", "SQL_INJECTION", "FAILED_LOGIN"
            ] else playbook_class()

        if playbook_instance:  # Only execute if a playbook was found
            try:
                playbook_instance.execute(data)
                print(f"✅ Triggered playbook for incident: {incident}")

                # Fetch the playbook ID and name from the playbooks table
                query_fetch = "SELECT playbook_id, playbook_name FROM playbooks WHERE playbook_name ILIKE %s"
                self.database.cur.execute(query_fetch, (f"%{incident}%",))
                result = self.database.cur.fetchone()

                if result:
                    playbook_id, playbook_name = result

                    # Update the database with the triggered playbook ID and name
                    query_update = """
                        UPDATE incidents 
                        SET playbookid = %s, resolved = 'yes', status = 'Mitigated'
                        WHERE incidentid = %s
                    """
                    self.database.cur.execute(query_update, (playbook_id, data["incident_id"]))
                    self.database.conn.commit()

                    print(f"✅ Playbook '{playbook_name}' (ID: {playbook_id}) recorded and incident marked as resolved for ID: {data['incident_id']}")
                else:
                    print(f"⚠️ No matching playbook found for incident type: {incident}")

            except Exception as e:
                print(f"❌ Error executing playbook for {incident}: {e}")
                traceback.print_exc()
        else:
            print(f"⚠️ No playbook mapped for incident type: {incident}")


    def run(self):
        """Starts the UDP listener to receive security incidents."""
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.bind((self.host_ip, self.host_port))
        print(f"Listening for UDP packets on {self.host_ip}:{self.host_port}")

        while True:
            try:
                data, addr = sock.recvfrom(2048)
                print(f"Received data size: {len(data)} bytes from {addr}")

                parsed_data = self.unpack_incident_data(data)
                if parsed_data:
                    print(f"Parsed Data: {json.dumps(parsed_data, indent=2)}")
                    self.insert_incident(parsed_data)
                    self.execute_playbook(parsed_data)
                else:
                    print("Failed to parse incident data.")
            except Exception as e:
                print(f"Error receiving data: {e}")
                traceback.print_exc()

    def unpack_incident_data(self, data):
        """Unpacks the binary data received from SIEM and converts it into a dictionary."""
        format_string = "B B H 40s 19s I 200s 150s 50s 50s 50s 500s"
        try:
            unpacked = struct.unpack(format_string, data)

            def clean_string(byte_data):
                return byte_data.decode(errors="ignore").strip("\x00").strip()
            obj = {
                "source_id": unpacked[0],
                "dest_id": unpacked[1],
                "msg_id": unpacked[2],
                "incident_id": clean_string(unpacked[3]),
                "date_timestamp": clean_string(unpacked[4]),
                "incident_type": unpacked[5],
                "description": clean_string(unpacked[6]),
                "miter_technique_no": clean_string(unpacked[7]),
                "attacker_ip": clean_string(unpacked[8]),
                "target_ip": clean_string(unpacked[9]),
                "dst_port_list": clean_string(unpacked[10]),
                "event_id": clean_string(unpacked[11])
            }
            print(obj)
            return obj
        except struct.error as e:
            print(f"Error unpacking data: {e}")
            traceback.print_exc()
            return None

   
   
  

    def insert_incident(self, incident_data):
        try:
            # Extract required fields with default values
            incident_id = incident_data.get("incident_id", "UNKNOWN")
            date_timestamp = incident_data.get("date_timestamp", "1970-01-01 00:00:00")
            incident_type = incident_data.get("incident_type", 0)
            miter_technique_no = incident_data.get("miter_technique_no", "N/A")
            status = incident_data.get("status", "Under Investigation")

            # Extract source_id and destination_id separately
            source_id = incident_data.get("source_id", None)
            destination_id = incident_data.get("dest_id", None)

            # Extract severity from JSON description & format description as key-value text
            try:
                description_dict = json.loads(incident_data.get("description", "{}"))  # Ensure valid JSON
                severity = description_dict.pop("severity", "medium")  # Extract severity and remove it
                description_text = "\n".join([f"{key.upper()}: {value}\n" for key, value in description_dict.items()])
            except json.JSONDecodeError:
                print(f"⚠️ Error decoding description JSON for incident {incident_id}")
                description_text = "No description available"
                severity = "medium"

            # Extract event_id as JSON format
            event_id_list = incident_data.get("event_id", "[]")  # Default to empty list in string format
            try:
                event_id_json = json.dumps(json.loads(event_id_list))  # Ensure valid JSON format
            except json.JSONDecodeError:
                print(f"⚠️ Error decoding event_id JSON for incident {incident_id}")
                event_id_json = "[]"

            # Remove redundant fields from event details
            event_details = incident_data.copy()
            for key in ["source_id", "dest_id", "incident_id", "date_timestamp", "incident_type", 
                        "severity", "description", "event_id", "msg_id", "miter_technique_no"]:
                event_details.pop(key, None)

            # Convert eventDetails to JSON string
            event_details_json = json.dumps(event_details, ensure_ascii=False)

            # Prepare the SQL query
            query = """
                INSERT INTO incidents (incidentid, datetimestamp, incidenttype, severity, description, 
                                attack_id, eventidlist, source, destination, event_details) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (incident_id, date_timestamp, incident_type, severity, description_text,
                    miter_technique_no, event_id_json, source_id, destination_id, event_details_json)

            self.database.cur.execute(query, values)
            self.database.conn.commit()
            print(f"✅ Incident inserted with incidentid: {incident_id}")

        except psycopg2.IntegrityError as e:
            self.database.conn.rollback()  # Rollback only on integrity errors
            print(f"❌ Integrity Error: {e}")

        except psycopg2.Error as e:
            self.database.conn.rollback()  # Ensure rollback on any database error
            print(f"❌ Database Error: {e}")

        except Exception as e:
            self.database.conn.rollback()  # Ensure rollback on any unexpected error
            print(f"❌ Unexpected Error: {e}")

# Run the orchestrator
if __name__ == "__main__":
    orch = Orchestrator()
    orch.run()