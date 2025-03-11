import React from 'react';
import styles from './Circle2.module.css';
import { theme } from 'antd';
const { useToken } = theme;

/**
 * A component that renders a circle made up of multiple balls.
 * @returns The rendered circle component.
 */
const Circle = () => {
  const { token } = useToken();
  const ballBeforeStyle = {
    '--bgColor': token.colorPrimary,
    '--bgColor2': token.colorPrimaryBorder,
    '--bgColor3': token.colorPrimaryBg,
  };

  /* background-color: #6739b7; */
  return (
    <div
      className={styles['flex']}
      style={{ backgroundColor: token.colorBgContainer }}
    >
      <div
        className={`${styles.loader} ${styles.default} ${styles['default-01']}`}
        //style={{ backgroundColor: token.colorPrimary }}
      >
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
