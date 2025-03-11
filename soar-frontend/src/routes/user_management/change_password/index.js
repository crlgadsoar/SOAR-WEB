import React from 'react';
import { Form, Input, Card, Button, message } from 'antd';
import { instance } from 'util/connection/axios';
import API_ENDPOINT_URL from 'apiServices/API_ENDPOINT_URL';

/**
 * A component for changing the user's password.
 */
const ChangePassword = ({ onCancel }) => {
  const [buttonSpin, setButtonSpin] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    // setButtonSpin(true);
    let parsedValue = {
      ...values,
    };
    console.log('Sent values of form: ', parsedValue);
    instance
      .post(API_ENDPOINT_URL.POST_USER_MANAGEMENT_CHANGE_PASSWORD, parsedValue)
      .then((res) => {
        console.log(res.data);
        if (res.data.response_type === 'SUCCESS') {
          messageApi.open({
            type: 'success',
            content: 'Password changed !',
            duration: 5,
            style: {
              marginTop: '8vh',
            },
          });
          setTimeout(onCancel, 1000);
          setButtonSpin(false);
        } else {
          messageApi.open({
            type: 'error',
            content: 'server error, try again !',
            style: {
              marginTop: '8vh',
            },
          });
          setButtonSpin(false);
        }
      })
      .catch((error) => {
        setButtonSpin(false);
        return error;
      });
  };

  // A function for validating user's password.
  const validatePwd = (_, value) => {
    if (value) {
      const requestValidator = [
        {
          requestTest: value.length >= 6,
          requestMessage: 'At least 6 characters',
        },
        {
          requestTest: /[a-z]/.test(value),
          requestMessage: 'At least 1 lowercase letter',
        },
        {
          requestTest: /[A-Z]/.test(value),
          requestMessage: 'At least 1 uppercase letter',
        },
        {
          requestTest: /[@#_$!%*?&]/.test(value),
          requestMessage: 'At least 1 special character',
        },
        {
          requestTest: /\d/.test(value),
          requestMessage: 'At least 1 alphanumeric character',
        },
      ];

      if (requestValidator.every((req) => req.requestTest)) {
        return Promise.resolve();
      }
      const errorMessages = requestValidator
        .filter((req) => !req.requestTest)
        .map((req) => req.requestMessage);
      return Promise.reject(
        new Error('Password is missing:' + errorMessages.join(', ')),
      );
    }
  };
  const usernameValidation = (_, value) => {
    const regex = /^[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$/; // Updated regex pattern
    if (!value || value.length < 6 || value.length > 25 || !regex.test(value)) {
      return Promise.reject(new Error('Invalid username'));
    }
    return Promise.resolve();
  };
  return (
    <>
      {' '}
      {contextHolder}
      <Card title={'Change Password'} style={{ width: '450px' }}>
        <Form
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{ remember: true }}
          form={form}
          name='ChangePasswordForm'
          autoComplete='off'
        >
          <Form.Item
            label='Username'
            rules={[
              { required: true, message: 'Please input your User Name' },
              {
                validator: usernameValidation,
              },
            ]}
            name='user_name'
          >
            <Input placeholder='Username' autoComplete='off' />
          </Form.Item>
          <Form.Item
            label='Old Password'
            rules={[
              { required: true, message: 'Please input your old Password!' },
              {
                validator: validatePwd,
              },
            ]}
            name='old_password'
          >
            <Input.Password placeholder='Old Password' />
          </Form.Item>
          <Form.Item
            hasFeedback
            name='pswd'
            label='New Password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              {
                validator: validatePwd,
              },
            ]}
          >
            <Input.Password
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              minLength={8}
              maxLength={16}
              placeholder='New Password '
            />
          </Form.Item>
          <Form.Item
            name='new_password'
            dependencies={['pswd']}
            hasFeedback
            label='Confirm Password'
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('pswd') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              minLength={8}
              maxLength={16}
              placeholder='Confirm New Password '
            />
          </Form.Item>

          <Button
            type='primary'
            ghost
            style={{ float: 'right' }}
            loading={buttonSpin}
            onClick={() => {
              form.validateFields().then((values) => {
                console.log(values);
                onSubmit(values);
              });
            }}
          >
            Submit
          </Button>
          <Button
            onClick={onCancel}
            danger
            style={{
              zIndex: 999,
              float: 'right',
              marginRight: '5px',
              // border: 'none',
            }}
          >
            Cancel
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default ChangePassword;
