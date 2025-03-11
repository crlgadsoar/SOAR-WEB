import React from "react";
import { Image, Row, Col, Card } from "antd";

const ProfileHeader = ({
  name,
  gender,
  emailId,
  role,
  nationality,
  city,
  designation,
  userName,
}) => {
  const [imageVisible, setImageVisible] = React.useState(false);

  return (
    <Card
      style={{
        backgroundColor: "#1d9ed8",
        height: "225px",
        color: "white",
      }}
    >
      <Row>
        <Col md={3} style={{ textAlign: "center" }}>
          <Image
            src={require("assets/images/Bharat-Electronics.png")}
            width={"105px"}
            height={"100px"}
            preview={{
              visible: imageVisible,
              src: require("../../../../assets/images/Bharat-Electronics.png"),
              onVisibleChange: (value) => {
                setImageVisible(value);
              },
            }}
            alt="&nbsp;"
          />
        </Col>
        <Col md={13} style={{ textAlign: "left", marginTop: "10px" }}>
          <div className="gx-profile-banner-avatar-info">
            <h2 style={{ fontWeight: "bold" }}>
              {name}
              <span>&nbsp;&nbsp;({userName})</span>
            </h2>
            <div
              style={{
                textAlign: "left",
              }}
            >
              {" "}
              <p style={{ marginBottom: "0px" }}>{designation}</p>
              <p style={{ marginBottom: "0px" }}>{emailId}</p>
              <p style={{ marginBottom: "0px" }}>
                {city} {"INDIA"}
              </p>
            </div>
          </div>
        </Col>
        <Col md={8} style={{ paddingTop: "40px" }}>
          <div>
            <Row>
              <Col
                md={8}
                style={{
                  textAlign: "center",
                  borderRight: "2px solid rgb(230, 230, 230)",
                  height: " 45px",
                }}
              >
                <p style={{ marginBottom: "0px" }}>SysRole</p>
                <h4>{role}</h4>
              </Col>
              <Col
                md={8}
                style={{
                  textAlign: "center",
                  borderRight: "2px solid rgb(230, 230, 230)",
                  height: " 45px",
                }}
              >
                <p style={{ marginBottom: "0px" }}>Gender</p>
                <h4>{gender}</h4>
              </Col>
              <Col md={8} style={{ textAlign: "center" }}>
                <p style={{ marginBottom: "0px" }}>Nationality</p>
                <h4>{nationality}</h4>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileHeader;
