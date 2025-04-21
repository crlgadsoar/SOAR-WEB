import React, { useState, useRef } from "react";
import { Card, Space, Tooltip, Button, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import InputForm from "./InputForm";
import CrudTable from "./CrudTable";
import { instance } from "util/connection/axios";
import API_ENDPOINT_URL from "apiServices/API_ENDPOINT_URL";
import { fetchPlaybookDetails } from "api/api";

const Playbooks = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [rowDetail, setRowDetail] = useState(null);
  const [data, setData] = useState(null);
  const [buttonSpin, setButtonSpin] = useState(false);
  const childRef = useRef(null);
  const { displayMode } = useSelector((state) => state.themeConfig);
  const { authUser } = useSelector(({ auth }) => auth);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const openModalHandler = (value, row) => {
    setModalComponent(value);
    setModalVisible(true);
    setData(row);

    // if (row?.playbook_id) {
      fetchPlaybookDetails(row.playbook_id)
      .then((res) => setRowDetail(res.data))
      .catch((err) => console.error("Error fetching playbook details:", err));
    // }
  };

  const modalComponentRender = () => {
    if (modalComponent === "ADD" || modalComponent === "EDIT") {
      return (
        <InputForm
          title={modalComponent === "ADD" ? "Add Playbook" : "Playbook Details"}
          visible={modalVisible}
          buttonSpin={buttonSpin}
          onSubmit={onSubmit}
          onCancel={() => {
            setModalVisible(false);
            setModalComponent(null);
          }}
          type={modalComponent}
          initialValues={modalComponent === "EDIT" ? { ...rowDetail } : undefined}
        />
      ); 
    } 
    return null; 
  };

  const onSubmit = (values) => {
    setButtonSpin(true);
    let parsedValue = { ...values };

    Object.keys(parsedValue).forEach((key) => {
      if (parsedValue[key] === undefined) parsedValue[key] = null;
    });

    if (values.action === "ADD") {
      parsedValue = { ...values, createdBy: authUser.username, createdOn: "-1" };
      instance
        .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_ADD_USER, parsedValue)
        .then(() => {
          childRef.current.reloadDataHandle();
          setModalVisible(false);
        })
        .catch(console.error)
        .finally(() => setButtonSpin(false));
    } else if (values.action === "EDIT") {
      instance
        .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_SUBMIT_EDIT_USER, parsedValue)
        .then(() => {
          childRef.current.reloadDataHandle();
          setModalVisible(false);
        })
        .catch(console.error)
        .finally(() => setButtonSpin(false));
    }
  };
   
  const deleteData = (row) => {
    instance
      .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_DEL_USER, row)
      .then(() => childRef.current.reloadDataHandle())
      .catch(console.error)
      .finally(() => setButtonSpin(false));
  };

  return (
    <>
      <Card
        title="List of Playbooks"
        extra={
          <Space>
            <Tooltip title="Add" color={colorPrimary}>
              <Button type="primary" style={{ color: "white", borderColor: colorPrimary }} onClick={() => openModalHandler("ADD")}>
                <PlusOutlined style={{ fontSize: "15px" }} />
              </Button>
            </Tooltip>
          </Space>
        }
      >
        <CrudTable openModalHandler={openModalHandler} ref={childRef} deleteData={deleteData} />
      </Card>
      {modalComponentRender()}
    </>
  );
};

export default Playbooks;

