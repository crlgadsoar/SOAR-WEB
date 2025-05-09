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
  getBezierPath,
  BaseEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './style.css';
import { CloseOutlined, DownOutlined, LinkOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Modal, Popover } from "antd";
import KeyValueMapper from './KeyValueMapper';

const FlowCanvasInner = ({ nodes, setNodes, edges, setEdges }) => {
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [mapperModal, setMapperModal] = useState({ visible: false, edgeId: null });
  const [mapperPopover, setMapperPopover] = useState({ visible: false, edgeId: null });
  
  // Custom Node with Delete Button (cross at top right) and Actions Dropdown at bottom right
  const DeletableNode = ({ id, data, selected, setNodes }) => {
    const onDelete = (e) => {
      e.stopPropagation();
      handleDeleteNode(id); 
    };
  
    // Handler to fetch actions when dropdown is clicked
    const handleDropdownClick = async (e) => {
      e.stopPropagation();
    };
  
    const actions = data.actions || [];
    const selectedAction = data.selectedAction || null;
  
    // Highlight selected action and update node data on selection
    const onAction = (nodeId, action) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  selectedAction: action, // Save selected action in node data
                },
              }
            : node
        )
      );
    };
  
    const menu = (
      <Menu>
        {actions.length > 0 ? (
          actions.map((action, idx) => (
            <Menu.Item
              key={idx}
              onClick={() => onAction(id, action)}
              style={{
                fontSize: "12px",
                fontWeight:
                  selectedAction &&
                  ((action.action_name && selectedAction.action_name === action.action_name) ||
                    action === selectedAction)
                    ? "bold"
                    : "normal",
                background:
                  selectedAction &&
                  ((action.action_name && selectedAction.action_name === action.action_name) ||
                    action === selectedAction)
                    ? "#e6f7ff"
                    : undefined,
              }}
            >
              {action.action_name || action}
              {selectedAction &&
                ((action.action_name && selectedAction.action_name === action.action_name) ||
                  action === selectedAction) && (
                  <span style={{ color: "#1890ff", marginLeft: 6 }}>✔</span>
                )}
            </Menu.Item>
          ))
        ) : (
          <Menu.Item disabled style={{ fontSize: "12px" }}>
            No Actions
          </Menu.Item>
        )}
      </Menu>
    );
  
    return (
      <div className={`flow-node${selected ? " flow-node-selected" : ""}`}>
        <span>{data.label}</span>
        <button
          className="flow-node-delete-btn"
          onClick={onDelete}
          title="Delete Node"
        >
          ×
        </button>
        {/* Dropdown at bottom right */}
        <div className="flow-node-action-dropdown">
          <Dropdown
            overlay={menu}
            trigger={['click']}
            getPopupContainer={trigger => trigger.parentNode}
          >
            <a
              href="#!"
              onClick={handleDropdownClick}
              style={{ color: "#1890ff", fontSize: 16 }}
            >
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  };
  
  const nodeTypes = (setNodes) => ({
    deletable: (props) => <DeletableNode {...props} setNodes={setNodes} />,
  });
  
  // Custom Edge with Delete Icon and KeyValueMapper Modal
  const DeletableEdge = (props) => {
    const { id, sourceX, sourceY, targetX, targetY, style, markerEnd, data, source, target } = props;
    const [hovered, setHovered] = useState(false);
  
    const edgePath = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  
    // Center of the edge
    const [centerX, centerY] = [
      (sourceX + targetX) / 2,
      (sourceY + targetY) / 2,
    ];
  
    // Find source and target node data for mapping keys
    const sourceNode = nodes.find(n => n.id === source);
    const targetNode = nodes.find(n => n.id === target);
  
    // Example: outputKeys from source, inputKeys from target
    const outputKeys = sourceNode?.data?.outputKeys || [];
    const inputKeys = targetNode?.data?.inputKeys || [];
  
    // Get mapping for this edge
    const mapping = data?.keyMapping || {};
  
    // Handler to update mapping for this edge
    const handleMappingChange = (newMapping) => {
      setEdges((eds) =>
        eds.map((edge) =>
          edge.id === id
            ? {
                ...edge,
                data: {
                  ...edge.data,
                  keyMapping: newMapping,
                  onDelete: edge.data?.onDelete,
                },
              }
            : edge
        )
      );
    };
  
    return (
      <g
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer' }}
      >
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
        {/* Delete button */}
        {hovered && (
          <foreignObject
            x={centerX - 10}
            y={centerY - 10}
            width={20}
            height={20}
            style={{ overflow: 'visible', pointerEvents: 'none' }}
          >
            <button
              className="flow-edge-delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteEdge(id);
              }}
              title="Delete Edge"
              tabIndex={-1}
            >
              <CloseOutlined style={{ fontSize: 14 }} />
            </button>
          </foreignObject>
        )}
        {/* KeyValueMapper icon button */}
        <foreignObject
          x={centerX + 14}
          y={centerY - 10}
          width={24}
          height={24}
          style={{ overflow: 'visible', pointerEvents: 'none' }}
        >
            <LinkOutlined
            className="flow-edge-mapper-btn"
            title="Map Keys"
            tabIndex={-1}
            onClick={e => {
              e.stopPropagation();
              setMapperModal({ visible: true, edgeId: id });
            }}/>
        </foreignObject>
      </g>
    );
  };
  
  const edgeTypes = {
    deletable: DeletableEdge,
  };

  // Node delete handler
  const handleDeleteNode = useCallback(
    (id) => setNodes((nds) => nds.filter((n) => n.id !== id)),
    [setNodes]
  );

  // Edge delete handler
  const handleDeleteEdge = useCallback(
    (id) => setEdges((eds) => eds.filter((e) => e.id !== id)),
    [setEdges]
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
        data: {
          label: app.title,
          appId: app.id, // <-- ensure this is set
          actions: app.actions || [], // <-- ensure this is set
          onAction: (nodeId, action) => {
            message.info(`Action "${action}" selected for node "${nodeId}"`);
          },
        },
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
            type: 'deletable',
            data: { onDelete: handleDeleteEdge },
          },
          eds
        )
      ),
    [setEdges, handleDeleteEdge]
  );

  // Ensure all edges have the correct type and data for delete
  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        type: 'deletable',
        data: { onDelete: handleDeleteEdge },
      }))
    );
    // eslint-disable-next-line
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Modal for KeyValueMapper
  const currentEdge = edges.find(e => e.id === mapperModal.edgeId);
  let sourceNode = null, targetNode = null, outputKeys = [], inputKeys = [], mappingRows = [];
  if (currentEdge) {
    sourceNode = nodes.find(n => n.id === currentEdge.source);
    targetNode = nodes.find(n => n.id === currentEdge.target);
    outputKeys = sourceNode?.data?.outputKeys || [];
    inputKeys = targetNode?.data?.inputKeys || [];
    mappingRows = currentEdge.data?.keyMappingRows || [];
  }

  const handleMappingChange = (newRows) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === mapperModal.edgeId
          ? {
              ...edge,
              data: {
                ...edge.data,
                keyMappingRows: newRows,
                onDelete: edge.data?.onDelete,
              },
            }
          : edge
      )
    );
  };

  return (
    <>
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
        nodeTypes={nodeTypes(setNodes)}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      {/* KeyValueMapper Modal */}
      <Modal
        open={mapperModal.visible}
        title="Key Value Mapper"
        onCancel={() => setMapperModal({ visible: false, edgeId: null })}
        footer={null}
        destroyOnClose
      >
        <KeyValueMapper
          outputKeys={outputKeys}
          inputKeys={inputKeys}
          mappingRows={mappingRows}
          onChange={handleMappingChange}
          outputNodeName={sourceNode?.data?.label || "Output Node"}
          inputNodeName={targetNode?.data?.label || "Input Node"}
        />
      </Modal>
    </>
  );
};

const FlowCanvasMain = ({ nodes, setNodes, edges, setEdges}) => (
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