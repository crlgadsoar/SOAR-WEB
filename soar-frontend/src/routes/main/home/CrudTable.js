import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { incidentTypeMapping, sourceMapping, destinationMapping } from "../../../components/util/mapping";

const IncidentTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5002/incidents")
      .then((response) => {
        if (Array.isArray(response.data)) {
          // Sort by datetimestamp in descending order (latest first)
          const sortedData = response.data.sort(
            (a, b) => new Date(b.datetimestamp) - new Date(a.datetimestamp)
          );
          setData(sortedData);
        } else {
          console.error("Error: API response is not an array", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Incident ID",
      dataIndex: "incidentid",
      key: "incidentid",
      width: 120,
      align: "center",
    },
    {
      title: "Timestamp",
      dataIndex: "datetimestamp",
      key: "datetimestamp",
      width: 180,
      align: "center",
    },
    {
      title: "Incident Type",
      dataIndex: "incidenttype",
      key: "incidenttype",
      width: 150,
      align: "center",
      render: (incidentType) => incidentTypeMapping[incidentType] || "Unknown",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 250,
      align: "center",
      ellipsis: false, // ❌ DISABLES TRUNCATION
    },
    {
      title: "Attack ID",
      dataIndex: "attack_id",
      key: "attack_id",
      width: 100,
      align: "center",
      ellipsis: false,
    },
    {
      title: "Event Details",
      dataIndex: "event_details",
      key: "event_details",
      width: 300,
      align: "center",
      ellipsis: false,
      render: (eventDetails) =>
        eventDetails ? (
          <ul style={{ margin: 0, paddingLeft: "15px", textAlign: "left" }}>
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
      width: 150,
      align: "center",
      ellipsis: false,
      render: (eventIdList) =>
        typeof eventIdList === "string" && eventIdList.trim() ? eventIdList : "N/A",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      width: 120,
      align: "center",
      render: (source) => sourceMapping[source] || "Unknown",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      width: 120,
      align: "center",
      render: (destination) => destinationMapping[destination] || "Unknown",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="incidentid"
      pagination={{ pageSize: 10 }}
      scroll={{ x: "max-content", y: 900 }} // ✅ Enables scrolling without cutting text
      sticky // ✅ Keeps headers fixed
      bordered // ✅ Adds borders
    />
  );
};

export default IncidentTable;
