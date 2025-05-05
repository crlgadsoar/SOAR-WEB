// WorkflowWindow.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Space, message, Tooltip, Avatar, Input } from "antd";
import { LeftOutlined, RightOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import FlowCanvasMain from "./FlowCanvas";
import { saveWorkflow } from "../../api/api";

const { confirm } = Modal;

const WorkflowWindowContent = ({ visible, onCancel, apps, workflow }) => {
  const [workflowName, setWorkflowName] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (workflow) {
      setWorkflowName(workflow.name || "");
      setNodes(workflow.nodes || []);
      setEdges(workflow.edges || []);
    } else {
      setWorkflowName("");
      setNodes([]);
      setEdges([]);
    }
  }, [workflow]);

  // Clear all workflow variables
  const clearWorkflow = () => {
    setWorkflowName("");
    setSelectedApp(null);
    setNodes([]);
    setEdges([]);
  };

  // Show confirmation before closing
  const handleCancel = () => {
    confirm({
      title: "Are you sure you want to close the workflow window?",
      icon: <ExclamationCircleOutlined />,
      content: "All unsaved changes will be lost.",
      okText: "Yes",
      cancelText: "No",
      centered: true,
      onOk() {
        clearWorkflow();
        onCancel();
      },
    });
  };

  const handleSaveWorkflow = async () => {
    try {
      const workflowToSave = {
        name: workflowName,
        nodes,
        edges,
        created_at: workflow?.created_at || new Date().toISOString(),
      };
      // If editing, include the id
      if (workflow && workflow.id) {
        workflowToSave.id = workflow.id;
      }
      await saveWorkflow(workflowToSave); // Your API should handle create or update based on id
      message.success(workflow && workflow.id ? "Workflow updated successfully!" : "Workflow saved successfully!");
      clearWorkflow();
      onCancel(true); // Pass true to reload workflows
    } catch (error) {
      message.error("Failed to save workflow.");
    }
  };

  return (
    <Modal
      title="Create Workflow"
      open={visible}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <div key="name-input" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flex: 1 }}>
          <Input
            placeholder="Workflow Name"
            value={workflowName}
            onChange={e => setWorkflowName(e.target.value)}
            style={{ marginRight: 16, width: 200 }}
          />
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleSaveWorkflow}
            disabled={!workflowName.trim()}
          >
            Save Workflow
          </Button>
        </div>
      ]}
      centered
      style={{ margin: "auto" }}
      bodyStyle={{ height: "80vh", padding: 0 }}
      width="100%"
    >
      <div style={{ display: "flex", height: "100%" }}>
        {/* Left: Apps List */}
        {!isCollapsed && (
          <div
            style={{
              width: "300px",
              borderRight: "1px solid #f0f0f0",
              paddingRight: "5px",
            }}
          >
            <h3>Available Apps</h3>
            <Space
              direction="vertical"
              style={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                scrollbarWidth: "thin",
                msOverflowStyle: "none",
              }}
            >
              {apps.map((app) => (
                <Tooltip title={app.description} placement="right" key={app.id}>
                  <Card
                    hoverable
                    draggable
                    onDragStart={(event) =>
                      event.dataTransfer.setData("app", JSON.stringify(app))
                    }
                    onClick={() => setSelectedApp(app)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedApp?.id === app.id ? "#e6f7ff" : "white",
                      borderColor:
                        selectedApp?.id === app.id ? "#1890ff" : "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      height: "50px",
                      padding: "0 10px",
                      marginRight: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Avatar src={app.logo} alt={`${app.title} icon`} />
                      <div>{app.title}</div>
                    </div>
                  </Card>
                </Tooltip>
              ))}
            </Space>
          </div>
        )}

        {/* Collapse/Expand Arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20px",
            height: "40px",
            cursor: "pointer",
            borderRight: "1px solid #d9d9d9",
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <RightOutlined /> : <LeftOutlined />}
        </div>

        {/* Right: Workflow Canvas */}
        <FlowCanvasMain
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
        />
      </div>
    </Modal>
  );
};

export default WorkflowWindowContent;
