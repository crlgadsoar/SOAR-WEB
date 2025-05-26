// components/ModelNameInput.js
import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';

function ModelNameInput({ onSubmit, onCancel }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      message.error('Please enter a model name');
      return;
    }
    onSubmit(name);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Form layout="vertical">
        <Form.Item label="Model Name">
          <Input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Random Forest"
          />
        </Form.Item>
        <div className="flex justify-end space-x-2">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>Confirm</Button>
        </div>
      </Form>
    </div>
  );
}

export default ModelNameInput;