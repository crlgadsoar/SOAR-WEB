import json
import psycopg2
import logging
import sys

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")


class Database:
    def __init__(self, config_file="config.json"):
        """Initialize database connection using config file."""
        try:
            with open(config_file, "r") as file:
                self.config = json.load(file)

            self.db_params = {
                "dbname": self.config["db_name"],
                "user": self.config["db_user"],
                "password": self.config["db_password"],
                "host": self.config["db_host"],
                "port": self.config["db_port"]
            }
            self.input_table = "incidents" 

            self.conn = psycopg2.connect(**self.db_params)
            self.cur = self.conn.cursor()
            logging.info("Connected to PostgreSQL successfully.")

            # Ensure table exists
            if not self.check_table_exists():
                self.create_table()

        except (Exception, psycopg2.DatabaseError) as e:
            logging.error(f"Database Connectivity Error: {e}")
            sys.exit(1)

    def check_table_exists(self):
        """Check if the input table exists in PostgreSQL."""
        try:
            self.cur.execute("""
                SELECT EXISTS (
                    SELECT FROM pg_tables 
                    WHERE schemaname = 'public' AND tablename = %s
                );
            """, (self.input_table,))
            table_exists = self.cur.fetchone()[0]
            logging.info(f"Table '{self.input_table}' exists: {table_exists}")
            return table_exists
        except Exception as e:
            logging.error(f"Error checking table existence: {e}")
            return False

    def create_table(self):
        """Create the input table if it does not exist."""
        try:
            self.cur.execute(f"""
                CREATE TABLE IF NOT EXISTS {self.input_table} (
                    incidentid TEXT PRIMARY KEY,
                    datetimestamp TIMESTAMP,
                    incidenttype INTEGER,
                    severity TEXT,
                    description TEXT,
                    mitretechniqueno TEXT,
                    eventidlist TEXT,
                    eventdetails JSONB
                );
            """)
            self.conn.commit()
            logging.info(f"Table '{self.input_table}' created successfully.")
        except Exception as e:
            logging.error(f"Error creating table: {e}")

    def insert_incident(self, incident):
        """Insert an incident into the input table."""
        try:
            self.cur.execute(f"""
                INSERT INTO {self.input_table} 
                (incidentid, datetimestamp, incidenttype, severity, description, 
                 mitretechniqueno, eventidlist, eventdetails) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING incidentid;
            """, (
                incident["incident_id"],      # incidentid
                incident["date_timestamp"],   # datetimestamp
                incident["incident_type"],    # incidenttype
                "high",  # Default severity
                incident["description"],      # description
                incident["miter_technique_no"],  # mitretechniqueno
                incident["event_id_list"],    # eventidlist
                json.dumps({                  # Store other details in JSON format
                    "attacker_ip": incident["attacker_ip"],
                    "target_ip": incident["target_ip"],
                    "dst_port_list": incident["dst_port_list"]
                })
            ))
            incident_id = self.cur.fetchone()[0]
            self.conn.commit()
            logging.info(f"✅ Incident inserted with incidentid: {incident_id}")
            return incident_id
        except Exception as e:
            logging.error(f"❌ Database insert failed: {e}")
            self.conn.rollback()

    def close_connection(self):
        """Close the database connection."""
        if self.conn:
            self.cur.close()
            self.conn.close()
            logging.info("Database connection closed.")
