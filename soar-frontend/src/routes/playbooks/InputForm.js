import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, Button, Card } from "antd";
import CommonService from "apiServices/common";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const InputForm = ({
  title,
  visible,
  onSubmit,
  onCancel,
  initialValues,
  buttonSpin,
}) => {
  console.log("Initial Values:", initialValues);

  const [form] = Form.useForm();
  const [playbookList, setPlaybookList] = useState([]);

  useEffect(() => {
    fetchPlaybookList();
  }, []);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  // Fetch playbook list from API
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
      footer={[,
      ]}
    >
      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item label="Playbook ID" name="PlaybookID">
            <TextArea rows={1} disabled style={{ color: "black" }} />
          </Form.Item>

          <Form.Item label="Playbook Details" name="Details">
            <TextArea rows={4} disabled style={{ color: "black" }} />
          </Form.Item>
          
        </Form>
      </Card>
    </Modal>
  );
};

export default InputForm;
