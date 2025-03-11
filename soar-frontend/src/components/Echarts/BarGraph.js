import React from 'react';
import ReactEcharts from 'echarts-for-react';

const BarGraph = ({ data, xAxisData, yAxisName, style, theme }) => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
      name: yAxisName,
    },
    dataZoom: [
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        type: 'bar',
        data: data,
      },
    ],
  };

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default BarGraph;
