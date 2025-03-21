import React from 'react';
import ReactEcharts from 'echarts-for-react';

const StackedVerticalBarChart = ({ style, theme }) => {
  // There should not be negative values in rawData
  const rawData = [
    [100, 302, 301, 334, 390, 330, 320],
    [320, 132, 101, 134, 90, 230, 210],
    [220, 182, 191, 234, 290, 330, 310],
    [150, 212, 201, 154, 190, 330, 410],
    [820, 832, 901, 934, 1290, 1330, 1320],
  ];
  const totalData = [];
  for (let i = 0; i < rawData[0].length; ++i) {
    let sum = 0;
    for (let j = 0; j < rawData.length; ++j) {
      // console.log('JJJ,III', j, i);
      sum += rawData[j][i];
      // console.log('Sum', sum);
    }
    totalData.push(sum);
  }
  const grid = {
    left: 100,
    right: 100,
    top: 50,
    bottom: 50,
  };
  const series = ['BEL', 'BDL', 'HAL', 'GRS', 'CEL'].map((name, sid) => {
    return {
      name,
      type: 'bar',
      stack: 'total',
      barWidth: '80%',
      label: {
        show: false,
        formatter: (params) => Math.round(params.value * 1000) / 10 + '%',
      },
      data: rawData[sid].map((d, did) =>
        totalData[did] <= 0 ? 0 : d / totalData[did],
      ),
    };
  });
  const options = {
    legend: {
      selectedMode: false,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid,
    yAxis: {
      type: 'value',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    series,
  };
  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default StackedVerticalBarChart;
