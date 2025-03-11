import React from 'react';
import { CopyrightCircleTwoTone } from '@ant-design/icons';
import { Layout } from 'antd';
import style from './index.module.css';
import { useSelector } from 'react-redux';
const { Footer } = Layout;
/**
 * Renders the footer component for the page.
 */
const FooterPage = () => {
  const { displayMode } = useSelector((state) => state.themeConfig);
  return (
    <Footer
      className={style['footer']}
      style={{
        backgroundColor: displayMode === 'LIGHT' ? 'white' : '#141414',
        boxShadow:
          displayMode === 'LIGHT'
            ? '0 0 6px 6px rgba(0, 0, 0, 0.08)'
            : 'inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075),    0 0 0 1px hsla(0, 0%, 0%, 0.05),          0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),      0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),      0 3.5px 6px hsla(0, 0%, 0%, 0.09)',
      }}
    >
      CRL Copyright <CopyrightCircleTwoTone /> Reserved (Bharat Electronics
      Limited,Sahibabad)
    </Footer>
  );
};

export default FooterPage;
