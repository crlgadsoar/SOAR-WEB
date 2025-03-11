import React from 'react';
import { Card } from 'antd';

const TitleComponent = ({ title }) => {
  return (
    <div
      style={{
        fontFamily: 'Noirpro sans-serif',
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
      }}
    >
      {title}
    </div>
  );
};

const ChartCard = ({ title, loading, children, bodyHeight, style }) => {
  const combinedStyle = { width: '600px', ...style };
  return (
    <Card
      bodyStyle={{ height: bodyHeight ? bodyHeight : 400 }}
      style={combinedStyle}
      loading={loading}
    >
      <TitleComponent title={title} />
      {children}
    </Card>
  );
};

export default ChartCard;
