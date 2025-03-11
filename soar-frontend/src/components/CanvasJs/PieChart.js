import React from 'react';
import CanvasJSReact from './canvasjs.react';

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Piechart = ({ title = '', theme, exportEnable = '', style }) => {
  const containerProps = style;

  const options = {
    animationEnabled: true,
    theme: theme,
    exportEnabled: exportEnable,
    title: { text: title },
    data: [
      {
        type: 'pie',
        // showInLegend: true,
        legendText: '{label}',
        toolTipContent: '{label}: <strong>{y}%</strong>',
        indexLabel: '{label}: {y}%',
        startAngle: -90,
        // indexLabelPlacement: 'inside',
        dataPoints: [
          { y: 32, label: 'Health' },
          { y: 22, label: 'Finance' },
          { y: 15, label: 'Education' },
          { y: 19, label: 'Career' },
          { y: 5, label: 'Family' },
          { y: 7, label: 'Real Estate' },
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

export default Piechart;
