import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Select, Button } from "antd";
import { fetchActions, fetchPlaybookId, getWorkflows } from "api/api";
import { mitreMapping } from "./mapping";
import { fetchUtilities } from "api/api";

const { Option } = Select;

const AddPlaybook = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [actions, setActions] = useState([]);
  const [loadingActions, setLoadingActions] = useState(false);
  const [recommendedMitreIds, setRecommendedMitreIds] = useState([]);
  const [playbookId, setPlaybookId] = useState("");
  const [utilities, setUtilities] = useState([]);
  const [workflows, setWorkflows] = useState([]);

  const fetchAndSetPlaybookId = async () => {
    const id = await fetchPlaybookId();
    if (id) {
      setPlaybookId(id);
      form.setFieldsValue({ playbookId: id });
    }
  };

  // Fetch workflows for dropdown
  const fetchAndSetWorkflows = async () => {
    const data = await getWorkflows();
    setWorkflows(data || []);
  };

  useEffect(() => {
    if (visible) {
      fetchAndSetPlaybookId();
      fetchAndSetWorkflows();

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
      setWorkflows([]);
    }
  }, [visible]);

  const handleUtilityChange = async (utility) => {
    setLoadingActions(true);
    try {
      const fetchedActions = await fetchActions(utility);
      setActions(fetchedActions);
    } catch (error) {
      console.error("Failed to fetch actions:", error);
    } finally {
      setLoadingActions(false);
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

  // Always render fields as editable (add only)
  const renderField = (children) => children;

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Submit"
      title="Add Playbook Rule"
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Playbook ID" name="playbookId" rules={[{ required: true }]}>
          {renderField(
            <Input value={playbookId} disabled placeholder="Fetching..." />
          )}
        </Form.Item>

        <Form.Item label="Playbook Name" name="playbookname" rules={[{ required: true }]}>
          {renderField(<Input placeholder="Enter playbook name" />)}
        </Form.Item>

        <Form.Item
          label="Playbook Description"
          name="playbookDescription"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          {renderField(
            <Input.TextArea rows={3} placeholder="Enter playbook description" />
          )}
        </Form.Item>

        <Form.Item label="Attach to Workflows" name="workflowIds" rules={[{ required: true, message: "Please select at least one workflow" }]}>
          {renderField(
            <Select
              placeholder="Select Workflows"
              mode="multiple"
              allowClear
              maxTagCount="responsive"
            >
              {workflows.map((wf) => (
                <Option key={wf.id} value={wf.id}>
                  {wf.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Mitre IDs" name="mitreIds" rules={[{ required: true }]}>
          {renderField(
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Start typing (e.g., P) to search"
              onSearch={handleMitreInputChange}
              showSearch
              filterOption={false}
            >
              {recommendedMitreIds.map(({ label, value }, index) => (
                <Option key={index} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPlaybook;
