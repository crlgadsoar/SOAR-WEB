import React from "react";
import CanvasJSReact from "./canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = ({ theme, exportEnable = "", style, data }) => {
  const containerProps = style;
  const options = {
    animationEnabled: true,
    theme: theme,
    exportEnabled: exportEnable,
    legend: {
      verticalAlign: "bottom", // ✅ Proper legend below chart
      horizontalAlign: "center",
      fontSize: 14,
    },
    data: [
      {
        type: "doughnut",
        toolTipContent: "{label}: <strong>{y}</strong>",
        indexLabel: "{label}: {y}", // ✅ Shows correct labels on chart
        indexLabelPlacement: "outside",
        indexLabelFontSize: 12,
        showInLegend: true, // ✅ Enables legend
        legendText: "{label}", // ✅ Ensures correct legend text
        dataPoints: [
          { label: "Critical", y: data?.critical || 0, color: "red" },
          { label: "Info", y: data?.info || 0, color: "blue" },
          { label: "High", y: data?.high || 0, color: "orange" },
          { label: "Medium", y: data?.medium || 0, color: "yellow" },
          { label: "Low", y: data?.low || 0, color: "green" },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} containerProps={containerProps} />
    </div>
  );
};

export default DoughnutChart;
