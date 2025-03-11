import React from "react";
import Widget from "components/Widget";
import {
  WhatsAppOutlined,
  MobileOutlined,
  SwitcherOutlined,
  SoundOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
function maskCharacterFunc(string, mask, n = 1) {
  return (
    ("" + string).slice(0, -n).replace(/./g, mask) + ("" + string).slice(-n)
  );
}

const Contact = ({ emailId, mobileNo }) => {
  const contactList = [
    {
      id: 1,
      title: "Email",
      iconComponent: <MailOutlined />,
      desc: [
        <span className="gx-link" key={1}>
          {emailId}
        </span>,
      ],
    },
    {
      id: 2,
      title: "WhatsApp",
      iconComponent: <WhatsAppOutlined />,
      desc: "578390000874",
    },
    {
      id: 3,
      title: "Fax",
      iconComponent: <SwitcherOutlined />,
      desc: "f6378",
    },
    {
      id: 4,
      title: "Extension Number",
      iconComponent: <SoundOutlined />,
      desc: "232",
    },
    {
      id: 5,
      title: "Landline",
      iconComponent: <PhoneOutlined />,
      desc: "32094",
    },
    {
      id: 6,
      title: "Mobile Number",
      iconComponent: <MobileOutlined />,
      desc: maskCharacterFunc(mobileNo, "*", 4),
    },
  ];
  return (
    <Widget
      title="Contact"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        marginTop: "-35px",
        marginRight: "25px",
        marginLeft: "15px",
      }}
    >
      {contactList.map((data, index) => (
        <div key={index} style={{ marginLeft: "20px" }}>
          <Space>
            <div style={{ marginTop: "-28px" }}>{data.iconComponent}</div>
            <div>
              <h5 style={{ color: "gray" }}>{data.title}</h5>
              <p className="gx-mb-0">{data.desc}</p>
            </div>
          </Space>
        </div>
      ))}
    </Widget>
  );
};

export default Contact;
