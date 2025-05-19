import React, { useState, useRef, useEffect } from "react";
import { Card, Space, Tooltip, Button, theme, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import InputForm from "./InputForm";
import CrudTable from "./CrudTable";
import { instance } from "util/connection/axios";
import API_ENDPOINT_URL from "apiServices/API_ENDPOINT_URL";
import { addPlaybook, getWorkflows, editPlaybook } from "api/api";
import AddPlaybook from "./AddPlaybook";
import WorkflowWindowReadOnly from "routes/workflows/WorkflowWindowReadOnly";

const Playbooks = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [rowDetail, setRowDetail] = useState(null);
  const [data, setData] = useState(null);
  const [buttonSpin, setButtonSpin] = useState(false);
  const [readOnlyWorkflow, setReadOnlyWorkflow] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const [addPlaybookMode, setAddPlaybookMode] = useState("add"); // 'add' | 'view' | 'edit'
  const childRef = useRef(null);
  const { displayMode } = useSelector((state) => state.themeConfig);
  const { authUser } = useSelector(({ auth }) => auth);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    getWorkflows().then(setWorkflows).catch(() => setWorkflows([]));
  }, []);

  const openModalHandler = (value, row) => {
    // value: "ADD" | "EDIT"
    if (value === "ADD") {
      setAddPlaybookMode("add");
      setRowDetail(null);
      setModalComponent("ADD");
      setModalVisible(true);
      return;
    }
    if (value === "EDIT") {
      setAddPlaybookMode("view");
      setModalComponent("EDIT");
      setModalVisible(true);
      setRowDetail(row); // Only pass row, not full details
      return;
    }
  };

  // Handler to switch to edit mode from view mode inside AddPlaybook
  const handleEditMode = () => {
    setAddPlaybookMode("edit");
  };

  const modalComponentRender = () => {
    if (modalComponent === "ADD") {
      return (
        <AddPlaybook
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setModalComponent(null);
            setAddPlaybookMode("add");
          }}
          onSubmit={(flowData) => {
            setButtonSpin(true);
            const payload = {
              playbook_id: flowData.playbookId,
              playbook_name: flowData.playbookname,
              playbook_description: flowData.playbookDescription,
              mitreIds: flowData.mitreIds,
              workflow_ids: flowData.workflowIds,
            };

            addPlaybook(payload)
              .then((res) => {
                if (res?.data?.success) {
                  childRef.current.reloadDataHandle();
                  message.success("Playbook Added Successfully!");
                  setModalVisible(false);
                  setModalComponent(null);
                  setAddPlaybookMode("add");
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
          mode="add"
        />
      );
    }

    if (modalComponent === "EDIT") {
      return (
        <AddPlaybook
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setModalComponent(null);
            setAddPlaybookMode("add");
          }}
          onSubmit={async (flowData) => {
            setButtonSpin(true);
            const payload = {
              playbook_id: flowData.playbookId,
              playbook_name: flowData.playbookname,
              playbook_description: flowData.playbookDescription,
              mitreIds: flowData.mitreIds,
              workflow_ids: flowData.workflowIds,
            };
            const res = await editPlaybook(flowData.playbookId, payload);
            if (res?.data?.success) {
              childRef.current.reloadDataHandle();
              message.success("Playbook Updated Successfully!");
              setModalVisible(false);
              setModalComponent(null);
              setAddPlaybookMode("add");
            } else {
              message.error(res?.data?.message || "Failed to update Playbook!");
            }
            setButtonSpin(false);
          }}
          initialValues={rowDetail}
          mode={addPlaybookMode}
          onEditMode={handleEditMode}
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
      {readOnlyWorkflow && (
        <WorkflowWindowReadOnly
          visible={!!readOnlyWorkflow}
          onCancel={() => setReadOnlyWorkflow(null)}
          workflow={readOnlyWorkflow}
        />
      )}
    </>
  );
};

export default Playbooks;

