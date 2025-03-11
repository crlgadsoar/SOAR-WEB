import React from 'react';
import { Card } from 'antd';

import HorizontalBarChart from 'components/D3/HorizontalBarChart';
import HorizontalBarChartPlot from 'components/D3/HorizontalBarChartPlot';
import HorizontalBarChartVx from 'components/D3/HorizontalBarChartVx';
//import HorizontalBarChartVx2 from 'components/D3/HorizontalBarChartVx2';
//import C1 from 'components/D3/C1';
const Dashboard = () => {
  const gridStyle = {
    width: '100%',
    textAlign: 'center',
  };
  return (
    <Card title='Default size card' extra={<a href='www.google.com'>More</a>}>
      <Card.Grid style={gridStyle}>
        <HorizontalBarChartVx />
      </Card.Grid>
      {/* <Card.Grid style={gridStyle}>
        <HorizontalBarChartVx />
      </Card.Grid> */}
      <Card.Grid style={gridStyle}>
        <HorizontalBarChart />
      </Card.Grid>
      <Card.Grid style={gridStyle}>
        <HorizontalBarChartPlot />
      </Card.Grid>
    </Card>
  );
};

export default Dashboard;
