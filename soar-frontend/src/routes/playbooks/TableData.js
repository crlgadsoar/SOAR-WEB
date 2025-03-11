import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";

const PlaybookTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5001/playbooks") // Replace with actual API endpoint
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Error: API response is not an array", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching playbook data:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { title: "Playbook ID", dataIndex: "playbook_id", key: "playbook_id" },
    { title: "Playbook Name", dataIndex: "playbook_name", key: "playbook_name" },
  ];

  return (
    <>
      {console.log("Playbook Data:", data)}
      <Table columns={columns} dataSource={data} loading={loading} rowKey="playbook_id" />
    </>
  );
};

export default PlaybookTable;
