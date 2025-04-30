// WorkflowWindow.js
import React, { useState } from "react";
import { Modal, Button, Card, Space, message, Tooltip, Avatar } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import FlowCanvas from "./FlowCanvas"; // New file for the canvas

const WorkflowWindowContent = ({ visible, onCancel, apps }) => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  return (
    <Modal
      title="Create Workflow"
      open={visible}
      onCancel={onCancel}
      maskClosable={false}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() => {
            message.success("Workflow saved successfully!");
            onCancel();
            }}
          >
            Save Workflow
          </Button>,
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
              style={{ width: "100%", 
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
        <FlowCanvas
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
