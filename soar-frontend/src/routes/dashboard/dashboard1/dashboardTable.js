import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { fetchIncidents } from "api/api"; // Import the fetchIncidents function
import { incidentTypeMapping } from "../../../components/util/mapping";

const DashboardIncidentTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch incidents using the reusable API function
        const response = await fetchIncidents({ status: "Mitigated" });

        if (Array.isArray(response)) {
          // Ensure all datetimestamp values are in valid format before sorting
          const formattedData = response.map((incident) => {
            let formattedTimestamp = incident.datetimestamp;

            // Check if the datetimestamp is valid
            if (!isNaN(Date.parse(formattedTimestamp))) {
              formattedTimestamp = new Date(formattedTimestamp)
                .toISOString()
                .replace("T", " ")
                .substring(0, 19); // Convert to "YYYY-MM-DD HH:MM:SS"
            } else {
              console.warn("Invalid date:", incident.datetimestamp);
              formattedTimestamp = "0000-00-00 00:00:00"; // Fallback
            }

            return {
              ...incident,
              datetimestamp: formattedTimestamp,
            };
          });

          // Sort by timestamp (latest first)
          const sortedData = formattedData.sort(
            (a, b) => new Date(b.datetimestamp) - new Date(a.datetimestamp)
          );

          setData(sortedData);
        } else {
          console.error("API response is not an array:", response);
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

  const widthIncidentID = 50;
  const widthTimestamp = 50;
  const widthAttackType = 50;
  const widthDescription = 50;
  const widthMitreID = 50;
  const widthPlaybookID = 50;
  const widthStatus = 50;

  const columns = [
    {
      title: "Incident ID",
      dataIndex: "incidentid",
      key: "incidentid",
      fixed: "left",
      align: "center", // Center-align header & content
      width: widthIncidentID,
    },
    {
      title: "Timestamp",
      dataIndex: "datetimestamp",
      key: "datetimestamp",
      align: "center",
      width: widthTimestamp,
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
    },
    {
      title: "Playbook ID",
      dataIndex: "playbookid",
      key: "playbookid",
      align: "center",
      width: widthPlaybookID,
      render: (playbookid) => (playbookid ? playbookid : "No Playbook Assigned"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: widthStatus,
      render: (status) => {
        let color = "red"; // Default color
        let text = "Under Investigation";

        if (status && status.toLowerCase() === "mitigated") {
          color = "green";
          text = "Mitigated";
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
        scroll={{ x: "max-content", y: 400 }} // Enable scroll to freeze headers
        bordered // Adds a border for clarity
      />
    </div>
  );
};

export default DashboardIncidentTable;
