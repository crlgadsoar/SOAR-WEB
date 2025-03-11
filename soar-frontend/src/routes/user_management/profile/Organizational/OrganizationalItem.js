import React from 'react';
import { Space } from 'antd';
const OrganizationalItem = ({ data }) => {
  const { title, desc } = data;
  return (
    <Space>
      <div style={{ marginTop: '-28px' }}>{data.iconComponent}</div>
      <div>
        <h5 style={{ color: 'gray' }}>{title}</h5>
        <p className='gx-mb-0'>{desc}</p>
      </div>
    </Space>
  );
};

export default OrganizationalItem;
