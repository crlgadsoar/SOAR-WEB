import React, { useState, useEffect } from "react";
import { Modal, Input, Form, Select, Button, Tag } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { fetchActions, fetchPlaybookId, getWorkflows, fetchPlaybookDetails } from "api/api";
import { mitreMapping } from "./mapping";
import { fetchUtilities } from "api/api";
import WorkflowWindowReadOnly from "routes/workflows/WorkflowWindowReadOnly"; // adjust path if needed

const { Option } = Select;

const AddPlaybook = ({
  visible,
  onCancel,
  onSubmit,
  mode = "add", // 'add' | 'view' | 'edit'
  initialValues = {},
}) => {
  const [form] = Form.useForm();
  const [actions, setActions] = useState([]);
  const [loadingActions, setLoadingActions] = useState(false);
  const [recommendedMitreIds, setRecommendedMitreIds] = useState([]);
  const [playbookId, setPlaybookId] = useState("");
  const [utilities, setUtilities] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [playbookDetails, setPlaybookDetails] = useState(null); // New state for playbook details
  const [workflowModalVisible, setWorkflowModalVisible] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  // For edit mode, keep track of internal mode state
  const [internalMode, setInternalMode] = useState(mode);

  useEffect(() => {
    setInternalMode(mode);
  }, [mode, visible]);

  useEffect(() => {
    if (visible && mode === "add") {
      fetchPlaybookId().then((id) => {
        if (id) {
          setPlaybookId(id);
          form.setFieldsValue({ playbookId: id });
        }
      });
      getWorkflows().then((data) => setWorkflows(data || []));
      fetchUtilities().then((data) => setUtilities(data));
      form.resetFields();
    } else if (visible && mode !== "add" && playbookDetails) {
      form.setFieldsValue({
        playbookId: playbookDetails.playbook_id,
        playbookname: playbookDetails.playbook_name,
        playbookDescription: playbookDetails.playbook_description,
        workflowIds:
          playbookDetails.workflow_ids ||
          playbookDetails.workflows?.map((wf) => wf.id || wf.workflow_id) ||
          [],
        mitreIds:
          playbookDetails.mitreIds ||
          playbookDetails.mitre_ids ||
          [],
      });
      setPlaybookId(playbookDetails.playbook_id);
      getWorkflows().then((data) => setWorkflows(data || []));
      fetchUtilities().then((data) => setUtilities(data));
    } else if (!visible) {
      form.resetFields();
      setPlaybookId("");
      setUtilities([]);
      setWorkflows([]);
    }
    // eslint-disable-next-line
  }, [visible, mode, playbookDetails]);

  // Fetch playbook details when in view or edit mode
  useEffect(() => {
    if (visible && mode !== "add" && initialValues?.playbook_id) {
      fetchPlaybookDetails(initialValues.playbook_id)
        .then((res) => {
          setPlaybookDetails({ ...initialValues, ...res.data });
        })
        .catch(() => setPlaybookDetails(initialValues));
    } else if (visible && mode === "add") {
      setPlaybookDetails(null);
    }
  }, [visible, mode, initialValues]);

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

  // Render fields as readonly or editable based on mode
  const isReadOnly = internalMode === "view";
  const isEdit = internalMode === "edit";
  const isAdd = internalMode === "add";

  // Helper to render fields
  const renderField = (children, value) =>
    isReadOnly ? (
      <Input value={value} readOnly disabled />
    ) : (
      children
    );

  // For Select fields in view mode, show as comma-separated text
  const renderSelectField = (options, value) =>
    isReadOnly ? (
      <Input value={options.filter(opt => value?.includes(opt.value)).map(opt => opt.children || opt.label).join(", ")} readOnly disabled />
    ) : (
      value
    );

  // Modal title and extra edit button
  const modalTitle = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span>
        {isAdd && "Add Playbook Rule"}
        {isReadOnly && "Playbook Details"}
        {isEdit && "Edit Playbook"}
      </span>
    </div>
  );

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={isReadOnly ? onCancel : handleOk}
      okText={isReadOnly ? "Close" : "Submit"}
      title={modalTitle}
      destroyOnClose
      footer={
        isReadOnly
          ? [
              <Button key="close" onClick={onCancel}>
                Close
              </Button>,
              <Button
                key="edit"
                type="primary"
                icon={<EditTwoTone />}
                onClick={() => {
                  setInternalMode("edit");
                }}
              >
                Edit
              </Button>,
            ]
          : [
              <Button
                key="cancel"
                onClick={() => {
                  if (internalMode === "edit") {
                    setInternalMode("view");
                    // Reset form fields to original playbookDetails when cancelling edit
                    if (playbookDetails) {
                      form.setFieldsValue({
                        playbookId: playbookDetails.playbook_id,
                        playbookname: playbookDetails.playbook_name,
                        playbookDescription: playbookDetails.playbook_description,
                        workflowIds:
                          playbookDetails.workflow_ids ||
                          playbookDetails.workflows?.map((wf) => wf.id || wf.workflow_id) ||
                          [],
                        mitreIds:
                          playbookDetails.mitreIds ||
                          playbookDetails.mitre_ids ||
                          [],
                      });
                    }
                  } else {
                    onCancel();
                  }
                }}
              >
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Submit
              </Button>,
            ]
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Playbook ID" name="playbookId" rules={[{ required: true }]}>
          {renderField(
            <Input value={playbookId} disabled placeholder="Fetching..." />,
            playbookId
          )}
        </Form.Item>

        <Form.Item label="Playbook Name" name="playbookname" rules={[{ required: true }]}>
          {renderField(
            <Input placeholder="Enter playbook name" />,
            form.getFieldValue("playbookname")
          )}
        </Form.Item>

        <Form.Item
          label="Playbook Description"
          name="playbookDescription"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          {isReadOnly ? (
            <Input.TextArea value={form.getFieldValue("playbookDescription")} disabled autoSize />
          ) : (
            <Input.TextArea rows={1} placeholder="Enter playbook description" />
          )}
        </Form.Item>

        <Form.Item
          label={mode == "add" || mode == "edit" ? "Attach to Workflows" : "Associated Workflows"}
          name="workflowIds"
          rules={[{ required: true, message: "Please select at least one workflow" }]}
        >
          {isReadOnly ? (
            <div style={{ minHeight: "32px" }}>
              {Array.isArray(form.getFieldValue("workflowIds")) && form.getFieldValue("workflowIds").length > 0 ? (
                workflows
                  .filter(wf => form.getFieldValue("workflowIds").includes(wf.id))
                  .map(wf => (
                    <Tag
                      key={wf.id}
                      color="blue"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedWorkflow(wf);
                        setWorkflowModalVisible(true);
                      }}
                    >
                      {wf.name}
                    </Tag>
                  ))
              ) : (
                <span>N/A</span>
              )}
            </div>
          ) : (
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
          {isReadOnly ? (
            <div style={{ minHeight: "32px" }}>
              {Array.isArray(form.getFieldValue("mitreIds")) && form.getFieldValue("mitreIds").length > 0 ? (
                form.getFieldValue("mitreIds").map((mid, idx) => (
                  <Tag key={idx} color="geekblue">
                    {typeof mid === "string" ? mid : mid.mitre_id || mid.id || mid}
                  </Tag>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
          ) : (
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

      <WorkflowWindowReadOnly
        visible={workflowModalVisible}
        onCancel={() => setWorkflowModalVisible(false)}
        workflow={selectedWorkflow}
        apps={[]} // Pass apps if needed, or remove if not used
      />
    </Modal>
  );
};

export default AddPlaybook;