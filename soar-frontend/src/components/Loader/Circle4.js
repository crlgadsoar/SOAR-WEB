import React from 'react';
import styles from './Circle.module.css';
import { theme } from 'antd';
const { useToken } = theme;
//https://codepen.io/animatedcreativity/pen/OjBPQJ
/**
 * Renders a circle component with multiple div elements.
 * @returns The rendered circle component.
 */
const Circle = () => {
  const { token } = useToken();
  const ballBeforeStyle = {
    '--bgColor': token.colorPrimary,
  };
  return (
    // <div
    //   className={styles['spinner-container']}
    //   style={{ backgroundColor: token.colorBgContainer }}>
    //   <span
    //     className={`${styles.spinner} ${styles.rotate}`}
    //     style={{
    //       boxShadow: `inset -2px 0 0 2px ${token.colorPrimary}`,
    //     }}></span>
    // </div>
    <div className={styles['holder']}>
      <div className={styles['preloader']} style={ballBeforeStyle}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Circle;
