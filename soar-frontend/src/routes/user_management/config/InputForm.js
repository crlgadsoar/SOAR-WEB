import React from "react";
import { Form, Input, Select, Modal, Button } from "antd";
import CommonService from "apiServices/common";
import { USER_ROLES, AUTHORITY_CONTROL } from "constants/IRS";
import Scrollbars from "components/Scrollbars";
import { useSelector } from "react-redux";
import { validateUserName } from "./helper";
const { Option } = Select;

const InputForm = ({
  title,
  visible,
  onSubmit,
  onCancel,
  initialValues,
  buttonSpin,
  type,
}) => {
  // console.log('THIS IS INITIAL VALUE OF INPUT FORM', initialValues);

  const [form] = Form.useForm();
  // const [userRole, setUserRole] = React.useState([]);
  const [stationList, setStationList] = React.useState([]);
  const { displayMode } = useSelector((state) => state.themeConfig);
  //To prevent default function
  const preventDefaultFunction = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    getStationList();
  }, []);

  // a function that help to call the api and store the result in react state
  const getStationList = async () => {
    try {
      const response = await CommonService.getStationList();
      console.log("getStationList response", response);
      setStationList(response.resource);

      if (response instanceof Error) {
        throw response;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // A function for validating user's password.
  const validatePwd = (_, value) => {
    if (value) {
      const requestValidator = [
        {
          requestTest: value.length >= 6,
          requestMessage: "At least 6 characters",
        },
        {
          requestTest: /[a-z]/.test(value),
          requestMessage: "At least 1 lowercase letter",
        },
        {
          requestTest: /[A-Z]/.test(value),
          requestMessage: "At least 1 uppercase letter",
        },
        {
          requestTest: /[@#_$!%*?&]/.test(value),
          requestMessage: "At least 1 special character",
        },
        {
          requestTest: /\d/.test(value),
          requestMessage: "At least 1 alphanumeric character",
        },
      ];

      if (requestValidator.every((req) => req.requestTest)) {
        return Promise.resolve();
      }
      const errorMessages = requestValidator
        .filter((req) => !req.requestTest)
        .map((req) => req.requestMessage);
      return Promise.reject(
        new Error("Password is missing:" + errorMessages.join(", "))
      );
    }
  };
  /**
   * Validates a username based on the following criteria:
   * - The username must consist of alphanumeric characters.
   * - The username can contain underscores (_) but not at the beginning or end.
   * - The username must be between 6 and 25 characters long A promise that resolves if the username is valid, and rejects with an error message if it is not.
   */
  const usernameValidation = (_, value) => {
    const regex = /^[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$/; // Updated regex pattern
    if (!value || value.length < 6 || value.length > 25 || !regex.test(value)) {
      return Promise.reject(new Error("Invalid username"));
    }
    return Promise.resolve();
  };

  const validateStaff = (_, value) => {
    if (!value || value.length < 4 || value.length > 8) {
      return Promise.reject(
        new Error(
          "Staff No must be atleast 4 characters and must not exceed 8 characters "
        )
      );
    }
    return Promise.resolve();
  };

  const submitForm = () => {
    console.log("SUBMIT CALLED");
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        values = {
          ...values,
          action: type,
        };
        onSubmit(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      width={600}
      footer={
        type !== "VIEW"
          ? [
              <Button danger onClick={onCancel} key="cancel">
                Cancel
              </Button>,
              <Button
                type="primary"
                loading={buttonSpin}
                onClick={submitForm}
                key="submit"
              >
                Submit
              </Button>,
            ]
          : []
      }
    >
      <Scrollbars
        autoHeight={true}
        autoHeightMin={0}
        autoHeightMax={450}
        custom_vertical_thumb_color={displayMode === "DARK" ? "white" : "black"}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            ...initialValues,
            area_control_region: initialValues
              ? initialValues.station_id
                ? initialValues.station_id
                    .toString()
                    .split(",")
                    .map((d) => +d) || []
                : []
              : [],
          }}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitForm();
            }
          }}
          form={form}
        >
          <Form.Item
            label="Username"
            name="user_name"
            rules={[
              {
                required: true,
              },
              {
                validator: usernameValidation,
                message: "Please enter valid user name",
              },
              type === "ADD" && {
                validator: validateUserName,
                message: "Username already in use !",
              },
            ]}
          >
            <Input disabled={type !== "ADD"} />
          </Form.Item>

          {type === "ADD" && (
            <Form.Item
              label="Password"
              name="password"
              onPaste={preventDefaultFunction}
              onCut={preventDefaultFunction}
              onCopy={preventDefaultFunction}
              rules={[
                {
                  required: true,
                },
                {
                  validator: validatePwd,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[
              {
                required: true,
                // message: 'Please input your username!',
              },
              {
                pattern: /^[a-zA-Z ]*$/,
                message: "Name can only contain alphabets",
              },
              { min: 6, message: "Name must be at least 6 characters!" },
              { max: 25, message: "Name must not exceed 25 characters!" },
            ]}
          >
            <Input disabled={type !== "ADD"} />
          </Form.Item>

          <Form.Item
            label="Staff Id"
            name="staff_id"
            rules={[
              {
                required: true,
              },
              {
                validator: validateStaff,
              },
            ]}
          >
            <Input disabled={type !== "ADD"} />
          </Form.Item>

          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              {
                required: true,
              },
              { min: 6, message: "Name must be at least 6 characters!" },
              { max: 25, message: "Name must not exceed 25 characters!" },
            ]}
          >
            <Input disabled={type !== "ADD"} />
          </Form.Item>

          <Form.Item
            label="Mobile No"
            name="mobile_no"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^(?:\d*)$/,
                message: "Mobile no can only contain numbers",
              },
              {
                pattern: /^[\d]{10}$/,
                message: "Enter a 10 digit MOBILE NO",
              },
            ]}
          >
            <Input
              disabled={type === "VIEW"}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>

          <Form.Item
            name="user_role"
            label="Account Type"
            rules={[{ required: true }]}
          >
            <Select
              disabled={type === "VIEW"}
              showSearch
              allowClear
              placeholder="User Role"
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
              {Object.keys(USER_ROLES).map((i) => (
                <Option value={+i} key={i}>
                  {USER_ROLES[i]} ({i})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="area_control_region"
            label="Area of Control Region"
            rules={[{ required: true }]}
          >
            <Select
              disabled={type === "VIEW"}
              mode="multiple"
              placeholder="Select station"
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
              //onChange={() => {}}
            >
              {stationList?.map((a) => (
                <Option key={a.station_code} value={a.station_id}>
                  {`${a.station_name.toString().toUpperCase()}(${
                    a.station_code
                  })`}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="control_authority"
            label="Authority of Control"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              disabled={type === "VIEW"}
              allowClear
              placeholder="AUTHORITY CONTROL"
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
              // onChange={() => {}}
            >
              {Object.keys(AUTHORITY_CONTROL).map((i) => (
                <Option value={+i} key={i}>
                  {AUTHORITY_CONTROL[i]} ({i})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Parent Unit Id"
            name="parent_unit_id"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^(?:\d*)$/,
                message: "Parent Unit Id can only contain numbers",
              },
            ]}
          >
            <Input
              disabled={type === "VIEW"}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="Parent Unit Name"
            name="parent_unit"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled={type === "VIEW"} />
          </Form.Item>

          <Form.Item
            label="Current Reporting Unit Id"
            name="current_reporting_unit_id"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^(?:\d*)$/,
                message: "Current Reporting Unit can only contain numbers",
              },
            ]}
          >
            <Input
              disabled={type === "VIEW"}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="Current Reporting Unit Name"
            name="current_reporting_unit"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled={type === "VIEW"} />
          </Form.Item>
        </Form>
      </Scrollbars>
    </Modal>
  );
};
export default InputForm;
