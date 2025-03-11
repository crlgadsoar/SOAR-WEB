import React from 'react';
import styles from './Circle.module.css';
import { theme } from 'antd';
const { useToken } = theme;

/**
 * Renders a circular spinner component.
 * @returns {JSX.Element} - The rendered spinner component.
 */
const Circle = () => {
  const { token } = useToken();
  return (
    <div
      className={styles['spinner-container']}
      style={{ backgroundColor: token.colorBgContainer }}
    >
      <span
        className={`${styles.spinner} ${styles.rotate}`}
        style={{
          boxShadow: `inset -2px 0 0 2px ${token.colorPrimary}`,
        }}
      ></span>
    </div>
  );
};

export default Circle;
