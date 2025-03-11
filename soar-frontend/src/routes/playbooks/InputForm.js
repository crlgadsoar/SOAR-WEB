import React from "react";
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
  console.log("THIS IS INITIAL VALUE OF INPUT FORM", initialValues);

  const [form] = Form.useForm();
  const [playbookList, setPlaybookList] = React.useState([]);

  React.useEffect(() => {
    getplaybookList();
  }, []);

  // a function that help to call the api and store the result in react state
  const getplaybookList = () => {
    CommonService.getStationList()
      .then((res) => {
        setplaybookList(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      width={600}
      footer={[
        <Button danger onClick={onCancel} key={"1"}>
          Cancel
        </Button>,
        <Button
          type="primary"
          key={"1"}
          loading={buttonSpin}
          onClick={() => {
            form.validateFields().then((values) => {
              console.log(values);
              onSubmit(values);
            });
          }}
        >
          Submit
        </Button>,
      ]}
    >
      <Card>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            Width: "580px",
            maxHeight: 400,
            overflow: "scroll",
          }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="ID"
            name="id"
            // rules={[
            //   {
            //     required: true,
            //     // message: 'Please input your username!',
            //   },
            //   {
            //     pattern: /^[a-zA-Z ]*$/,
            //     message: "Id can not contain alphabets",
            //   },
            //   { min: 6, message: "Id must be at least 6 characters!" },
            //   { max: 25, message: "Id must not exceed 25 characters!" },
            // ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="Name" rules={[{ required: true }]}>
            <Select
              mode="single"
              placeholder="Select State"
              showSearch
              allowClear
              filterOption={(input, option) =>
                option.children
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toString().toLowerCase()) >= 0 ||
                option.value
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toString().toLowerCase()) >= 0
              }
              onChange={() => {}}
            >
              {playbookList &&
                playbookList.map((a) => (
                  <Option key={a.state} value={a.state}>
                    {`${a.state}`}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};
export default InputForm;
