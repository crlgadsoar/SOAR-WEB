import React from "react";
import { Table, Space } from "antd";
import TableData from "./TableData";
// import EditDeleteAction from "components/EditDeleteAction";

const CrudTable = React.forwardRef(({ openModalHandler, deleteData }, ref) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [_total, setTotal] = React.useState(0);
  const isComponentMounted = React.useRef(true);
  const [tableKey, setTableKey] = React.useState(0);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const resetCallback = () => {
    setTableKey((tableKey) => tableKey + 1);
  };
  const columns = [
    {
      title: "Reconnaissance",
      dataIndex: "reconnaissance",
      key: "reconnaissance",
      // render: (text) => <a>{text}</a>,
      width: 140,
    },
    {
      title: "Resource Development",
      dataIndex: "resource",
    },
    {
      title: "Initial Access",
      dataIndex: "initial",
    },
    {
      title: "Execution",
      dataIndex: "execution",
    },
    {
      title: "Persistence",
      dataIndex: "persistence",
    },
    {
      title: "Privilege Escalation",
      dataIndex: "privilege",
    },
    {
      title: "Defense Evasion",
      dataIndex: "defense",
    },
    {
      title: "Credential Access",
      dataIndex: "credential",
    },
    {
      title: "Discovery",
      dataIndex: "discovery",
    },
    {
      title: "Lateral Movement",
      dataIndex: "lateral",
    },
    {
      title: "Collection",
      dataIndex: "collection",
    },
    {
      title: "Command and Control",
      dataIndex: "command",
    },
    {
      title: "Exfiltration",
      dataIndex: "exfiltration",
    },
    {
      title: "Impact",
      dataIndex: "impact",
    },
  ];

  const getData = React.useCallback(async () => {
    setLoading(true);
    setData(TableData);
    setTotal(TableData.length);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    isComponentMounted.current && getData();
    return () => (isComponentMounted.current = false);
  }, [getData]);

  React.useImperativeHandle(ref, () => ({
    resetRefHandle: resetCallback,
    reloadDataHandle: getData,
  }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      loading={loading}
      key={tableKey}
      pagination={{ pageSize: 50 }}
      scroll={{ y: 55 * 10 }}
      size="small"
    />
  );
});
export default CrudTable;
