import React from 'react';
import ReactEcharts from 'echarts-for-react';

const ThemeRiverChart = ({ data, style, theme }) => {
  const options = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: data.legend,
    },
    singleAxis: {
      top: 50,
      bottom: 50,
      axisTick: {},
      axisLabel: {},
      type: 'time',
      axisPointer: {
        animation: true,
        label: {
          show: true,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          opacity: 0.2,
        },
      },
    },
    series: [
      {
        type: 'themeRiver',
        itemStyle: {
          emphasis: {
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.8)',
          },
        },
        data: data.data,
      },
    ],
  };

  return (
    <ReactEcharts
      option={options}
      style={style}
      theme={theme}
      opts={{ renderer: 'svg' }}
    />
  );
};

export default ThemeRiverChart;
