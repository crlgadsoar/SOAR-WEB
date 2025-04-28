// CrudTable.js
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Table, Space } from "antd";
import EditDeleteAction from "components/EditDeleteAction";
import { fetchPlaybooks, deletePlaybook } from "api/api";
import { message } from "antd";

const PlaybookCrudTable = ({ openModalHandler }, ref) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    fetchPlaybooks()
      .then((response) => {
        if (Array.isArray(response.data)) {
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
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (playbookId) => {
    console.log("Deleting playbook with ID:", playbookId);
    const result = await deletePlaybook(playbookId);
    if (result?.status === 200) {
      message.success("Playbook deleted!");
      setData((prevData) => prevData.filter((p) => p.playbook_id !== playbookId));
    } else {
      alert("Failed to delete playbook.");
    }
  };

  // ✅ Expose reload method to parent using ref
  useImperativeHandle(ref, () => ({
    reloadDataHandle: loadData,
  }));

  const columns = [
    {
      title: "Playbook ID",
      dataIndex: "playbook_id",
      key: "playbook_id",
      sorter: (a, b) => a.playbook_id - b.playbook_id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Playbook Name",
      dataIndex: "playbook_name",
      key: "playbook_name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Space>
          <EditDeleteAction
            editModalHandler={openModalHandler}
            row={row}
            deleteData={() => handleDelete(row.playbook_id)}
          />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="playbook_id" />;
};

// ✅ Export wrapped with forwardRef
export default forwardRef(PlaybookCrudTable);
