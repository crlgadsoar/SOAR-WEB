import React from 'react';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
//import * as d3 from 'd3';
import { scaleLinear, scaleBand, scaleOrdinal } from '@visx/scale';
import { LegendOrdinal } from '@visx/legend';
import alphabet from '../HorizontalBarChart/alphabet.json';
import useChartDimensions from 'customHooks/useChartDimensions';
const chartSettings = {
  marginLeft: 50,
  marginTop: 20,
  marginBottom: 30,
  height: 500,
  marginRight: 0,
};
const HorizontalBarChartVx = () => {
  const [ref, dms] = useChartDimensions(chartSettings);
  // const barHeight = 25;
  // const marginTop = 30;
  // const marginRight = 0;
  // const marginBottom = 10;
  // const marginLeft = 30;
  // const width = 928;
  // const height =
  //   Math.ceil((alphabet.length + 0.1) * barHeight) + marginTop + marginBottom;

  const xScale = scaleLinear()
    .domain([0, Math.max(...alphabet.map((d) => d.frequency))])
    .range([chartSettings.marginLeft, dms.boundedWidth]);

  const yScale = scaleBand()
    //.domain(d3.sort(alphabet, (d) => -d.frequency).map((d) => d.letter))
    .domain(alphabet.map((d) => d.letter))
    .rangeRound([chartSettings.marginTop, dms.boundedHeight])
    .padding(0.1);

  // const legendScale = scaleBand({
  //   domain: alphabet.map((d) => d.letter),
  //   padding: 0.1,
  // });

  // const colorScale = legendScale.copy().range(['steelblue']);

  const colorScale = scaleOrdinal({
    domain: alphabet.map((d) => d.letter),
    range: ['white', 'blue', 'lightblue', 'darkblue', 'steelblue', 'gray'], // Fix: Use 'range' instead of 'copy().range'
  });

  const format = xScale.tickFormat(20, '%');

  return (
    <div className='Chart__wrapper' ref={ref}>
      <svg
        width={dms.width}
        height={dms.height}
        viewBox={[0, 0, dms.width, dms.height]}
      >
        <Group>
          {alphabet.map((d) => (
            <rect
              key={d.letter}
              x={xScale(0)}
              y={yScale(d.letter)}
              width={xScale(d.frequency) - xScale(0)}
              height={yScale.bandwidth()}
              fill={colorScale(d.letter)}
            />
          ))}

          <text
            x={dms.width - chartSettings.marginRight}
            y={chartSettings.marginTop}
            fill='black'
            textAnchor='end'
          >
            Frequency
          </text>

          <AxisLeft
            scale={yScale}
            top={chartSettings.marginTop}
            left={chartSettings.marginLeft}
            tickFormat={(value) => value}
          />

          <AxisBottom
            scale={xScale}
            top={dms.height - chartSettings.marginBottom}
            label='Frequency'
            tickFormat={(value) => format(value)}
          />

          <LegendOrdinal
            scale={colorScale}
            labelFormat={(label) => `Frequency of ${label}`}
            // labelTransform='translate(0, 25)'
            shapeMargin='2'
            shapeWidth={20}
            shapeHeight={20}
            direction='row'
            // fill='white'
          />
        </Group>
      </svg>
    </div>
  );
};

export default HorizontalBarChartVx;
