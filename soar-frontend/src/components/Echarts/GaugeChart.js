import React from 'react';
import ReactEcharts from 'echarts-for-react';

const GaugeChart = ({ value, min, max, style, theme, categoryName }) => {
  const options = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    series: [
      {
        name: categoryName,
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value, name: categoryName }],
        min,
        max,
      },
    ],
  };

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default GaugeChart;
