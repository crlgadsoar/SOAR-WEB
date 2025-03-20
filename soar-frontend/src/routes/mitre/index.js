import React from "react";
import { Card, Space, Tooltip, Button, theme } from "antd";
import CrudTable from "./CrudTable";
import { useSelector } from "react-redux";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";

const Mitre = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalComponent, setModalComponent] = React.useState(null);
  const [data, setData] = React.useState(null);
  const { displayMode } = useSelector((state) => state.themeConfig);
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  const openModalHandler = (value, row) => {
    console.log(row);
    setModalComponent(value);
    setModalVisible(true);
    setData(row);
    row &&
      CommonService.getEditUserInfo(row.username)
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
            title="Add Playbook"
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
            title={"Edit Playbook details"}
            visible={modalVisible}
            buttonSpin={buttonSpin}
            onSubmit={onSubmit}
            onCancel={() => {
              setModalVisible(false);
              setModalComponent(null);
            }}
            staffId={data.staffId}
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
  title={
    <div style={{ textAlign: "center", width: "100%" }}>
      <span style={{ fontWeight: "bold" }}>MITRE ATT&CK Matrix </span>
    </div>
  }
  extra={
    <Space>
      <Tooltip title="Reset Table" color="blue">
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
          // ref={childRef}
          // deleteData={deleteData}
        />
      </Card>
      {modalComponentRender()}
    </>
  );
};

export default Mitre;
