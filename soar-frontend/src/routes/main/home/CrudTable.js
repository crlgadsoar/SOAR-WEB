import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Tag, Modal, Input, Button, notification } from "antd"; // ← Button added here
import { incidentTypeMapping } from "../../../components/util/mapping";
import { fetchIncidents, mitigateUsingAI, updateIncidentStatusComment, markIncidentAsOld } from "api/api";
import { fetchPlaybookName as getPlaybookNameFromAPI } from "api/fetchData";
import attack_map from "routes/mitre/attack_map";
import { useLocation } from "react-router-dom";
import { BellOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux"; // Import useSelector to access displayMode
import "./IncidentTable.css";
import { Steps } from "antd";
import dayjs from "dayjs";

const { Step } = Steps;

const IncidentTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIncidentId, setCurrentIncidentId] = useState(null);
  const [statusComment, setStatusComment] = useState("");
  const [searchText, setSearchText] = useState("");
  const [viewCommentModalVisible, setViewCommentModalVisible] = useState(false);
  const [viewComment, setViewComment] = useState("");
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [predictedActions, setPredictedActions] = useState({});
  const [flowModalVisible, setFlowModalVisible] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [hoveredRowKey, setHoveredRowKey] = useState(null); // Track the hovered row
  const [selectedPlaybookName, setSelectedPlaybookName] = useState("N/A");

  const previousDataRef = useRef([]);
  const { displayMode } = useSelector((state) => state.themeConfig); // Get displayMode from Redux

  useEffect(() => {
    const fetchData = () => {
      fetchIncidents()
        .then(response => {
          if (Array.isArray(response)) {
            const sortedData = response.sort((a, b) => new Date(b.datetimestamp) - new Date(a.datetimestamp));
            previousDataRef.current = sortedData;
            setData(sortedData);
            setFilteredData(sortedData);
          } else {
            console.error("API response is not an array", response);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = data.filter(item => item.incidentid.toString().toLowerCase().includes(value.toLowerCase()));
    setFilteredData(filtered);
  };

  const handleStatusClick = (incidentId) => {
    setCurrentIncidentId(incidentId);
    setActionModalVisible(true);
  };
  
  const handleAIMitigation = async (incidentid) => {
    try {
      const data = (await mitigateUsingAI(incidentid)).data;
      if (data.predicted_action) {
        setPredictedActions(prev => ({ ...prev, [incidentid]: data.predicted_action }));
      } else {
        alert("Prediction failed or incident not found");
      }
    } catch (err) {
      console.error(err);
      alert("Error during prediction");
    }
  };

  const handleViewComment = (comment) => {
    setViewComment(comment);
    setViewCommentModalVisible(true);
  };

  const handleOk = () => {
    updateIncidentStatusComment(currentIncidentId, statusComment).then(() => {
      setIsModalVisible(false);
    }).catch(error => {
      console.error("Error updating status:", error);
    });
  };


  const fetchPlaybookName = async (playbookId) => {
    if (!playbookId) {
      setSelectedPlaybookName("N/A");
      return;
    }
  
    try {
      const data = await getPlaybookNameFromAPI(playbookId);
      if (data && data.playbook_name) {
        setSelectedPlaybookName(data.playbook_name);
      } else {
        setSelectedPlaybookName("Unknown");
      }
    } catch (error) {
      console.error("Error fetching playbook name:", error);
      setSelectedPlaybookName("Error");
    }
  };
  
  
    
  const handleIncidentClick = async (incidentid) => {
    try {
      const incident = data.find((item) => item.incidentid === incidentid);
      if (incident) {
        setSelectedIncident(incident);
        fetchPlaybookName(incident.playbookid);
      }

      await markIncidentAsOld(incidentid); // Call the API function
      setData((prevData) =>
        prevData.map((item) =>
          item.incidentid === incidentid ? { ...item, isnew: false } : item
        )
      );
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.incidentid === incidentid ? { ...item, isnew: false } : item
        )
      );
    } catch (error) {
      console.error("Error updating isnew status:", error);
    }
  };  

  function getAttackByMitreID(mitreid) {
    const entry = attack_map.find(item => item.mitreid === mitreid);
    return entry ? entry.attack : "Unknown";
}


const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <a onClick={() => confirm()} style={{ marginRight: 8 }}>Search</a>
        <a onClick={() => clearFilters()}>Reset</a>
      </div>
    </div>
  ),
  filterIcon: (filtered) => (
    <span role="img" aria-label="search" style={{ color: filtered ? "#1890ff" : undefined }}>🔍</span>
  ),
  onFilter: (value, record) =>
    record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
});

const widthIncidentID	 = 70;
const widthTimestamp = 70;
const widthAttackType = 80;
const widthDescription = 120;
const widthMitreID = 65;
const widthEventDetails	 = 120;
const widthStatus = 80;
const widthAction = 80;

const columns = [
  {
    title: "Incident ID",
    dataIndex: "incidentid",
    key: "incidentid",
    align: "center",
    width: widthIncidentID,
    render: (incidentid, record) => (
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        onClick={() => handleIncidentClick(incidentid)}
      >
        {incidentid}
        {record.isnew && (
          <span style={{ color: "red", marginLeft: 8, fontWeight: 'bold' }}>New</span>
        )}
      </div>
    ),
  },
  {
    title: "Timestamp",
    dataIndex: "datetimestamp",
    key: "datetimestamp",
    align: "center",
    width: widthTimestamp,
    sorter: (a, b) => new Date(a.datetimestamp) - new Date(b.datetimestamp),
    render: (value) =>
      value ? (
        <div>
          <div>{dayjs(value).format("DD-MMMM-YYYY")}</div>
          <div>{dayjs(value).format("hh:mm:ss A")}</div>
        </div>
      ) : "N/A",
  },
  {
    title: "Attack Type",
    dataIndex: "attack_id",
    key: "attack_type",
    align: "center",
    width: widthAttackType,
    filters: Array.from(new Set(data.map((item) => getAttackByMitreID(item.attack_id))))
      .map(type => ({ text: type, value: type })),
    onFilter: (value, record) => getAttackByMitreID(record.attack_id) === value,
    render: (type) => getAttackByMitreID(type),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    align: "center",
    width: widthDescription,
    render: (text) => (
      <div className="cell-scroll">{text}</div>
    ),
  },
  {
    title: "Mitre ID",
    dataIndex: "attack_id",
    key: "attack_id",
    align: "center",
    width: widthMitreID,
    sorter: (a, b) => a.attack_id.localeCompare(b.attack_id),
  },
  {
    title: "Event Details",
    dataIndex: "event_details",
    key: "event_details",
    align: "center",
    width: widthEventDetails,
    ellipsis: false,
    render: (eventDetails) =>
      eventDetails ? (
        <div className="cell-scroll">
          <ul style={{ margin: 0, paddingLeft: "15px", textAlign: "left" }}>
            {Object.entries(eventDetails).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        "N/A"
      ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    width: widthStatus,
    filters: [
      { text: "Under Investigation", value: "under" },
      { text: "Mitigated", value: "mitigated" },
      { text: "Manually Mitigated", value: "manually" },
    ],
    onFilter: (value, record) => {
      const s = (record.status || "").toLowerCase();
      return (
        (value === "under" && s === "") ||
        (value === "mitigated" && s === "mitigated") ||
        (value === "manually" && s === "manually mitigated")
      );
    },
    render: (status, record) => {
      let color = "red";
      let text = "Under Investigation";

      if(record.attack_id){

      if (record.attack_id.startsWith("T1499")) {
        color = "green";
        text = "Mitigated && Network IP Blocked";
      } else if (record.attack_id.startsWith("T1217")) {
        color = "green";
        text = "Mitigated && Login IP Blocked";
      } else if (record.attack_id.startsWith("T1070")) {
        color = "green";
        text = "Mitigated && Web IP Blocked";
      } else if (record.attack_id.startsWith("T1055.008")) {
        color = "green";
        text = "Mitigated && IP Blocked";
      } else if (status?.toLowerCase() === "mitigated") {
        color = "green";
        text = "Mitigated";
      } else if (status?.toLowerCase() === "manually mitigated") {
        color = "blue";
        text = "Manually Mitigated";
      }
      }

      return (
        <Tag
          color={color}
          onClick={(e) => {
            e.stopPropagation();
            if (text === "Under Investigation") {
              handleStatusClick(record.incidentid);
            } else if (text === "Manually Mitigated") {
              handleViewComment(record.status_comment);
            }
          }}
          style={{ cursor: text.includes("Mitigated") ? "default" : "pointer" }}
        >
          {text}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: widthAction,
  },
];

  return (
    <div style={{ textAlign: "center" }}>
      <Input
        placeholder="Search by Incident ID"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="incidentid"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content", y: 900 }}
        sticky
        bordered
        rowClassName={(record) => {
          let baseClass = "fixed-row";
          if (displayMode === "DARK") {
            baseClass += " " + (hoveredRowKey === record.incidentid ? "hovered-row" : "dark-mode-row");
          } else {
            baseClass += " default-row";
          }
          return baseClass;
        }}
        onRow={(record) => ({
          onMouseEnter: () => {
            if (displayMode === "DARK") {
              setHoveredRowKey(record.incidentid); // Set hovered row key only in dark mode
            }
          },
          onMouseLeave: () => {
            if (displayMode === "DARK") {
              setHoveredRowKey(null); // Reset hovered row key only in dark mode
            }
          },
          onClick: () => {
            // handleIncidentClick(record.incidentid); // Keep this to mark isnew
            setSelectedIncident(record);
            setFlowModalVisible(true);
            handleIncidentClick(record.incidentid); // Handle row click
          },
        })}
      />

<Modal
  visible={flowModalVisible}
  onCancel={() => setFlowModalVisible(false)}
  footer={null}
>

{selectedIncident && (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2 style={{ textTransform: 'uppercase', marginBottom: '20px' }}>
      Incident Flow
    </h2>

    <Steps
      direction="vertical"
      current={2}
      style={{ margin: '0 auto', maxWidth: '600px' }}
    >
      <Step
        title={<span style={{ fontSize: '18px' }}>Incident Detected</span>}
        description={<span style={{ fontSize: '16px' }}>{`ID: ${selectedIncident.incidentid}`}</span>}
      />

      <Step
        title={<span style={{ fontSize: '18px' }}>Playbook Triggered</span>}
        //description={<span style={{ fontSize: '16px' }}>{`Playbook ID: ${selectedIncident.playbookid || 'N/A'}`}</span>}
        description={<span style={{ fontSize: '16px' }}>{`Playbook: ${selectedPlaybookName}`}</span>}
      />

    <Step
        title={<span style={{ fontSize: '18px' }}>Output</span>}
        description={
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            <div
              style={{
                color:
                  selectedIncident.status?.toLowerCase() === "success"
                    ? "green"
                    : "firebrick",
              }}
            >
              Status: {selectedIncident.status || "Under Investigation"}
            </div>
            <div style={{ color: "gray", marginTop: "4px" }}>
              Action: {selectedIncident.action || "Unknown"}
            </div>
          </div>
        }
      />
    </Steps>
  </div>
)}
  
</Modal>

      <Modal
        title="Update Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          value={statusComment}
          onChange={(e) => setStatusComment(e.target.value)}
          placeholder="Enter status comment"
          style={{ marginTop: "10px" }}
        />
      </Modal>

      <Modal
        title="View Comment"
        visible={viewCommentModalVisible}
        onOk={() => setViewCommentModalVisible(false)}
        onCancel={() => setViewCommentModalVisible(false)}
      >
        <p>{viewComment || "No comment available"}</p>
      </Modal>


      <Modal
  title="Choose Mitigation Option"
  visible={actionModalVisible}
  onCancel={() => setActionModalVisible(false)}
  footer={null}
>
  <p>How would you like to mitigate this incident?</p>
  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
  <Button type="default" onClick={() => {
    setActionModalVisible(false);
    setIsModalVisible(true); // open existing comment modal
  }}>
    Manually Mitigate
  </Button>

  <Button className="generate-button" onClick={() => handleAIMitigation(currentIncidentId)}>
  <span>Mitigate using AI ✨</span>
  </Button>

</div>

  {predictedActions[currentIncidentId] && (
    <p style={{ marginTop: "20px" }}>
      <strong>Predicted Action:</strong> {predictedActions[currentIncidentId]}
    </p>
  )}
</Modal>
    </div>
  );
};

export default IncidentTable;