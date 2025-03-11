import React from 'react';
import { Form, DatePicker, Button, Space } from 'antd';

/**
 * A component that allows the user to select a date and submit the form.
 * @returns The DateSelector component.
 */
const DateSelector = ({ onSubmit }) => {
  const [form] = Form.useForm();
  return (
    <div>
      {' '}
      <Form form={form} name='signallingData' autoComplete='off'>
        <Space>
          <Form.Item
            name='fromDate'
            label='From Date'
            rules={[
              {
                required: true,
                message: 'Enter Valid Date',
              },
            ]}
          >
            <DatePicker
              placeholder='Select Starting Date'
              format={'DD-MM-YYYY'}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name='endDate'
            label='End Date'
            rules={[
              {
                required: true,
                message: 'Enter Valid Time',
              },
            ]}
          >
            <DatePicker
              placeholder='Select End Date'
              format={'DD-MM-YYYY'}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={onSubmit}>Submit</Button>
          </Form.Item>
        </Space>
      </Form>{' '}
    </div>
  );
};
export default DateSelector;
