import socket
import struct
import time
import json
from datetime import datetime


def send_incident_data(
    source_id: int,
    dest_id: int,
    msg_id: int,
    incident_id: str,
    date_timestamp: str,
    incident_type: int,
    device_mac: str,
    probability: float,
    risk_score: float,
    severity: str,
    event_id_list: list,
    miter_technique_no: str = "",
    attacker_ip: str = "",
    target_ip: str = "",
    dst_port_list: str = "",
    host: str = "127.0.0.1",  # Change this to your SOAR's IP
    port: int = 95  # Change this to the port SOAR listens on
):
    """
    Sends structured incident data over UDP to the specified port with a header.
    """

    # Ensure string fields do not exceed their size limits
    def truncate(value, size):
        return value[:size].ljust(size)  # Pad with spaces if shorter

    # Create description JSON
    description_json = json.dumps(
        {
            "device_mac": device_mac,
            "probability": f"{probability:.2f}",
            "risk score": f"{risk_score:.2f}",
            "severity": severity,
        }
    )

    # Convert event_id_list to JSON string format
    event_id_json = json.dumps(event_id_list)

    # Pack the data into a binary format
    packed_data = struct.pack(
        "B B H 40s 19s I 200s 150s 50s 50s 50s 500s",
        source_id,
        dest_id,
        msg_id,
        truncate(incident_id, 40).encode(),
        truncate(date_timestamp, 19).encode(),
        incident_type,
        truncate(description_json, 200).encode(),
        truncate(miter_technique_no, 150).encode(),
        truncate(attacker_ip, 50).encode(),
        truncate(target_ip, 50).encode(),
        truncate(dst_port_list, 50).encode(),
        truncate(event_id_json, 500).encode(),
    )

    # Send data via UDP
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    print(f"\n🚀 Sending Incident Data to {host}:{port}...\n")
    sock.sendto(packed_data, (host, port))
    sock.close()
    print(f"✅ Incident data sent! [Incident ID: {incident_id}]\n")


# Continuous test data generation
msg_id = 1
i=1
for i in range(1):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    incident_idd = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{msg_id}"

    send_incident_data(
        source_id=1,  # Random source ID
        dest_id=2,  # Random destination ID
        msg_id=1001,  # Unique message ID
        incident_id=incident_idd,  # Dummy incident ID
        date_timestamp=now,  # Dummy timestamp
        incident_type=9,  # Example incident type (9 = Phishing Email)
        device_mac="AA:BB:CC:DD:EE:FF",  # Dummy MAC address
        probability=0.85,  # Example probability
        risk_score=45.5,  # Example risk score
        severity="High",  # Example severity
        event_id_list=["EID12345", "EID67890"],  # Example event IDs
        miter_technique_no="T1566",  # Example MITRE ATT&CK technique (Phishing)
        attacker_ip="192.168.1.100",  # Example attacker IP
        target_ip="192.168.1.50",  # Example target IP
        dst_port_list="80,443,8080",  # Example destination ports
        host="127.0.0.1",  # Change to SOAR's IP if needed
        port=95  # Change to SOAR's listening port if needed
)

    msg_id += 1
    time.sleep(10)  # Adjust the delay as needed
