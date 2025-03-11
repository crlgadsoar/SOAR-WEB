// import React from "react";
// import CanvasJSReact from "./canvasjs.react";

// // const CanvasJS = CanvasJSReact.CanvasJS;
// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const DoughnutChart = ({ title = "", theme, exportEnable = "", style }) => {
//   const containerProps = style;
//   const options = {
//     animationEnabled: true,
//     theme: theme,
//     exportEnabled: exportEnable,
//     title: { text: title },
//     // subtitles: [
//     //   {
//     //     text: "71% Positive",
//     //     verticalAlign: "center",
//     //     fontSize: 12,
//     //     dockInsidePlotArea: true,
//     //   },
//     // ],
//     data: [
//       {
//         type: "doughnut",
//         // showInLegend: true,
//         legendText: "{label}",
//         toolTipContent: "{label}: <strong>{y}%</strong>",
//         indexLabel: "{label}: {y}",
//         // indexLabelPlacement: 'inside',
//         dataPoints: [
//           { label: "Critical", y: 10 },
//           { label: "High", y: 20 },
//           { label: "Medium", y: 30 },
//           { label: "Low", y: 40 },
//           // { label: "Neutral", y: 7 },
//         ],
//       },
//     ],
//   };
//   return (
//     <div>
//       <CanvasJSChart options={options} containerProps={containerProps} />
//     </div>
//   );
// };

// export default DoughnutChart;
import React from "react";
import CanvasJSReact from "./canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = ({ theme, exportEnable = "", style, data }) => {
  const containerProps = style;
  const options = {
    animationEnabled: true,
    theme: theme,
    exportEnabled: exportEnable,
  //  title: { text: "Severity Levels" },
    data: [
      {
        type: "doughnut",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{label}: {y}",
        dataPoints: [
          { label: "Critical", y: data.critical || 0, color: "red" },
          { label: "High", y: data.high || 0, color: "orange" },
          { label: "Medium", y: data.medium || 0, color: "yellow" },
          { label: "Low", y: data.low || 0, color: "green" },
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
