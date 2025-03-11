import React from 'react';
import styles from './Page404ContentNotFound.module.css';
import { theme } from 'antd';

const Page404ContentNotFound = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <section className={styles['wrapper']}>
      <div
        className={styles['container']}
        style={{
          background: colorPrimary,
        }}
      >
        <div
          id='scene'
          className={styles['scene']}
          data-hover-only='false'
          style={{
            background: colorPrimary,
          }}
        >
          <div
            className={styles['circle']}
            data-depth='1.2'
            style={{
              background: colorPrimary,
            }}
          ></div>

          <div className={styles['one']} data-depth='0.9'>
            <div className={styles['content']}>
              <span className={styles['piece']}></span>
              <span className={styles['piece']}></span>
              <span className={styles['piece']}></span>
            </div>
          </div>

          <div className={styles['two']} data-depth='0.60'>
            <div className={styles['content']}>
              <span className={styles['piece']}></span>
              <span className={styles['piece']}></span>
              <span className={styles['piece']}></span>
            </div>
          </div>

          <div className={styles['three']} data-depth='0.40'>
            <div className={styles['content']}>
              <span className={styles['piece']}></span>
              <span className={styles['piece']}></span>
              <span className={styles['piece']}></span>
            </div>
          </div>

          <p className={styles['p404']} data-depth='0.50'>
            404
          </p>
          <p className={styles['p404']} data-depth='0.10'>
            404
          </p>
        </div>
        <div className={styles['text']}>
          <article>
            <p>REQUESTED PAGE NOT FOUND</p>
            <button
              onClick={() => {
                window.location.href = '/login';
              }}
            >
              Back To Homepage
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Page404ContentNotFound;
