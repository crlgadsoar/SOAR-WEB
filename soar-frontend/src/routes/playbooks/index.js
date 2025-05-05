import React, { useState, useEffect, useRef } from "react";
import { Card, Space, Tooltip, Button, theme, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import CrudTable from "./CrudTable";
import AddPlaybook from "./AddPlaybook";
import { fetchApps } from "../../api/api"; // Import the fetchApps API

const Playbooks = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalComponent, setModalComponent] = useState(null); // State for modal component
  const [apps, setApps] = useState([]); // State for apps
  const [loadingApps, setLoadingApps] = useState(true); // State for loading apps
  const childRef = useRef(null);
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
              playbook_id: flowData.playbookId,  // match AddPlaybook.js field
              playbook_name: flowData.playbookname,
              mitreIds: flowData.mitreIds,
            };
          
            addPlaybook(payload)
              .then((res) => {
              if (res?.data?.success) {
              childRef.current.reloadDataHandle(); // ✅ reload table
              message.success("Playbook Added Successfully!");
              setModalVisible(false); // ✅ close modal
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
            <Tooltip title="Add Playbook" color={colorPrimary}>
              <Button
                type="primary"
                style={{ color: "white", borderColor: colorPrimary }}
                onClick={() => setModalVisible(true)}
              >
                <PlusOutlined style={{ fontSize: "15px" }} />
              </Button>
            </Tooltip>
          </Space>
        }
      >
        <CrudTable ref={childRef} />
      </Card>

      {/* Add Playbook Modal */}
      {modalVisible && (
        <AddPlaybook
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
        />
      )}
    </>
  );
};

export default Playbooks;

