import React from 'react';
import { Layout } from 'antd';
import style from './index.module.css';

//import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';
import FooterPage from './Footer';
//import PageContent from './PageContent';
import { MOBILE_SIZE } from 'constants';
//import { TAB_SIZE } from 'constants';
import HeaderPageTop from './HeaderPageTop';
import PageContentTop from './PageContentTop';
// import FloatingButton from 'components/FloatingButton';

/**
 * The main layout component of the application.
 *  The rendered layout component.
 */
const MainLayout = () => {
  const { currWindowWidth } = useSelector((state) => state.themeConfig);

  //console.devLog('MainLayout -> displayMode', displayMode);

  return (
    <div className={style['full-page']}>
      <Layout>
        <HeaderPageTop />
        <PageContentTop />

        {currWindowWidth > MOBILE_SIZE && <FooterPage />}
      </Layout>
    </div>
  );
};
export default MainLayout;
