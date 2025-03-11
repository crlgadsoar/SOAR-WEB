import React from 'react';
import { animated, useSpring } from 'react-spring';
import useInterval from 'customHooks/useInterval';
const generateCircles = () =>
  Array.from({ length: Math.random() * 10 }, (_, index) => index + 1);
// const _generateDataset = () =>
//   Array(5)
//     .fill(0)
//     .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10]);
const AnimatedCircle = ({ index, isShowing }) => {
  const wasShowing = React.useRef(false);
  React.useEffect(() => {
    wasShowing.current = isShowing;
  }, [isShowing]);
  const style = useSpring({
    config: {
      duration: 1200,
    },
    r: isShowing ? 6 : 0,
    opacity: isShowing ? 1 : 0,
  });
  return (
    <animated.circle
      {...style}
      cx={index * 15 + 10}
      cy='10'
      fill={
        !isShowing
          ? 'tomato'
          : !wasShowing.current
            ? 'cornflowerblue'
            : 'lightgrey'
      }
    />
  );
};

const C5 = () => {
  const [visibleCircles, setVisibleCircles] = React.useState(generateCircles());
  //const allCircles = generateDataset();
  useInterval(() => {
    setVisibleCircles(generateCircles());
  }, 2000);
  return (
    <svg viewBox='0 0 100 20'>
      {visibleCircles.map((d) => (
        <AnimatedCircle
          key={d}
          index={d}
          isShowing={visibleCircles.includes(d)}
        />
      ))}
    </svg>
  );
};

export default C5;
