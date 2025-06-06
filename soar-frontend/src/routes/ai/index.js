import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, Spin, message } from "antd";
import DragDropModelBuilder from "./DragDropModelBuilder";
import axios from "axios";
import { fetchIncidentColumns, downloadIncidentDataset } from "api/api"; // adjust path as needed

const AI = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [showDatasetModal, setShowDatasetModal] = useState(false);
  const [incidentColumns, setIncidentColumns] = useState([]);
  const [selectedIncidentColumns, setSelectedIncidentColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchColumns = async () => {
  setLoading(true);
  try {
    const colsByTable = await fetchIncidentColumns(); // object: { table: [cols] }
    const flattenedOptions = [];

    Object.entries(colsByTable).forEach(([table, columns]) => {
      columns.forEach(col => {
        const label = `${table}.${col}`;
        flattenedOptions.push({ label, value: label });
      });
    });

    setIncidentColumns(flattenedOptions);
  } catch (error) {
    message.error("Failed to fetch incident columns");
  } finally {
    setLoading(false);
  }
};

  const handleGenerateCSV = async () => {
  if (selectedIncidentColumns.length === 0) {
    message.warning("Please select at least one column");
    return;
  }

  // Group selected columns by table
  const selection = {};
  selectedIncidentColumns.forEach(fullCol => {
    const [table, col] = fullCol.split(".");
    if (!selection[table]) selection[table] = [];
    selection[table].push(col);
  });

  const res = await downloadIncidentDataset(selection);
  if (!res) {
    message.error("Failed to generate CSV");
    return;
  }

  const blob = new Blob([res], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "incident_dataset.csv";
  link.click();
  message.success("CSV downloaded successfully");
};


  return (
    <div style={{ padding: 20 }}>
      <h2>AI Model Configuration</h2>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => setShowBuilder(true)} style={{ marginRight: 10 }}>
          Add AI Model
        </Button>
        <Button onClick={() => { setShowDatasetModal(true); fetchColumns(); }}>
          Create Dataset
        </Button>
      </div>

      {/* AI Builder Modal */}
      <Modal
        title="Build AI Model"
        open={showBuilder}
        onCancel={() => setShowBuilder(false)}
        footer={null}
        width="90%"
        style={{ top: 20, maxWidth: "1200px" }}
        bodyStyle={{ padding: 0, height: "80vh", overflow: "hidden" }}
        destroyOnClose
      >
        <DragDropModelBuilder />
      </Modal>

      {/* Dataset Creation Modal */}
      <Modal
        title="Create Incident Dataset"
        open={showDatasetModal}
        onCancel={() => setShowDatasetModal(false)}
        onOk={handleGenerateCSV}
        okText="Download CSV"
        width={800}
      >
        {loading ? (
          <Spin />
        ) : (
          <Checkbox.Group
            options={incidentColumns}
            value={selectedIncidentColumns}
            onChange={setSelectedIncidentColumns}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          />
        )}
      </Modal>
    </div>
  );
};

export default AI;




/*
import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, Spin, message, Card, List, Tabs, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DragDropModelBuilder from "./DragDropModelBuilder";
import { fetchIncidentColumns, downloadIncidentDataset, getAIModels } from "api/api";
import "./style.css";

const { TabPane } = Tabs;

const AI = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [showDatasetModal, setShowDatasetModal] = useState(false);
  const [incidentColumns, setIncidentColumns] = useState([]);
  const [selectedIncidentColumns, setSelectedIncidentColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiModels, setAiModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(true);
  const [activeTab, setActiveTab] = useState("models");

  const fetchColumns = async () => {
    setLoading(true);
    try {
      const colsByTable = await fetchIncidentColumns();
      const flattenedOptions = [];

      Object.entries(colsByTable).forEach(([table, columns]) => {
        columns.forEach(col => {
          const label = `${table}.${col}`;
          flattenedOptions.push({ label, value: label });
        });
      });

      setIncidentColumns(flattenedOptions);
    } catch (error) {
      message.error("Failed to fetch incident columns");
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async () => {
    setLoadingModels(true);
    try {
      const models = await getAIModels();
      setAiModels(models);
    } catch (error) {
      message.error("Failed to load AI models");
    } finally {
      setLoadingModels(false);
    }
  };

  const handleGenerateCSV = async () => {
    if (selectedIncidentColumns.length === 0) {
      message.warning("Please select at least one column");
      return;
    }

    const selection = {};
    selectedIncidentColumns.forEach(fullCol => {
      const [table, col] = fullCol.split(".");
      if (!selection[table]) selection[table] = [];
      selection[table].push(col);
    });

    const res = await downloadIncidentDataset(selection);
    if (!res) {
      message.error("Failed to generate CSV");
      return;
    }

    const blob = new Blob([res], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "incident_dataset.csv";
    link.click();
    message.success("CSV downloaded successfully");
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // Insert the "Create Model" card as the first item in the list
  const modelsWithCreate = [
    { isCreateCard: true },
    ...aiModels
  ];

  return (
    <div className="ai-container">
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="AI Models" key="models">
          {loadingModels ? (
            <Spin />
          ) : (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
              }}
              dataSource={modelsWithCreate}
              renderItem={model => {
                if (model.isCreateCard) {
                  return (
                    <List.Item>
                      <Card
                        className="model-card create-model-card"
                        onClick={() => setShowBuilder(true)}
                        hoverable
                      >
                        <PlusOutlined style={{ fontSize: 22, marginRight: 8 }} />
                        Create AI Model
                      </Card>
                    </List.Item>
                  );
                }
                return (
                  <List.Item>
                    <Card
                      title={model.name}
                      size="small"
                      className="model-card"
                      headStyle={{ fontSize: 16, textAlign: "center", padding: "8px 0" }}
                      bodyStyle={{ padding: "10px 16px" }}
                      hoverable
                      onClick={() => {
                        // Handle model click (view details, edit, etc.)
                      }}
                    >
                      <div className="model-card-bottom">
                        <Text className="model-type">
                          Type: {model.type}
                        </Text>
                        <Text className="model-created">
                          Created: {new Date(model.created_at).toLocaleString()}
                        </Text>
                      </div>
                    </Card>
                  </List.Item>
                );
              }}
            />
          )}
        </TabPane>
        <TabPane tab="Datasets" key="datasets">
          <Button 
            type="primary" 
            onClick={() => { 
              setShowDatasetModal(true); 
              fetchColumns(); 
            }}
            style={{ marginBottom: 16 }}
          >
            Create New Dataset
          </Button>
          {/* You can add a table/list of existing datasets here *//*}
        </TabPane>
      </Tabs>

      {/* AI Builder Modal *//*}
      <Modal
        title="Build AI Model"
        open={showBuilder}
        onCancel={() => setShowBuilder(false)}
        footer={null}
        width="90%"
        style={{ top: 20, maxWidth: "1200px" }}
        bodyStyle={{ padding: 0, height: "80vh", overflow: "hidden" }}
        destroyOnClose
      >
        <DragDropModelBuilder onSuccess={() => {
          setShowBuilder(false);
          fetchModels();
        }} />
      </Modal>

      {/* Dataset Creation Modal *//*}
      <Modal
        title="Create Incident Dataset"
        open={showDatasetModal}
        onCancel={() => setShowDatasetModal(false)}
        onOk={handleGenerateCSV}
        okText="Download CSV"
        width={800}
      >
        {loading ? (
          <Spin />
        ) : (
          <Checkbox.Group
            options={incidentColumns}
            value={selectedIncidentColumns}
            onChange={setSelectedIncidentColumns}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          />
        )}
      </Modal>
    </div>
  );
};

export default AI;
*/