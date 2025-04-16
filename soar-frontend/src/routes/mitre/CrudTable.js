import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import { Table } from "antd";
import axios from "axios";
import TableData from "./TableData";
import "./CrudTable.css";

const CrudTable = forwardRef(({ openModalHandler, deleteData }, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attackCounts, setAttackCounts] = useState({});
  const isComponentMounted = useRef(true);
  const [tableKey, setTableKey] = useState(0);

  const fetchAttackCount = async (attackId) => {
    try {
      const response = await axios.get(`http://localhost:5002/attack_id_count?attack_id=${attackId}`);
      return response.data.count;
    } catch (error) {
      console.error(`Error fetching count for ${attackId}:`, error);
      return null;
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
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isComponentMounted.current) getData();
    return () => (isComponentMounted.current = false);
  }, [getData]);

  useImperativeHandle(ref, () => ({
    resetRefHandle: () => setTableKey((prev) => prev + 1),
    reloadDataHandle: getData,
  }));

  // Function to determine cell styling
  const getCellStyle = (count) => {
    if (count === null || count === undefined) return { backgroundColor: "transparent", color: "inherit" };
    if (count === 0) return { backgroundColor: "transparent", color: "inherit" };
    if (count >= 1 && count <= 10) return { backgroundColor: "#E3F2FD", color: "inherit" };
    return { backgroundColor: "#FFEBEE", color: "inherit" };
  };

  const columns = [
    { title: "Reconnaissance", dataIndex: "reconnaissance", key: "reconnaissance", width: 110 },
    { title: "Resource Development", dataIndex: "resource", key: "resource", width: 150 },
    { title: "Initial Access", dataIndex: "initial", key: "initial", width: 110 },
    { title: "Execution", dataIndex: "execution", key: "execution", width: 110 },
    { title: "Persistence", dataIndex: "persistence", key: "persistence", width: 110 },
    { title: "Privilege Escalation", dataIndex: "privilege", key: "privilege", width: 150 },
    { title: "Defense Evasion", dataIndex: "defense", key: "defense", width: 110 },
    { title: "Credential Access", dataIndex: "credential", key: "credential", width: 150 },
    { title: "Discovery", dataIndex: "discovery", key: "discovery", width: 110 },
    { title: "Lateral Movement", dataIndex: "lateral", key: "lateral", width: 150 },
    { title: "Collection", dataIndex: "collection", key: "collection", width: 110 },
    { title: "Command and Control", dataIndex: "command", key: "command", width: 150 },
    { title: "Exfiltration", dataIndex: "exfiltration", key: "exfiltration", width: 110 },
    { title: "Impact", dataIndex: "impact", key: "impact", width: 110 },
  ].map((col) => ({
    ...col,
    align: "center",
    render: (text) => {
      if (!text || !text.name) return <div className="table-cell-wrapper empty-cell"></div>;

      const count = attackCounts[text?.attack_id] ?? null;
      const cellStyle = count !== null ? getCellStyle(count) : { backgroundColor: "transparent" };

      return (
        <div className="table-cell-wrapper">
          <div className="table-cell" style={cellStyle}>
            {text.name}
            {count !== null && count > 0 && <br />}
            {count !== null && count > 0 && `(${count})`}
          </div>
        </div>
      );
    },
  }));

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        key={tableKey}
        pagination={false}
        bordered
        size="small"
        rowClassName={() => "custom-row"}
        scroll={false} // Prevents horizontal scrolling
      />
    </div>
  );
});

export default CrudTable;
