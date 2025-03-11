import React from 'react';
import { Layout, theme, Button, ConfigProvider } from 'antd';
import style from './index.module.css';
import Sidebar from './Sidebar';
import { UpOutlined } from '@ant-design/icons';
//import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';
import FooterPage from './Footer';
import PageContent from './PageContent';
import { TAB_SIZE, MOBILE_SIZE } from 'constants';
import HeaderPage from './HeaderPage';

/**
 * The main layout component of the application.
 */
const MainLayout = () => {
  const { currWindowWidth } = useSelector((state) => state.themeConfig);

  //console.devLog('MainLayout -> displayMode', displayMode);

  return (
    <div className={style['full-page']}>
      <Layout>
        {/* //this will show  primary color and all token color of light theme inside Sidebar so that we can highlight links based on brand/primary color */}
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
          }}
        >
          <Sidebar />
        </ConfigProvider>
        <Layout>
          <HeaderPage />
          <PageContent />
          {currWindowWidth > TAB_SIZE && (
            <div className={style['scroll-to-top-button']}>
              <Button
                type='primary'
                shape='circle'
                icon={<UpOutlined />}
                size='large'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>
          )}
          {currWindowWidth > MOBILE_SIZE && <FooterPage />}
        </Layout>
      </Layout>

      {/* </Scrollbars> */}
    </div>
  );
};
export default MainLayout;
