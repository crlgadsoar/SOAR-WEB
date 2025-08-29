import React, { useState, useEffect, useRef } from "react";
import { Table, Tag, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { fetchIncidents } from "api/api";
import { fetchIncidentActions } from "api/api"; // ✅ Import your API
import { incidentTypeMapping } from "../../../components/util/mapping";

const DashboardIncidentTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchIncidents({ status: "Mitigated" });

        if (Array.isArray(response)) {
          // Format timestamp
          const formattedData = await Promise.all(
            response.map(async (incident) => {
              let formattedTimestamp = incident.datetimestamp;

              if (!isNaN(Date.parse(formattedTimestamp))) {
                formattedTimestamp = new Date(formattedTimestamp)
                  .toISOString()
                  .replace("T", " ")
                  .substring(0, 19);
              } else {
                formattedTimestamp = "0000-00-00 00:00:00";
              }

              // ✅ Fetch actions for each incident
              let actions = [];
              try {
                const actionResponse = await fetchIncidentActions(incident.incidentid);
                if (actionResponse && Array.isArray(actionResponse.actions)) {
                  actions = actionResponse.actions;
                }
              } catch (error) {
                console.error(`Error fetching actions for ${incident.incidentid}:`, error);
              }

              return {
                ...incident,
                datetimestamp: formattedTimestamp,
                actions, // ✅ Add actions to incident data
              };
            })
          );

          const sortedData = formattedData.sort(
            (a, b) => new Date(b.datetimestamp) - new Date(a.datetimestamp)
          );

          setData(sortedData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const widthIncidentID = 100;
  const widthTimestamp = 150;
  const widthAttackType = 120;
  const widthDescription = 250;
  const widthMitreID = 100;
  const widthActions = 250;
  const widthStatus = 150;

  const searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
  });

  const columns = [
    {
      title: "Incident ID",
      dataIndex: "incidentid",
      key: "incidentid",
      fixed: "left",
      align: "center",
      width: widthIncidentID,
    },
    {
      title: "Timestamp",
      dataIndex: "datetimestamp",
      key: "datetimestamp",
      align: "center",
      width: widthTimestamp,
      sorter: (a, b) => new Date(a.datetimestamp) - new Date(b.datetimestamp),
      defaultSortOrder: "descend",
    },
    {
      title: "Incident Type",
      dataIndex: "incidenttype",
      key: "incidenttype",
      align: "center",
      width: widthAttackType,
      render: (incidentType) => incidentTypeMapping[incidentType] || "Unknown",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: widthDescription,
    },
    {
      title: "Attack ID",
      dataIndex: "attack_id",
      key: "attack_id",
      align: "center",
      width: widthMitreID,
      ...getColumnSearchProps("attack_id"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      width: widthActions,
      render: (actions) =>
        actions && actions.length > 0 ? (
          actions.map((action, index) => (
            <Tag color="blue" key={index} style={{ marginBottom: 4 }}>
              {action}
            </Tag>
          ))
        ) : (
          "No Actions"
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: widthStatus,
      filters: [
        { text: "Mitigated", value: "mitigated" },
        { text: "Manually Mitigated", value: "manually mitigated" },
      ],
      onFilter: (value, record) => record.status.toLowerCase() === value,
      render: (status) => {
        let color = "red";
        let text = "Under Investigation";
        if (status) {
          const lowerStatus = status.toLowerCase();
          if (lowerStatus === "mitigated") {
            color = "green";
            text = "Mitigated";
          } else if (lowerStatus === "manually mitigated") {
            color = "blue";
            text = "Manually Mitigated";
          }
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "bold",
          paddingBottom: "10px",
        }}
      >
        Mitigated Incidents
      </h2>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="incidentid"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content", y: 400 }}
        bordered
      />
    </div>
  );
};

export default DashboardIncidentTable;

