// import React from "react";
// import CanvasJSReact from "./canvasjs.react";

// // const CanvasJS = CanvasJSReact.CanvasJS;
// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// const DoughnutChart2 = ({ title = "", theme, exportEnable = "", style }) => {
//   const containerProps = style;
//   const options = {
//     animationEnabled: true,
//     theme: theme,
//     exportEnabled: exportEnable,
//     title: { text: title },
//     data: [
//       {
//         type: "doughnut",
//         legendText: "{label}",
//         toolTipContent: "{label}: <strong>{y}%</strong>",
//         indexLabel: "{label}: {y}",
//         dataPoints: [
//           { label: "New", y: 10 },
//           { label: "Open", y: 40 },
//           { label: "Closed", y: 50 },
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

// export default DoughnutChart2;


import React from "react";
import CanvasJSReact from "./canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart2 = ({ theme, exportEnable = "", style, data }) => {
  const containerProps = style;
  const options = {
    animationEnabled: true,
    theme: theme,
    exportEnabled: exportEnable,
   // title: { text: "Incident Status" },
    data: [
      {
        type: "doughnut",
        toolTipContent: "{label}: <strong>{y}%</strong>",
        indexLabel: "{label}: {y}",
        dataPoints: [
          { label: "Mitigated", y: data.mitigated || 0, color: "green" },
          { label: "Under Investigation", y: data["under investigation"] || 0, color: "purple" },
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

