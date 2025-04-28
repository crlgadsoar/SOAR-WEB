import React, { useState, useRef } from "react";
import { Card, Space, Tooltip, Button, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import InputForm from "./InputForm";
import CrudTable from "./CrudTable";
import { instance } from "util/connection/axios";
import API_ENDPOINT_URL from "apiServices/API_ENDPOINT_URL";
import { fetchPlaybookDetails, addPlaybook } from "api/api";
import AddPlaybook from "./AddPlaybook";
import { message } from "antd";


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

    if (row?.playbook_id) {
      fetchPlaybookDetails(row.playbook_id)
        .then((res) => {
          const fullData = {
            ...row,
            ...res.data, // in case API gives more data like 'source', 'utility' etc
          };
          setRowDetail(fullData);
        })
        .catch((err) => console.error("Error fetching playbook details:", err));
    }    
  };

  const modalComponentRender = () => {
    if (modalComponent === "ADD") {
      return (
        <AddPlaybook
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setModalComponent(null);
          }}
          onSubmit={(flowData) => {
            setButtonSpin(true);
            const payload = {
              source: flowData.source,
              utility: flowData.utility,
              action: flowData.action,
              format: flowData.format,
              ip: flowData.ip,
              port: flowData.port,
              playbook_id: flowData.playbookId,  // ✅ fixed to match form field
              playbook_name: flowData.playbookname,
              mitreIds: flowData.mitreIds,
            };            
  
            addPlaybook(payload) // ✅ using your API helper function
            .then(() => {
            childRef.current.reloadDataHandle();
            setModalVisible(false);
            setModalComponent(null);
            message.success("Playbook Added");
            })
            .catch(console.error)
            .finally(() => setButtonSpin(false));
          }}
        />
      );
    }
  
    if (modalComponent === "EDIT") {
      return (
        <InputForm
          title="Playbook Details"
          visible={modalVisible}
          buttonSpin={buttonSpin}
          onSubmit={onSubmit}
          onCancel={() => {
            setModalVisible(false);
            setModalComponent(null);
          }}
          type={modalComponent}
          initialValues={rowDetail}
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
      .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_DEL_USER, {
        playbook_id: row.playbook_id, // ✅ this is correct
      })
      .then(() => childRef.current.reloadDataHandle())
      .catch(console.error)
      .finally(() => setButtonSpin(false));
  };
  
  console.log(modalComponent, modalVisible)
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

