import platform
import subprocess
import os
import signal
import socket
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json

class FirewallManager:
    def __init__(self):
        self.os_name = platform.system().lower()
    
    def block_ip(self, ip_address):
        if "linux" in self.os_name:
            self._block_linux(ip_address)
        elif "windows" in self.os_name:
            self._block_windows(ip_address)
        elif "darwin" in self.os_name:
            self._block_macos(ip_address)
        else:
            print("Unsupported OS")

    def unblock_ip(self, ip_address):
        if "linux" in self.os_name:
            self._unblock_linux(ip_address)
        elif "windows" in self.os_name:
            self._unblock_windows(ip_address)
        elif "darwin" in self.os_name:
            self._unblock_macos(ip_address)
        else:
            print("Unsupported OS")

    def _block_linux(self, ip_address):
        # try:
        #     subprocess.run(["sudo", "ufw", "deny", "from", ip_address], check=True)
        #     print(f"Blocked {ip_address} using UFW.")
        # except:
        subprocess.run(["sudo", "iptables", "-A", "INPUT", "-s", ip_address, "-j", "DROP"], check=True)
        print(f"Blocked {ip_address} using iptables.")

    def _unblock_linux(self, ip_address):
        # try:
        #     subprocess.run(["sudo", "ufw", "delete", "deny", "from", ip_address], check=True)
        #     print(f"Unblocked {ip_address} using UFW.")
        # except:
        subprocess.run(["sudo", "iptables", "-D", "INPUT", "-s", ip_address, "-j", "DROP"], check=True)
        print(f"Unblocked {ip_address} using iptables.")

    def _block_windows(self, ip_address):
        command = f"netsh advfirewall firewall add rule name='Block {ip_address}' dir=in action=block remoteip={ip_address}"
        subprocess.run(command, shell=True, check=True)
        print(f"Blocked {ip_address} in Windows Firewall.")

    def _unblock_windows(self, ip_address):
        command = f"netsh advfirewall firewall delete rule name='Block {ip_address}'"
        subprocess.run(command, shell=True, check=True)
        print(f"Unblocked {ip_address} in Windows Firewall.")

    def _block_macos(self, ip_address):
        rule = f"block drop from {ip_address} to any"
        subprocess.run(f"echo '{rule}' | sudo pfctl -a com.apple/250.BlockIP -f -", shell=True, check=True)
        print(f"Blocked {ip_address} using pfctl on macOS.")

    def _unblock_macos(self, ip_address):
        rule = f"block drop from {ip_address} to any"
        subprocess.run(f"sudo pfctl -a com.apple/250.BlockIP -F all", shell=True, check=True)
        print(f"Unblocked {ip_address} using pfctl on macOS.")

    def get_website_ip(self, website):
        try:
            ip_address = socket.gethostbyname(website)
            print(f"IP Address of {website}: {ip_address}")
            return ip_address
        except socket.gaierror:
            print(f"Failed to resolve {website}")
            return None

class AlertManager:
    def __init__(self):
        pass

    def createAlert(self):
        pass

class ProcessManager:

    def killProcess(self, process_id):
        os.kill(process_id, signal.SIGKILL)

class MailManager:

    def __init__(self, smtp_server, smtp_port, email_address, email_password):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.email_address = email_address
        self.email_password = email_password
    
    def __init__(self):
        parent_dir = os.path.abspath(os.path.join(os.getcwd(), "."))
        file_path = os.path.join(parent_dir, "config.json")
        with open(file_path, "r") as file:
            self.config = json.load(file)
        self.smtp_server = self.config["smtp_server"]
        self.smtp_port = self.config["smtp_port"]
        self.email_address = self.config["email_address"]
        self.email_password = self.config["email_password"]

    def mark_spam(self, email):
        pass

    def send_mail(self, to_email, subject, body):
        msg = MIMEMultipart()
        msg["From"] = self.email_address
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_address, self.email_password)
            server.sendmail(self.email_address, to_email, msg.as_string())
            server.quit()
            print("Email sent successfully!")
        except Exception as e:
            print(f"Error: {e}")

class FileManager:
    
    def change_file_permissions(self, file_path, permission_mode):
        try:
            os.chmod(file_path, permission_mode)
            print(f"Permissions for {file_path} changed to {oct(permission_mode)}")
        except FileNotFoundError:
            print("File not found!")
        except PermissionError:
            print("Permission denied! Try running as an administrator/root.")

    def delete_file(self, file_path):
        try:
            os.remove(file_path)
            print(f"File {file_path} deleted successfully.")
        except FileNotFoundError:
            print("File not found!")
        except PermissionError:
            print("Permission denied! Try running as an administrator/root.")

class UDPManager:

    def send_udp_message(self, message, ip_address, port):
        """Sends a UDP message to the specified IP address and port.

        Args:
            message: The message to send (string).
            ip_address: The IP address of the recipient (string).
            port: The port number of the recipient (integer).
        """
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            message_bytes = (str(message)).encode('utf-8')
            sock.sendto(message_bytes, (ip_address, port))
            print(f"Message sent to {ip_address}:{port}")

        except Exception as e:
            print(f"Error sending message: {e}")

        finally:
            if 'sock' in locals() and sock: #check if socket was created
                sock.close()  # Close the socket (important!)