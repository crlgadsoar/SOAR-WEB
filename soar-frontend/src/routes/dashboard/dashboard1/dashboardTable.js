import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
// Import mappings from mapping.js if needed, adjust the path as required.
import { incidentTypeMapping, sourceMapping, destinationMapping } from '../../../components/util/mapping';

const DashboardIncidentTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5001/incidents") // API call for incidents
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Error: API response is not an array", response.data);
          setData([]); // In case the response isn't in the expected format
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]); // Handle the error gracefully
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
      render: (incidentType) => incidentTypeMapping[incidentType] || "Unknown" // Map incident type to readable format
    },
    { title: "Severity", dataIndex: "severity", key: "severity" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Attack ID", dataIndex: "attack_id", key: "attack_id" },
    { title: "Playbook ID", dataIndex: "playbookid", key: "playbookid" },

    {
      title: "Event Details",
      dataIndex: "event_details",
      key: "event_details",
      render: (eventDetails) =>
        eventDetails && Object.keys(eventDetails).length > 0 ? (
          <ul>
            {Object.entries(eventDetails).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        ) : (
          "N/A" // Show "N/A" if event_details is empty or not available
        ),
    },
  
    
    {
      title: "Resolved",
      dataIndex: "resolved",
      key: "resolved",
      render: (resolved) => (resolved ? "Yes" : "No"), // Fallback to "No" if resolved is false or missing
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? status : "Unknown"), // Fallback to "Unknown" if status is null or undefined
    }, // Status column
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="incidentid" />;
};

export default DashboardIncidentTable;
