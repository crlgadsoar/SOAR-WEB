import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin, Modal, Table, Button, Upload, message, Popconfirm } from "antd";
import { PlusOutlined, UploadOutlined, DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchApps, fetchAppActions, importAppsToDatabase, deleteApp } from "../../api/api";
import "./style.css";

const Integrations = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [appActions, setAppActions] = useState([]);
  const [actionsLoading, setActionsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApps, setSelectedApps] = useState([]);
  const [exportModalVisible, setExportModalVisible] = useState(false);

  const columns = [
    {
      title: "Action Name",
      dataIndex: "action_name",
      key: "action_name",
    },
    {
      title: "API Endpoint",
      dataIndex: "action_api",
      key: "action_api",
    },
  ];

  useEffect(() => {
    const loadApps = async () => {
      try {
        const data = await fetchApps();
        setApps(data);
      } catch (error) {
        console.error("Failed to load apps:", error);
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);

  const handleCardClick = async (app) => {
    setSelectedApp(app);
    setActionsLoading(true);
    setModalVisible(true);

    try {
      const actions = await fetchAppActions(app.id);
      setAppActions(actions);
    } catch (error) {
      console.error("Failed to load app actions:", error);
    } finally {
      setActionsLoading(false);
    }
  };

  const handleCreateAppClick = () => {
    console.log("Create New App clicked");
  };

  const handleAppSelection = (appId, checked) => {
    if (checked) {
      setSelectedApps((prevSelected) => [...prevSelected, appId]);
    } else {
      setSelectedApps((prevSelected) => prevSelected.filter((id) => id !== appId));
    }
  };

  const handleExportSelectedApps = async () => {
    if (selectedApps.length === 0) {
      message.warning("No apps selected for export.");
      return;
    }

    try {
      const appsToExport = await Promise.all(
        selectedApps.map(async (appId) => {
          const app = apps.find((app) => app.id === appId);
          const actions = await fetchAppActions(appId);
          return { ...app, actions };
        })
      );

      const jsonData = JSON.stringify(appsToExport, null, 2);

      // Use the File System Access API to prompt the user for a file location
      const options = {
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
      };

      const handle = await window.showSaveFilePicker(options);
      const writable = await handle.createWritable();
      await writable.write(jsonData);
      await writable.close();

      message.success("Selected apps exported successfully!");
      setExportModalVisible(false);
    } catch (error) {
      console.error("Failed to export selected apps:", error);
      message.error("Failed to export selected apps.");
    }
  };

  const handleImportApps = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedApps = JSON.parse(e.target.result); // Parse the JSON file

        // Call the API to import apps into the database
        await importAppsToDatabase(importedApps);

        // Update the local state with the imported apps
        const data = await fetchApps();
        setApps(data);
        message.success("Apps imported successfully!");
      } catch (error) {
        console.error("Failed to import apps:", error);
        message.error("Failed to import apps. Invalid file format or server error.");
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteApp = async (appId) => {
    try {
      await deleteApp(appId); // Call the delete API
      setApps((prevApps) => prevApps.filter((app) => app.id !== appId)); // Remove the app from the state
      message.success("App deleted successfully!");
    } catch (error) {
      console.error("Failed to delete app:", error);
      message.error("Failed to delete app. Please try again.");
    }
  };

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <div className="integrations-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className="integrations-title page-title" style={{ textAlign: "center", flex: 1 }}>Integrations</h1>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={() => setExportModalVisible(true)}
          style={{ margin: "2px" }}
        >
          Export
        </Button>
        <Upload
          accept=".json"
          showUploadList={false}
          beforeUpload={(file) => {
            handleImportApps(file);
            return false; // Prevent automatic upload
          }}
        >
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            style={{ margin: "2px" }}
          >
            Import
          </Button>
        </Upload>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            bordered={true}
            hoverable
            className="integration-card create-app-card"
            onClick={handleCreateAppClick}
          >
            <div style={{ textAlign: "center", fontSize: "24px", color: "#1890ff" }}>
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>Create New App</p>
              <PlusOutlined style={{ fontSize: "48px" }} />
            </div>
          </Card>
        </Col>

        {apps.map((app) => (
          <Col xs={24} sm={12} md={8} lg={6} key={app.id}>
            <Card
              title={app.title}
              bordered={true}
              hoverable
              className="integration-card"
              onClick={() => handleCardClick(app)} // This should only trigger when clicking on the card itself
            >
              <p>{app.description}</p>
              <div
                onClick={(e) => e.stopPropagation()} // Prevent triggering the card click for the entire Popconfirm
              >
                <Popconfirm
                  title="Are you sure you want to delete this app?"
                  onConfirm={() => handleDeleteApp(app.id)} // No need to stop propagation here since it's handled by the wrapper
                  onCancel={() => {}} // No need to stop propagation here since it's handled by the wrapper
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    style={{ position: "absolute", bottom: "10px", right: "10px" }}
                  >
                  </Button>
                </Popconfirm>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedApp?.title || "App Actions"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {actionsLoading ? (
          <Spin size="large" />
        ) : (
          <Table
            columns={columns}
            dataSource={appActions}
            rowKey="id"
            pagination={false}
          />
        )}
      </Modal>

      <Modal
        title="Select Apps to Export"
        visible={exportModalVisible}
        onCancel={() => setExportModalVisible(false)}
        footer={[
          <Button key="export" type="primary" onClick={handleExportSelectedApps}>
            Export Selected Apps
          </Button>,
        ]}
      >
        <Table
          dataSource={apps}
          rowKey="id"
          pagination={false}
          columns={[
            {
              title: (
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setSelectedApps(apps.map((app) => app.id));
                    } else {
                      setSelectedApps([]);
                    }
                  }}
                  checked={selectedApps.length === apps.length && apps.length > 0}
                />
              ),
              dataIndex: "select",
              width: 10, // Set the width of the checkbox column to 10
              align: "center",
              render: (_, record) => (
                <input
                  type="checkbox"
                  onChange={(e) => handleAppSelection(record.id, e.target.checked)}
                  checked={selectedApps.includes(record.id)}
                />
              ),
            },
            {
              title: "App Name",
              dataIndex: "title",
              key: "title",
              align: "center",
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
              align: "center",
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default Integrations;