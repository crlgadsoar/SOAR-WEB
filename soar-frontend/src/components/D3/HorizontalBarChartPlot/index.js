import React from 'react';
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import alphabet from '../HorizontalBarChart/alphabet.json';
import useChartDimensions from 'customHooks/useChartDimensions';
const chartSettings = {
  marginLeft: 10,
  marginTop: 10,
  marginBottom: 10,
  height: 500,
};
const HorizontalBarChartPlot = () => {
  const [ref, dms] = useChartDimensions(chartSettings);
  const format = d3.format('.1%');
  React.useEffect(() => {
    // const chartContainer = document.getElementById('chart-container');

    // if (!chartContainer) {
    //   console.error('Chart container not found.');
    //   return;
    // }
    const chart = Plot.plot({
      x: { axis: 'top', percent: true },
      y: { label: null },
      // title: 'For charts, an informative title',
      // subtitle: 'Subtitle to follow with additional context',
      // caption: 'Figure 1. A chart with a title, subtitle, and caption.',
      marks: [
        Plot.barX(alphabet, {
          x: 'frequency',
          y: 'letter',
          fill: 'steelblue',
          sort: { y: '-x' },
        }),
        Plot.text(alphabet, {
          x: 'frequency',
          y: 'letter',
          text: (d) => format(d.frequency),
          textAnchor: 'start',
          dx: 3,
          filter: (d) => d.frequency <= 0.007,
          fill: 'currentColor',
        }),
        Plot.text(alphabet, {
          x: 'frequency',
          y: 'letter',
          text: (d) => format(d.frequency),
          textAnchor: 'end',
          dx: -3,
          filter: (d) => d.frequency > 0.007,
          fill: 'white',
        }),
        Plot.ruleX([0]),
      ],

      marginLeft: 50,
      marginTop: 50,
      marginBottom: 50,
      width: dms.width,
      height: dms.height,
    });
    // chartContainer.appendChild(chart);
    ref.current.append(chart);

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div
      // id='chart-container'
      style={{ width: '100%', overflow: 'hidden' }}
      ref={ref}
    ></div>
  );
};

export default HorizontalBarChartPlot;
