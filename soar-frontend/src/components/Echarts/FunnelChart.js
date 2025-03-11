import React from 'react';
import ReactEcharts from 'echarts-for-react';

const FunnelChart = ({
  data,
  style,
  theme,
  categoryName,
  chartType,
  sortOrder,
  showLegend,
  legendData,
  legendPosition = 'bottom',
  legendOrientation = 'horizontal',
}) => {
  const options = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}',
    },
    legend: showLegend
      ? {
          orient: legendOrientation, //Horizontal Or Vertical
          data: legendData,
          [legendPosition]: true,
        }
      : null,
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    series: [
      {
        name: categoryName,
        type: chartType,
        left: '10%',
        top: 50,
        bottom: 50,
        width: '80%',
        min: 0,
        max: Math.max(...data.map((item) => item.value)),
        minSize: '20%',
        maxSize: '100%',
        sort: sortOrder,
        gap: 2,
        label: {
          show: true,
          position: 'inside',
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid',
          },
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
        data,
      },
    ],
  };

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default FunnelChart;
