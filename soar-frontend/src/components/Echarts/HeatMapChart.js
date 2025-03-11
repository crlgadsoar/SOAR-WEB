import React from 'react';
import ReactEcharts from 'echarts-for-react';

const HeatmapChart = ({
  data,
  xAxisData,
  yAxisData,
  style,
  theme,
  categoryName,
}) => {
  const options = {
    tooltip: {
      position: 'top',
      formatter: (params) => `${params.value[2]} ${categoryName}`,
    },
    grid: {
      height: '50%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.map((item) => item.value)),
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
    },
    series: [
      {
        name: categoryName,
        type: 'heatmap',
        data: data.map((item) => [item.x, item.y, item.value]),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default HeatmapChart;
