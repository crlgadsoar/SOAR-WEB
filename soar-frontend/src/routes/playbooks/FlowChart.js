// FlowChart.js
import React, { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const nodeStyle = {
  borderRadius: 6,
  padding: 10,
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
};

const FlowChart = ({ visible, playbookData = {} }) => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    source = "base64_decode",
    utility = "regex_extract_ipv4",
    action = "ip reputation",
    format = "format 1",
    ip = "add ip",
    port = "port no",
  } = playbookData;

  const dynamicNodes = [
    {
      id: "start",
      type: "input",
      data: { label: "Start" },
      position: { x: 250, y: 0 },
      style: { ...nodeStyle, background: "#2f2f2f" },
    },
    {
      id: "source",
      data: { label: `SOURCE\n${source}` },
      position: { x: 250, y: 80 },
      style: { ...nodeStyle, background: "#1000ff" },
    },
    {
      id: "utility",
      data: { label: `UTILITY\n${utility}` },
      position: { x: 250, y: 160 },
      style: { ...nodeStyle, background: "#8000ff" },
    },
    {
      id: "action",
      data: { label: `ACTION\n${action}` },
      position: { x: 250, y: 240 },
      style: { ...nodeStyle, background: "#00c781" },
    },    
    {
      id: "format",
      data: { label: `FORMAT\n${format}` },
      position: { x: 250, y: 320 },
      style: { ...nodeStyle, background: "#ff5555", border: "2px solid orange" },
    },
    {
      id: "ip",
      data: { label: `IP\n${ip}` },
      position: { x: 100, y: 420 },
      style: { ...nodeStyle, background: "#8000ff" },
    },
    {
      id: "portno",
      data: { label: `PORT\n${port}` },
      position: { x: 400, y: 420 },
      style: { ...nodeStyle, background: "#00c781", border: "2px solid orange" },
    },
    {
      id: "end",
      type: "output",
      data: { label: "End" },
      position: { x: 250, y: 540 },
      style: { ...nodeStyle, background: "#2f2f2f" },
    },
  ];

  const edges = [
    { id: "e1", source: "start", target: "source", animated: true },
    { id: "e2", source: "source", target: "utility", animated: true },
    { id: "e3", source: "utility", target: "action", animated: true },
    { id: "e4", source: "action", target: "format", animated: true },
    { id: "e5", source: "format", target: "ip", animated: true },
    { id: "e6", source: "format", target: "portno", animated: true },
    { id: "e7", source: "ip", target: "end", animated: true },
    { id: "e8", source: "portno", target: "end", animated: true },
  ];

  useEffect(() => {
    if (visible && reactFlowInstance) {
      reactFlowInstance.fitView();
    }
  }, [visible, reactFlowInstance]);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <ReactFlow
        nodes={dynamicNodes}
        edges={edges}
        onInit={setReactFlowInstance}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};


export default FlowChart;


