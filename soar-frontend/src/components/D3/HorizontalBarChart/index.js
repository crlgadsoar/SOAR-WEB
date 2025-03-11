import React from 'react';
import * as d3 from 'd3';
import useChartDimensions from 'customHooks/useChartDimensions';
import alphabet from './alphabet.json';
import AxisBottom from './AxisBottom';
import AxisVertical from './AxisVertical';
const chartSettings = {
  marginLeft: 10,
  marginTop: 10,
  marginBottom: 10,
  height: 500,
};
//const height = Math.ceil((alphabet.length + 0.1) * barHeight) + marginTop + marginBottom;
//const marginBottom = 10;
//const marginLeft = 30;
//const marginTop = 30;
//const width = 928;
const HorizontalBarChart = () => {
  const [ref, dms] = useChartDimensions(chartSettings);

  //horizontal top
  const xScale = React.useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, d3.max(alphabet, (d) => d.frequency)])
        .range([chartSettings.marginLeft, dms.boundedWidth]),
    [dms.boundedWidth],
  );
  //vertical left
  const yScale = React.useMemo(
    () =>
      d3
        .scaleBand()
        .domain(d3.sort(alphabet, (d) => -d.frequency).map((d) => d.letter))
        .rangeRound([chartSettings.marginTop, dms.boundedHeight])
        .padding(0.1),
    [dms.boundedHeight],
  );
  // Create a value format.
  //horizontal top
  const format = xScale.tickFormat(20, '%');

  const bars = alphabet.map((d) => (
    <rect
      key={d.letter}
      x={xScale(0)}
      y={yScale(d.letter)}
      width={xScale(d.frequency) - xScale(0)}
      height={yScale.bandwidth()}
      fill='steelblue'
    />
  ));
  const labelsWithMore20 = alphabet
    .map((d) => ({
      ...d,
      width: xScale(d.frequency) - xScale(0),
    }))
    .filter((d) => d.width > 20) // short bars
    .map((d) => (
      <text
        key={d.letter} // Make sure to provide a unique key
        x={xScale(d.frequency)}
        y={yScale(d.letter) + yScale.bandwidth() / 2}
        dy='0.35em'
        dx={-4}
        fill='white'
        textAnchor='end'
      >
        {format(d.frequency)}
      </text>
    ));

  const labelsWithLess20 = alphabet
    .map((d) => ({
      ...d,
      width: xScale(d.frequency) - xScale(0),
    }))
    .filter((d) => d.width <= 20) // short bars
    .map((d) => (
      <text
        key={d.letter} // Make sure to provide a unique key
        x={xScale(d.frequency)}
        y={yScale(d.letter) + yScale.bandwidth() / 2}
        dy='0.35em'
        dx={4}
        fill='black'
        textAnchor='start'
      >
        {format(d.frequency)}
      </text>
    ));
  // const xAxis = d3.axisTop(xScale).ticks(dms.boundedWidth / 80, '%');
  // const verticalAxis = d3.axisLeft(yScale).tickSizeOuter(0);
  // console.log('xAxis', xAxis);
  // console.log('yAxis', yAxis);

  return (
    <div className='Chart__wrapper' ref={ref}>
      <svg
        width={dms.width}
        height={dms.height}
        viewBox={[0, 0, dms.width, dms.height]}
      >
        {/* Create the TOP axes */}
        {/* <g transform={`translate(0,${chartSettings.marginTop})`}> */}
        <g transform={`translate(${[0, chartSettings.marginTop].join(',')})`}>
          {/* Append a rect for each letter (bars) */}
          {bars}
          {/* Append a label for each letter (labels) */}
          {labelsWithMore20}
          {labelsWithLess20}
        </g>
        <g
          transform={`translate(${[0, chartSettings.marginTop - 10].join(',')})`}
        >
          <AxisBottom
            domain={xScale.domain()}
            range={xScale.range()}
            xScale={xScale}
          />
        </g>
        {/* Create the LEFT axes */}
        <g
          transform={`translate(${[chartSettings.marginLeft - 10, 0].join(',')})`}
        >
          {/* {verticalAxis} */}
          <AxisVertical
            domain={yScale.domain()}
            range={yScale.range()}
            yScale={yScale}
          />
        </g>
      </svg>
    </div>
  );
};

export default HorizontalBarChart;
