// import { Slider } from 'antd';
import React from 'react';
import { nivoBarChartData } from '../data';
import BarChart from './BarChart';
// import styles from '../index.module.css';

const Index = () => {
  const [sliderValue, _setSliderValue] = React.useState([0, 100]);
  // const onSliderChange = (value) => {
  //   console.log('SLIDER VALUE', value);

  //   setSliderValue(value);
  // };

  React.useEffect(() => {
    var lowerSlider = document.getElementById('lower');
    var upperSlider = document.getElementById('upper');
    var lowerVal = parseInt(lowerSlider.value);
    var upperVal = parseInt(upperSlider.value);

    upperSlider.oninput = function () {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      if (upperVal < lowerVal + 4) {
        lowerSlider.value = upperVal - 4;

        if (lowerVal == lowerSlider.min) {
          upperSlider.value = 4;
        }
      }
    };

    lowerSlider.oninput = function () {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      if (lowerVal > upperVal - 4) {
        upperSlider.value = lowerVal + 4;

        if (upperVal == upperSlider.max) {
          lowerSlider.value = parseInt(upperSlider.max) - 4;
        }
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <BarChart
        data={nivoBarChartData.filter(
          (_, index) =>
            index >= nivoBarChartData.length * (sliderValue[0] / 100) &&
            index <= nivoBarChartData.length * (sliderValue[1] / 100),
        )}
      />
      <Slider
        range={{ draggableTrack: true }}
        value={sliderValue}
        draggableTrack={true}
        onChange={onSliderChange}
        style={{ cursor: 'col-resize' }}
      />
      {/* <span
        className={styles['multi-range']}
        style={{ marginTop: 100, zIndex: 1001, cursor: 'pointer' }}
      >
        <input type='range' min='0' max='50' value='5' id='lower' />
        <input type='range' min='0' max='50' value='45' id='upper' />
      </span> */}
    </div>
  );
};

export default Index;
