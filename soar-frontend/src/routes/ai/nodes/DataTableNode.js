import React, { useState } from "react";
import { Table } from "antd";
import { DatabaseOutlined } from '@ant-design/icons';

function DataTableNode({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const columns = data.columns?.map(col => ({
    title: <span className="font-bold text-xs">{col}</span>,
    dataIndex: col,
    key: col,
    render: (text) => (
      <span className="text-xs">
        {text?.toString().substring(0, 12)}
        {text?.toString().length > 12 ? '...' : ''}
      </span>
    ),
    width: 100,
    ellipsis: true,
  })) || [];

  return (
    <div 
      className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => setIsExpanded(!isExpanded)}
      style={{ 
        width: isExpanded ? '650px' : '180px',
        fontSize: '0.8rem'
      }}
    >
      <h3 className="font-bold mb-1 text-gray-700 text-sm flex items-center">
        <DatabaseOutlined className="mr-1" />
        {data.filename || 'Data Table'}
      </h3>
      
      {isExpanded && (
        <div className="mt-1">
          <Table 
            columns={columns} 
            dataSource={data.tableData} 
            size="small"
            pagination={false}
            scroll={{ x: 'max-content', y: 300 }}
            rowKey={(record, index) => index}
            style={{ width: '100%' }}
            className="compact-table"
            bordered={false}
            showHeader={true}
            rowClassName={() => 'hover:bg-blue-50'}
          />
        </div>
      )}
    </div>
  );
}

export default DataTableNode;