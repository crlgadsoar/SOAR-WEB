import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin, Modal, List } from "antd";
import { fetchApps, fetchAppActions } from "../../api/api";
import "./style.css"; // Import the CSS file

const Integrations = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [appActions, setAppActions] = useState([]);
  const [actionsLoading, setActionsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  if (loading) {
    return <Spin size="large" className="loading-spinner" />;
  }

  return (
    <div className="integrations-container">
      <h1 className="integrations-title">Integrations</h1>
      <Row gutter={[16, 16]}>
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
          <List
            dataSource={appActions}
            renderItem={(action) => (
              <List.Item>
                <strong>{action.action_name}</strong>: {action.action_api}
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  );
};

export default Integrations;