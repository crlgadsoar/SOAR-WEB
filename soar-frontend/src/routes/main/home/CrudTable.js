import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, Modal, Input, Button } from "antd";
import { incidentTypeMapping, sourceMapping, destinationMapping } from "../../../components/util/mapping";

const IncidentTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentIncidentId, setCurrentIncidentId] = useState(null);
  const [statusComment, setStatusComment] = useState(""); // New state for status comment
  const [searchText, setSearchText] = useState(""); // State for search input

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
          setFilteredData(sortedData); // Initialize filtered data
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

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.incidentid.toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusClick = (incidentId, status) => {
    setCurrentIncidentId(incidentId);
    setCurrentStatus(status);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    axios
      .post("http://localhost:5002/update_incident_status_comment", {
        incidentid: currentIncidentId,
        status_comment: statusComment, // Include status_comment in the API request
      })
      .then((response) => {
        console.log("Status updated:", response.data);
        setIsModalVisible(false);
        // Optionally, refresh the data or update the specific row
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      ellipsis: false,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status, record) => {
        let color = "red"; // Default color
        let text = "Under Investigation";

        if (status && status.toLowerCase() === "mitigated") {
          color = "green";
          text = "Mitigated";
        }

        if (status && status.toLowerCase() === "manually mitigated") {
          color = "blue";
          text = "Manually Mitigated";
        }

        return (
          <Tag
            color={color}
            onClick={() => text === "Under Investigation" && handleStatusClick(record.incidentid, status)}
            style={{ cursor: text === "Under Investigation" ? "pointer" : "default" }}
          >
            {text}
          </Tag>
        );
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

      {/* Search Input */}
      <Input
        placeholder="Search by Incident ID"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px" }}
      />

      <Table
        columns={columns}
        dataSource={filteredData} // Use filtered data for the table
        loading={loading}
        rowKey="incidentid"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content", y: 900 }} // ✅ Enables scrolling without cutting text
        sticky // ✅ Keeps headers fixed
        bordered // ✅ Adds borders
      />

      <Modal
        title="Update Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={statusComment}
          onChange={(e) => setStatusComment(e.target.value)}
          placeholder="Enter status comment"
          style={{ marginTop: "10px" }}
        />
      </Modal>
    </div>
  );
};

export default IncidentTable;
