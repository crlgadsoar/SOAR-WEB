import { Card, Row, Col } from "antd";
import BarGraph from "components/Echarts/BarGraph";
import LineGraph from "components/Echarts/LineGraph";
import LiquidFillGraph from "components/Echarts/LiquidFillGraph";
import { THEME_ENUM } from "constants/Enum";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DoughnutChart from "components/CanvasJs/DoughnutChart";
import DoughnutChart2 from "components/CanvasJs/DoughnutChart2";
import { fetchIncidents } from "api/fetchData";
import DashboardIncidentTable from "./dashboardTable"; // Import the incident table
import { incidentTypeMapping } from '../../../components/util/mapping';

const Dashboard = () => {
  const { displayMode } = useSelector((state) => state.themeConfig);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchIncidents();
      setIncidents(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // **Initialize Counters**
  const severityCounts = { info: 0, critical: 0, low: 0, medium: 0, high: 0 };
  const statusCounts = { mitigated: 0, "not mitigated": 0 };
  const eventCounts = {};
  const weeklyCounts = {};
  let resolvedCount = 0;
  let totalIncidents = incidents.length;

  // **Process Data**
  incidents.forEach((incident) => {
    // **Count Severity**
    if (incident.severity) {
      const severity = incident.severity.toLowerCase().trim();
      severityCounts[severity] = (severityCounts[severity] || 0) + 1;
    }
    
    // **Count Mitigated vs Not Mitigated**
    const status = incident.status?.toLowerCase().trim(); // Normalize status
    if (status === "mitigated") {
      statusCounts.mitigated++;
    } else {
      statusCounts["not mitigated"]++;
    }

    // **Map Incident Types**
    const eventType = incidentTypeMapping[incident.incidenttype] || `Unknown (${incident.incidenttype})`;
    eventCounts[eventType] = (eventCounts[eventType] || 0) + 1;

    // **Count Incidents Per Day**
    const date = new Date(incident.datetimestamp).toLocaleDateString();
    weeklyCounts[date] = (weeklyCounts[date] || 0) + 1;

    if (status === "mitigated") {
      resolvedCount++;
    }
  });

  // **Prevent Empty Graphs**
  if (statusCounts.mitigated === 0 && statusCounts["not mitigated"] === 0) {
    statusCounts["not mitigated"] = 1; // Prevent empty graph issue
  }

  const resolvedPercentage = totalIncidents > 0 ? (resolvedCount / totalIncidents) * 100 : 0;

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* **Severity Doughnut Chart** */}
        <Col xs={24} md={12}>
          <Card title="Severity" style={{ textAlign: "center" }}>
            <DoughnutChart data={severityCounts} theme={displayMode === "DARK" ? "dark1" : ""} />
          </Card>
        </Col>

        {/* **Status Doughnut Chart (Mitigated vs Not Mitigated)** */}
        <Col xs={24} md={12}>
          <Card title="Incident Status" style={{ textAlign: "center" }}>
            <DoughnutChart2 data={statusCounts} theme={displayMode === "DARK" ? "dark1" : ""} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        {/* **Top Events Bar Graph** */}
        <Col xs={24} md={12}>
          <Card title="Top Events" style={{ textAlign: "center" }}>
            <BarGraph
              data={Object.values(eventCounts)}
              xAxisData={Object.keys(eventCounts)}
              yAxisName="Count"
              theme={THEME_ENUM.LIGHT}
            />
          </Card>
        </Col>

        {/* **Events This Week Line Graph** */}
        <Col xs={24} md={12}>
          <Card title="Event Counts" style={{ textAlign: "center" }}>
            <LineGraph
              data={Object.values(weeklyCounts)}
              xAxisData={Object.keys(weeklyCounts)}
              yAxisName="Count"
              theme={THEME_ENUM.LIGHT}
            />
          </Card>
        </Col>
      </Row>

      {/* **Liquid Fill Graph for Resolved Incidents** */}
      <Row style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Card title="Events Closed" style={{ textAlign: "center" }}>
            <LiquidFillGraph value={[resolvedPercentage]} title="Closed Events" theme={THEME_ENUM.LIGHT} />
          </Card>
        </Col>
      </Row>

      {/* **Incident Table Overview** */}
      <div>
        <h2>Incident Overview</h2>
        <DashboardIncidentTable incidents={incidents} />
      </div>
    </div>
  );
};

export default Dashboard;
