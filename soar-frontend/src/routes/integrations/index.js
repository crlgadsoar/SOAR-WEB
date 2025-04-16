import React from "react";
import ThreatEraseLogo from "../../assets/images/THREAT_ERASE_LOGO.png"
import { Card, Row, Col } from "antd";
import "./style.css"; // Import the CSS file

const integrations = [
  { title: "WAF", description: "Web Application Firewall" },
  { title: "NDR", description: "Network Detection and Response" },
  { title: "UEBA", description: "User and Entity Behavior Analytics" },
  { title: "SIEM", description: "Security Information and Event Management" },
  { title: "ThreatErase", description: "Threat Eradication" },
];

const Integrations = () => {
  return (
    <div className="integrations-container">
      <h1 className="integrations-title">Integrations</h1>
      <Row gutter={[16, 16]}>
        {integrations.map((integration) => (
          <Col xs={24} sm={12} md={8} lg={6} key={integration.title}>
            <Card
              title={integration.title}
              bordered={true}
              hoverable
              className="integration-card"
            >
              <img src={ThreatEraseLogo} alt="Integration Logo" className="integration-logo" />
              <p>{integration.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Integrations;