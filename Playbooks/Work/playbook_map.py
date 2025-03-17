from playbooks.port_scan_pb import PortScanningPlaybook
from playbooks.ddos_pb import DDoSPlaybook
from playbooks.phising_pb import PhishingPlaybook
from playbooks.sql_injection_pb import SQLInjectionPlaybook
from playbooks.unauthorised_login_pb import UnauthorizedLoginPlaybook
from playbooks.use_cases.SUCCESSFUL_LOGIN import SuccessfulLoginPlaybook
from playbooks.use_cases.PRIVILEGE_ESCALATION import PrivilegeEscalationPlaybook
from playbooks.use_cases.SUCCESSFUL_LOGIN import SuccessfulLoginPlaybook
# playbook_mapping.py

# Maps incidents to corresponding playbook classes
PLAYBOOK_MAPPING = {
    "OPEN_PORT_SCANS": PortScanningPlaybook,
    "DDOS_ATTACK_DETECTED": DDoSPlaybook,
    "PHISHING_EMAIL_DETECTED": PhishingPlaybook,
    "PHISHING_ATTACK": PhishingPlaybook,
    "SQL_INJECTION": SQLInjectionPlaybook,
    "PRIVILEGE_ESCALATION": PrivilegeEscalationPlaybook,
    "FAILED_LOGIN": UnauthorizedLoginPlaybook,
}

