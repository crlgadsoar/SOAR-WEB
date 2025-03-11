import React from "react";
import { Col, Row } from "antd";
import Widget from "components/Widget";
import AboutItem from "./AboutItem";
import moment from "moment";
import {
  ShopOutlined,
  HeartOutlined,
  PhoneOutlined,
  CalendarOutlined,
  BookOutlined,
  HolderOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";
function maskCharacterFunc(string, mask, n = 1) {
  return (
    ("" + string).slice(0, -n).replace(/./g, mask) + ("" + string).slice(-n)
  );
}
const About = ({
  dob,
  doj,
  yrOfExperience,
  contactNo,
  orgRole,
  govtIdType,
  govtIdNo,
}) => {
  const aboutData = [
    {
      id: 1,
      title: "Works at",
      iconComponent: <ShopOutlined />,
      userList: "",
      desc: "SPLUNK_SOAR",
    },
    {
      id: 2,
      title: "Date Of Birth",
      iconComponent: <HeartOutlined />,

      userList: "",
      desc: maskCharacterFunc(moment(dob).format("DD-MM-YYYY"), "*", 2),
    },
    {
      id: 3,
      title: "Date Of Joining",
      iconComponent: <CalendarOutlined />,

      userList: "",
      desc: maskCharacterFunc(moment(doj).format("DD-MM-YYYY"), "*", 2),
    },
    {
      id: 3,
      title: "Experience",
      iconComponent: <BookOutlined />,
      userList: "",
      desc: yrOfExperience,
      // === "0" ? "NA" : yrOfExperience,
    },
    {
      id: 4,
      title: "Govt Id No.",
      iconComponent: <HolderOutlined />,
      desc: maskCharacterFunc(govtIdNo, "*", 2),
    },
    {
      id: 5,
      title: "Govt Id Type",
      iconComponent: <IdcardOutlined />,
      userList: "",
      desc: govtIdType,
    },
    {
      id: 6,
      title: "OrgRole",
      iconComponent: <UserOutlined />,
      userList: "",
      desc: orgRole,
    },
    {
      id: 7,
      title: "Contact Number",
      iconComponent: <PhoneOutlined />,
      userList: "",
      desc: contactNo,
    },
  ];
  return (
    <Widget
      title={"Personal Info"}
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        marginTop: "-35px",
        marginLeft: "25px",
        marginRight: "15px",
      }}
    >
      <Row>
        {aboutData.map((about, index) => (
          <Col key={index} xl={8} lg={12} md={12} sm={12} xs={24}>
            <AboutItem data={about} />
          </Col>
        ))}
      </Row>
    </Widget>
  );
};

export default About;
