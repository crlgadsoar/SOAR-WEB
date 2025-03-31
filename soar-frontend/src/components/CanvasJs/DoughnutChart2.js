import React from "react";
import CanvasJSReact from "./canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart2 = ({ theme, exportEnable = "", style, data }) => {
  const containerProps = style;

  // Extract values safely from data
  const mitigated = data?.mitigated || 0;
  const manuallyMitigated = data?.["mitigated_manually"] || 0;
  const notMitigated = data?.["not mitigated"] || 0;

  // Calculate total incidents
  const total = mitigated + manuallyMitigated + notMitigated;

  // Calculate percentages
  const mitigatedPercentage = total ? (mitigated / total) * 100 : 0;
  const manuallyMitigatedPercentage = total ? (manuallyMitigated / total) * 100 : 0;
  const notMitigatedPercentage = total ? (notMitigated / total) * 100 : 0;


  const options = {
    animationEnabled: true,
    theme: theme,
    exportEnabled: exportEnable,
    legend: {
      verticalAlign: "bottom",
      horizontalAlign: "center",
      fontSize: 14,
    },
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        toolTipContent: "{label}: {y}% ({count} incidents)", // Shows count & percentage
        indexLabel: "{label}: {y}%", // Display labels on chart
        indexLabelPlacement: "outside",
        indexLabelFontSize: 14,
        legendText: "{label}",
        dataPoints: [
          {
            label: "Mitigated",
            y: parseFloat(mitigatedPercentage.toFixed(1)),
            count: mitigated,
            color: "green",
          },
          {
            label: "Manually Mitigated",
            y: parseFloat(manuallyMitigatedPercentage.toFixed(1)),
            count: manuallyMitigated,
            color: "blue",
          },
          {
            label: "Under Investigation",
            y: parseFloat(notMitigatedPercentage.toFixed(1)),
            count: notMitigated,
            color: "purple",
          },
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
