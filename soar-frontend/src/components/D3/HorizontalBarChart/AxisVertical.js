import React from 'react';

const AxisVertical = ({ domain = [0, 100], range = [10, 290], yScale }) => {
  console.log('AxisVertical domain', domain);
  console.log('AxisVertical range', range);
  const ticks = React.useMemo(() => {
    //     const xScale = d3.scaleLinear().domain(domain).range(range);
    // const width = range[1] - range[0];
    //     const pixelsPerTick = 30;
    //     const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));

    // console.log(
    //   'AxisVertical value,offset Arr ',
    //   domain.map((value) => ({
    //     value,
    //     xOffset: yScale(value) + yScale.bandwidth() / 2,
    //   })),
    // );
    return domain.map((value) => ({
      value,
      xOffset: yScale(value) + yScale.bandwidth() / 2,
    }));
  }, [domain.join('-'), range.join('-')]);
  return (
    <svg>
      {/* <path
        d={['M', range[0], -6, 'h', -6, 'V', range[1], 'h', 0].join(' ')}
        fill='none'
        stroke='currentColor'
      /> */}
      {ticks.map(({ value, xOffset }) => (
        <svg key={value}>
          <g transform={`translate(0,${xOffset})`}>
            <text
              key={value}
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                textAnchor: 'start',
                transform: 'translateY(12px)',
                marginRight: '10px',
              }}
            >
              {value}
            </text>
          </g>
          {/* <g transform={`translate(-3,${xOffset + 8})`}>
            <line x2='10' stroke='currentColor' />
          </g> */}
        </svg>
      ))}
    </svg>
  );
};

export default AxisVertical;
