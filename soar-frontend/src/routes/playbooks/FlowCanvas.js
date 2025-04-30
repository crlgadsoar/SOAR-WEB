import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const FlowCanvasInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    if (reactFlowInstance) {
      // Center of viewport in screen coordinates
      const centerScreen = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };

      // Convert screen coordinates to flow coordinates
      const centerFlow = reactFlowInstance.screenToFlowPosition(centerScreen);

      const initialNode = {
        id: '1',
        data: { label: 'SIEM Incident' },
        position: centerFlow,
        draggable: true,
      };

      setNodes([initialNode]);
    }
  }, [reactFlowInstance, setNodes]);

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
        data: { label: app.title },
        position,
        draggable: true,
        type: 'default',
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [nodes, setNodes, reactFlowInstance]
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
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
};

const FlowCanvasMain = () => (
  <ReactFlowProvider>
    <FlowCanvasInner />
  </ReactFlowProvider>
);

export default FlowCanvasMain;
