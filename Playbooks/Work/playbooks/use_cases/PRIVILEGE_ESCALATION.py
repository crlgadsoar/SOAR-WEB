from ..actions import UDPManager
import os
import json

class PrivilegeEscalationPlaybook:
    def __init__(self):
        parent_dir = os.path.abspath(os.path.join(os.getcwd(), "."))
        file_path = os.path.join(parent_dir, "config.json")
        with open(file_path, "r") as file:
            self.config = json.load(file)
        self.udpmanager = UDPManager()
        self.waf_ip = self.config["waf_ip"]
        self.waf_port = self.config["waf_port"]
        self.ndr_ip = self.config["ndr_ip"]
        self.ndr_port = self.config["ndr_port"]
        self.dam_ip = self.config["dam_ip"]
        self.dam_port = self.config["dam_port"]
        self.ueba_ip = self.config["ueba_ip"]
        self.ueba_port = self.config["ueba_port"]

    def execute(self, data):
        data["source"] = "soar"

    # Define actions and destinations
        targets = [
            ("waf", ["restrict access"], self.waf_ip, self.waf_port),
            ("ndr", ["isolate host"], self.ndr_ip, self.ndr_port),
            ("dam", ["restrict database access"], self.dam_ip, self.dam_port),
            ("ueba", ["disable high risk sessions"], self.ueba_ip, self.ueba_port),
        ]

        for destination, actions, ip, port in targets:
            message = data.copy()  # Create a copy to avoid modifying the original dictionary
            message["destination"] = destination
            message["actions"] = actions

            print(f"Executed Privilege Escalation Playbook, Sending message to {destination}")
            self.udpmanager.send_udp_message(message, ip, port)
