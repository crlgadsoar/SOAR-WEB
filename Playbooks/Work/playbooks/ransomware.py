from .actions import UDPManager

class RansomwarePlaybook:
    def __init__(self, ndr_ip, ndr_port):
        self.udpmanager = UDPManager()
        self.ndr_ip = ndr_ip
        self.ndr_port = ndr_port

    def execute(self, data):
        data["source"] = "soar"
        data["destination"] = "waf"
        data["actions"] = ["block_ip"]
        print(f"Executed Port Scan Playbook, Sending message to {data["destination"]}")
        self.udpmanager.send_udp_message(data, self.ndr_ip, self.ndr_port)