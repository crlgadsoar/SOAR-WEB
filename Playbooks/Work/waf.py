import socket

def start_waf_listener(ip="0.0.0.0", port=96):
    """ Simple UDP listener to check incoming data from SOAR. """
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((ip, port))

    print(f"📡 WAF UDP Listener started on {ip}:{port}")

    while True:
        data, addr = sock.recvfrom(2048)  # Receive up to 2KB
        print(f"\n📥 Received data from {addr}:")
        print(f"Raw Bytes: {data}")
        print(f"Decoded Text: {data.decode(errors='ignore')}")  # Ignore decode errors

start_waf_listener()
