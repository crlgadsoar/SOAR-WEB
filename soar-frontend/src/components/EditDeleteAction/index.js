import React from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';

const EditDeleteAction = ({ editModalHandler, deleteData, row, msg = '' }) => {
  return (
    <Space>
      {editModalHandler && (
        <Tooltip title={`${msg} Detail`}>
          <Button
            type='default'
            style={{
              borderColor: 'rgb(246, 152, 31)',
              color: 'rgb(246, 152, 31)',
            }}
            onClick={() => editModalHandler('EDIT', row)}
            shape='circle'
            icon={<InfoCircleOutlined />}
            size='small'
          />
        </Tooltip>
      )}

      {deleteData && (
        <Tooltip title='Delete'>
          <Popconfirm
            title='Are you sure to delete ?'
            onConfirm={() => deleteData(row)}
            okText='Yes'
            cancelText='No'
          >
            <Button
              danger
              shape='circle'
              icon={<DeleteOutlined />}
              size='small'
              style={{
                color: '#DC143C',
              }}
            />
          </Popconfirm>
        </Tooltip>
      )}
    </Space>
  );
};

export default EditDeleteAction;
