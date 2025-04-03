/*import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import { Table, Spin } from "antd";
import axios from "axios";
import TableData from "./TableData";

const CrudTable = forwardRef(({ openModalHandler, deleteData }, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attackCounts, setAttackCounts] = useState({});
  const isComponentMounted = useRef(true);
  const [tableKey, setTableKey] = useState(0);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

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
    if (count === null || count === undefined) return { backgroundColor: "transparent", color: "inherit" }; // No color for empty cells
    if (count === 0) return { backgroundColor: "#E3FCEC", color: "#2E7D32" }; // Soft Green (0 occurrences)
    if (count >= 1 && count <= 5) return { backgroundColor: "#E3F2FD", color: "#1E88E5" }; // Soft Blue (Low)
    if (count > 5 && count <= 10) return { backgroundColor: "#FFF3E0", color: "#FB8C00" }; // Muted Orange (Moderate)
    return { backgroundColor: "#FFEBEE", color: "#C62828" }; // Light Red (High)
  };

  const columns = [
    { title: "Reconnaissance", dataIndex: "reconnaissance", key: "reconnaissance", width: 140 },
    { title: "Resource Development", dataIndex: "resource" },
    { title: "Initial Access", dataIndex: "initial" },
    { title: "Execution", dataIndex: "execution" },
    { title: "Persistence", dataIndex: "persistence" },
    { title: "Privilege Escalation", dataIndex: "privilege" },
    { title: "Defense Evasion", dataIndex: "defense" },
    { title: "Credential Access", dataIndex: "credential" },
    { title: "Discovery", dataIndex: "discovery" },
    { title: "Lateral Movement", dataIndex: "lateral" },
    { title: "Collection", dataIndex: "collection" },
    { title: "Command and Control", dataIndex: "command" },
    { title: "Exfiltration", dataIndex: "exfiltration" },
    { title: "Impact", dataIndex: "impact" },
  ].map((col) => ({
    ...col,
    align: "center",
    render: (text) => {
      if (!text || !text.name) return <div style={{ minHeight: "50px" }}></div>; // Empty box with no color

      const count = attackCounts[text?.attack_id] ?? null;
      const cellStyle = count !== null ? getCellStyle(count) : { backgroundColor: "transparent" };

      return (
        <div
          style={{
            ...cellStyle,
            fontWeight: "bold",
            padding: "10px",
            borderRadius: "6px",
            textAlign: "center",
            minHeight: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          {text.name}
          {count !== null && count > 0 && <br />}
          {count !== null && count > 0 && `(${count})`}
        </div>
      );
    },
  }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      onChange={onChange}
      loading={loading}
      key={tableKey}
      pagination={{ pageSize: 50 }}
      scroll={{ y: 550 }}
      size="small"
      bordered
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "10px",
      }}
    />
  );
});

export default CrudTable;
*/
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
