import React, { useState } from "react";
import { Button, Modal } from "antd";
import DragDropModelBuilder from "./DragDropModelBuilder";

const AI = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Model Configuration</h2>
      <Button type="primary" onClick={() => setShowBuilder(true)}>
        Add AI Model
      </Button>

      <Modal
        title="Build AI Model"
        open={showBuilder}
        onCancel={() => setShowBuilder(false)}
        footer={null}
        width="90%"
        style={{ 
          top: 20,
          maxWidth: '1200px'
        }}
        bodyStyle={{
          padding: 0,
          height: '80vh',
          overflow: 'hidden'
        }}
        destroyOnClose
      >
        <DragDropModelBuilder />
      </Modal>
    </div>
  );
};

export default AI;