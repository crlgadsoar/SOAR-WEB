/*import React from "react";
import ReactEcharts from "echarts-for-react";

const BarGraph = ({ data, xAxisData, yAxisName, style, theme }) => {
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLabel: {
        rotate: 40,
        interval: 0,
        fontSize: 10,
        color: "#000",
      },
    },
    yAxis: {
      type: "value",
      name: yAxisName,
      nameLocation: "center", // ✅ Centers the label on Y-axis
      nameGap: 55, // ✅ Moves label further left, increase if needed
      nameTextStyle: {
        fontSize: 12,
        color: "#000",
        fontWeight: "bold",
      },
    },
    grid: {
      left: 70, // ✅ Increased left margin for proper spacing
      right: 20,
    },
    
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: (10 / xAxisData.length) * 100,
        show: true,
        handleStyle: {
          opacity: 0, // 👈 Hidden by default
        },
        emphasis: {
          handleStyle: {
            opacity: 1, // 👈 Show on hover
          },
        },
        fillerColor: "rgba(24, 144, 255, 0.2)", // Optional: brush background
        backgroundColor: "transparent", // Hide the background
      },
    ],
        

    series: [<ReactEcharts option={options} style={style} theme={theme} />;
};
      {
        type: "bar",
        data: data,
        label: {
          show: true,
          position: "top",
          color: "#000",
          fontSize: 10,
          formatter: "{c}",
        },
        itemStyle: {
          color: "#1890ff",
        },
      },
    ],
  };

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default BarGraph;
*/

import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import "./BarGraph.css";

const BarGraph = ({ data, xAxisData, yAxisName, style, theme }) => {
  const [showZoom, setShowZoom] = useState(false);

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLabel: {
        rotate: 40,
        interval: 0,
        fontSize: 10,
        color: "#000",
      },
    },
    yAxis: {
      type: "value",
      name: yAxisName,
      nameLocation: "center",
      nameGap: 55,
      nameTextStyle: {
        fontSize: 12,
        color: "#000",
        fontWeight: "bold",
      },
    },
    grid: {
      left: 70,
      right: 20,
    },
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: (10 / xAxisData.length) * 100,
        show: showZoom, // 🔥 Toggle visibility based on hover
        handleStyle: {
          opacity: 0.8,
        },
        emphasis: {
          handleStyle: {
            opacity: 1,
          },
        },
        fillerColor: "rgba(24, 144, 255, 0.2)",
        backgroundColor: "transparent",
      },
    ],
    series: [
      {
        type: "bar",
        data: data,
        label: {
          show: true,
          position: "top",
          color: "#000",
          fontSize: 10,
          formatter: "{c}",
        },
        itemStyle: {
          color: "#1890ff",
        },
      },
    ],
  };

  return (
    <div
      className="hover-zoom-container"
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
    >
      <ReactEcharts option={options} style={style} theme={theme} />
    </div>
  );
};

export default BarGraph;
