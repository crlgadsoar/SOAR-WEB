import React from 'react';
import CanvasJSReact from './canvasjs.react';

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const StackedAreaChart = ({ title = '', theme, exportEnable = '', style }) => {
  const containerProps = style;
  const options = {
    animationEnabled: true,
    theme: theme,
    exportEnabled: exportEnable,
    title: {
      text: 'Energy usage for Air Conditioning',
    },
    axisY: {
      title: 'Energy (in terawatt hours)',
      gridThickness: 0.5,
    },

    toolTip: {
      shared: true,
    },
    legend: {
      verticalAlign: 'center',
      horizontalAlign: 'right',
      reversed: true,
      cursor: 'pointer',
    },
    data: [
      {
        type: 'stackedArea',
        name: 'US',
        showInLegend: true,
        xValueFormatString: 'YYYY',
        dataPoints: [
          { x: new Date(1990, 0), y: 339 },
          { x: new Date(2000, 0), y: 448 },
          { x: new Date(2010, 0), y: 588 },
          { x: new Date(2016, 0), y: 616 },
        ],
      },
      {
        type: 'stackedArea',
        name: 'European Union',
        showInLegend: true,
        xValueFormatString: 'YYYY',
        dataPoints: [
          { x: new Date(1990, 0), y: 63 },
          { x: new Date(2000, 0), y: 100 },
          { x: new Date(2010, 0), y: 149 },
          { x: new Date(2016, 0), y: 152 },
        ],
      },
      {
        type: 'stackedArea',
        name: 'Japan',
        showInLegend: true,
        xValueFormatString: 'YYYY',
        dataPoints: [
          { x: new Date(1990, 0), y: 48 },
          { x: new Date(2000, 0), y: 100 },
          { x: new Date(2010, 0), y: 119 },
          { x: new Date(2016, 0), y: 107 },
        ],
      },
      {
        type: 'stackedArea',
        name: 'China',
        showInLegend: true,
        xValueFormatString: 'YYYY',
        dataPoints: [
          { x: new Date(1990, 0), y: 7 },
          { x: new Date(2000, 0), y: 45 },
          { x: new Date(2010, 0), y: 243 },
          { x: new Date(2016, 0), y: 450 },
        ],
      },
      {
        type: 'stackedArea',
        name: 'India',
        showInLegend: true,
        xValueFormatString: 'YYYY',
        dataPoints: [
          { x: new Date(1990, 0), y: 6 },
          { x: new Date(2000, 0), y: 22 },
          { x: new Date(2010, 0), y: 49 },
          { x: new Date(2016, 0), y: 91 },
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

export default StackedAreaChart;
