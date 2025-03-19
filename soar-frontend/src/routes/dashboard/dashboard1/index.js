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
import DashboardIncidentTable from "./dashboardTable";
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
    if (incident.severity) {
      const severity = incident.severity.toLowerCase().trim();
      severityCounts[severity] = (severityCounts[severity] || 0) + 1;
    }
    
    const status = incident.status?.toLowerCase().trim();
    if (status === "mitigated") {
      statusCounts.mitigated++;
    } else {
      statusCounts["not mitigated"]++;
    }

    const eventType = incidentTypeMapping[incident.incidenttype] || `Unknown (${incident.incidenttype})`;
    eventCounts[eventType] = (eventCounts[eventType] || 0) + 1;

    const date = new Date(incident.datetimestamp).toLocaleDateString();
    weeklyCounts[date] = (weeklyCounts[date] || 0) + 1;

    if (status === "mitigated") {
      resolvedCount++;
    }
  });

  if (statusCounts.mitigated === 0 && statusCounts["not mitigated"] === 0) {
    statusCounts["not mitigated"] = 1;
  }

  const resolvedPercentage = totalIncidents > 0 ? (resolvedCount / totalIncidents) * 100 : 0;

  return (
    <div style={{ padding: "20px" }}>
      
      {/* Dashboard Title */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "26px",
          fontWeight: "600",
          background: "linear-gradient(90deg, #0F2027, #203A43, #2C5364)",
          color: "white",
          padding: "18px",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(15, 32, 39, 0.5)",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        SOAR: Security Orchestration, Automation, and Response
      </h1>

      {/* **First Row: Doughnut Charts + Liquid Fill Graph (Equal Height Cards)** */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col xs={24} md={8}>
          <Card title="Severity" style={{ textAlign: "center", height: "100%" }}>
            <DoughnutChart data={severityCounts} theme={displayMode === "DARK" ? "dark1" : ""} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Incident Status" style={{ textAlign: "center", height: "100%" }}>
            <DoughnutChart2 data={statusCounts} theme={displayMode === "DARK" ? "dark1" : ""} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Events Closed" style={{ textAlign: "center", height: "100%" }}>
            <LiquidFillGraph value={[resolvedPercentage]} title="Closed Events" theme={THEME_ENUM.LIGHT} />
          </Card>
        </Col>
      </Row>

      {/* **Second Row: Bar Graph & Line Graph (Equal Height Cards)** */}
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} md={12}>
          <Card title="Top Events" style={{ textAlign: "center", height: "100%" }}>
            <BarGraph
              data={Object.values(eventCounts)}
              xAxisData={Object.keys(eventCounts)}
              yAxisName="Count"
              theme={THEME_ENUM.LIGHT}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Event Counts" style={{ textAlign: "center", height: "100%" }}>
            <LineGraph
              data={Object.values(weeklyCounts)}
              xAxisData={Object.keys(weeklyCounts)}
              yAxisName="Count"
              theme={THEME_ENUM.LIGHT}
            />
          </Card>
        </Col>
      </Row>

      {/* **Incident Table Overview** */}
      <div style={{ marginTop: "16px" }}>
        <DashboardIncidentTable incidents={incidents} />
      </div>
    </div>
  );
};

export default Dashboard;
