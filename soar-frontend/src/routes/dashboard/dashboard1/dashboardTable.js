import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import axios from "axios";
import { incidentTypeMapping } from "../../../components/util/mapping";

const DashboardIncidentTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5002/incidents") // API call for incidents
      .then((response) => {
        console.log("API Response:", response.data); // Debugging line

        if (Array.isArray(response.data)) {
          // Ensure all datetimestamp values are in valid format before sorting
          const formattedData = response.data.map((incident) => {
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

          console.log("Sorted Data:", sortedData); // Debugging line
          setData(sortedData);
        } else {
          console.error("API response is not an array:", response.data);
          setData([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Incident ID",
      dataIndex: "incidentid",
      key: "incidentid",
      fixed: "left",
      align: "center", // Center-align header & content
    },
    {
      title: "Timestamp",
      dataIndex: "datetimestamp",
      key: "datetimestamp",
      align: "center",
    },
    {
      title: "Incident Type",
      dataIndex: "incidenttype",
      key: "incidenttype",
      align: "center",
      render: (incidentType) => incidentTypeMapping[incidentType] || "Unknown",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Attack ID",
      dataIndex: "attack_id",
      key: "attack_id",
      align: "center",
    },
    {
      title: "Playbook ID",
      dataIndex: "playbookid",
      key: "playbookid",
      align: "center",
      render: (playbookid) => (playbookid ? playbookid : "No Playbook Assigned"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
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
        Incident Overview
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
