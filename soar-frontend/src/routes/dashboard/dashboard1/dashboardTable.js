import React, { useState, useEffect } from "react";
import { Table } from "antd";
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
    { title: "Incident ID", dataIndex: "incidentid", key: "incidentid" },
    { title: "Date Timestamp", dataIndex: "datetimestamp", key: "datetimestamp" },
    {
      title: "Incident Type",
      dataIndex: "incidenttype",
      key: "incidenttype",
      render: (incidentType) => incidentTypeMapping[incidentType] || "Unknown",
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Attack ID", dataIndex: "attack_id", key: "attack_id" },
    { title: "Playbook ID", dataIndex: "playbookid", key: "playbookid" },
   
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? status : "Under Investigation"),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="incidentid"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default DashboardIncidentTable;
