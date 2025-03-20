import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import { Table, Space, Spin } from "antd";
import axios from "axios";
import TableData from "./TableData";
// import EditDeleteAction from "components/EditDeleteAction";

const CrudTable = React.forwardRef(({ openModalHandler, deleteData }, ref) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [attackCounts, setAttackCounts] = useState({});
  const [_total, setTotal] = React.useState(0);
  const isComponentMounted = React.useRef(true);
  const [tableKey, setTableKey] = React.useState(0);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const resetCallback = () => {
    setTableKey((tableKey) => tableKey + 1);
  };

  const fetchAttackCount = async (attackId) => {
    try {
      const response = await axios.get(`http://localhost:5002/attack_id_count?attack_id=${attackId}`);
      return response.data.count;
    } catch (error) {
      console.error(`Error fetching count for ${attackId}:`, error);
      return 0; // Default to 0 if there's an error
    }
  };

  const getData = useCallback(async () => {
    setLoading(true);
    const attackCountsTemp = {};
    
    await Promise.all(
      TableData.map(async (item) => {
        for (const key in item) {
          if (item[key]?.attack_id) {
            attackCountsTemp[item[key].attack_id] = await fetchAttackCount(item[key].attack_id);
          }
        }
      })
    );

    setAttackCounts(attackCountsTemp);
    setData(TableData);
    setTotal(TableData.length);
    setLoading(false);
  }, []);

  useEffect(() => {
    isComponentMounted.current && getData();
    return () => (isComponentMounted.current = false);
  }, [getData]);

  useImperativeHandle(ref, () => ({
    resetRefHandle: () => setTableKey((prev) => prev + 1),
    reloadDataHandle: getData,
  }));
  
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
  ].map((col) => ({
    ...col,
    render: (text) => (
      <div>
        {text?.name}
        <br />
        <span style={{ fontSize: "12px", color: "gray" }}>
          {attackCounts[text?.attack_id] !== undefined ? (
            `(${attackCounts[text?.attack_id]})`
          ) : (
            <Spin size="small" />
          )}
        </span>
      </div>
    ),
  }));

  // const getData = React.useCallback(async () => {
  //   setLoading(true);
  //   setData(TableData);
  //   setTotal(TableData.length);
  //   setLoading(false);
  // }, []);

  // React.useEffect(() => {
  //   isComponentMounted.current && getData();
  //   return () => (isComponentMounted.current = false);
  // }, [getData]);

  // React.useImperativeHandle(ref, () => ({
  //   resetRefHandle: resetCallback,
  //   reloadDataHandle: getData,
  // }));

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
