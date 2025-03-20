import React from "react";
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

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default BarGraph;
