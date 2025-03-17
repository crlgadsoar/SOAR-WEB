import struct
from .actions import UDPManager

class DataExfiltrationPlaybook:
    def __init__(self, ndr_ip, ndr_port):
        self.udpmanager = UDPManager()
        self.ndr_ip = ndr_ip
        self.ndr_port = ndr_port

    def execute(self, data):
        """ Convert structured data to a fixed-byte format and send via UDP. """

        def encode_fixed_length(value, length):
            """ Ensure the value is fixed-length, padded with spaces if needed. """
            return value.encode("utf-8").ljust(length, b' ')[:length]

        # Define byte lengths for each field
        FORMAT = [
            (40, "incidentId"),
            (20, "dateTimestamp"),  # dd-mm-yyyy::hh24:mm:ss
            (4, "incidentType"),  # Stored as string
            (200, "description"),
            (10, "miterTechniqueNo"),
            (50, "attackerIp"),
            (50, "targetIp"),
            (50, "dstPortList"),
            (500, "eventIdList"),
            (50, "action"),  # SOAR_ACTION
        ]
        # Validate timestamp format (dd-mm-yyyy::hh24:mm:ss)
     

        # Convert fields to fixed-size bytes
        byte_data = b"".join(
            encode_fixed_length(str(data.get(field, "")), length)
            for length, field in FORMAT
        )

        print(f"✅ Sending fixed-size byte UDP packet to NDR ({self.ndr_ip}:{self.ndr_port})")

        # Send as a raw byte stream over UDP
        self.udpmanager.send_udp_message(byte_data, self.ndr_ip, self.ndr_port)
