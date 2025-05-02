import React, { useEffect, useState } from "react";
import { Card, List, Spin, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getWorkflows, fetchApps } from "../../api/api";
import WorkflowWindow from "./WorkflowWindow";
import "./style.css"

const { Title, Text } = Typography;

const WorkflowsList = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workflowModalVisible, setWorkflowModalVisible] = useState(false);
  const [apps, setApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);

  useEffect(() => {
    const fetchWorkflowsData = async () => {
      try {
        const data = await getWorkflows();
        setWorkflows(data);
      } catch (error) {
        message.error("Failed to load workflows");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkflowsData();
  }, []);

  useEffect(() => {
    const fetchAvailableApps = async () => {
      try {
        const appsData = await fetchApps();
        setApps(appsData);
      } catch (error) {
        message.error("Failed to load apps for workflow creation.");
      } finally {
        setLoadingApps(false);
      }
    };
    if (workflowModalVisible) fetchAvailableApps();
  }, [workflowModalVisible]);

  // Insert the "Create Workflow" card as the first item in the list
  const workflowsWithCreate = [
    { isCreateCard: true },
    ...workflows
  ];

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
                    onClick={() => setWorkflowModalVisible(true)}
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
                >
                  <Text type="secondary" className="workflow-created">
                    Created: {new Date(workflow.created_at).toLocaleString()}
                  </Text>
                  <br />
                  <Text className="workflow-apps-used">
                    Apps Used: {appSet.size}
                  </Text>
                </Card>
              </List.Item>
            );
          }}
        />
      )}
      {/* Workflow Creation Modal */}
      {workflowModalVisible && !loadingApps && (
        <WorkflowWindow
          visible={workflowModalVisible}
          onCancel={() => setWorkflowModalVisible(false)}
          apps={apps}
        />
      )}
    </div>
  );
};

export default WorkflowsList;