import React, { useState, useRef } from "react";
import { Card, Space, Tooltip, Button, theme, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import InputForm from "./InputForm";
import CrudTable from "./CrudTable";
import { instance } from "util/connection/axios";
import API_ENDPOINT_URL from "apiServices/API_ENDPOINT_URL";
import { fetchPlaybookDetails, addPlaybook } from "api/api";
import AddPlaybook from "./AddPlaybook";

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
            ...res.data,
          };
          setRowDetail(fullData);
        })
        .catch((err) => console.error("Error fetching playbook details:", err));
    } else {
      setRowDetail(null);
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
              playbook_id: flowData.playbookId,
              playbook_name: flowData.playbookname,
              mitreIds: flowData.mitreIds,
            };

            addPlaybook(payload)
              .then((res) => {
                if (res?.data?.success) {
                  childRef.current.reloadDataHandle();
                  message.success("Playbook Added Successfully!");
                  setModalVisible(false);
                  setModalComponent(null);
                } else {
                  message.error(res?.data?.message || "Mitre Id already mapped, Failed to add Playbook!");
                }
              })
              .catch((error) => {
                console.error(error);
                const errorMessage = error?.response?.data?.message || "Server Error: Failed to add Playbook!";
                message.error(errorMessage);
              })
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
    setButtonSpin(true);
    instance
      .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_DEL_USER, {
        playbook_id: row.playbook_id,
      })
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
              <Button
                type="primary"
                style={{ color: "white", borderColor: colorPrimary }}
                onClick={() => openModalHandler("ADD")}
              >
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

