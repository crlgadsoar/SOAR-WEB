from ..actions import UDPManager
import os
import json

class BlindSSRFPlaybook:
    def __init__(self):
        parent_dir = os.path.abspath(os.path.join(os.getcwd(), "."))
        file_path = os.path.join(parent_dir, "config.json")
        with open(file_path, "r") as file:
            self.config = json.load(file)
        self.udpmanager = UDPManager()
        self.waf_ip = self.config["waf_ip"]
        self.waf_port = self.config["waf_port"]

    def execute(self, data):
        data["source"] = "soar"
        
        # Block Malicious IP on WAF
        waf_data = data.copy()
        waf_data["destination"] = "waf"
        waf_data["actions"] = ["block_ip"]
        print(f"Blocking source IP on WAF at {self.waf_ip}")
        self.udpmanager.send_udp_message(waf_data, self.waf_ip, self.waf_port)