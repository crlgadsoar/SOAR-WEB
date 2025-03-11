import React from 'react';
import { Layout, Button, Avatar, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BugOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import style from './index.module.css';

const { Header } = Layout;

const HeaderPage = () => {
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    console.log("Sign Out button clicked!"); // Debugging step

    // ✅ Clear authentication data
    localStorage.removeItem("role");
    localStorage.removeItem("authUser");

    // ✅ Redirect to login
    navigate('/login');
    window.location.reload(); // Ensures a fresh state
  };

  const profileContent = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button icon={<ProfileOutlined />} type='text'>Profile</Button>
      <Button icon={<BugOutlined />} type='text'>Change Password</Button>
      <Button icon={<LogoutOutlined />} onClick={handleSignOut} type='link'>
        Sign Out
      </Button>
    </div>
  );

  return (
    <Header className={style['header']}>
      <div className={style['profile-container']}>
        <Popover content={profileContent} placement='bottomRight' trigger='click'>
          <Avatar
            size={38}
            src={require('../../assets/images/man.png')}
            style={{ border: `4px solid blue`, marginRight: '10px' }}
          />
        </Popover>
      </div>
    </Header>
  );
};

export default HeaderPage;
