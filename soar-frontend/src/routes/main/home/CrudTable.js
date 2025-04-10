import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table, Tag, Modal, Input, notification } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { incidentTypeMapping } from "../../../components/util/mapping";
import attack_map from "routes/mitre/attack_map";
import "./IncidentTable.css";
import { Steps } from "antd";
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
  const [flowModalVisible, setFlowModalVisible] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);


  const previousDataRef = useRef([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:5002/incidents")
        .then(response => {
          if (Array.isArray(response.data)) {
            const sortedData = response.data.sort((a, b) => new Date(b.datetimestamp) - new Date(a.datetimestamp));
            const previousData = previousDataRef.current;
            if (previousData.length > 0 && sortedData.length > previousData.length) {
              const newEntries = sortedData.slice(0, sortedData.length - previousData.length);
              newEntries.forEach(entry => {
                notification.info({
                  message: "New Incident Added",
                  description: `Incident ID: ${entry.incidentid} has been added.`,
                  placement: "topRight",
                });
              });
            }
            previousDataRef.current = sortedData;
            setData(sortedData);
            setFilteredData(sortedData);
          } else {
            console.error("API response is not an array", response.data);
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
    const filtered = data.filter(item =>
      item.incidentid.toString().toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleStatusClick = (incidentId) => {
    setCurrentIncidentId(incidentId);
    setIsModalVisible(true);
  };

  const handleViewComment = (comment) => {
    setViewComment(comment);
    setViewCommentModalVisible(true);
  };

  const handleOk = () => {
    axios.post("http://localhost:5002/update_incident_status_comment", {
      incidentid: currentIncidentId,
      status_comment: statusComment,
    }).then(() => {
      setIsModalVisible(false);
    }).catch(error => {
      console.error("Error updating status:", error);

  const handleIncidentClick = (incidentid) => {
    axios.post("http://localhost:5002/incidents/mark_old", { incidentid })
      .then(() => {
        setData(prevData =>
          prevData.map(item =>
            item.incidentid === incidentid ? { ...item, isnew: false } : item
          )
        );
        setFilteredData(prevData =>
          prevData.map(item =>
            item.incidentid === incidentid ? { ...item, isnew: false } : item
          )
        );
      })
      .catch(error => {
        console.error("Error updating isnew status:", error);
      });
  };  

    });
  };

  const handleIncidentClick = (incidentid) => {
    axios.post("http://localhost:5002/incidents/mark_old", { incidentid })
      .then(() => {
        setData(prevData =>
          prevData.map(item =>
            item.incidentid === incidentid ? { ...item, isnew: false } : item
          )
        );
        setFilteredData(prevData =>
          prevData.map(item =>
            item.incidentid === incidentid ? { ...item, isnew: false } : item
          )
        );
      })
      .catch(error => {
        console.error("Error updating isnew status:", error);
      });
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

  const columns = [
    {
      title: "Incident ID",
      dataIndex: "incidentid",
      key: "incidentid",
      align: "center",
      render: (incidentid, record) => (
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onClick={() => handleIncidentClick(incidentid)}
        >
          {incidentid}
          {record.isnew && (
            <BellOutlined style={{ color: "red", marginLeft: 8 }} />
          )}
        </div>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "datetimestamp",
      key: "datetimestamp",
      align: "center",
      sorter: (a, b) => new Date(a.datetimestamp) - new Date(b.datetimestamp),
    },
    {
      title: "Attack Type",
      dataIndex: "attack_id",
      key: "attack_type",
      align: "center",
      width: 150,
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
    },
    {
      title: "Attack ID",
      dataIndex: "attack_id",
      key: "attack_id",
      align: "center",
      sorter: (a, b) => a.attack_id.localeCompare(b.attack_id),
    },
    {
      title: "Event Details",
      dataIndex: "event_details",
      key: "event_details",
      align: "center",
      width: 300,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
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
  
        return (
          <Tag
            color={color}
            onClick={() => {
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
  ];
  

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
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
        rowClassName={() => "default-row"}
        onRow={(record) => ({
          onClick: () => {
            handleIncidentClick(record.incidentid); // Keep this to mark isnew
            setSelectedIncident(record);
            setFlowModalVisible(true);
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
        description={<span style={{ fontSize: '16px' }}>{`Playbook ID: ${selectedIncident.playbookid || 'N/A'}`}</span>}
      />

      <Step
        title={<span style={{ fontSize: '18px' }}>Output</span>}
        description={
          <span
            style={{
              fontSize: '16px',
              color: (() => {
                const output =
                  selectedIncident.attack_id?.startsWith("T1499") ||
                  selectedIncident.attack_id?.startsWith("T1217") ||
                  selectedIncident.attack_id?.startsWith("T1070") ||
                  selectedIncident.attack_id?.startsWith("T1055.008");

                return output ? 'green' : 'firebrick';
              })(),
              fontWeight: 'bold',
            }}
          >
            {selectedIncident.attack_id?.startsWith("T1499")
              ? "Network IP Blocked"
              : selectedIncident.attack_id?.startsWith("T1217")
              ? "Login IP Blocked"
              : selectedIncident.attack_id?.startsWith("T1070")
              ? "Web IP Blocked"
              : selectedIncident.attack_id?.startsWith("T1055.008")
              ? "IP Blocked"
              : selectedIncident.status || "Under Investigation"}
          </span>
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
    </div>
  );
};

export default IncidentTable;
