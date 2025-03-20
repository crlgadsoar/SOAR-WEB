import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import axios from "axios";
import EditDeleteAction from "components/EditDeleteAction";

const PlaybookCrudTable = ({ openModalHandler, deleteData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5002/playbooks") // Backend API for playbooks
      .then((response) => {
        if (Array.isArray(response.data)) {
          // Sorting data by playbook_id in ascending order
          const sortedData = response.data.sort((a, b) => a.playbook_id - b.playbook_id);
          setData(sortedData);
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

  useEffect(() => {
    console.log("Playbook Data:", data);
  }, [data]);

  const columns = [
    { 
      title: "Playbook ID", 
      dataIndex: "playbook_id", 
      key: "playbook_id",
      sorter: (a, b) => a.playbook_id - b.playbook_id, // Enables column sorting
      defaultSortOrder: "ascend", // Default to ascending order
    },
    { 
      title: "Playbook Name", 
      dataIndex: "playbook_name", 
      key: "playbook_name" 
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Space>
          <EditDeleteAction
            editModalHandler={openModalHandler}
            row={row}
            deleteData={deleteData}
          />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="playbook_id" />;
};

export default PlaybookCrudTable;
