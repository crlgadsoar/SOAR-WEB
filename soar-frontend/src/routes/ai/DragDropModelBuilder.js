import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { message, Modal, Button } from "antd"; // Added Button to imports

import UploadDatasetNode from "./nodes/UploadDatasetNode";
import SelectTargetNode from "./nodes/SelectTargetNode";
import SelectFeaturesNode from "./nodes/SelectFeaturesNode";
import TrainModelNode from "./nodes/TrainModelNode";
import DataTableNode from "./nodes/DataTableNode";
import ModelSelectionNode from "./nodes/ModelSelectionNode";
import {
  uploadDataset,
  getColumns,
  getDatasetSample,
  trainModel
} from "../../api/api";

const nodeTypes = {
  uploadDataset: UploadDatasetNode,
  selectTarget: SelectTargetNode,
  selectFeatures: SelectFeaturesNode,
  modelSelection: ModelSelectionNode,
  trainModel: TrainModelNode,
  dataTable: DataTableNode,
};

const defaultNodeStyle = {
  borderRadius: 16,
  padding: 12,
  background: 'linear-gradient(to bottom right, #fef3c7, #fdba74)',
  border: '2px solid #fb923c',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
};

const initialNodes = [
  {
    id: "1",
    type: "uploadDataset",
    position: { x: 0, y: 0 },
    data: { onUpload: () => {}, uploadMessage: "" },
    style: defaultNodeStyle,
  },
  {
    id: "2",
    type: "selectTarget",
    position: { x: 300, y: 0 },
    data: { columns: [], setTarget: () => {}, target: "" },
    style: defaultNodeStyle,
  },
  {
    id: "3",
    type: "selectFeatures",
    position: { x: 600, y: 0 },
    data: { columns: [], onSelectFeatures: () => {}, features: [], target: "" },
    style: defaultNodeStyle,
  },
  {
    id: "3.5",
    type: "modelSelection",
    position: { x: 900, y: 0 },
    data: { selectedModel: "", setSelectedModel: () => {} },
    style: defaultNodeStyle,
  },
  {
    id: "4",
    type: "trainModel",
    position: { x: 1200, y: 0 },
    data: { onTrain: () => {}, canTrain: false, trainingResult: "" },
    style: defaultNodeStyle,
  },
  {
    id: "5",
    type: "dataTable",
    position: { x: 600, y: 200 },
    data: { 
      tableData: [],
      columns: [],
      filename: ""
    },
    style: { ...defaultNodeStyle, width: 200, height: 80 },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: '#f97316', strokeWidth: 2 },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: '#f97316', strokeWidth: 2 },
  },
  {
    id: "e3-3.5",
    source: "3",
    target: "3.5",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: '#f97316', strokeWidth: 2 },
  },
  {
    id: "e3.5-4",
    source: "3.5",
    target: "4",
    markerEnd: { type: MarkerType.Arrow },
    style: { stroke: '#f97316', strokeWidth: 2 },
  },
];

const DragDropModelBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [columns, setColumns] = useState([]);
  const [target, setTarget] = useState("");
  const [features, setFeatures] = useState([]);
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [trainingResult, setTrainingResult] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [showModelNameModal, setShowModelNameModal] = useState(false);

  const fetchTableData = async (filename) => {
    if (!filename) return;
    
    setLoading(true);
    try {
      const result = await getDatasetSample(filename);
      setTableData(result.data);
      setTableColumns(result.columns);
    } catch (error) {
      console.error("Error fetching table data:", error);
      message.error("Error fetching table data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const uploadResult = await uploadDataset(file);
      setUploadMessage(`Upload successful: ${uploadResult.filename}`);
      setUploadedFilename(uploadResult.filename);
      message.success("Dataset uploaded successfully!");

      const colResult = await getColumns(uploadResult.filename);
      setColumns(colResult.columns);
      fetchTableData(uploadResult.filename);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadMessage("Upload failed");
      message.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleTrainClick = () => {
    if (!uploadedFilename || !target || features.length === 0 || !selectedModel) {
      message.error("Make sure all inputs are provided");
      return;
    }
    setShowModelNameModal(true);
  };

  const handleTrain = async (modelName) => {
    setShowModelNameModal(false);
    setLoading(true);
    try {
      const result = await trainModel(uploadedFilename, target, features, selectedModel, modelName);
      setTrainingResult(`Training complete! Accuracy: ${result.accuracy}`);
      message.success("Model trained successfully!");
    } catch (error) {
      console.error("Training error:", error);
      setTrainingResult("Training failed");
      message.error("Training failed");
    } finally {
      setLoading(false);
    }
  };

  const onSelectFeatures = (selectedValues) => {
    setFeatures(selectedValues);
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        const updatedNode = { ...node };
        if (node.type === "uploadDataset") {
          updatedNode.data = { onUpload: handleUpload, uploadMessage };
        } else if (node.type === "selectTarget") {
          updatedNode.data = { columns, setTarget, target };
        } else if (node.type === "selectFeatures") {
          updatedNode.data = {
            columns,
            onSelectFeatures,
            features,
            target,
          };
        } else if (node.type === "modelSelection") {
          updatedNode.data = {
            selectedModel,
            setSelectedModel,
          };
        } else if (node.type === "trainModel") {
          updatedNode.data = {
            onTrain: handleTrainClick,
            canTrain: uploadedFilename && target && features.length > 0 && selectedModel,
            trainingResult,
          };
        } else if (node.type === "dataTable") {
          updatedNode.data = {
            tableData,
            columns: tableColumns,
            filename: uploadedFilename,
          };
        }
        return updatedNode;
      })
    );
  }, [columns, target, features, uploadedFilename, uploadMessage, trainingResult, tableData, tableColumns, selectedModel]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ width: "100%", height: "calc(80vh - 50px)", minHeight: "500px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background color="#999" gap={16} />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'uploadDataset':
                return '#34d399';
              case 'selectTarget':
                return '#60a5fa';
              case 'selectFeatures':
                return '#facc15';
              case 'modelSelection':
                return '#a78bfa';
              case 'trainModel':
                return '#f472b6';
              case 'dataTable':
                return '#a78bfa';
              default:
                return '#f97316';
            }
          }}
          nodeStrokeWidth={3}
        />
        <Controls />
      </ReactFlow>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow text-orange-700 font-semibold">
            Processing...
          </div>
        </div>
      )}

      <Modal
        title="Name Your Model"
        open={showModelNameModal}
        onCancel={() => setShowModelNameModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowModelNameModal(false)}>
            Cancel
          </Button>,
          <Button 
            key="confirm" 
            type="primary" 
            onClick={() => {
              const modelName = document.getElementById('modelNameInput').value.trim();
              if (!modelName) {
                message.error('Please enter a model name');
                return;
              }
              handleTrain(modelName);
            }}
          >
            Confirm
          </Button>
        ]}
        centered
      >
        <div className="p-4">
          <input
            type="text"
            placeholder="Enter model name (e.g., Random Forest)"
            className="w-full p-2 border border-gray-300 rounded"
            id="modelNameInput"
          />
        </div>
      </Modal>
    </div>
  );
};

export default DragDropModelBuilder;