import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Select } from "antd";
import { fetchActions, fetchPlaybookId } from "api/api";
import { mitreMapping } from "./mapping"; // Import the mapping
import { fetchUtilities } from "api/api";


const { Option } = Select;

const AddPlaybook = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [actions, setActions] = useState([]); // Store actions for selected utility
  const [loadingActions, setLoadingActions] = useState(false); // Track loading state
  const [recommendedMitreIds, setRecommendedMitreIds] = useState([]); // Store recommended Mitre IDs
  const [playbookId, setPlaybookId] = useState("");
  const [utilities, setUtilities] = useState([]);

  const fetchAndSetPlaybookId = async () => {
    const id = await fetchPlaybookId();
    if (id) {
      setPlaybookId(id); // Set local state
      form.setFieldsValue({ playbookId: id }); // Set form field
    }
  };  

  useEffect(() => {
    if (visible) {
      fetchAndSetPlaybookId();
  
      // fetch utilities
      const loadUtilities = async () => {
        const data = await fetchUtilities();
        setUtilities(data);
      };
      loadUtilities();
    } else {
      form.resetFields();
      setPlaybookId("");
      setUtilities([]);
    }
  }, [visible]);
  
  

  const handleUtilityChange = async (utility) => {
    setLoadingActions(true); // Start loading actions
    try {
      // Fetch actions using the imported function
      const fetchedActions = await fetchActions(utility);
      
      // Update the actions state with the fetched actions
      setActions(fetchedActions);
    } catch (error) {
      console.error("Failed to fetch actions:", error);
    } finally {
      setLoadingActions(false); // Stop loading once data is fetched
    }
  };

  const handleMitreInputChange = (value) => {
    const filtered = Object.entries(mitreMapping)
      .filter(([term]) => term.toLowerCase().includes(value.toLowerCase()))
      .map(([term, id]) => ({ label: `${term} : ${id}`, value: id }));
  
    setRecommendedMitreIds(filtered);
  };
  

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
    } catch (error) {
      console.error("Validation or submission failed", error);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Submit"
      title="Add Playbook Rule"
      destroyOnClose // ✅ ensures modal unmounts on close
    >
      <Form form={form} layout="vertical">
        
        <Form.Item label="Playbook ID" name="playbookId" rules={[{ required: true }]}>
          <Input value={playbookId} disabled placeholder="Fetching..." />
        </Form.Item>

        <Form.Item label="Source" name="source" rules={[{ required: true }]}>
          <Select placeholder="Select Source">
            <Option value="SIEM">SIEM</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Utility" name="utility" rules={[{ required: true }]}>
  <Select placeholder="Select Utility" onChange={handleUtilityChange}>
    {utilities.map((utility, index) => (
      <Option key={index} value={utility}>
        {utility}
      </Option>
    ))}
  </Select>
</Form.Item>


        <Form.Item label="Action" name="action" rules={[{ required: true }]}>
          <Select placeholder="Select Action" loading={loadingActions}>
            {actions.length > 0 ? (
              actions.map((action, index) => (
                <Option key={index} value={action}>
                  {action}
                </Option>
              ))
            ) : (
              <Option disabled>No actions available</Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Format" name="format" rules={[{ required: true }]}>
          <Select placeholder="Select Format">
            <Option value="JSON">JSON</Option>
          </Select>
        </Form.Item>

        <Form.Item label="IP Address" name="ip" rules={[{ required: true }]}>
          <Input placeholder="e.g., 192.168.1.1" />
        </Form.Item>

        <Form.Item label="Port" name="port" rules={[{ required: true }]}>
          <Input placeholder="e.g., 443" />
        </Form.Item>

        <Form.Item label="Playbook Name" name="playbookname" rules={[{ required: true }]}>
          <Input placeholder="e.g., 443" />
        </Form.Item>

        <Form.Item label="Mitre IDs" name="mitreIds" rules={[{ required: true }]}>
  <Select
    mode="tags"
    style={{ width: "100%" }}
    placeholder="Start typing (e.g., P) to search"
    onSearch={handleMitreInputChange}
    showSearch
    filterOption={false} // we'll handle filtering manually
  >
    {recommendedMitreIds.map(({ label, value }, index) => (
      <Option key={index} value={value}>
        {label}
      </Option>
    ))}
  </Select>
</Form.Item>


      </Form>
    </Modal>
  );
};

export default AddPlaybook;
