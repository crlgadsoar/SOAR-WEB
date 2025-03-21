// src/utils/mappings.js

export const incidentTypeMapping = {
    0: "NA",
    1: "SUCCESSFUL_LOGIN",
    2: "FAILED_LOGIN",
    3: "ACCOUNT_LOCKOUT",
    4: "PRIVILEGE_ESCALATION",
    5: "MULTI_FACTOR_AUTHENTICATION_EVENTS",
    6: "UNUSUAL_LOGIN_PATTERN",
    7: "ALLOWED_CONNECTION",
    8: "BLOCKED_CONNECTION",
    9: "OPEN_PORT_SCANS",
    10: "HIGH_VOLUME_DATA_TRANSFER",
    11: "VPN_ACTIVITY",
    12: "MALWARE_DETECTION",
    13: "PHISHING_ATTEMPT",
    14: "SUSPICIOUS_BEHAVIOUR",
    15: "RANSOMWARE_DETECTION",
    16: "INTRUSION_DETECTION",
    17: "INTRUSION_PREVENTION",
    18: "FILE_CREATION",
    19: "FILE_MODIFICATION",
    20: "FILE_DELETION",
    21: "ACCESS_DENIED",
    22: "DATA_EXFILTRATION",
    23: "UNUSUAL_DATA_ACCESS",
    24: "SERVICE_START",
    25: "SERVICE_STOP",
    26: "SYSTEM_BOOT",
    27: "SYSTEM_REBOOT",
    28: "PROCESS_CREATION",
    29: "PROCESS_TERMINATION",
    30: "CONFIGURATION_CHANGES",
    31: "PATCHING_EVENTS",
    32: "PROCESS_CREATION_ACTIVITY",
    33: "APPLICATION_ACCESS",
    34: "DATABASE_QUERIES",
    35: "FAILED_TRANSACTIONS",
    36: "PRIVILEGE_CHANGES",
    37: "POLICY_BREACH",
    38: "DATA_EXPORT_EVENTS",
    39: "USER_CREATION",
    40: "USER_DELETION",
    41: "POLICY_VIOLATIONS",
    42: "IDLE_SESSIONS",
    43: "UNUSUAL_USER_ACTIVITY",
    44: "ENDPOINT_DETECTION_AND_RESPONSE",
    45: "DEVICE_CONNECTION",
    46: "DEVICE_MALWARE_EVENTS",
    47: "MODESEC_EVENT",
    48: "DDOS_ATTACK_DETECTED",
    49: "MITIGATION_ACTIONS",
    50: "PHISING_ATTACK",
    51: "PHISHING_EMAIL_DETECTED",
    52: "PHISHING_ATTACK",
    53: "COMPROMISED_ACCOUNT",
    54: "DATA_EXPORT_EVENTS",
    55: "UNUSUAL_IP_LOGIN_ATTEMPT",
    56: "COMMAND_AND_SCRIPTING_INTERPRETER",
    57: "INSECURE_DIRECT_OBJECT_REFERENCES",
    58: "FORCED_BROWSING",
    59: "PRIVILEGE_ESCALATION",
    60: "WEAK_AUTH_ATTACK",
    61: "ACCESS_BYPASS",
    62: "INSECURE_API_ENDPOINTS",
    63: "SQL_INJECTION",
    64: "COMMAND_INJECTION",
    65: "NOSQL_INJECTION",
    66: "LDAP_INJECTION",
    67: "XXE_XML_INJECTION",
    68: "SMTP_INJECTION",
    69: "HOST_HEADER_INJECTION",
    70: "BAD_BEHAVIOR",
    71: "BRUTE_FORCE_RATE_LIMIT",
    72: "SESSION_TIMEOUT",
    73: "MISSING_SECURITY_HEADER",
    74: "SESSION_FIXATION",
    75: "JWT_TOKEN_MISUSE",
    76: "IDS_IPS",
    77: "DNS_REBINDING_ATTACKS",
    78: "SSRF_ATTACKS",
    79: "BLIND_SSRF",
  };
  
  export const sourceMapping = {
    1: "WVM ",
    2: "WCM ",
    3: "DBA ",
    4: "SIEM ",
    5: "SM ",
    6: "WAF ",
    7: "UEBA ",
    8: "TS ",
    9: "HAB ",
    10: "NDR",
    11: "SOAR ",
    12: "ITSM ",
    13: "DAM ",
    14: "UEM ",
    15: "NMS ",
  };
  
  export const destinationMapping = {
    1: "WVM ",
    2: "WCM ",
    3: "DBA ",
    4: "SIEM ",
    5: "SM ",
    6: "WAF ",
    7: "UEBA ",
    8: "TS ",
    9: "HAB ",
    10: "NDR",
    11: "SOAR ",
    12: "ITSM ",
    13: "DAM ",
    14: "UEM ",
    15: "NMS ",
  };
  