import React from 'react';
import CanvasJSReact from './canvasjs.react';

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineChartZoomPan = ({ title = '', theme, exportEnable = '', style }) => {
  const containerProps = style;
  let limit = 2000;

  let y = 0;
  let data = [];
  let dataSeries = { type: 'line' };
  let dataPoints = [];
  for (let i = 0; i < limit; i += 1) {
    y += Math.random() * 10 - 5;
    dataPoints.push({
      x: i - limit / 2,
      y: y,
    });
  }
  dataSeries.dataPoints = dataPoints;
  data.push(dataSeries);
  const options = {
    animationEnabled: true,
    zoomEnabled: true,
    theme: theme,
    exportEnabled: exportEnable,
    title: {
      text: title,
    },
    axisY: {
      gridThickness: 0.5,
    },
    data: data,
  };
  return (
    <div>
      <CanvasJSChart options={options} containerProps={containerProps} />
    </div>
  );
};

export default LineChartZoomPan;
