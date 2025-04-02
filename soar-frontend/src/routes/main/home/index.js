import React, { useEffect } from "react";
import { Card, Space, Tooltip, Button, theme } from "antd";
import CrudTable from "./CrudTable";
import { useSelector } from "react-redux";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

// Configure axios to include cookies in all requests
axios.defaults.withCredentials = true;

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
  }, []); // Add an empty dependency array to avoid repeated calls

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
        <CrudTable
          openModalHandler={openModalHandler}
          ref={childRef}
          // deleteData={deleteData}
        />
      {modalComponentRender()}
    </>
  );
};

export default Home;
