import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import FlowCanvasMain from "./FlowCanvas";
import { colours } from "./constants";

// Legend component
const StatusLegend = () => (
  <div className="flow-status-legend">
    <span>
      <span className="flow-status-box" style={{ background: colours.nodeColourSuccess, border: "1px solid #b7eb8f" }} />
      Success
    </span>
    <span>
      <span className="flow-status-box" style={{ background: colours.nodeColourFailure, border: "1px solid #ffa39e" }} />
      Failed
    </span>
    <span>
      <span className="flow-status-box" style={{ background: colours.nodeColourNotExecuted, border: "1px solid #d9d9d9" }} />
      Not Executed
    </span>
  </div>
);

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
    // eslint-disable-next-line
  }, [workflow]);

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>{workflowName}</span>
            <StatusLegend />
        </div>
      }
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
          <FlowCanvasMain
            nodes={nodes}
            setNodes={() => { }} // No-op
            edges={edges}
            setEdges={() => { }} // No-op
            results={results}
            readOnly={true}
          />
        </div>
      </div>
    </Modal>
  );
};

export default WorkflowWindowReadOnly;