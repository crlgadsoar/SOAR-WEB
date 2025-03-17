import React, { useEffect } from "react";
import { Card, Space, Tooltip, Button, theme } from "antd";
import CrudTable from "./CrudTable";
import { useSelector } from "react-redux";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const Home = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalComponent, setModalComponent] = React.useState(null);
  const [main, setMain] = React.useState(null);
  const { displayMode } = useSelector((state) => state.themeConfig);
  const childRef = React.useRef(null);
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  useEffect(() => {
    axios
      .get("http://localhost:5002/incidents")
      .then((response) => {
        setMain(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const openModalHandler = (value, row) => {
    console.log(row);
    setModalComponent(value);
    setModalVisible(true);
    setMain(row);
    row &&
      CommonService.getEditIncidentInfo(row.eventid)
        .then((res) => {
          setRowDetail(res.data);
        })
        .catch((err) => {
          console.log("err", err);
          return err;
        });
  };

  const modalComponentRender = () => {
    switch (modalComponent) {
      case "ADD":
        return (
          <InputForm
            title="Add Incident"
            visible={modalVisible}
            buttonSpin={buttonSpin}
            onSubmit={onSubmit}
            onCancel={() => {
              setModalVisible(false);
              setModalComponent(null);
            }}
            type="ADD"
          />
        );

      case "EDIT":
        return (
          <InputForm
            title={"Edit Incident details"}
            visible={modalVisible}
            buttonSpin={buttonSpin}
            onSubmit={onSubmit}
            onCancel={() => {
              setModalVisible(false);
              setModalComponent(null);
            }}
            eventId={data.eventId}
            type="EDIT"
            initialValues={{ ...rowDetail }}
          />
        );
      default:
        return null;
    }
  };

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const reset = () => {
    childRef.current.resetRefHandle();
  };

  return (
    <>
      <Card
        title="SIEM Input Data"
        extra={
          <Space>
            <Tooltip title="Reset" color="blue">
              <div
                style={{
                  float: "left",
                  marginRight: "5px",
                }}
              >
                {/* <Button
                  type="default"
                  onClick={reset}
                  style={{
                    borderColor: "#1677ff",
                    background: displayMode === "LIGHT" ? "white" : "#1677ff",
                    color: displayMode === "DARK" ? "white" : "#1677ff",
                  }}
                  className="openModal"
                >
                  <ReloadOutlined />
                </Button> */}
              </div>
            </Tooltip>
          </Space>
        }
      >
        <CrudTable
          openModalHandler={openModalHandler}
          ref={childRef}
          // deleteData={deleteData}
        />
      </Card>
      {modalComponentRender()}
    </>
  );
};

export default Home;
