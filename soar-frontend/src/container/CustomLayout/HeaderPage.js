import React from 'react';
import {
  theme,
  Layout,
  Button,
  Tooltip,
  Breadcrumb,
  Avatar,
  Popover,
} from 'antd';

import Icon, {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BugOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { useLocation } from 'react-router-dom';
import style from './index.module.css';
import { TAB_SIZE } from 'constants';
import moonSvg from 'assets/images/moon.svg';
import sunSvg from 'assets/images/sun.svg';
import { signOut } from 'appRedux/reducers/Auth';
import {
  updateDrawerOpen,
  setDisplayMode,
} from 'appRedux/reducers/ThemeConfig';
import { capitalizeFirstLetter } from 'util/common';
import LanguageSelector from './LanguageSelector';
const {
  Header,
  //  Content
} = Layout;
/**
 * Renders the header component of the page.
 * @returns The JSX code for the header component.
 */
const HeaderPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { displayMode, collapsed, currWindowWidth, isDrawerOpen } = useSelector(
    (state) => state.themeConfig,
  );
  const { authUser } = useSelector((state) => state.auth);
  //console.devLog('HeaderPage -> displayMode', displayMode);

  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const title = capitalizeFirstLetter(pathSnippets[index]); // Replace this with your own logic to format the breadcrumb title
    //console.devLog('URLGenerated', url);
    return {
      key: url,
      title: (
        <Link
          to={url}
          style={{
            color: displayMode === 'LIGHT' ? colorPrimary : 'white',
          }}
        >
          {title}
        </Link>
      ),
    };
  });

  const MoonIcon = (props) => (
    <Icon {...props} component={() => <img src={moonSvg} alt='m' />} />
  );
  const SunIcon = (props) => (
    <Icon {...props} component={() => <img src={sunSvg} alt='s' />} />
  );
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signOut({ user_name: authUser.user_name })).unwrap();
      await dispatch(setDisplayMode('LIGHT')).unwrap();
      // message.success('Sign Out Successfully');
    } catch (err) {
      console.devLog(err);
    }
  };

  const profileContent = (
    <div style={{ display: 'flex', flexFlow: 'column' }}>
      <div style={{ float: 'left' }}>
        <Button icon={<ProfileOutlined />} type='text'>
          Profile
        </Button>

        <div style={{ float: 'left' }}>
          <Button icon={<BugOutlined />} type='text'>
            Change Password
          </Button>
        </div>
        <div style={{ float: 'left' }}>
          <Button icon={<LogoutOutlined />} onClick={handleSignOut} type='link'>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
  //https://codyhouse.co/nuggets/beautiful-css-shadows
  return (
    <Header
      style={{
        background: colorBgContainer,
        boxShadow:
          displayMode === 'LIGHT'
            ? '0 0 4px 4px rgba(0, 0, 0, 0.08)'
            : 'inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)',
      }}
      className={style['header']}
    >
      {currWindowWidth < TAB_SIZE ? (
        <Button
          type='text'
          icon={isDrawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(updateDrawerOpen(!isDrawerOpen))}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
            color: displayMode === 'DARK' ? 'white' : colorPrimary,
          }}
        />
      ) : (
        <>
          {/* {collapsed && (
          <div
            className={style['bel-logo']}
            style={{ marginLeft: '100px' }}>
            <img
              alt="company_logo"
              src={require('../../assets/images/bel_logo_signin.png')}
              height={25}
              width={50}
              draggable="false"
            />
          </div>
        )} */}
          {/* Breadcrumb Bar */}
          <div
            className={style['breadcrumb-container']}
            style={{
              marginLeft: collapsed ? '105px' : '210px',
              float: 'left',
            }}
          >
            <Breadcrumb items={extraBreadcrumbItems} />
          </div>
        </>
      )}

      <div className={style['profile-container']}>
        <>
          <span>
            <LanguageSelector displayMode={displayMode} />
          </span>
          <span style={{ margin: '30px' }}>
            <Tooltip
              title={displayMode === 'DARK' ? 'Dark Mode' : 'Light Mode'}
              color={displayMode === 'DARK' ? 'gray' : colorPrimary}
            >
              <Button
                //type={displayMode === 'DARK' ? 'primary' : 'default'}
                style={{
                  backgroundColor: displayMode === 'DARK' ? 'gray' : 'white',
                  border:
                    displayMode === 'DARK'
                      ? '1px solid black'
                      : `1px solid ${colorPrimary} `,
                }}
                shape='circle'
                // icon={<MoonIcon />}
                icon={displayMode === 'DARK' ? <MoonIcon /> : <SunIcon />}
                onClick={() => {
                  dispatch(
                    setDisplayMode(displayMode === 'DARK' ? 'LIGHT' : 'DARK'),
                  );
                }}
              />
            </Tooltip>
          </span>
          <Popover
            content={profileContent}
            placement='bottomRight'
            style={{ float: 'right' }}
            trigger='click'
          >
            {/* <Button shape="circle" icon={<UserOutlined />} /> */}
            <Avatar
              size={38}
              src={
                authUser?.gender === 'MALE'
                  ? require('../../assets/images/man.png')
                  : require('../../assets/images/women.png')
              }
              style={{
                border: `4px solid ${colorPrimary}`,
                marginRight: '10px',
              }}
            />
          </Popover>
        </>
      </div>
    </Header>
  );
};

export default HeaderPage;
