import React, { useEffect, useState } from "react";
import { Form, Modal, Card, Typography, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import CommonService from "apiServices/common";
import FlowChart from "./FlowChart";

const { Title } = Typography;

const InputForm = ({
  title,
  visible,
  onSubmit,
  onCancel,
  initialValues,
  buttonSpin,
  onWorkflowClick, // <-- Add this prop
}) => {
  const [form] = Form.useForm();
  const [playbookList, setPlaybookList] = useState([]);
  const [playbookId, setPlaybookId] = useState(null);

  useEffect(() => {
    fetchPlaybookList();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setPlaybookId(initialValues.playbook_id);
    }
  }, [initialValues, form]);

  const fetchPlaybookList = async () => {
    try {
      const res = await CommonService.getStationList();
      setPlaybookList(res.data);
    } catch (error) {
      console.error("Error fetching playbook list:", error);
    }
  };

  // Associated workflows: support both array and string
  const workflows =
    initialValues && (initialValues.workflows || initialValues.workflow_ids || initialValues.workflowNames || []);

  // Associated mitre ids: support both array and string
  const mitreIds =
    initialValues && (initialValues.mitreIds || initialValues.mitre_ids || []);

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      width={500}
      forceRender
      footer={null}
    >
      <Card>
        <Form form={form} layout="vertical" initialValues={initialValues} autoComplete="off">
          <Form.Item label="Playbook ID">
            <div style={{ padding: "8px", background: "#f5f5f5", borderRadius: "4px", minHeight: "32px" }}>
              {playbookId ?? "N/A"}
            </div>
          </Form.Item>
          <Form.Item label="Playbook Name">
            <div style={{ padding: "8px", background: "#f5f5f5", borderRadius: "4px", minHeight: "32px" }}>
              {initialValues?.playbook_name ?? "N/A"}
            </div>
          </Form.Item>
          <Form.Item label="Playbook Description">
            <div style={{ padding: "8px", background: "#f5f5f5", borderRadius: "4px", minHeight: "32px" }}>
              {initialValues?.playbook_description ?? "N/A"}
            </div>
          </Form.Item>
          <Form.Item label="Associated Workflows">
            <div style={{ minHeight: "32px" }}>
              {Array.isArray(workflows) && workflows.length > 0 ? (
                workflows.map((wf, idx) => {
                  const wfId = typeof wf === "string" ? wf : wf.workflow_id || wf.id;
                  const wfName = typeof wf === "string" ? wf : wf.workflow_name || wf.name || wf.id;
                  return (
                    <Tag
                      key={idx}
                      color="blue"
                      style={{ cursor: "pointer" }}
                      onClick={() => onWorkflowClick && onWorkflowClick(wfId)}
                    >
                      {wfName}
                    </Tag>
                  );
                })
              ) : (
                <span>N/A</span>
              )}
            </div>
          </Form.Item>
          <Form.Item label="Associated Mitre IDs">
            <div style={{ minHeight: "32px" }}>
              {Array.isArray(mitreIds) && mitreIds.length > 0 ? (
                mitreIds.map((mid, idx) => (
                  <Tag key={idx} color="geekblue">
                    {typeof mid === "string" ? mid : mid.mitre_id || mid.id || mid}
                  </Tag>
                ))
              ) : (
                <span>N/A</span>
              )}
            </div>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default InputForm;



