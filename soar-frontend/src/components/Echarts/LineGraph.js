import React from "react";
import ReactEcharts from "echarts-for-react";

const LineGraph = ({ data, xAxisData, yAxisName, style, theme }) => {
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLabel: {
        rotate: 40, // ✅ Rotates labels to prevent overlap
        interval: 0, // ✅ Shows all labels
        fontSize: 10,
        color: "#000",
      },
    },
    yAxis: {
      type: "value",
      name: yAxisName,
      nameLocation: "center", // ✅ Centers the label
      nameGap: 55, // ✅ Moves label left without overlap
      nameTextStyle: {
        fontSize: 12,
        color: "#000",
        fontWeight: "bold",
      },
    },
    grid: {
      left: 70, // ✅ Ensures space for Y-axis label
      right: 20,
    },
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

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default LineGraph;
