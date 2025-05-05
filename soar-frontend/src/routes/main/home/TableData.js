import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { fetchIncidents } from "api/api"; // Import the fetchIncidents function

const IncidentTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch incidents using the reusable API function
        const response = await fetchIncidents();
        if (Array.isArray(response)) {
          setData(response);
        } else {
          console.error("Error: API response is not an array", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { title: "Incident ID", dataIndex: "incidentid", key: "incidentid" },
    { title: "Date Timestamp", dataIndex: "datetimestamp", key: "datetimestamp" },
    { title: "Incident Type", dataIndex: "incidenttype", key: "incidenttype" },
    { title: "Severity", dataIndex: "severity", key: "severity" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Attack ID", dataIndex: "attack_id", key: "attack_id" },
    {
      title: "Event Details",
      dataIndex: "event_details",
      key: "event_details",
      render: (eventDetails) =>
        eventDetails ? (
          <ul>
            {Object.entries(eventDetails).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Event ID List",
      dataIndex: "eventidlist",
      key: "eventidlist",
      render: (eventIdList) => {
        // Check if eventIdList is a non-empty string
        if (typeof eventIdList === "string" && eventIdList.trim()) {
          return eventIdList; // Display the string as it is
        } else {
          return "N/A"; // Fallback message if eventIdList is empty or not a string
        }
      },
    },
    { title: "Source", dataIndex: "source", key: "source" },
    { title: "Destination", dataIndex: "destination", key: "destination" },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="incidentid" />;
};

export default IncidentTable;
