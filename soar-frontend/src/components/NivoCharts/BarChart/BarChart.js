import { ResponsiveBar } from '@nivo/bar';

const COLORS = [
  'fireBrick',
  'seaGreen',
  'slateBlue',
  'rosyBrown',
  'dodgerBlue',
  'tomato',
  'lightGreen',
  'mediumTurquoise',
  'sienna',
  'hotPink',
  'navajoWhite',
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const CustomBarComponent = (props) => {
  console.log('props', props, props.bar.data.index);
  const { x, y, width, height } = props.bar;
  return (
    <path
      d={getPath(x, y, width, height)}
      stroke='none'
      fill={COLORS[props.bar.data.index % COLORS.length]}
    />
  );
};

const BarChart = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={['value']}
    indexBy='sector'
    margin={{ top: 50, right: 80, bottom: 100, left: 50 }}
    padding={0}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'category10' }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[]}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      legend: 'Sector',
      legendPosition: 'middle',
      legendOffset: 50,
      tickRotation: -40,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'GHG Emission',
      legendPosition: 'middle',
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    enableGridX={false}
    enableGridY={false}
    enableLabel={false}
    labelSkipWidth={12}
    legends={[]}
    isInteractive={false}
    animate={false}
    role='application'
    ariaLabel='barChart'
    barComponent={CustomBarComponent}
  />
);

export default BarChart;
