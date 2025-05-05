import React, { useEffect, useState } from "react";
import { Form, Modal, Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import CommonService from "apiServices/common";
import FlowChart from "./FlowChart";

const InputForm = ({
  title,
  visible,
  onSubmit,
  onCancel,
  initialValues,
  buttonSpin,
}) => {
  const [form] = Form.useForm();
  const [playbookList, setPlaybookList] = useState([]);
  const [playbookId, setPlaybookId] = useState(null);

  useEffect(() => {
    fetchPlaybookList();
  }, []);

  useEffect(() => {
    console.log("initialValues received:", initialValues); // <-- add this
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

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      width={600}
      forceRender
      footer={null}
    >
      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item label="Playbook ID">
  <div style={{ padding: "8px", background: "#f5f5f5", borderRadius: "4px", minHeight: "32px" }}>
    {playbookId ?? "N/A"}
  </div>
</Form.Item>
<Form.Item label="Playbook Flowchart">
{initialValues ? (
  <FlowChart
    visible={visible}
    playbookData={{
      source: initialValues.source || "N/A",
      utility: initialValues.utility || "N/A",
      format: initialValues.format || "N/A",
      ip: initialValues.ip || "N/A",
      port: initialValues.port || "N/A",
      action: initialValues.action || "N/A",
    }}
  />
) : (
  "Loading..."
)}

</Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default InputForm;



