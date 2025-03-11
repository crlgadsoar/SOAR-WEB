import React from 'react';
import ReactEcharts from 'echarts-for-react';

const SankeyChart = ({ data, style, theme, type }) => {
  const options = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    series: [
      {
        type: type,
        layout: 'none',
        emphasis: {
          focus: 'adjacency',
        },
        data: data.nodes,
        links: data.links,
        itemStyle: {
          borderWidth: 1,
          borderColor: '#aaa',
        },
        lineStyle: {
          color: 'source',
          curveness: 0.5,
        },
      },
    ],
  };

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default SankeyChart;
