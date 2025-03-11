import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts-liquidfill';

const LiquidFillGraph = ({ value, title, style, theme }) => {
  const options = {
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    series: [
      {
        type: 'liquidFill',
        // data: [value / 100,value*0.02,value*0.03], // ECharts liquidFill expects a value between 0 and 1
        data: value.map((item) => item * 0.01),
        radius: '80%',
        // color: ['red', '#0f0', 'rgb(0, 0, 255)'],
        outline: {
          show: true,
        },
        backgroundStyle: {
          borderColor: '#94A7C0',
          borderWidth: 2,
          // color: '#E5EBF1',
        },
        // label: {
        //   normal: {
        //     formatter: title ? `{a|${title}}\n{b|${value}%}` : `{b|${value}%}`,
        //     textStyle: {
        //       fontSize: 18,
        //       color: 'white',
        //       rich: {
        //         a: {
        //           fontSize: 12,
        //           lineHeight: 16,
        //           color: 'white',
        //         },
        //         b: {
        //           fontSize: 18,
        //           lineHeight: 24,
        //           color: 'white',
        //         },
        //       },
        //     },
        //   },
        // },
      },
    ],
    tooltip: {
      show: true,
      formatter: title ? `${title}: {c}%` : '{c}%',
    },
  };

  return <ReactEcharts option={options} style={style} theme={theme} />;
};

export default LiquidFillGraph;
