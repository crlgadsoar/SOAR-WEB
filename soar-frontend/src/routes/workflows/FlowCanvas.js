import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  MarkerType,
  ReactFlowProvider,
  Handle,
  Position,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node with Delete Button (cross at top right)
const DeletableNode = ({ id, data, selected }) => {
  const onDelete = (e) => {
    e.stopPropagation();
    if (data.onDelete) data.onDelete(id);
  };

  return (
    <div
      style={{
        border: selected ? '2px solid #1890ff' : '1px solid #d9d9d9',
        borderRadius: 6,
        background: "#fff",
        padding: "10px 16px",
        minWidth: 120,
        minHeight: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px #f0f1f2",
        fontWeight: 500,
        position: "relative",
      }}
    >
      <span>{data.label}</span>
      <button
        style={{
          position: "absolute",
          top: -8,
          right: -8,
          background: "#ff4d4f",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          width: 20,
          height: 20,
          lineHeight: "16px",
          padding: 0,
          fontWeight: "bold",
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onDelete}
        title="Delete Node"
      >
        ×
      </button>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = {
  deletable: DeletableNode,
};

const FlowCanvasInner = ({ nodes, setNodes, edges, setEdges }) => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Node delete handler
  const handleDeleteNode = useCallback(
    (id) => setNodes((nds) => nds.filter((n) => n.id !== id)),
    [setNodes]
  );

  useEffect(() => {
    if (reactFlowInstance && nodes.length === 0) {
      const centerScreen = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      const centerFlow = reactFlowInstance.screenToFlowPosition(centerScreen);

      const initialNode = {
        id: '1',
        data: { label: 'SIEM Incident', onDelete: handleDeleteNode },
        position: centerFlow,
        draggable: true,
        type: 'deletable',
      };

      setNodes([initialNode]);
    }
  }, [reactFlowInstance, setNodes, handleDeleteNode, nodes.length]);

  const onInit = (instance) => {
    setReactFlowInstance(instance);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const app = JSON.parse(event.dataTransfer.getData('app'));
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${app.id}-${nodes.length}`,
        data: { label: app.title, onDelete: handleDeleteNode },
        position,
        draggable: true,
        type: 'deletable',
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, setNodes, reactFlowInstance, handleDeleteNode]
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.Arrow },
            style: { strokeWidth: 4 },
          },
          eds
        )
      ),
    [setEdges]
  );

  // FIX: Use applyNodeChanges/applyEdgeChanges
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()}
        onInit={onInit}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
  );
};

const FlowCanvasMain = ({ nodes, setNodes, edges, setEdges }) => (
  <ReactFlowProvider>
    <FlowCanvasInner
      nodes={nodes}
      setNodes={setNodes}
      edges={edges}
      setEdges={setEdges}
    />
  </ReactFlowProvider>
);

export default FlowCanvasMain;