import React from 'react';
import ReactEcharts from 'echarts-for-react';

const HorizontalBarGraph = ({ style, theme }) => {
  const options = {
    dataset: {
      source: [
        ['score', 'energy', 'company'],
        [89.3, 58212, 'BEL'],
        [57.1, 78254, 'BDL'],
        [74.4, 41032, 'HAL'],
        [50.1, 12755, 'GRS'],
        [89.7, 20145, 'CEL'],
      ],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: { containLabel: true },
    xAxis: { name: 'energy' },
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      text: ['High Score', 'Low Score'],
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F'],
      },
    },
    series: [
      {
        type: 'bar',
        encode: {
          x: 'energy',
          y: 'company',
        },
      },
    ],
  };
  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default HorizontalBarGraph;
