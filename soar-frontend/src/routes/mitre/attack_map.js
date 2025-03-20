const attack_map = [
        {
            "attack" : "Spearphishing Link",
            "mitreid" : "T1192"
        },
        {
            "attack" : "Group Policy Preferences",
            "mitreid" : "T1552.006"
        },
        {
            "attack" : "Additional Container Cluster Roles",
            "mitreid" : "T1098.006"
        },
        {
            "attack" : "Input Capture",
            "mitreid" : "T1056"
        },
        {
            "attack" : "System Information Discovery",
            "mitreid" : "T1082"
        },
        {
            "attack" : "Parent PID Spoofing",
            "mitreid" : "T1134.004"
        },
        {
            "attack" : "Non-Application Layer Protocol",
            "mitreid" : "T1095"
        },
        {
            "attack" : "Container Administration Command",
            "mitreid" : "T1609"
        },
        {
            "attack" : "Data from Information Repositories",
            "mitreid" : "T1213"
        },
        {
            "attack" : "Local Account",
            "mitreid" : "T1136.001"
        },
        {
            "attack" : "Resource Forking",
            "mitreid" : "T1564.009"
        },
        {
            "attack" : "Mshta",
            "mitreid" : "T1218.005"
        },
        {
            "attack" : "Code Signing",
            "mitreid" : "T1116"
        },
        {
            "attack" : "Transmitted Data Manipulation",
            "mitreid" : "T1565.002"
        },
        {
            "attack" : "Trusted Developer Utilities Proxy Execution",
            "mitreid" : "T1127"
        },
        {
            "attack" : "Multi-Factor Authentication",
            "mitreid" : "T1556.006"
        },
        {
            "attack" : "File and Directory Permissions Modification",
            "mitreid" : "T1222"
        },
        {
            "attack" : "File and Directory Discovery",
            "mitreid" : "T1083"
        },
        {
            "attack" : "NTFS File Attributes",
            "mitreid" : "T1564.004"
        },
        {
            "attack" : "Disk Content Wipe",
            "mitreid" : "T1561.001"
        },
        {
            "attack" : "Install Root Certificate",
            "mitreid" : "T1553.004"
        },
        {
            "attack" : "Login Hook",
            "mitreid" : "T1037.002"
        },
        {
            "attack" : "Archive Collected Data",
            "mitreid" : "T1560"
        },
        {
            "attack" : "Compiled HTML File",
            "mitreid" : "T1218.001"
        },
        {
            "attack" : "Password Filter DLL",
            "mitreid" : "T1174"
        },
        {
            "attack" : "\/etc\/passwd and \/etc\/shadow",
            "mitreid" : "T1003.008"
        },
        {
            "attack" : "Binary Padding",
            "mitreid" : "T1027.001"
        },
        {
            "attack" : "Windows Management Instrumentation",
            "mitreid" : "T1047"
        },
        {
            "attack" : "Cached Domain Credentials",
            "mitreid" : "T1003.005"
        },
        {
            "attack" : "Screensaver",
            "mitreid" : "T1546.002"
        },
        {
            "attack" : "Spearphishing Service",
            "mitreid" : "T1598.001"
        },
        {
            "attack" : "Software",
            "mitreid" : "T1592.002"
        },
        {
            "attack" : "Automated Collection",
            "mitreid" : "T1119"
        },
        {
            "attack" : "Mutual Exclusion",
            "mitreid" : "T1480.002"
        },
        {
            "attack" : "Credentials from Web Browsers",
            "mitreid" : "T1555.003"
        },
        {
            "attack" : "Cloud Service Discovery",
            "mitreid" : "T1526"
        },
        {
            "attack" : "Launch Agent",
            "mitreid" : "T1159"
        },
        {
            "attack" : "Remote Access Software",
            "mitreid" : "T1219"
        },
        {
            "attack" : "Clear Network Connection History and Configurations",
            "mitreid" : "T1070.007"
        },
        {
            "attack" : "Run Virtual Instance",
            "mitreid" : "T1564.006"
        },
        {
            "attack" : "Polymorphic Code",
            "mitreid" : "T1027.014"
        },
        {
            "attack" : "Web Session Cookie",
            "mitreid" : "T1550.004"
        },
        {
            "attack" : "Network Share Discovery",
            "mitreid" : "T1135"
        },
        {
            "attack" : "DHCP Spoofing",
            "mitreid" : "T1557.003"
        },
        {
            "attack" : "Regsvcs\/Regasm",
            "mitreid" : "T1121"
        },
        {
            "attack" : "Revert Cloud Instance",
            "mitreid" : "T1536"
        },
        {
            "attack" : "Internet Connection Discovery",
            "mitreid" : "T1016.001"
        },
        {
            "attack" : "Gather Victim Network Information",
            "mitreid" : "T1590"
        },
        {
            "attack" : "Exploits",
            "mitreid" : "T1587.004"
        },
        {
            "attack" : "Exfiltration Over Web Service",
            "mitreid" : "T1567"
        },
        {
            "attack" : "Exploitation for Privilege Escalation",
            "mitreid" : "T1068"
        },
        {
            "attack" : "Execution Guardrails",
            "mitreid" : "T1480"
        },
        {
            "attack" : "PowerShell Profile",
            "mitreid" : "T1504"
        },
        {
            "attack" : "Security Support Provider",
            "mitreid" : "T1547.005"
        },
        {
            "attack" : "Search Closed Sources",
            "mitreid" : "T1597"
        },
        {
            "attack" : "Break Process Trees",
            "mitreid" : "T1036.009"
        },
        {
            "attack" : "System Network Configuration Discovery",
            "mitreid" : "T1016"
        },
        {
            "attack" : "Proc Filesystem",
            "mitreid" : "T1003.007"
        },
        {
            "attack" : "Startup Items",
            "mitreid" : "T1165"
        },
        {
            "attack" : "Local Job Scheduling",
            "mitreid" : "T1168"
        },
        {
            "attack" : "Launch Agent",
            "mitreid" : "T1543.001"
        },
        {
            "attack" : "Indicator Blocking",
            "mitreid" : "T1054"
        },
        {
            "attack" : "Multi-Factor Authentication Interception",
            "mitreid" : "T1111"
        },
        {
            "attack" : "Develop Capabilities",
            "mitreid" : "T1587"
        },
        {
            "attack" : "Embedded Payloads",
            "mitreid" : "T1027.009"
        },
        {
            "attack" : "Revert Cloud Instance",
            "mitreid" : "T1578.004"
        },
        {
            "attack" : "Fast Flux DNS",
            "mitreid" : "T1568.001"
        },
        {
            "attack" : "SQL Stored Procedures",
            "mitreid" : "T1505.001"
        },
        {
            "attack" : "Path Interception",
            "mitreid" : "T1034"
        },
        {
            "attack" : "Component Object Model and Distributed COM",
            "mitreid" : "T1175"
        },
        {
            "attack" : "LLMNR\/NBT-NS Poisoning and SMB Relay",
            "mitreid" : "T1557.001"
        },
        {
            "attack" : "Login Item",
            "mitreid" : "T1162"
        },
        {
            "attack" : "Dynamic-link Library Injection",
            "mitreid" : "T1055.001"
        },
        {
            "attack" : "Domain Controller Authentication",
            "mitreid" : "T1556.001"
        },
        {
            "attack" : "Windows Remote Management",
            "mitreid" : "T1028"
        },
        {
            "attack" : "Process Hollowing",
            "mitreid" : "T1093"
        },
        {
            "attack" : "Services Registry Permissions Weakness",
            "mitreid" : "T1574.011"
        },
        {
            "attack" : "Local Email Collection",
            "mitreid" : "T1114.001"
        },
        {
            "attack" : "Network Boundary Bridging",
            "mitreid" : "T1599"
        },
        {
            "attack" : "Windows Admin Shares",
            "mitreid" : "T1077"
        },
        {
            "attack" : "Impair Defenses",
            "mitreid" : "T1562"
        },
        {
            "attack" : "Gatekeeper Bypass",
            "mitreid" : "T1553.001"
        },
        {
            "attack" : "Credentials In Files",
            "mitreid" : "T1552.001"
        },
        {
            "attack" : "Cloud Account",
            "mitreid" : "T1136.003"
        },
        {
            "attack" : "Transfer Data to Cloud Account",
            "mitreid" : "T1537"
        },
        {
            "attack" : "Exploitation for Credential Access",
            "mitreid" : "T1212"
        },
        {
            "attack" : "Bash History",
            "mitreid" : "T1139"
        },
        {
            "attack" : "Pass the Hash",
            "mitreid" : "T1075"
        },
        {
            "attack" : "Impersonation",
            "mitreid" : "T1656"
        },
        {
            "attack" : "Social Media",
            "mitreid" : "T1593.001"
        },
        {
            "attack" : "TFTP Boot",
            "mitreid" : "T1542.005"
        },
        {
            "attack" : "Extra Window Memory Injection",
            "mitreid" : "T1055.011"
        },
        {
            "attack" : "Disable or Modify Cloud Logs",
            "mitreid" : "T1562.008"
        },
        {
            "attack" : "Rundll32",
            "mitreid" : "T1085"
        },
        {
            "attack" : "Rootkit",
            "mitreid" : "T1014"
        },
        {
            "attack" : "Archive via Custom Method",
            "mitreid" : "T1560.003"
        },
        {
            "attack" : "Remote Service Session Hijacking",
            "mitreid" : "T1563"
        },
        {
            "attack" : "Search Open Websites\/Domains",
            "mitreid" : "T1593"
        },
        {
            "attack" : "Modify Cloud Compute Configurations",
            "mitreid" : "T1578.005"
        },
        {
            "attack" : "Wi-Fi Discovery",
            "mitreid" : "T1016.002"
        },
        {
            "attack" : "Systemd Service",
            "mitreid" : "T1543.002"
        },
        {
            "attack" : "Runtime Data Manipulation",
            "mitreid" : "T1565.003"
        },
        {
            "attack" : "Bash History",
            "mitreid" : "T1552.003"
        },
        {
            "attack" : "Authentication Package",
            "mitreid" : "T1131"
        },
        {
            "attack" : "External Remote Services",
            "mitreid" : "T1133"
        },
        {
            "attack" : "New Service",
            "mitreid" : "T1050"
        },
        {
            "attack" : "Social Media Accounts",
            "mitreid" : "T1585.001"
        },
        {
            "attack" : "Domain Fronting",
            "mitreid" : "T1090.004"
        },
        {
            "attack" : "Securityd Memory",
            "mitreid" : "T1167"
        },
        {
            "attack" : "Query Registry",
            "mitreid" : "T1012"
        },
        {
            "attack" : "Mail Protocols",
            "mitreid" : "T1071.003"
        },
        {
            "attack" : "Code Signing Policy Modification",
            "mitreid" : "T1553.006"
        },
        {
            "attack" : "Udev Rules",
            "mitreid" : "T1546.017"
        },
        {
            "attack" : "Ccache Files",
            "mitreid" : "T1558.005"
        },
        {
            "attack" : "Tool",
            "mitreid" : "T1588.002"
        },
        {
            "attack" : "Sharepoint",
            "mitreid" : "T1213.002"
        },
        {
            "attack" : "Threat Intel Vendors",
            "mitreid" : "T1597.001"
        },
        {
            "attack" : "Application Deployment Software",
            "mitreid" : "T1017"
        },
        {
            "attack" : "Token Impersonation\/Theft",
            "mitreid" : "T1134.001"
        },
        {
            "attack" : "SSH Hijacking",
            "mitreid" : "T1563.001"
        },
        {
            "attack" : "Email Hiding Rules",
            "mitreid" : "T1564.008"
        },
        {
            "attack" : "Exfiltration Over Unencrypted Non-C2 Protocol",
            "mitreid" : "T1048.003"
        },
        {
            "attack" : "Spearphishing Attachment",
            "mitreid" : "T1598.002"
        },
        {
            "attack" : "SIP and Trust Provider Hijacking",
            "mitreid" : "T1553.003"
        },
        {
            "attack" : "Link Target",
            "mitreid" : "T1608.005"
        },
        {
            "attack" : "Employee Names",
            "mitreid" : "T1589.003"
        },
        {
            "attack" : "Social Media Accounts",
            "mitreid" : "T1586.001"
        },
        {
            "attack" : "Domains",
            "mitreid" : "T1583.001"
        },
        {
            "attack" : "Cloud Accounts",
            "mitreid" : "T1078.004"
        },
        {
            "attack" : "System Binary Proxy Execution",
            "mitreid" : "T1218"
        },
        {
            "attack" : "Unix Shell",
            "mitreid" : "T1059.004"
        },
        {
            "attack" : "Runtime Data Manipulation",
            "mitreid" : "T1494"
        },
        {
            "attack" : "Upload Tool",
            "mitreid" : "T1608.002"
        },
        {
            "attack" : "Acquire Access",
            "mitreid" : "T1650"
        },
        {
            "attack" : "Multi-Factor Authentication Request Generation",
            "mitreid" : "T1621"
        },
        {
            "attack" : "Compiled HTML File",
            "mitreid" : "T1223"
        },
        {
            "attack" : "Replication Through Removable Media",
            "mitreid" : "T1091"
        },
        {
            "attack" : "Compile After Delivery",
            "mitreid" : "T1500"
        },
        {
            "attack" : "ListPlanting",
            "mitreid" : "T1055.015"
        },
        {
            "attack" : "Standard Encoding",
            "mitreid" : "T1132.001"
        },
        {
            "attack" : "Email Account",
            "mitreid" : "T1087.003"
        },
        {
            "attack" : "Compile After Delivery",
            "mitreid" : "T1027.004"
        },
        {
            "attack" : "One-Way Communication",
            "mitreid" : "T1102.003"
        },
        {
            "attack" : "PowerShell",
            "mitreid" : "T1059.001"
        },
        {
            "attack" : "Windows Service",
            "mitreid" : "T1543.003"
        },
        {
            "attack" : "Verclsid",
            "mitreid" : "T1218.012"
        },
        {
            "attack" : "Regsvr32",
            "mitreid" : "T1218.010"
        },
        {
            "attack" : "Office Test",
            "mitreid" : "T1137.002"
        },
        {
            "attack" : "Remote System Discovery",
            "mitreid" : "T1018"
        },
        {
            "attack" : "Pass the Hash",
            "mitreid" : "T1550.002"
        },
        {
            "attack" : "XPC Services",
            "mitreid" : "T1559.003"
        },
        {
            "attack" : "Credentials in Registry",
            "mitreid" : "T1552.002"
        },
        {
            "attack" : "Create Account",
            "mitreid" : "T1136"
        },
        {
            "attack" : "Mark-of-the-Web Bypass",
            "mitreid" : "T1553.005"
        },
        {
            "attack" : "Hidden File System",
            "mitreid" : "T1564.005"
        },
        {
            "attack" : "Thread Local Storage",
            "mitreid" : "T1055.005"
        },
        {
            "attack" : "Source",
            "mitreid" : "T1153"
        },
        {
            "attack" : "Debugger Evasion",
            "mitreid" : "T1622"
        },
        {
            "attack" : "System Firmware",
            "mitreid" : "T1019"
        },
        {
            "attack" : "ARP Cache Poisoning",
            "mitreid" : "T1557.002"
        },
        {
            "attack" : "Component Object Model Hijacking",
            "mitreid" : "T1122"
        },
        {
            "attack" : "WHOIS",
            "mitreid" : "T1596.002"
        },
        {
            "attack" : "Dynamic Data Exchange",
            "mitreid" : "T1173"
        },
        {
            "attack" : "Direct Network Flood",
            "mitreid" : "T1498.001"
        },
        {
            "attack" : "Exfiltration Over Webhook",
            "mitreid" : "T1567.004"
        },
        {
            "attack" : "Login Items",
            "mitreid" : "T1547.015"
        },
        {
            "attack" : "Multiband Communication",
            "mitreid" : "T1026"
        },
        {
            "attack" : "Browser Session Hijacking",
            "mitreid" : "T1185"
        },
        {
            "attack" : "Application or System Exploitation",
            "mitreid" : "T1499.004"
        },
        {
            "attack" : "Component Object Model",
            "mitreid" : "T1559.001"
        },
        {
            "attack" : "Kerberoasting",
            "mitreid" : "T1558.003"
        },
        {
            "attack" : "Application Access Token",
            "mitreid" : "T1527"
        },
        {
            "attack" : "System Service Discovery",
            "mitreid" : "T1007"
        },
        {
            "attack" : "System Owner\/User Discovery",
            "mitreid" : "T1033"
        },
        {
            "attack" : "Patch System Image",
            "mitreid" : "T1601.001"
        },
        {
            "attack" : "Windows Command Shell",
            "mitreid" : "T1059.003"
        },
        {
            "attack" : "Web Cookies",
            "mitreid" : "T1606.001"
        },
        {
            "attack" : "Private Keys",
            "mitreid" : "T1552.004"
        },
        {
            "attack" : "Relocate Malware",
            "mitreid" : "T1070.010"
        },
        {
            "attack" : "Socket Filters",
            "mitreid" : "T1205.002"
        },
        {
            "attack" : "Custom Command and Control Protocol",
            "mitreid" : "T1094"
        },
        {
            "attack" : "Graphical User Interface",
            "mitreid" : "T1061"
        },
        {
            "attack" : "Malicious Image",
            "mitreid" : "T1204.003"
        },
        {
            "attack" : "Group Policy Discovery",
            "mitreid" : "T1615"
        },
        {
            "attack" : "SMS Pumping",
            "mitreid" : "T1496.003"
        },
        {
            "attack" : "System Checks",
            "mitreid" : "T1497.001"
        },
        {
            "attack" : "Pre-OS Boot",
            "mitreid" : "T1542"
        },
        {
            "attack" : "Credentials in Registry",
            "mitreid" : "T1214"
        },
        {
            "attack" : "Container API",
            "mitreid" : "T1552.007"
        },
        {
            "attack" : "Active Setup",
            "mitreid" : "T1547.014"
        },
        {
            "attack" : "VDSO Hijacking",
            "mitreid" : "T1055.014"
        },
        {
            "attack" : "Escape to Host",
            "mitreid" : "T1611"
        },
        {
            "attack" : "Trap",
            "mitreid" : "T1154"
        },
        {
            "attack" : "Parent PID Spoofing",
            "mitreid" : "T1502"
        },
        {
            "attack" : "LSA Secrets",
            "mitreid" : "T1003.004"
        },
        {
            "attack" : "External Defacement",
            "mitreid" : "T1491.002"
        },
        {
            "attack" : "Windows Remote Management",
            "mitreid" : "T1021.006"
        },
        {
            "attack" : "SEO Poisoning",
            "mitreid" : "T1608.006"
        },
        {
            "attack" : "Cloud Groups",
            "mitreid" : "T1069.003"
        },
        {
            "attack" : "Shared Webroot",
            "mitreid" : "T1051"
        },
        {
            "attack" : "Plist Modification",
            "mitreid" : "T1547.011"
        },
        {
            "attack" : "ROMMONkit",
            "mitreid" : "T1542.004"
        },
        {
            "attack" : "Launch Daemon",
            "mitreid" : "T1543.004"
        },
        {
            "attack" : "Dynamic Resolution",
            "mitreid" : "T1568"
        },
        {
            "attack" : "Hidden Users",
            "mitreid" : "T1564.002"
        },
        {
            "attack" : "Additional Cloud Credentials",
            "mitreid" : "T1098.001"
        },
        {
            "attack" : "COR_PROFILER",
            "mitreid" : "T1574.012"
        },
        {
            "attack" : "Network Share Connection Removal",
            "mitreid" : "T1126"
        },
        {
            "attack" : "Startup Items",
            "mitreid" : "T1037.005"
        },
        {
            "attack" : "PowerShell",
            "mitreid" : "T1086"
        },
        {
            "attack" : "PowerShell Profile",
            "mitreid" : "T1546.013"
        },
        {
            "attack" : "Multi-Stage Channels",
            "mitreid" : "T1104"
        },
        {
            "attack" : "Account Discovery",
            "mitreid" : "T1087"
        },
        {
            "attack" : "Junk Data",
            "mitreid" : "T1001.001"
        },
        {
            "attack" : "Service Exhaustion Flood",
            "mitreid" : "T1499.002"
        },
        {
            "attack" : "Emond",
            "mitreid" : "T1546.014"
        },
        {
            "attack" : "Network Trust Dependencies",
            "mitreid" : "T1590.003"
        },
        {
            "attack" : "Domain Account",
            "mitreid" : "T1136.002"
        },
        {
            "attack" : "Malware",
            "mitreid" : "T1588.001"
        },
        {
            "attack" : "Scripting",
            "mitreid" : "T1064"
        },
        {
            "attack" : "Domain Groups",
            "mitreid" : "T1069.002"
        },
        {
            "attack" : "Steal or Forge Kerberos Tickets",
            "mitreid" : "T1558"
        },
        {
            "attack" : "Conditional Access Policies",
            "mitreid" : "T1556.009"
        },
        {
            "attack" : "Asynchronous Procedure Call",
            "mitreid" : "T1055.004"
        },
        {
            "attack" : "Encrypted\/Encoded File",
            "mitreid" : "T1027.013"
        },
        {
            "attack" : "AppCert DLLs",
            "mitreid" : "T1182"
        },
        {
            "attack" : "Search Open Technical Databases",
            "mitreid" : "T1596"
        },
        {
            "attack" : "Application Exhaustion Flood",
            "mitreid" : "T1499.003"
        },
        {
            "attack" : "Serverless",
            "mitreid" : "T1583.007"
        },
        {
            "attack" : "Stage Capabilities",
            "mitreid" : "T1608"
        },
        {
            "attack" : "Virtual Private Server",
            "mitreid" : "T1584.003"
        },
        {
            "attack" : "InstallUtil",
            "mitreid" : "T1218.004"
        },
        {
            "attack" : "Plist File Modification",
            "mitreid" : "T1647"
        },
        {
            "attack" : "Security Software Discovery",
            "mitreid" : "T1063"
        },
        {
            "attack" : "SIP and Trust Provider Hijacking",
            "mitreid" : "T1198"
        },
        {
            "attack" : "Credential API Hooking",
            "mitreid" : "T1056.004"
        },
        {
            "attack" : "Fileless Storage",
            "mitreid" : "T1027.011"
        },
        {
            "attack" : "Archive via Utility",
            "mitreid" : "T1560.001"
        },
        {
            "attack" : "Unused\/Unsupported Cloud Regions",
            "mitreid" : "T1535"
        },
        {
            "attack" : "Email Forwarding Rule",
            "mitreid" : "T1114.003"
        },
        {
            "attack" : "Implant Internal Image",
            "mitreid" : "T1525"
        },
        {
            "attack" : "Network Service Discovery",
            "mitreid" : "T1046"
        },
        {
            "attack" : "KernelCallbackTable",
            "mitreid" : "T1574.013"
        },
        {
            "attack" : "Security Support Provider",
            "mitreid" : "T1101"
        },
        {
            "attack" : "Systemd Service",
            "mitreid" : "T1501"
        },
        {
            "attack" : "Inhibit System Recovery",
            "mitreid" : "T1490"
        },
        {
            "attack" : "Process Discovery",
            "mitreid" : "T1057"
        },
        {
            "attack" : "Securityd Memory",
            "mitreid" : "T1555.002"
        },
        {
            "attack" : "Adversary-in-the-Middle",
            "mitreid" : "T1557"
        },
        {
            "attack" : "Sudo Caching",
            "mitreid" : "T1206"
        },
        {
            "attack" : "Domain or Tenant Policy Modification",
            "mitreid" : "T1484"
        },
        {
            "attack" : "Asymmetric Cryptography",
            "mitreid" : "T1573.002"
        },
        {
            "attack" : "Spearphishing Voice",
            "mitreid" : "T1566.004"
        },
        {
            "attack" : "Modify Cloud Compute Infrastructure",
            "mitreid" : "T1578"
        },
        {
            "attack" : "DLL Search Order Hijacking",
            "mitreid" : "T1574.001"
        },
        {
            "attack" : "Container and Resource Discovery",
            "mitreid" : "T1613"
        },
        {
            "attack" : "Exfiltration Over Physical Medium",
            "mitreid" : "T1052"
        },
        {
            "attack" : "At (Linux)",
            "mitreid" : "T1053.001"
        },
        {
            "attack" : "SMB\/Windows Admin Shares",
            "mitreid" : "T1021.002"
        },
        {
            "attack" : "CMSTP",
            "mitreid" : "T1218.003"
        },
        {
            "attack" : "Software Packing",
            "mitreid" : "T1045"
        },
        {
            "attack" : "VNC",
            "mitreid" : "T1021.005"
        },
        {
            "attack" : "Botnet",
            "mitreid" : "T1584.005"
        },
        {
            "attack" : "Indicator Removal from Tools",
            "mitreid" : "T1027.005"
        },
        {
            "attack" : "Port Monitors",
            "mitreid" : "T1547.010"
        },
        {
            "attack" : "Exfiltration Over Other Network Medium",
            "mitreid" : "T1011"
        },
        {
            "attack" : "Thread Execution Hijacking",
            "mitreid" : "T1055.003"
        },
        {
            "attack" : "Internal Defacement",
            "mitreid" : "T1491.001"
        },
        {
            "attack" : "Digital Certificates",
            "mitreid" : "T1587.003"
        },
        {
            "attack" : "Digital Certificates",
            "mitreid" : "T1596.003"
        },
        {
            "attack" : "Server",
            "mitreid" : "T1583.004"
        },
        {
            "attack" : "SID-History Injection",
            "mitreid" : "T1134.005"
        },
        {
            "attack" : "Template Injection",
            "mitreid" : "T1221"
        },
        {
            "attack" : "NTDS",
            "mitreid" : "T1003.003"
        },
        {
            "attack" : "Remote Desktop Protocol",
            "mitreid" : "T1021.001"
        },
        {
            "attack" : "HISTCONTROL",
            "mitreid" : "T1148"
        },
        {
            "attack" : "Search Engines",
            "mitreid" : "T1593.002"
        },
        {
            "attack" : "Create Cloud Instance",
            "mitreid" : "T1578.002"
        },
        {
            "attack" : "Data Destruction",
            "mitreid" : "T1485"
        },
        {
            "attack" : "System Firmware",
            "mitreid" : "T1542.001"
        },
        {
            "attack" : "Account Access Removal",
            "mitreid" : "T1531"
        },
        {
            "attack" : "Cloud Services",
            "mitreid" : "T1021.007"
        },
        {
            "attack" : "Web Protocols",
            "mitreid" : "T1071.001"
        },
        {
            "attack" : "Obtain Capabilities",
            "mitreid" : "T1588"
        },
        {
            "attack" : "User Execution",
            "mitreid" : "T1204"
        },
        {
            "attack" : "Winlogon Helper DLL",
            "mitreid" : "T1004"
        },
        {
            "attack" : "Path Interception by Unquoted Path",
            "mitreid" : "T1574.009"
        },
        {
            "attack" : "File System Permissions Weakness",
            "mitreid" : "T1044"
        },
        {
            "attack" : "Add-ins",
            "mitreid" : "T1137.006"
        },
        {
            "attack" : "File\/Path Exclusions",
            "mitreid" : "T1564.012"
        },
        {
            "attack" : "Ingress Tool Transfer",
            "mitreid" : "T1105"
        },
        {
            "attack" : "Steal Web Session Cookie",
            "mitreid" : "T1539"
        },
        {
            "attack" : "Defacement",
            "mitreid" : "T1491"
        },
        {
            "attack" : "Application Shimming",
            "mitreid" : "T1546.011"
        },
        {
            "attack" : "Outlook Forms",
            "mitreid" : "T1137.003"
        },
        {
            "attack" : "Extra Window Memory Injection",
            "mitreid" : "T1181"
        },
        {
            "attack" : "Data from Local System",
            "mitreid" : "T1005"
        },
        {
            "attack" : "Bootkit",
            "mitreid" : "T1542.003"
        },
        {
            "attack" : "Screensaver",
            "mitreid" : "T1180"
        },
        {
            "attack" : "Web Shell",
            "mitreid" : "T1100"
        },
        {
            "attack" : "Steal or Forge Authentication Certificates",
            "mitreid" : "T1649"
        },
        {
            "attack" : "Messaging Applications",
            "mitreid" : "T1213.005"
        },
        {
            "attack" : "AutoHotKey & AutoIT",
            "mitreid" : "T1059.010"
        },
        {
            "attack" : "Indicator Removal",
            "mitreid" : "T1070"
        },
        {
            "attack" : "Cloud Accounts",
            "mitreid" : "T1585.003"
        },
        {
            "attack" : "Exfiltration Over Bluetooth",
            "mitreid" : "T1011.001"
        },
        {
            "attack" : "Install Digital Certificate",
            "mitreid" : "T1608.003"
        },
        {
            "attack" : "Gather Victim Identity Information",
            "mitreid" : "T1589"
        },
        {
            "attack" : "XSL Script Processing",
            "mitreid" : "T1220"
        },
        {
            "attack" : "Environmental Keying",
            "mitreid" : "T1480.001"
        },
        {
            "attack" : "Encrypted Channel",
            "mitreid" : "T1573"
        },
        {
            "attack" : "Additional Local or Domain Groups",
            "mitreid" : "T1098.007"
        },
        {
            "attack" : "Bandwidth Hijacking",
            "mitreid" : "T1496.002"
        },
        {
            "attack" : "Domain Properties",
            "mitreid" : "T1590.001"
        },
        {
            "attack" : "Web Services",
            "mitreid" : "T1583.006"
        },
        {
            "attack" : "Firmware Corruption",
            "mitreid" : "T1495"
        },
        {
            "attack" : "Disable or Modify Tools",
            "mitreid" : "T1562.001"
        },
        {
            "attack" : "Golden Ticket",
            "mitreid" : "T1558.001"
        },
        {
            "attack" : "Regsvr32",
            "mitreid" : "T1117"
        },
        {
            "attack" : "Scan Databases",
            "mitreid" : "T1596.005"
        },
        {
            "attack" : "DLL Side-Loading",
            "mitreid" : "T1574.002"
        },
        {
            "attack" : "Container Orchestration Job",
            "mitreid" : "T1053.007"
        },
        {
            "attack" : "Botnet",
            "mitreid" : "T1583.005"
        },
        {
            "attack" : "LC_MAIN Hijacking",
            "mitreid" : "T1149"
        },
        {
            "attack" : "Scheduled Transfer",
            "mitreid" : "T1029"
        },
        {
            "attack" : "Chat Messages",
            "mitreid" : "T1552.008"
        },
        {
            "attack" : "Cloud Storage Object Discovery",
            "mitreid" : "T1619"
        },
        {
            "attack" : "Exfiltration over USB",
            "mitreid" : "T1052.001"
        },
        {
            "attack" : "Reduce Key Space",
            "mitreid" : "T1600.001"
        },
        {
            "attack" : "Right-to-Left Override",
            "mitreid" : "T1036.002"
        },
        {
            "attack" : "DNS",
            "mitreid" : "T1590.002"
        },
        {
            "attack" : "Image File Execution Options Injection",
            "mitreid" : "T1183"
        },
        {
            "attack" : "Unix Shell Configuration Modification",
            "mitreid" : "T1546.004"
        },
        {
            "attack" : "Spearphishing Link",
            "mitreid" : "T1598.003"
        },
        {
            "attack" : "Windows Management Instrumentation Event Subscription",
            "mitreid" : "T1084"
        },
        {
            "attack" : "Modify Existing Service",
            "mitreid" : "T1031"
        },
        {
            "attack" : "Timestomp",
            "mitreid" : "T1099"
        },
        {
            "attack" : "Change Default File Association",
            "mitreid" : "T1546.001"
        },
        {
            "attack" : "Control Panel Items",
            "mitreid" : "T1196"
        },
        {
            "attack" : "Drive-by Compromise",
            "mitreid" : "T1189"
        },
        {
            "attack" : "Dylib Hijacking",
            "mitreid" : "T1574.004"
        },
        {
            "attack" : "Keylogging",
            "mitreid" : "T1056.001"
        },
        {
            "attack" : "Permission Groups Discovery",
            "mitreid" : "T1069"
        },
        {
            "attack" : "System Script Proxy Execution",
            "mitreid" : "T1216"
        },
        {
            "attack" : "Additional Cloud Roles",
            "mitreid" : "T1098.003"
        },
        {
            "attack" : "LC_LOAD_DYLIB Addition",
            "mitreid" : "T1546.006"
        },
        {
            "attack" : "Establish Accounts",
            "mitreid" : "T1585"
        },
        {
            "attack" : "Elevated Execution with Prompt",
            "mitreid" : "T1514"
        },
        {
            "attack" : "Shortcut Modification",
            "mitreid" : "T1023"
        },
        {
            "attack" : "PubPrn",
            "mitreid" : "T1216.001"
        },
        {
            "attack" : "SSH Hijacking",
            "mitreid" : "T1184"
        },
        {
            "attack" : "Lateral Tool Transfer",
            "mitreid" : "T1570"
        },
        {
            "attack" : "Make and Impersonate Token",
            "mitreid" : "T1134.003"
        },
        {
            "attack" : "Code Signing Certificates",
            "mitreid" : "T1588.003"
        },
        {
            "attack" : "Group Policy Modification",
            "mitreid" : "T1484.001"
        },
        {
            "attack" : "SSH",
            "mitreid" : "T1021.004"
        },
        {
            "attack" : "Change Default File Association",
            "mitreid" : "T1042"
        },
        {
            "attack" : "Multi-hop Proxy",
            "mitreid" : "T1188"
        },
        {
            "attack" : "Executable Installer File Permissions Weakness",
            "mitreid" : "T1574.005"
        },
        {
            "attack" : "Terminal Services DLL",
            "mitreid" : "T1505.005"
        },
        {
            "attack" : "Compute Hijacking",
            "mitreid" : "T1496.001"
        },
        {
            "attack" : "Wordlist Scanning",
            "mitreid" : "T1595.003"
        },
        {
            "attack" : "Cloud Instance Metadata API",
            "mitreid" : "T1522"
        },
        {
            "attack" : "Data Encrypted",
            "mitreid" : "T1022"
        },
        {
            "attack" : "Use Alternate Authentication Material",
            "mitreid" : "T1550"
        },
        {
            "attack" : "Hidden Window",
            "mitreid" : "T1143"
        },
        {
            "attack" : "OS Exhaustion Flood",
            "mitreid" : "T1499.001"
        },
        {
            "attack" : "Space after Filename",
            "mitreid" : "T1151"
        },
        {
            "attack" : "Internal Proxy",
            "mitreid" : "T1090.001"
        },
        {
            "attack" : "System Network Connections Discovery",
            "mitreid" : "T1049"
        },
        {
            "attack" : "Domain Account",
            "mitreid" : "T1087.002"
        },
        {
            "attack" : "Indicator Blocking",
            "mitreid" : "T1562.006"
        },
        {
            "attack" : "Dylib Hijacking",
            "mitreid" : "T1157"
        },
        {
            "attack" : "Bypass User Account Control",
            "mitreid" : "T1088"
        },
        {
            "attack" : "Windows Credential Manager",
            "mitreid" : "T1555.004"
        },
        {
            "attack" : "Redundant Access",
            "mitreid" : "T1108"
        },
        {
            "attack" : "Command and Scripting Interpreter",
            "mitreid" : "T1059"
        },
        {
            "attack" : "Logon Script (Windows)",
            "mitreid" : "T1037.001"
        },
        {
            "attack" : "Disable or Modify System Firewall",
            "mitreid" : "T1562.004"
        },
        {
            "attack" : "Hybrid Identity",
            "mitreid" : "T1556.007"
        },
        {
            "attack" : "Malicious File",
            "mitreid" : "T1204.002"
        },
        {
            "attack" : "Proxy",
            "mitreid" : "T1090"
        },
        {
            "attack" : "Bidirectional Communication",
            "mitreid" : "T1102.002"
        },
        {
            "attack" : "Vulnerabilities",
            "mitreid" : "T1588.006"
        },
        {
            "attack" : "Data Staged",
            "mitreid" : "T1074"
        },
        {
            "attack" : "Hidden Files and Directories",
            "mitreid" : "T1158"
        },
        {
            "attack" : "Password Managers",
            "mitreid" : "T1555.005"
        },
        {
            "attack" : "Financial Theft",
            "mitreid" : "T1657"
        },
        {
            "attack" : "Additional Email Delegate Permissions",
            "mitreid" : "T1098.002"
        },
        {
            "attack" : "Time Based Evasion",
            "mitreid" : "T1497.003"
        },
        {
            "attack" : "Evil Twin",
            "mitreid" : "T1557.004"
        },
        {
            "attack" : "AS-REP Roasting",
            "mitreid" : "T1558.004"
        },
        {
            "attack" : "Component Firmware",
            "mitreid" : "T1109"
        },
        {
            "attack" : "Modify Authentication Process",
            "mitreid" : "T1556"
        },
        {
            "attack" : "Binary Padding",
            "mitreid" : "T1009"
        },
        {
            "attack" : "Lifecycle-Triggered Deletion",
            "mitreid" : "T1485.001"
        },
        {
            "attack" : "SAML Tokens",
            "mitreid" : "T1606.002"
        },
        {
            "attack" : "Application Access Token",
            "mitreid" : "T1550.001"
        },
        {
            "attack" : "Network Device Authentication",
            "mitreid" : "T1556.004"
        },
        {
            "attack" : "ClickOnce",
            "mitreid" : "T1127.002"
        },
        {
            "attack" : "Server",
            "mitreid" : "T1584.004"
        },
        {
            "attack" : "Automated Exfiltration",
            "mitreid" : "T1020"
        },
        {
            "attack" : "Data from Network Shared Drive",
            "mitreid" : "T1039"
        },
        {
            "attack" : "Device Driver Discovery",
            "mitreid" : "T1652"
        },
        {
            "attack" : "Service Execution",
            "mitreid" : "T1035"
        },
        {
            "attack" : "Active Scanning",
            "mitreid" : "T1595"
        },
        {
            "attack" : "Clear Command History",
            "mitreid" : "T1070.003"
        },
        {
            "attack" : "Hypervisor",
            "mitreid" : "T1062"
        },
        {
            "attack" : "Exfiltration Over C2 Channel",
            "mitreid" : "T1041"
        },
        {
            "attack" : "Credentials in Files",
            "mitreid" : "T1081"
        },
        {
            "attack" : "Business Relationships",
            "mitreid" : "T1591.002"
        },
        {
            "attack" : "Kernel Modules and Extensions",
            "mitreid" : "T1215"
        },
        {
            "attack" : "Stripped Payloads",
            "mitreid" : "T1027.008"
        },
        {
            "attack" : "Obfuscated Files or Information",
            "mitreid" : "T1027"
        },
        {
            "attack" : "User Activity Based Checks",
            "mitreid" : "T1497.002"
        },
        {
            "attack" : "HTML Smuggling",
            "mitreid" : "T1027.006"
        },
        {
            "attack" : "Email Addresses",
            "mitreid" : "T1589.002"
        },
        {
            "attack" : "Accessibility Features",
            "mitreid" : "T1546.008"
        },
        {
            "attack" : "Shortcut Modification",
            "mitreid" : "T1547.009"
        },
        {
            "attack" : "Software Deployment Tools",
            "mitreid" : "T1072"
        },
        {
            "attack" : "Masquerade File Type",
            "mitreid" : "T1036.008"
        },
        {
            "attack" : "Inter-Process Communication",
            "mitreid" : "T1559"
        },
        {
            "attack" : "Identify Roles",
            "mitreid" : "T1591.004"
        },
        {
            "attack" : "Container Service",
            "mitreid" : "T1543.005"
        },
        {
            "attack" : "Application Layer Protocol",
            "mitreid" : "T1071"
        },
        {
            "attack" : "Compromise Software Dependencies and Development Tools",
            "mitreid" : "T1195.001"
        },
        {
            "attack" : "Netsh Helper DLL",
            "mitreid" : "T1546.007"
        },
        {
            "attack" : "Internal Spearphishing",
            "mitreid" : "T1534"
        },
        {
            "attack" : "Compromise Hardware Supply Chain",
            "mitreid" : "T1195.003"
        },
        {
            "attack" : "Network Denial of Service",
            "mitreid" : "T1498"
        },
        {
            "attack" : "Silver Ticket",
            "mitreid" : "T1558.002"
        },
        {
            "attack" : "Malicious Link",
            "mitreid" : "T1204.001"
        },
        {
            "attack" : "Sudo",
            "mitreid" : "T1169"
        },
        {
            "attack" : "Spearphishing via Service",
            "mitreid" : "T1566.003"
        },
        {
            "attack" : "Remote Email Collection",
            "mitreid" : "T1114.002"
        },
        {
            "attack" : "Data from Configuration Repository",
            "mitreid" : "T1602"
        },
        {
            "attack" : "Emond",
            "mitreid" : "T1519"
        },
        {
            "attack" : "Server Software Component",
            "mitreid" : "T1505"
        },
        {
            "attack" : "Spearphishing via Service",
            "mitreid" : "T1194"
        },
        {
            "attack" : "Scheduled Task",
            "mitreid" : "T1053.005"
        },
        {
            "attack" : "Bypass User Account Control",
            "mitreid" : "T1548.002"
        },
        {
            "attack" : "Spearphishing Attachment",
            "mitreid" : "T1193"
        },
        {
            "attack" : "Valid Accounts",
            "mitreid" : "T1078"
        },
        {
            "attack" : "Downgrade Attack",
            "mitreid" : "T1562.010"
        },
        {
            "attack" : "Launchctl",
            "mitreid" : "T1152"
        },
        {
            "attack" : "Malware",
            "mitreid" : "T1587.001"
        },
        {
            "attack" : "Hooking",
            "mitreid" : "T1179"
        },
        {
            "attack" : "Visual Basic",
            "mitreid" : "T1059.005"
        },
        {
            "attack" : "Cloud Secrets Management Stores",
            "mitreid" : "T1555.006"
        },
        {
            "attack" : "Video Capture",
            "mitreid" : "T1125"
        },
        {
            "attack" : "Downgrade System Image",
            "mitreid" : "T1601.002"
        },
        {
            "attack" : "Deobfuscate\/Decode Files or Information",
            "mitreid" : "T1140"
        },
        {
            "attack" : "Disabling Security Tools",
            "mitreid" : "T1089"
        },
        {
            "attack" : "Network Device Configuration Dump",
            "mitreid" : "T1602.002"
        },
        {
            "attack" : "DNS Calculation",
            "mitreid" : "T1568.003"
        },
        {
            "attack" : "Shared Modules",
            "mitreid" : "T1129"
        },
        {
            "attack" : "SSH Authorized Keys",
            "mitreid" : "T1098.004"
        },
        {
            "attack" : "Portable Executable Injection",
            "mitreid" : "T1055.002"
        },
        {
            "attack" : "Exploitation of Remote Services",
            "mitreid" : "T1210"
        },
        {
            "attack" : "Space after Filename",
            "mitreid" : "T1036.006"
        },
        {
            "attack" : "Indicator Removal from Tools",
            "mitreid" : "T1066"
        },
        {
            "attack" : "Commonly Used Port",
            "mitreid" : "T1043"
        },
        {
            "attack" : "Brute Force",
            "mitreid" : "T1110"
        },
        {
            "attack" : "Direct Cloud VM Connections",
            "mitreid" : "T1021.008"
        },
        {
            "attack" : "Network Logon Script",
            "mitreid" : "T1037.003"
        },
        {
            "attack" : "Local Account",
            "mitreid" : "T1087.001"
        },
        {
            "attack" : "Disk Content Wipe",
            "mitreid" : "T1488"
        },
        {
            "attack" : "Credentials from Password Stores",
            "mitreid" : "T1555"
        },
        {
            "attack" : "Web Portal Capture",
            "mitreid" : "T1056.003"
        },
        {
            "attack" : "Keychain",
            "mitreid" : "T1555.001"
        },
        {
            "attack" : "Outlook Rules",
            "mitreid" : "T1137.005"
        },
        {
            "attack" : "Application Window Discovery",
            "mitreid" : "T1010"
        },
        {
            "attack" : "Purchase Technical Data",
            "mitreid" : "T1597.002"
        },
        {
            "attack" : "Content Injection",
            "mitreid" : "T1659"
        },
        {
            "attack" : "Screen Capture",
            "mitreid" : "T1113"
        },
        {
            "attack" : "System Services",
            "mitreid" : "T1569"
        },
        {
            "attack" : "Exfiltration to Cloud Storage",
            "mitreid" : "T1567.002"
        },
        {
            "attack" : "Network Share Connection Removal",
            "mitreid" : "T1070.005"
        },
        {
            "attack" : "Service Execution",
            "mitreid" : "T1569.002"
        },
        {
            "attack" : "Email Accounts",
            "mitreid" : "T1586.002"
        },
        {
            "attack" : "Direct Volume Access",
            "mitreid" : "T1006"
        },
        {
            "attack" : "Hidden Window",
            "mitreid" : "T1564.003"
        },
        {
            "attack" : "Traffic Duplication",
            "mitreid" : "T1020.001"
        },
        {
            "attack" : "Subvert Trust Controls",
            "mitreid" : "T1553"
        },
        {
            "attack" : "Install Root Certificate",
            "mitreid" : "T1130"
        },
        {
            "attack" : "Kerberoasting",
            "mitreid" : "T1208"
        },
        {
            "attack" : "Email Accounts",
            "mitreid" : "T1585.002"
        },
        {
            "attack" : "Rogue Domain Controller",
            "mitreid" : "T1207"
        },
        {
            "attack" : "DNS",
            "mitreid" : "T1071.004"
        },
        {
            "attack" : "Digital Certificates",
            "mitreid" : "T1588.004"
        },
        {
            "attack" : "Code Signing Certificates",
            "mitreid" : "T1587.002"
        },
        {
            "attack" : "Process Doppelgänging",
            "mitreid" : "T1186"
        },
        {
            "attack" : "Lua",
            "mitreid" : "T1059.011"
        },
        {
            "attack" : "RC Scripts",
            "mitreid" : "T1037.004"
        },
        {
            "attack" : "Domains",
            "mitreid" : "T1584.001"
        },
        {
            "attack" : "Component Object Model Hijacking",
            "mitreid" : "T1546.015"
        },
        {
            "attack" : "Code Repositories",
            "mitreid" : "T1213.003"
        },
        {
            "attack" : "Masquerade Task or Service",
            "mitreid" : "T1036.004"
        },
        {
            "attack" : "Transmitted Data Manipulation",
            "mitreid" : "T1493"
        },
        {
            "attack" : "Virtualization\/Sandbox Evasion",
            "mitreid" : "T1497"
        },
        {
            "attack" : "Remote Services",
            "mitreid" : "T1021"
        },
        {
            "attack" : "Trap",
            "mitreid" : "T1546.005"
        },
        {
            "attack" : "Password Filter DLL",
            "mitreid" : "T1556.002"
        },
        {
            "attack" : "Temporary Elevated Cloud Access",
            "mitreid" : "T1548.005"
        },
        {
            "attack" : "Process Doppelgänging",
            "mitreid" : "T1055.013"
        },
        {
            "attack" : "Clear Persistence",
            "mitreid" : "T1070.009"
        },
        {
            "attack" : "Rename System Utilities",
            "mitreid" : "T1036.003"
        },
        {
            "attack" : "Systemd Timers",
            "mitreid" : "T1053.006"
        },
        {
            "attack" : "Credentials",
            "mitreid" : "T1589.001"
        },
        {
            "attack" : "Account Manipulation",
            "mitreid" : "T1098"
        },
        {
            "attack" : "Symmetric Cryptography",
            "mitreid" : "T1573.001"
        },
        {
            "attack" : "Cloud Instance Metadata API",
            "mitreid" : "T1552.005"
        },
        {
            "attack" : "Exploitation for Defense Evasion",
            "mitreid" : "T1211"
        },
        {
            "attack" : "Scheduled Task\/Job",
            "mitreid" : "T1053"
        },
        {
            "attack" : "Supply Chain Compromise",
            "mitreid" : "T1195"
        },
        {
            "attack" : "Client Configurations",
            "mitreid" : "T1592.004"
        },
        {
            "attack" : "Process Hollowing",
            "mitreid" : "T1055.012"
        },
        {
            "attack" : "Create Snapshot",
            "mitreid" : "T1578.001"
        },
        {
            "attack" : "CMSTP",
            "mitreid" : "T1191"
        },
        {
            "attack" : "Archive via Library",
            "mitreid" : "T1560.002"
        },
        {
            "attack" : "Netsh Helper DLL",
            "mitreid" : "T1128"
        },
        {
            "attack" : "LSASS Driver",
            "mitreid" : "T1547.008"
        },
        {
            "attack" : "Non-Standard Port",
            "mitreid" : "T1571"
        },
        {
            "attack" : "Remote Desktop Protocol",
            "mitreid" : "T1076"
        },
        {
            "attack" : "System Shutdown\/Reboot",
            "mitreid" : "T1529"
        },
        {
            "attack" : "Search Victim-Owned Websites",
            "mitreid" : "T1594"
        },
        {
            "attack" : "Upload Malware",
            "mitreid" : "T1608.001"
        },
        {
            "attack" : "Drive-by Target",
            "mitreid" : "T1608.004"
        },
        {
            "attack" : "Trust Modification",
            "mitreid" : "T1484.002"
        },
        {
            "attack" : "Transport Agent",
            "mitreid" : "T1505.002"
        },
        {
            "attack" : "Scanning IP Blocks",
            "mitreid" : "T1595.001"
        },
        {
            "attack" : "Create Process with Token",
            "mitreid" : "T1134.002"
        },
        {
            "attack" : "Application Shimming",
            "mitreid" : "T1138"
        },
        {
            "attack" : "Services File Permissions Weakness",
            "mitreid" : "T1574.010"
        },
        {
            "attack" : "Confluence",
            "mitreid" : "T1213.001"
        },
        {
            "attack" : "Multilayer Encryption",
            "mitreid" : "T1079"
        },
        {
            "attack" : "Bootkit",
            "mitreid" : "T1067"
        },
        {
            "attack" : "Fallback Channels",
            "mitreid" : "T1008"
        },
        {
            "attack" : "Distributed Component Object Model",
            "mitreid" : "T1021.003"
        },
        {
            "attack" : "Data Encoding",
            "mitreid" : "T1132"
        },
        {
            "attack" : "Create or Modify System Process",
            "mitreid" : "T1543"
        },
        {
            "attack" : "Abuse Elevation Control Mechanism",
            "mitreid" : "T1548"
        },
        {
            "attack" : "Private Keys",
            "mitreid" : "T1145"
        },
        {
            "attack" : "Gatekeeper Bypass",
            "mitreid" : "T1144"
        },
        {
            "attack" : "Spearphishing Attachment",
            "mitreid" : "T1566.001"
        },
        {
            "attack" : "Control Panel",
            "mitreid" : "T1218.002"
        },
        {
            "attack" : "Compromise Infrastructure",
            "mitreid" : "T1584"
        },
        {
            "attack" : "Dynamic API Resolution",
            "mitreid" : "T1027.007"
        },
        {
            "attack" : "LNK Icon Smuggling",
            "mitreid" : "T1027.012"
        },
        {
            "attack" : "Artificial Intelligence",
            "mitreid" : "T1588.007"
        },
        {
            "attack" : "Network Device CLI",
            "mitreid" : "T1059.008"
        },
        {
            "attack" : "Timestomp",
            "mitreid" : "T1070.006"
        },
        {
            "attack" : "DCSync",
            "mitreid" : "T1003.006"
        },
        {
            "attack" : "Pluggable Authentication Modules",
            "mitreid" : "T1556.003"
        },
        {
            "attack" : "Rc.common",
            "mitreid" : "T1163"
        },
        {
            "attack" : "Authentication Package",
            "mitreid" : "T1547.002"
        },
        {
            "attack" : "Data Encrypted for Impact",
            "mitreid" : "T1486"
        },
        {
            "attack" : "Domain Generation Algorithms",
            "mitreid" : "T1568.002"
        },
        {
            "attack" : "System Language Discovery",
            "mitreid" : "T1614.001"
        },
        {
            "attack" : "Code Repositories",
            "mitreid" : "T1593.003"
        },
        {
            "attack" : "LC_LOAD_DYLIB Addition",
            "mitreid" : "T1161"
        },
        {
            "attack" : "Unsecured Credentials",
            "mitreid" : "T1552"
        },
        {
            "attack" : "Pass the Ticket",
            "mitreid" : "T1097"
        },
        {
            "attack" : "Disk Structure Wipe",
            "mitreid" : "T1487"
        },
        {
            "attack" : "Web Services",
            "mitreid" : "T1584.006"
        },
        {
            "attack" : "Launch Daemon",
            "mitreid" : "T1160"
        },
        {
            "attack" : "Malvertising",
            "mitreid" : "T1583.008"
        },
        {
            "attack" : "Security Account Manager",
            "mitreid" : "T1003.002"
        },
        {
            "attack" : "Access Token Manipulation",
            "mitreid" : "T1134"
        },
        {
            "attack" : "Web Service",
            "mitreid" : "T1102"
        },
        {
            "attack" : "Proc Memory",
            "mitreid" : "T1055.009"
        },
        {
            "attack" : "Forced Authentication",
            "mitreid" : "T1187"
        },
        {
            "attack" : "RDP Hijacking",
            "mitreid" : "T1563.002"
        },
        {
            "attack" : "Command Obfuscation",
            "mitreid" : "T1027.010"
        },
        {
            "attack" : "Serverless Execution",
            "mitreid" : "T1648"
        },
        {
            "attack" : "Network Security Appliances",
            "mitreid" : "T1590.006"
        },
        {
            "attack" : "Office Template Macros",
            "mitreid" : "T1137.001"
        },
        {
            "attack" : "SNMP (MIB Dump)",
            "mitreid" : "T1602.001"
        },
        {
            "attack" : "Taint Shared Content",
            "mitreid" : "T1080"
        },
        {
            "attack" : "Exploit Public-Facing Application",
            "mitreid" : "T1190"
        },
        {
            "attack" : "Password Spraying",
            "mitreid" : "T1110.003"
        },
        {
            "attack" : "DLL Search Order Hijacking",
            "mitreid" : "T1038"
        },
        {
            "attack" : "Mshta",
            "mitreid" : "T1170"
        },
        {
            "attack" : "Exploitation for Client Execution",
            "mitreid" : "T1203"
        },
        {
            "attack" : "Credentials from Web Browsers",
            "mitreid" : "T1503"
        },
        {
            "attack" : "Exploits",
            "mitreid" : "T1588.005"
        },
        {
            "attack" : "Port Knocking",
            "mitreid" : "T1205.001"
        },
        {
            "attack" : "AppleScript",
            "mitreid" : "T1155"
        },
        {
            "attack" : "Dead Drop Resolver",
            "mitreid" : "T1102.001"
        },
        {
            "attack" : "Publish\/Subscribe Protocols",
            "mitreid" : "T1071.005"
        },
        {
            "attack" : "Default Accounts",
            "mitreid" : "T1078.001"
        },
        {
            "attack" : "Password Guessing",
            "mitreid" : "T1110.001"
        },
        {
            "attack" : "Path Interception by PATH Environment Variable",
            "mitreid" : "T1574.007"
        },
        {
            "attack" : "Malicious Shell Modification",
            "mitreid" : "T1156"
        },
        {
            "attack" : "Registry Run Keys \/ Startup Folder",
            "mitreid" : "T1547.001"
        },
        {
            "attack" : "NTFS File Attributes",
            "mitreid" : "T1096"
        },
        {
            "attack" : "Python",
            "mitreid" : "T1059.006"
        },
        {
            "attack" : "Hidden Files and Directories",
            "mitreid" : "T1564.001"
        },
        {
            "attack" : "Device Registration",
            "mitreid" : "T1098.005"
        },
        {
            "attack" : "Modify System Image",
            "mitreid" : "T1601"
        },
        {
            "attack" : "Boot or Logon Initialization Scripts",
            "mitreid" : "T1037"
        },
        {
            "attack" : "Clear Windows Event Logs",
            "mitreid" : "T1070.001"
        },
        {
            "attack" : "Clear Mailbox Data",
            "mitreid" : "T1070.008"
        },
        {
            "attack" : "AppInit DLLs",
            "mitreid" : "T1546.010"
        },
        {
            "attack" : "Regsvcs\/Regasm",
            "mitreid" : "T1218.009"
        },
        {
            "attack" : "System Time Discovery",
            "mitreid" : "T1124"
        },
        {
            "attack" : "Disk Structure Wipe",
            "mitreid" : "T1561.002"
        },
        {
            "attack" : "BITS Jobs",
            "mitreid" : "T1197"
        },
        {
            "attack" : "Service Registry Permissions Weakness",
            "mitreid" : "T1058"
        },
        {
            "attack" : "Keychain",
            "mitreid" : "T1142"
        },
        {
            "attack" : "Data Manipulation",
            "mitreid" : "T1565"
        },
        {
            "attack" : "Network Devices",
            "mitreid" : "T1584.008"
        },
        {
            "attack" : "Windows Management Instrumentation Event Subscription",
            "mitreid" : "T1546.003"
        },
        {
            "attack" : "AppInit DLLs",
            "mitreid" : "T1103"
        },
        {
            "attack" : "XDG Autostart Entries",
            "mitreid" : "T1547.013"
        },
        {
            "attack" : "VBA Stomping",
            "mitreid" : "T1564.007"
        },
        {
            "attack" : "Domain Accounts",
            "mitreid" : "T1078.002"
        },
        {
            "attack" : "MMC",
            "mitreid" : "T1218.014"
        },
        {
            "attack" : "Reflective Code Loading",
            "mitreid" : "T1620"
        },
        {
            "attack" : "Email Collection",
            "mitreid" : "T1114"
        },
        {
            "attack" : "Clear Command History",
            "mitreid" : "T1146"
        },
        {
            "attack" : "DLL Side-Loading",
            "mitreid" : "T1073"
        },
        {
            "attack" : "Plist Modification",
            "mitreid" : "T1150"
        },
        {
            "attack" : "Clipboard Data",
            "mitreid" : "T1115"
        },
        {
            "attack" : "Image File Execution Options Injection",
            "mitreid" : "T1546.012"
        },
        {
            "attack" : "Disable Crypto Hardware",
            "mitreid" : "T1600.002"
        },
        {
            "attack" : "Disable or Modify Cloud Firewall",
            "mitreid" : "T1562.007"
        },
        {
            "attack" : "Reflection Amplification",
            "mitreid" : "T1498.002"
        },
        {
            "attack" : "Password Policy Discovery",
            "mitreid" : "T1201"
        },
        {
            "attack" : "IP Addresses",
            "mitreid" : "T1590.005"
        },
        {
            "attack" : "AppDomainManager",
            "mitreid" : "T1574.014"
        },
        {
            "attack" : "Serverless",
            "mitreid" : "T1584.007"
        },
        {
            "attack" : "Data from Removable Media",
            "mitreid" : "T1025"
        },
        {
            "attack" : "Office Application Startup",
            "mitreid" : "T1137"
        },
        {
            "attack" : "Phishing for Information",
            "mitreid" : "T1598"
        },
        {
            "attack" : "Exfiltration Over Asymmetric Encrypted Non-C2 Protocol",
            "mitreid" : "T1048.002"
        },
        {
            "attack" : "Time Providers",
            "mitreid" : "T1547.003"
        },
        {
            "attack" : "Network Provider DLL",
            "mitreid" : "T1556.008"
        },
        {
            "attack" : "Pass the Ticket",
            "mitreid" : "T1550.003"
        },
        {
            "attack" : "Domain Trust Discovery",
            "mitreid" : "T1482"
        },
        {
            "attack" : "Gather Victim Org Information",
            "mitreid" : "T1591"
        },
        {
            "attack" : "Exfiltration to Text Storage Sites",
            "mitreid" : "T1567.003"
        },
        {
            "attack" : "Cron",
            "mitreid" : "T1053.003"
        },
        {
            "attack" : "Registry Run Keys \/ Startup Folder",
            "mitreid" : "T1060"
        },
        {
            "attack" : "Installer Packages",
            "mitreid" : "T1546.016"
        },
        {
            "attack" : "Stored Data Manipulation",
            "mitreid" : "T1565.001"
        },
        {
            "attack" : "Local Groups",
            "mitreid" : "T1069.001"
        },
        {
            "attack" : "Exfiltration to Code Repository",
            "mitreid" : "T1567.001"
        },
        {
            "attack" : "Hardware",
            "mitreid" : "T1592.001"
        },
        {
            "attack" : "Compromise Host Software Binary",
            "mitreid" : "T1554"
        },
        {
            "attack" : "Mavinject",
            "mitreid" : "T1218.013"
        },
        {
            "attack" : "Network Topology",
            "mitreid" : "T1590.004"
        },
        {
            "attack" : "Gather Victim Host Information",
            "mitreid" : "T1592"
        },
        {
            "attack" : "Time Providers",
            "mitreid" : "T1209"
        },
        {
            "attack" : "Data from Cloud Storage",
            "mitreid" : "T1530"
        },
        {
            "attack" : "Steganography",
            "mitreid" : "T1027.003"
        },
        {
            "attack" : "Custom Cryptographic Protocol",
            "mitreid" : "T1024"
        },
        {
            "attack" : "Web Shell",
            "mitreid" : "T1505.003"
        },
        {
            "attack" : "Event Triggered Execution",
            "mitreid" : "T1546"
        },
        {
            "attack" : "Print Processors",
            "mitreid" : "T1547.012"
        },
        {
            "attack" : "Hide Infrastructure",
            "mitreid" : "T1665"
        },
        {
            "attack" : "OS Credential Dumping",
            "mitreid" : "T1003"
        },
        {
            "attack" : "Disable Windows Event Logging",
            "mitreid" : "T1562.002"
        },
        {
            "attack" : "Electron Applications",
            "mitreid" : "T1218.015"
        },
        {
            "attack" : "Modify Cloud Resource Hierarchy",
            "mitreid" : "T1666"
        },
        {
            "attack" : "Spoof Security Alerting",
            "mitreid" : "T1562.011"
        },
        {
            "attack" : "MSBuild",
            "mitreid" : "T1127.001"
        },
        {
            "attack" : "Web Session Cookie",
            "mitreid" : "T1506"
        },
        {
            "attack" : "Virtual Private Server",
            "mitreid" : "T1583.003"
        },
        {
            "attack" : "Clear Linux or Mac System Logs",
            "mitreid" : "T1070.002"
        },
        {
            "attack" : "Invalid Code Signature",
            "mitreid" : "T1036.001"
        },
        {
            "attack" : "Data Compressed",
            "mitreid" : "T1002"
        },
        {
            "attack" : "Cloud Infrastructure Discovery",
            "mitreid" : "T1580"
        },
        {
            "attack" : "Domain Fronting",
            "mitreid" : "T1172"
        },
        {
            "attack" : "Standard Cryptographic Protocol",
            "mitreid" : "T1032"
        },
        {
            "attack" : "Rundll32",
            "mitreid" : "T1218.011"
        },
        {
            "attack" : "Process Injection",
            "mitreid" : "T1055"
        },
        {
            "attack" : "Resource Hijacking",
            "mitreid" : "T1496"
        },
        {
            "attack" : "Disk Wipe",
            "mitreid" : "T1561"
        },
        {
            "attack" : "Ptrace System Calls",
            "mitreid" : "T1055.008"
        },
        {
            "attack" : "Winlogon Helper DLL",
            "mitreid" : "T1547.004"
        },
        {
            "attack" : "Code Signing",
            "mitreid" : "T1553.002"
        },
        {
            "attack" : "Remote Data Staging",
            "mitreid" : "T1074.002"
        },
        {
            "attack" : "Local Data Staging",
            "mitreid" : "T1074.001"
        },
        {
            "attack" : "Masquerade Account Name",
            "mitreid" : "T1036.010"
        },
        {
            "attack" : "Exfiltration Over Symmetric Encrypted Non-C2 Protocol",
            "mitreid" : "T1048.001"
        },
        {
            "attack" : "Dynamic Linker Hijacking",
            "mitreid" : "T1574.006"
        },
        {
            "attack" : "Software Discovery",
            "mitreid" : "T1518"
        },
        {
            "attack" : "SyncAppvPublishingServer",
            "mitreid" : "T1216.002"
        },
        {
            "attack" : "IIS Components",
            "mitreid" : "T1505.004"
        },
        {
            "attack" : "Communication Through Removable Media",
            "mitreid" : "T1092"
        },
        {
            "attack" : "Compromise Software Supply Chain",
            "mitreid" : "T1195.002"
        },
        {
            "attack" : "Compromise Accounts",
            "mitreid" : "T1586"
        },
        {
            "attack" : "Network Address Translation Traversal",
            "mitreid" : "T1599.001"
        },
        {
            "attack" : "Weaken Encryption",
            "mitreid" : "T1600"
        },
        {
            "attack" : "File Transfer Protocols",
            "mitreid" : "T1071.002"
        },
        {
            "attack" : "DNS\/Passive DNS",
            "mitreid" : "T1596.001"
        },
        {
            "attack" : "JavaScript",
            "mitreid" : "T1059.007"
        },
        {
            "attack" : "Kernel Modules and Extensions",
            "mitreid" : "T1547.006"
        },
        {
            "attack" : "Spearphishing Link",
            "mitreid" : "T1566.002"
        },
        {
            "attack" : "Protocol or Service Impersonation",
            "mitreid" : "T1001.003"
        },
        {
            "attack" : "At",
            "mitreid" : "T1053.002"
        },
        {
            "attack" : "Boot or Logon Autostart Execution",
            "mitreid" : "T1547"
        },
        {
            "attack" : "Exfiltration Over Alternative Protocol",
            "mitreid" : "T1048"
        },
        {
            "attack" : "Safe Mode Boot",
            "mitreid" : "T1562.009"
        },
        {
            "attack" : "Launchd",
            "mitreid" : "T1053.004"
        },
        {
            "attack" : "Hidden Users",
            "mitreid" : "T1147"
        },
        {
            "attack" : "TCC Manipulation",
            "mitreid" : "T1548.006"
        },
        {
            "attack" : "Setuid and Setgid",
            "mitreid" : "T1166"
        },
        {
            "attack" : "Browser Information Discovery",
            "mitreid" : "T1217"
        },
        {
            "attack" : "Path Interception by Search Order Hijacking",
            "mitreid" : "T1574.008"
        },
        {
            "attack" : "Disable or Modify Linux Audit System",
            "mitreid" : "T1562.012"
        },
        {
            "attack" : "SID-History Injection",
            "mitreid" : "T1178"
        },
        {
            "attack" : "Security Software Discovery",
            "mitreid" : "T1518.001"
        },
        {
            "attack" : "Protocol Tunneling",
            "mitreid" : "T1572"
        },
        {
            "attack" : "Service Stop",
            "mitreid" : "T1489"
        },
        {
            "attack" : "Audio Capture",
            "mitreid" : "T1123"
        },
        {
            "attack" : "Outlook Home Page",
            "mitreid" : "T1137.004"
        },
        {
            "attack" : "Firmware",
            "mitreid" : "T1592.003"
        },
        {
            "attack" : "Hide Artifacts",
            "mitreid" : "T1564"
        },
        {
            "attack" : "Stored Data Manipulation",
            "mitreid" : "T1492"
        },
        {
            "attack" : "Data Obfuscation",
            "mitreid" : "T1001"
        },
        {
            "attack" : "Phishing",
            "mitreid" : "T1566"
        },
        {
            "attack" : "Data Transfer Size Limits",
            "mitreid" : "T1030"
        },
        {
            "attack" : "Launchctl",
            "mitreid" : "T1569.001"
        },
        {
            "attack" : "Cloud Administration Command",
            "mitreid" : "T1651"
        },
        {
            "attack" : "Identify Business Tempo",
            "mitreid" : "T1591.003"
        },
        {
            "attack" : "Ignore Process Interrupts",
            "mitreid" : "T1564.011"
        },
        {
            "attack" : "Local Accounts",
            "mitreid" : "T1078.003"
        },
        {
            "attack" : "Cloud Service Dashboard",
            "mitreid" : "T1538"
        },
        {
            "attack" : "Port Monitors",
            "mitreid" : "T1013"
        },
        {
            "attack" : "DNS Server",
            "mitreid" : "T1583.002"
        },
        {
            "attack" : "CDNs",
            "mitreid" : "T1596.004"
        },
        {
            "attack" : "Trusted Relationship",
            "mitreid" : "T1199"
        },
        {
            "attack" : "AppCert DLLs",
            "mitreid" : "T1546.009"
        },
        {
            "attack" : "Password Cracking",
            "mitreid" : "T1110.002"
        },
        {
            "attack" : "Vulnerability Scanning",
            "mitreid" : "T1595.002"
        },
        {
            "attack" : "Build Image on Host",
            "mitreid" : "T1612"
        },
        {
            "attack" : "Browser Extensions",
            "mitreid" : "T1176"
        },
        {
            "attack" : "Power Settings",
            "mitreid" : "T1653"
        },
        {
            "attack" : "Process Argument Spoofing",
            "mitreid" : "T1564.010"
        },
        {
            "attack" : "Multi-hop Proxy",
            "mitreid" : "T1090.003"
        },
        {
            "attack" : "Modify Registry",
            "mitreid" : "T1112"
        },
        {
            "attack" : "Msiexec",
            "mitreid" : "T1218.007"
        },
        {
            "attack" : "File Deletion",
            "mitreid" : "T1070.004"
        },
        {
            "attack" : "Non-Standard Encoding",
            "mitreid" : "T1132.002"
        },
        {
            "attack" : "Customer Relationship Management Software",
            "mitreid" : "T1213.004"
        },
        {
            "attack" : "Hardware Additions",
            "mitreid" : "T1200"
        },
        {
            "attack" : "DNS Server",
            "mitreid" : "T1584.002"
        },
        {
            "attack" : "Windows File and Directory Permissions Modification",
            "mitreid" : "T1222.001"
        },
        {
            "attack" : "Cloud API",
            "mitreid" : "T1059.009"
        },
        {
            "attack" : "Credential Stuffing",
            "mitreid" : "T1110.004"
        },
        {
            "attack" : "LSASS Memory",
            "mitreid" : "T1003.001"
        },
        {
            "attack" : "Reversible Encryption",
            "mitreid" : "T1556.005"
        },
        {
            "attack" : "Native API",
            "mitreid" : "T1106"
        },
        {
            "attack" : "Spearphishing Voice",
            "mitreid" : "T1598.004"
        },
        {
            "attack" : "Input Prompt",
            "mitreid" : "T1141"
        },
        {
            "attack" : "Odbcconf",
            "mitreid" : "T1218.008"
        },
        {
            "attack" : "Impair Command History Logging",
            "mitreid" : "T1562.003"
        },
        {
            "attack" : "InstallUtil",
            "mitreid" : "T1118"
        },
        {
            "attack" : "Dynamic Data Exchange",
            "mitreid" : "T1559.002"
        },
        {
            "attack" : "Hijack Execution Flow",
            "mitreid" : "T1574"
        },
        {
            "attack" : "Component Firmware",
            "mitreid" : "T1542.002"
        },
        {
            "attack" : "Masquerading",
            "mitreid" : "T1036"
        },
        {
            "attack" : "AppleScript",
            "mitreid" : "T1059.002"
        },
        {
            "attack" : "Steal Application Access Token",
            "mitreid" : "T1528"
        },
        {
            "attack" : "Steganography",
            "mitreid" : "T1001.002"
        },
        {
            "attack" : "Acquire Infrastructure",
            "mitreid" : "T1583"
        },
        {
            "attack" : "Forge Web Credentials",
            "mitreid" : "T1606"
        },
        {
            "attack" : "LLMNR\/NBT-NS Poisoning and Relay",
            "mitreid" : "T1171"
        },
        {
            "attack" : "Cloud Service Hijacking",
            "mitreid" : "T1496.004"
        },
        {
            "attack" : "Network Sniffing",
            "mitreid" : "T1040"
        },
        {
            "attack" : "Traffic Signaling",
            "mitreid" : "T1205"
        },
        {
            "attack" : "Uncommonly Used Port",
            "mitreid" : "T1065"
        },
        {
            "attack" : "Log Enumeration",
            "mitreid" : "T1654"
        },
        {
            "attack" : "Delete Cloud Instance",
            "mitreid" : "T1578.003"
        },
        {
            "attack" : "Double File Extension",
            "mitreid" : "T1036.007"
        },
        {
            "attack" : "Cloud Account",
            "mitreid" : "T1087.004"
        },
        {
            "attack" : "GUI Input Capture",
            "mitreid" : "T1056.002"
        },
        {
            "attack" : "Cloud Accounts",
            "mitreid" : "T1586.003"
        },
        {
            "attack" : "Setuid and Setgid",
            "mitreid" : "T1548.001"
        },
        {
            "attack" : "Determine Physical Locations",
            "mitreid" : "T1591.001"
        },
        {
            "attack" : "Peripheral Device Discovery",
            "mitreid" : "T1120"
        },
        {
            "attack" : "Software Packing",
            "mitreid" : "T1027.002"
        },
        {
            "attack" : "Deploy Container",
            "mitreid" : "T1610"
        },
        {
            "attack" : "Endpoint Denial of Service",
            "mitreid" : "T1499"
        },
        {
            "attack" : "Re-opened Applications",
            "mitreid" : "T1164"
        },
        {
            "attack" : "File Deletion",
            "mitreid" : "T1107"
        },
        {
            "attack" : "LSASS Driver",
            "mitreid" : "T1177"
        },
        {
            "attack" : "Re-opened Applications",
            "mitreid" : "T1547.007"
        },
        {
            "attack" : "Match Legitimate Name or Location",
            "mitreid" : "T1036.005"
        },
        {
            "attack" : "System Location Discovery",
            "mitreid" : "T1614"
        },
        {
            "attack" : "Linux and Mac File and Directory Permissions Modification",
            "mitreid" : "T1222.002"
        },
        {
            "attack" : "Indirect Command Execution",
            "mitreid" : "T1202"
        },
        {
            "attack" : "Elevated Execution with Prompt",
            "mitreid" : "T1548.004"
        },
        {
            "attack" : "External Proxy",
            "mitreid" : "T1090.002"
        },
        {
            "attack" : "Accessibility Features",
            "mitreid" : "T1015"
        },
        {
            "attack" : "Domain Generation Algorithms",
            "mitreid" : "T1483"
        },
        {
            "attack" : "Sudo and Sudo Caching",
            "mitreid" : "T1548.003"
        }
    ];
export default attack_map;