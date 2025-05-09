import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import FlowCanvasMain from "./FlowCanvas";

const WorkflowWindowReadOnly = ({ visible, onCancel, apps, workflow }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [workflowName, setWorkflowName] = useState("");
  const [results, setResults] = useState({});

  useEffect(() => {
    if (workflow) {
      setWorkflowName(workflow.name || "");
      setNodes(workflow.nodes || []);
      setEdges(workflow.edges || []);
      setResults(workflow.results || {});
    } else {
      setWorkflowName("");
      setNodes([]);
      setEdges([]);
      setResults({});
    }
    console.log("Workflow results data:", workflow.results);
  }, [workflow]);

  return (
    <Modal
      title="Workflow (Read Only)"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      style={{ margin: "auto" }}
      bodyStyle={{ height: "80vh", padding: 0 }}
      width="100%"
      maskClosable
    >
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: "100%", padding: "16px" }}>
          <Input
            value={workflowName}
            disabled
            style={{ marginBottom: 16, width: 300 }}
            placeholder="Workflow Name"
          />
          <FlowCanvasMain
            nodes={nodes}
            setNodes={() => {}} // No-op
            edges={edges}
            setEdges={() => {}} // No-op
            results={results} // Pass results here
            readOnly={true} // Optional: pass a flag for read-only mode
          />
        </div>
      </div>
    </Modal>
  );
};

export default WorkflowWindowReadOnly;