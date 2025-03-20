import React from "react";
import CanvasJSReact from "./canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart2 = ({ theme, exportEnable = "", style, data }) => {
  const containerProps = style;
  const options = {
    animationEnabled: true,
    theme: theme,
    exportEnabled: exportEnable,
    legend: {
      verticalAlign: "bottom", // ✅ Legend at bottom
      horizontalAlign: "center",
      fontSize: 14,
    },
    data: [
      {
        type: "doughnut",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{label}: {y}%", // ✅ Shows labels directly on chart
        indexLabelPlacement: "outside",
        indexLabelFontSize: 12,
        showInLegend: true, // ✅ Enables legend
        legendText: "{label}", // ✅ Ensures correct legend text
        dataPoints: [
          { label: "Mitigated", y: data?.mitigated || 0, color: "green" },
          { label: "Under Investigation", y: data?.["not mitigated"] || 0, color: "purple" },
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

export default DoughnutChart2;
