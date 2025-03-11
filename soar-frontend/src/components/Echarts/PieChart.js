import React from 'react';
import ReactEcharts from 'echarts-for-react';

const PieChart = ({
  data,
  legendData,
  style,
  theme,
  showLegend,
  legendOrientation = 'horizontal',
  categoryName,
  type,
  legendPosition = 'bottom',
}) => {
  const options = {
    // title: {
    //   text: 'Pie Chart',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    legend: showLegend
      ? {
          orient: legendOrientation, //Horizontal Or Vertical
          [legendPosition]: true,
          data: legendData,
        }
      : null,
    series: [
      {
        name: categoryName,
        type: type,
        radius: '50%',
        top: '-50px',
        center: ['50%', '50%'],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default PieChart;
