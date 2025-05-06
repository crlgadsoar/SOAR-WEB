import React, { useEffect, useState } from "react";
import { Card, List, Spin, Typography, message, Popconfirm, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { getWorkflows, fetchApps, deleteWorkflow, fetchAppActions } from "../../api/api";
import WorkflowWindow from "./WorkflowWindow";
import "./style.css"

const { Title, Text } = Typography;

const WorkflowsList = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workflowModalVisible, setWorkflowModalVisible] = useState(false);
  const [apps, setApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  // Fetch workflows from API
  const fetchWorkflowsData = async () => {
    setLoading(true);
    try {
      const data = await getWorkflows();
      setWorkflows(data);
    } catch (error) {
      message.error("Failed to load workflows");
    } finally {
      setLoading(false);
    }
  };

  // Fetch apps and their actions
  const fetchAppsWithActions = async () => {
    try {
      const appsData = await fetchApps();
      // For each app, fetch its actions and attach to the app object
      const appsWithActions = await Promise.all(
        appsData.map(async (app) => {
          try {
            const actions = await fetchAppActions(app.id);
            return { ...app, actions };
          } catch {
            return { ...app, actions: [] };
          }
        })
      );
      setApps(appsWithActions);
    } catch (error) {
      message.error("Failed to load apps for workflow creation.");
    } finally {
      setLoadingApps(false);
    }
  };

  useEffect(() => {
    fetchWorkflowsData();
    fetchAppsWithActions();
  }, []);

  // Insert the "Create Workflow" card as the first item in the list
  const workflowsWithCreate = [
    { isCreateCard: true },
    ...workflows
  ];

  // Delete workflow handler
  const handleDeleteWorkflow = async (workflowId) => {
    try {
      await deleteWorkflow(workflowId);
      message.success("Workflow deleted successfully");
      fetchWorkflowsData(); // Reload workflows from API after deletion
    } catch (error) {
      message.error("Failed to delete workflow");
    }
  };

  // When workflow modal closes, reload workflows if a workflow was created/edited
  const handleWorkflowModalClose = (shouldReload = false) => {
    setWorkflowModalVisible(false);
    setSelectedWorkflow(null);
    if (shouldReload) {
      fetchWorkflowsData();
    }
  };

  return (
    <div className="workflows-container">
      <Title level={2}>Available Workflows</Title>
      {loading ? (
        <Spin />
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 6,
          }}
          dataSource={workflowsWithCreate}
          renderItem={workflow => {
            if (workflow.isCreateCard) {
              return (
                <List.Item>
                  <Card
                    className="workflow-card create-workflow-card"
                    onClick={() => {
                      setSelectedWorkflow(null);
                      setWorkflowModalVisible(true);
                    }}
                    hoverable
                  >
                    <PlusOutlined style={{ fontSize: 22, marginRight: 8 }} />
                    Create Workflow
                  </Card>
                </List.Item>
              );
            }
            let appSet = new Set();
            if (Array.isArray(workflow.nodes)) {
              workflow.nodes.forEach(node => {
                if (
                  node.data &&
                  node.data.label &&
                  node.data.label !== "SIEM Incident"
                ) {
                  appSet.add(node.data.label);
                }
              });
            }
            return (
              <List.Item>
                <Card
                  title={workflow.name}
                  size="small"
                  className="workflow-card"
                  headStyle={{ fontSize: 16, textAlign: "center", padding: "8px 0" }}
                  bodyStyle={{ padding: "10px 16px" }}
                  hoverable
                  onClick={() => {
                    setSelectedWorkflow(workflow);
                    setWorkflowModalVisible(true);
                  }}
                >
                  <Text type="secondary" className="workflow-created">
                    Created: {new Date(workflow.created_at).toLocaleString()}
                  </Text>
                  <br />
                  <div className="workflow-card-bottom">
                    <Text className="workflow-apps-used">
                      Apps Used: {appSet.size}
                    </Text>
                    <Popconfirm
                      title="Delete this workflow?"
                      description="Are you sure you want to delete this workflow?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={e => {
                        e?.stopPropagation();
                        handleDeleteWorkflow(workflow.id);
                      }}
                      onCancel={e => e?.stopPropagation()}
                      onClick={e => e.stopPropagation()}
                    >
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={e => e.stopPropagation()}
                      />
                    </Popconfirm>
                  </div>
                </Card>
              </List.Item>
            );
          }}
        />
      )}
      {/* Workflow Creation/Editing Modal */}
      {workflowModalVisible && !loadingApps && (
        <WorkflowWindow
          visible={workflowModalVisible}
          onCancel={() => handleWorkflowModalClose(true)}
          apps={apps}
          workflow={selectedWorkflow}
        />
      )}
    </div>
  );
};

export default WorkflowsList;