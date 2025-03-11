import React from 'react';
import useChartDimensions from 'customHooks/useChartDimensions';
const BarChartRace = () => {
  const [ref, dms] = useChartDimensions({});
  return (
    <div
      ref={ref}
      style={{
        width: '100%',
      }}
    >
      <svg width={dms.width} height={height}>
        {' '}
      </svg>
    </div>
  );
};

export default BarChartRace;
