import React from 'react';
import styles from './Circle3.module.css';
import { theme } from 'antd';
const { useToken } = theme;

/**
 * Renders a circle component with multiple balls inside.
 * @returns The rendered circle component.
 */
const Circle = () => {
  const { token } = useToken();
  const ballBeforeStyle = {
    '--bgColor': token.colorPrimary,
  };
  return (
    <div
      className={styles['flex']}
      //style={{ backgroundColor: token.colorBgContainer }}
    >
      <div className={`${styles.loader}   ${styles['default-04']}`}>
        <div className={styles['loader-container']}>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
          <div className={styles['ball']} style={ballBeforeStyle}></div>
        </div>
      </div>
    </div>
  );
};

export default Circle;
