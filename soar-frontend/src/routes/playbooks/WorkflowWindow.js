// WorkflowWindow.js
import React, { useState } from "react";
import { Modal, Button, Card, Space, message, Tooltip, Avatar, Input } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import FlowCanvasMain from "./FlowCanvas"; 
import { saveWorkflow } from "../../api/api"

const WorkflowWindowContent = ({ visible, onCancel, apps }) => {
  const [workflowName, setWorkflowName] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleSaveWorkflow = async () => {
    try {
      const workflow = {
        name: workflowName,
        nodes,
        edges,
        created_at: new Date().toISOString(),
      };
      console.log("Saving workflow:", workflow);
      await saveWorkflow(workflow);
      message.success("Workflow saved successfully!");
      onCancel();
    } catch (error) {
      message.error("Failed to save workflow.");
    }
  };

  return (
    <Modal
      title="Create Workflow"
      open={visible}
      onCancel={onCancel}
      maskClosable={false}
      footer={[
        <div key="name-input" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", flex: 1 }}>
          <Input
            placeholder="Workflow Name"
            value={workflowName}
            onChange={e => setWorkflowName(e.target.value)}
            style={{ marginRight: 16, width: 200 }}
          />
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleSaveWorkflow}
            disabled={!workflowName.trim()} // Disable save button if workflow name is empty
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
