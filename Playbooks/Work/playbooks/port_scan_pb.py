import struct
import json
import os
from .actions import UDPManager, MailManager

class PortScanningPlaybook:
    def __init__(self, waf_ip, waf_port):
        parent_dir = os.path.abspath(os.path.join(os.getcwd(), "."))
        file_path = os.path.join(parent_dir, "config.json")
        with open(file_path, "r") as file:
            self.config = json.load(file)

        self.udpmanager = UDPManager()
        self.waf_ip = waf_ip
        self.waf_port = waf_port
        self.mail_mgr = MailManager()
        self.soc_mail = self.config["soc_email"]

    def execute(self, data):
        """ Convert structured data to a fixed-byte format and send via UDP. """

        def encode_fixed_length(value, length):
            """ Ensure the value is fixed-length, padded with null bytes if needed. """
            return value.encode("utf-8").ljust(length, b'\0')[:length]
       

        # Define struct format
        FORMAT = "40s 20s I 200s 10s 50s 50s 50s 500s 50s"  # Matching the field lengths

        # Ensure required fields are set and properly converted
       # Ensure required fields are set and properly converted
        data["incidentId"] = str(data.get("incident_id", "UNKNOWN"))  # Use correct key name
        data["dateTimestamp"] = str(data.get("date_timestamp", "1970-01-01 00:00:00"))  # Correct key
        data["incidentType"] = int(data.get("incident_type", 0))  # Correct key
        data["description"] = str(data.get("description", "No Description"))
        data["miterTechniqueNo"] = str(data.get("miter_technique_no", "T0000"))  # Correct key
        data["attackerIp"] = str(data.get("attacker_ip", "0.0.0.0"))  # Correct key
        data["targetIp"] = str(data.get("target_ip", "0.0.0.0"))  # Correct key
        data["dstPortList"] = str(data.get("dst_port_list", "0"))  # Correct key

        # Convert event_id list to a comma-separated string
        data["eventIdList"] = ",".join(data.get("event_id", [])) if isinstance(data.get("event_id"), list) else str(data.get("event_id", "0"))

        data["action"] = str(data.get("action", "block_ip"))


        # Ensure `description` is a simple string, not a JSON object
        if isinstance(data["description"], dict):
            data["description"] = json.dumps(data["description"])[:200]  # Convert JSON to string, truncate to 200 bytes

        print("\n🔍 Debug: Final Data Before Packing:")
        for key, value in data.items():
            print(f"{key}: {value} (Type: {type(value)})")

        print(f"✅ Port Scan detected, sending message to {self.waf_ip}:{self.waf_port}")

        # Pack the data into a structured binary format
        byte_data = struct.pack(
            FORMAT,
            encode_fixed_length(data["incidentId"], 40),
            encode_fixed_length(data["dateTimestamp"], 20),
            data["incidentType"],  # Integer field
            encode_fixed_length(data["description"], 200),
            encode_fixed_length(data["miterTechniqueNo"], 10),
            encode_fixed_length(data["attackerIp"], 50),
            encode_fixed_length(data["targetIp"], 50),
            encode_fixed_length(data["dstPortList"], 50),
            encode_fixed_length(data["eventIdList"], 500),
            encode_fixed_length(data["action"], 50),
        )

       
            # Send UDP message to WAF
        self.udpmanager.send_udp_message(byte_data, self.waf_ip, self.waf_port)
