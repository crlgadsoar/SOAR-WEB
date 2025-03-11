import React from 'react';
// import Scrollbars from './Scrollbars.js';
import Scrollbars from 'react-custom-scrollbars-2';

const CustomScrollbars = (props) => {
  const { custom_vertical_thumb_color } = props;
  return (
    <Scrollbars
      {...props}
      autoHide
      renderTrackHorizontal={(props) => (
        <div
          {...props}
          style={{ display: 'none' }}
          className='track-horizontal'
        />
      )}
      renderThumbVertical={({ style, ...props }) => {
        return custom_vertical_thumb_color ? (
          <div
            style={{ ...style, backgroundColor: custom_vertical_thumb_color }}
            {...props}
          />
        ) : (
          <div style={{ ...style }} {...props} />
        );
      }}
    />
  );
};

export default CustomScrollbars;
