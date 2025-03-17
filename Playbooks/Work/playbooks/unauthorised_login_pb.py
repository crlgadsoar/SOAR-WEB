from .actions import UDPManager 

class UnauthorizedLoginPlaybook:
    def __init__(self, waf_ip, waf_port):
        self.udpmanager = UDPManager()
        self.waf_ip = waf_ip
        self.waf_port = waf_port

    def execute(self, data):
        data["source"] = "soar"
        data["destination"] = "waf"
        data["actions"] = ["block_ip", "notify_admin"]
        print(f"Executed Unauthorized Playbook, Sending message to {data["destination"]}")
        self.udpmanager.send_udp_message(data, self.waf_ip, self.waf_port)