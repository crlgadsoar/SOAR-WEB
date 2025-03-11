import React from 'react';
import BarChart from 'components/NivoCharts/BarChart';
import TreeMap from 'components/NivoCharts/TreeMap';
import ChartCard from 'components/NivoCharts/ChartCard';

const Dashboard3 = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <ChartCard title='Bar Chart'>
        <BarChart />
      </ChartCard>

      <ChartCard title='Tree Map'>
        <TreeMap />
      </ChartCard>
    </div>
  );
};

export default Dashboard3;
