import React, { useState, useEffect, useRef } from "react";
import { Card, Space, Tooltip, Button, theme, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import CrudTable from "./CrudTable";
import AddPlaybook from "./AddPlaybook";
import WorkflowWindow from "./WorkflowWindow"; // Import the WorkflowWindow component
import { fetchApps } from "../../api/api"; // Import the fetchApps API

const Playbooks = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [workflowModalVisible, setWorkflowModalVisible] = useState(false); // State for workflow modal
  const [apps, setApps] = useState([]); // State for apps
  const [loadingApps, setLoadingApps] = useState(true); // State for loading apps
  const childRef = useRef(null);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  // Fetch apps when the component is mounted
  useEffect(() => {
    const fetchAvailableApps = async () => {
      try {
        const appsData = await fetchApps(); // Fetch apps using the API
        setApps(appsData); // Set the fetched apps
      } catch (error) {
        console.error("Failed to fetch apps:", error);
        message.error("Failed to load apps. Please try again.");
      } finally {
        setLoadingApps(false); // Stop the loading spinner
      }
    };

    fetchAvailableApps();
  }, []);

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
            <Tooltip title="Add Workflow" color={colorPrimary}>
              <Button
                type="primary"
                style={{ color: "white", borderColor: colorPrimary }}
                onClick={() => setWorkflowModalVisible(true)} // Open the workflow modal
              >
                <PlusOutlined style={{ fontSize: "15px" }} />
                Add Workflow
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

      {/* Workflow Window */}
      {loadingApps ? (
        <Spin size="large" />
      ) : (
        <WorkflowWindow
          visible={workflowModalVisible}
          onCancel={() => setWorkflowModalVisible(false)} // Close the workflow modal
          apps={apps} // Pass the fetched apps
        />
      )}
    </>
  );
};

export default Playbooks;

