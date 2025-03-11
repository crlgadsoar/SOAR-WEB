import React from 'react';
import ReactECharts from 'echarts-for-react';

const StackedChart = ({
  data,
  xAxisData,
  yAxisName,
  style,
  type,
  theme,
  legendData,
  showLegend,
  brushState,
}) => {
  console.log('brushState', brushState);
  const seriesData = legendData?.map((legend, _) => ({
    name: legend,
    type: type,
    stack: 'total',
    areaStyle: { normal: {} },
    data: data,
  }));

  const option = {
    // title: {
    //   text: `Stacked ${type} Chart`,
    // },
    tooltip: {
      trigger: 'axis',
    },
    legend: showLegend
      ? {
          data: legendData.map((item) => item),
        }
      : null,
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },

    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: yAxisName,
      },
    ],
    dataZoom: brushState
      ? [
          {
            start: 0,
            end: 100,
          },
        ]
      : [],
    series: seriesData,
  };

  return <ReactECharts option={option} style={style} theme={theme} />;
};

export default StackedChart;
