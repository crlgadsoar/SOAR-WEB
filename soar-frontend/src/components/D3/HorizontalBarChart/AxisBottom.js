import React from 'react';
//import * as d3 from 'd3';
const Axis = ({ domain = [0, 100], range = [10, 290], xScale }) => {
  const ticks = React.useMemo(() => {
    // const xScale = d3.scaleLinear().domain(domain).range(range);
    const width = range[1] - range[0];

    const pixelsPerTick = 50;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [domain.join('-'), range.join('-')]);
  const format = xScale.tickFormat(20, '%');

  return (
    <svg>
      {/* <path
        d={['M', range[0], 6, 'v', -6, 'H', range[1], 'v', 6].join(' ')}
        fill='none'
        stroke='currentColor'
      /> */}

      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          {/* <line y2='6' stroke='currentColor' /> */}
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
            }}
          >
            {format(value)}
          </text>
        </g>
      ))}
    </svg>
  );
};
export default Axis;
