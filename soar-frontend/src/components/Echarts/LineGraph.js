import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import "./LineGraph.css"; // 💡 Don't forget to import CSS

const LineGraph = ({ data, xAxisData, yAxisName, style, theme }) => {
  const [showZoom, setShowZoom] = useState(false);

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
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
        show: showZoom, // 🔥 Toggle slider visibility
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
        type: "line",
        data: data,
        smooth: true,
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
        lineStyle: {
          width: 2,
        },
        symbol: "circle",
        symbolSize: 6,
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

export default LineGraph;

