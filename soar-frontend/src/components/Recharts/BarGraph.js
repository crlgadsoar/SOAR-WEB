import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
} from 'recharts';
import { theme } from 'antd';
import { useSelector } from 'react-redux';
/**
 * Renders a bar chart component to display movement authority data.
 * @returns The rendered bar chart component.
 */
const MovementAuthority = ({ barHeight, barWidth, yAxisLabel }) => {
  const data = [
    { categoryName: 'Jan 2023', Count: 35 },
    { categoryName: 'Feb 2023', Count: 45 },
    { categoryName: 'Mar 2023', Count: 6 },
    { categoryName: 'Apr 2023', Count: 33 },
    { categoryName: 'May 2023', Count: 0 },
    { categoryName: 'Jun 2023', Count: 12 },
    { categoryName: 'Jul 2023', Count: 80 },
    { categoryName: 'Aug 2023', Count: 0 },
    { categoryName: 'Sep 2023', Count: 20 },
    { categoryName: 'Oct 2023', Count: 0 },
    { categoryName: 'Nov 2023', Count: 70 },
  ];

  const {
    token: { colorPrimaryHover, colorPrimaryBgHover },
  } = theme.useToken();

  const { displayMode } = useSelector((state) => state.themeConfig);
  return (
    <BarChart width={barWidth} height={barHeight} data={data}>
      <XAxis
        dataKey='categoryName'
        interval={0}
        angle={-60}
        dy={25}
        dx={-5}
        height={100}
        orientation='bottom'
        margin={{ top: 100 }}
      ></XAxis>
      <YAxis allowDecimals={false}>
        <Label value={yAxisLabel} angle={-90} position='insideLeft' />
      </YAxis>
      <Tooltip
        contentStyle={{
          backgroundColor: displayMode === 'DARK' ? 'black' : 'white',
          border: 'none',
        }}
        itemStyle={{ width: 100 }}
      />
      <CartesianGrid stroke='#ccc' vertical={false} />
      <Bar
        dataKey='Count'
        fill={displayMode === 'DARK' ? colorPrimaryHover : colorPrimaryBgHover}
      />
    </BarChart>
  );
};
export default MovementAuthority;
