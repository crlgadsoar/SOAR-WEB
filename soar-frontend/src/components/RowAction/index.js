import React from 'react';
import { Button, Popconfirm, Space, Tooltip, theme } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const RowAction = ({
  viewModalHandler,
  editModalHandler,
  deleteData,
  row,
  msg = '',
}) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const { displayMode } = useSelector((state) => state.themeConfig);
  return (
    <Space>
      {viewModalHandler && (
        <Tooltip title={`View ${msg}`}>
          <Button
            type='default'
            style={{
              color: `${colorPrimary}`,
              borderColor: displayMode === 'DARK' ? 'black' : 'white',
            }}
            onClick={() => viewModalHandler('VIEW', row)}
            shape='circle'
            icon={<EyeOutlined />}
            size='small'
          />
        </Tooltip>
      )}

      {editModalHandler && (
        <Tooltip title={`Edit ${msg}`}>
          <Button
            type='default'
            style={{
              borderColor: displayMode === 'DARK' ? 'black' : 'white',
              color: 'rgb(246, 152, 31)',
            }}
            onClick={() => editModalHandler('EDIT', row)}
            shape='circle'
            icon={<EditOutlined />}
            size='small'
          />
        </Tooltip>
      )}

      {deleteData && (
        <Tooltip title={`Delete ${msg}`}>
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
                borderColor: displayMode === 'DARK' ? 'black' : 'white',
                color: '#DC143C',
              }}
            />
          </Popconfirm>
        </Tooltip>
      )}
    </Space>
  );
};

export default RowAction;
