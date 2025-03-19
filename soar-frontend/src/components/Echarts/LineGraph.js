import React from 'react';
import ReactEcharts from 'echarts-for-react';

const LineGraph = ({ data, xAxisData, yAxisName, style, theme }) => {
  const options = {
    // title: {
    //   text: 'Line Chart',
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
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
        type: 'line',
        data: data,
        smooth: true,
      },
    ],
  };

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default LineGraph;
