import React from 'react';
/**
 * A component that displays an image carousel.
 * @param {Object} props - The component props.
 */
const ImageCarousel = ({
  imageList,
  autoplay = true,
  dots = false,
  width = '100%',
  height,
  autoplaySpeed = 3000, //Allow customized speed
  customDotStyle, //Allow customized dot
}) => {
  const [index, setIndex] = React.useState(0);
  const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);

  const dotStyle = customDotStyle || {
    height: '15px',
    width: '15px',
    margin: '0 2px',
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block',
    transition: 'background-color 0.6s ease',
    cursor: 'pointer',
  };

  //Onchange of screen size (Window Size or Zoom ), updateSize function will be called
  React.useLayoutEffect(() => {
    const updateSize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  React.useEffect(() => {
    if (autoplay) {
      const timerId = setInterval(() => {
        setIndex((preValue) => (preValue + 1) % imageList.length);
      }, autoplaySpeed);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [autoplay, autoplaySpeed, imageList]);

  return (
    <>
      <div>
        <img
          src={imageList[index]}
          alt='Indian Railway'
          width={width}
          height={height || windowHeight}
        />
      </div>
      {dots ? (
        <div
          style={{
            width: '100%',
            bottom: 20,
            position: 'absolute',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {imageList.map((_, _index) => (
            <div
              key={_index}
              style={
                _index === index
                  ? { ...dotStyle, backgroundColor: 'black' }
                  : dotStyle
              }
              onClick={() => setIndex(_index)}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ImageCarousel;

//THIS CODE IS ALSO WORKING USING ANTD CAROUSEL

// import React from 'react';
// import styles from './index.module.css';
// import {Carousel} from "antd";
// const ImageCarousel = ({
//   imageList,
//   autoplay = true,
//   dots = false,
//   width = '100%',
//   height,
//   autoplaySpeed = 2000,
// }) => {
//   // const [windowWHeight, setWindowWHeight] = React.useState(window.innerHeight);

//   // //Onchange of screen size, updateSize function will be called
//   // React.useLayoutEffect(() => {
//   //   const updateSize = () => {
//   //     // setWindowWHeight(window.innerHeight);
//   //   };
//   //   window.addEventListener('resize', updateSize);
//   //   updateSize();
//   //   return () => window.removeEventListener('resize', updateSize);
//   // }, []);

//   return (
//     <div>
//       <Carousel dots={dots} autoplay={autoplay} autoplaySpeed={autoplaySpeed}>
//         {imageList.map((i) => (
//           <img
//             src={i}
//             alt="Indian Railway"
//             width={width}
//             height={height ? height : window.innerHeight}
//           />
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default ImageCarousel;
