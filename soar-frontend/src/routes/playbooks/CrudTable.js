// CrudTable.js
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Table, Space } from "antd";
import EditDeleteAction from "components/EditDeleteAction";
import { fetchPlaybooks, deletePlaybook, deleteMitrePlaybookMapping } from "api/api";
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
  
    try {
      // Step 1: Delete MITRE mapping via api.js
      const mitreDeleteResponse = await deleteMitrePlaybookMapping(playbookId);
  
      if (mitreDeleteResponse?.status !== 200) {
        throw new Error("Failed to delete MITRE mapping.");
      }
  
      // Step 2: Delete the playbook
      const result = await deletePlaybook(playbookId);
  
      if (result?.status === 200) {
        message.success("Playbook Deleted!");
        setData((prevData) => prevData.filter((p) => p.playbook_id !== playbookId));
      } else {
        message.error("Failed to delete playbook.");
      }
    } catch (error) {
      console.error("Error deleting playbook and MITRE mapping:", error);
      message.error("Error occurred while deleting.");
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
      sorter: (a, b) => {
        const numA = parseInt(a.playbook_id.replace(/\D/g, ""), 10);
        const numB = parseInt(b.playbook_id.replace(/\D/g, ""), 10);
        return numA - numB;
      },
      
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
