import React from "react";

import { Card } from "antd";
import PieChart from "components/CanvasJs/PieChart";
import { useSelector } from "react-redux";
import DoughnutChart from "components/CanvasJs/DoughnutChart";
import DoughnutChart2 from "components/CanvasJs/DoughnutChart2";

const Dashboard5 = () => {
  const { displayMode } = useSelector((state) => state.themeConfig);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Card title={"Pie graph"} style={{ margin: "5px", width: "400px" }}>
        <PieChart
          exportEnable={false}
          theme={displayMode === "DARK" ? "dark1" : ""}
          style={{ width: "100%", height: "300px", position: "relative" }}
        />
      </Card>

      <Card title={"Status"} style={{ margin: "5px", width: "400px" }}>
        <DoughnutChart2
          exportEnable={false}
          theme={displayMode === "DARK" ? "dark1" : ""}
          style={{ width: "100%", height: "300px", position: "relative" }}
        />
      </Card>

      <Card title={"Severity"} style={{ margin: "5px", width: "400px" }}>
        <DoughnutChart
          exportEnable={false}
          theme={displayMode === "DARK" ? "dark1" : ""}
          style={{ width: "100%", height: "300px", position: "relative" }}
        />
      </Card>
    </div>
  );
};

export default Dashboard5;
