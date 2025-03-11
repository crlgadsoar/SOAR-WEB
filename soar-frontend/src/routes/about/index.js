import React from "react";
import { Card } from "antd";
import { CloseOutlined } from "@ant-design/icons";
/**
 * Renders the About component, which displays information about the SOAR software.
 * @returns The rendered About component.
 */
const About = ({ onCancel }) => {
  return (
    <div style={{ width: "600px" }}>
      <Card
        title={
          <div style={{ textAlign: "center" }}>
            <h1 style={{ marginBottom: "-12px" }}>SOAR</h1>
            <h5 style={{ color: "gray" }}>Version 1.0.1</h5>
          </div>
        }
        extra={<CloseOutlined onClick={onCancel} style={{ color: "red" }} />}
      >
        <p style={{ textAlign: "center" }}>
          <i>Our Security Orchestration, Automation, and Response (SOAR) platform is designed to automate and streamline incident response workflows. By integrating with SIEM and leveraging MITRE ATT&CK, the system enables rapid detection, analysis, and mitigation of security threat.</i>
        </p>
        {/* <p style={{ textAlign: "center" }}>
          <i>This SOAR Software will display various dashboard.</i>
        </p> */}
        <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
          Copyright 2025 Central Research Laboratory, Bharat Electronics Ltd.
          All right reserved.
        </h4>
      </Card>
    </div>
  );
};

export default About;
