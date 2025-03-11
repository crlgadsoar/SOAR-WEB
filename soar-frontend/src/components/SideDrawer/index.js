import React from 'react';
import style from './index.module.css';
// import { useSelector } from 'react-redux';

// import { isMobile } from 'react-device-detect';
const SideDrawer = ({
  // type = 0,
  children,
  // initialState = true,
  checkedState = true,
}) => {
  return (
    <>
      <input
        type='checkbox'
        name=''
        id={style.sideMenuSwitch}
        checked={checkedState}
      />
      <div
        className={style.sideMenu}
        style={{
          width: '100%',
          transform: checkedState ? 'translateX(0)' : 'translateX(-80%)', // Update the transform based on checkedState
        }}
      >
        {children}
      </div>
    </>
  );
};

export default SideDrawer;
