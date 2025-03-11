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
import DashboardIncidentTable from "./dashboardTable"; // Import the new table

const Dashboard = () => {
  const { displayMode } = useSelector((state) => state.themeConfig);
  const [incidents, setIncidents] = useState([]);

  // Fetch incidents every 5 seconds (Real-time updates)
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchIncidents();
      setIncidents(data);
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Refresh every 5 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Process data for charts
  const severityCounts = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };

  const statusCounts = {
    mitigated: 0,
    "under investigation": 0,
  };

  const eventCounts = {};
  const weeklyCounts = {};

  let resolvedCount = 0;
  let totalIncidents = incidents.length;

  incidents.forEach((incident) => {
    // Count severity levels
    if (incident.severity) {
      severityCounts[incident.severity.toLowerCase()] =
        (severityCounts[incident.severity.toLowerCase()] || 0) + 1;
    }

    // Count resolved/unresolved incidents as status
    if (incident.resolved === "Yes") {
      statusCounts.mitigated++;
    } else {
      statusCounts["under investigation"]++;
    }

    // Count incident types for bar chart
    eventCounts[incident.incidenttype] =
      (eventCounts[incident.incidenttype] || 0) + 1;

    // Count incidents per day for line chart
    const date = new Date(incident.datetimestamp).toLocaleDateString();
    weeklyCounts[date] = (weeklyCounts[date] || 0) + 1;

    // Count resolved incidents
    if (incident.resolved === "Yes") {
      resolvedCount++;
    }
  });

  const resolvedPercentage =
    totalIncidents > 0 ? (resolvedCount / totalIncidents) * 100 : 0;

  return (
    <div style={{ padding: "20px" }}>
      {/* First Row - Severity & Status */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Severity" style={{ textAlign: "center" }}>
            <DoughnutChart
              data={severityCounts}
              theme={displayMode === "DARK" ? "dark1" : ""}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Status" style={{ textAlign: "center" }}>
            <DoughnutChart2
              data={statusCounts} // Updated statusCounts with resolved mapping
              theme={displayMode === "DARK" ? "dark1" : ""}
            />
          </Card>
        </Col>
      </Row>

      {/* Second Row - Top Events & Events This Week */}
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
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

        <Col xs={24} md={12}>
          <Card title="Events This Week" style={{ textAlign: "center" }}>
            <LineGraph
              data={Object.values(weeklyCounts)}
              xAxisData={Object.keys(weeklyCounts)}
              yAxisName="Count"
              theme={THEME_ENUM.LIGHT}
            />
          </Card>
        </Col>
      </Row>

      {/* Third Row - Liquid Fill Graph (Full Width) */}
      <Row style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Card title="Events Closed" style={{ textAlign: "center" }}>
            <LiquidFillGraph
              value={[resolvedPercentage]}
              title="Closed Events"
              theme={THEME_ENUM.LIGHT}
            />
          </Card>
        </Col>
      </Row>

      {/* Incident Overview Table */}
      <div>
        <h2>Incident Overview</h2>
        <DashboardIncidentTable incidents={incidents} />
      </div>
    </div>
  );
};

export default Dashboard;
