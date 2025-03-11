import React from 'react';
import ReactEcharts from 'echarts-for-react';

const ParallelChart = ({ data, dimensions, style, theme, categoryName }) => {
  const options = {
    tooltip: {
      trigger: 'item',
      show: true,
    },
    parallelAxis: dimensions.map((dimension) => ({
      dim: dimension,
      name: dimension,
      type: 'value',
    })),
    parallel: {
      left: '5%',
      right: '13%',
      bottom: '10%',
      top: '20%',
      parallelAxisDefault: {
        type: 'value',
        name: categoryName,
      },
    },
    series: [
      {
        name: categoryName,
        type: 'parallel',
        smooth: true,
        lineStyle: {
          width: 2,
        },
        data,
      },
    ],
  };

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default ParallelChart;
