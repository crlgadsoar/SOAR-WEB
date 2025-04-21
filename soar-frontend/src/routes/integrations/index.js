import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons"; // Import PlusOutlined icon
import { fetchApps, fetchAppActions } from "../../api/api";
import "./style.css"; // Import the CSS file

const Integrations = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [appActions, setAppActions] = useState([]);
  const [actionsLoading, setActionsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
    // Logic to handle creating a new app
    console.log("Create New App clicked");
  };

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <div className="integrations-container">
      <h1 className="integrations-title">Integrations</h1>
      <Row gutter={[16, 16]}>
        {/* Tile for creating a new app */}
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

        {/* Existing app tiles */}
        {apps.map((app) => (
          <Col xs={24} sm={12} md={8} lg={6} key={app.id}>
            <Card
              title={app.title}
              bordered={true}
              hoverable
              className="integration-card"
              onClick={() => handleCardClick(app)}
            >
              <p>{app.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal to display app actions */}
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
            rowKey="id" // Use a unique key for each row
            pagination={false} // Disable pagination for simplicity
          />
        )}
      </Modal>
    </div>
  );
};

export default Integrations;