import React from "react";
import {
  theme,
  Layout,
  // Button,
  // Tooltip,
  Avatar,
  Popover,
  Menu,
  Space,
  Modal,
  Tooltip,
  Button,
  // Button,
  // Modal,
} from "antd";
// import { LockOutlined } from '@ant-design/icons';
import { LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./index.module.css";
import moonSvg from "assets/images/moon.svg";
import sunSvg from "assets/images/sun.svg";
import { signOut } from "appRedux/reducers/Auth";
import { setDisplayMode } from "appRedux/reducers/ThemeConfig";
import { MENU_ITEMS, MENU_TYPE } from "constants/Menu";
import { LINK_STORE } from "constants/Link";
import About from "routes/about";
import ChangePassword from "../../routes/user_management/change_password";
import Icon from "@ant-design/icons";

// import LanguageSelector from './LanguageSelector';
const {
  Header,
  //  Content
} = Layout;
// const getItem = (label, key, icon, children, theme, type) => {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     theme,
//     type,
//   };
// };
// const backgroundColorSidebar = [
//   '#212121',
//   '#242526',
//   '#18191A',
//   '#282828',
//   '#181818',
//   '#141414',
//   '#121212',
//   '#15202B',
//   '#7f7f7f',
// ];
// const { confirm } = Modal;
/**
 * Renders the header component of the page.
 * @returns The JSX element representing the header component.
 */
const HeaderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { displayMode } = useSelector((state) => state.themeConfig);
  const { authUser } = useSelector((state) => state.auth);
  const selectedKeys = window.location.pathname;
  const [modal, contextHolder] = Modal.useModal();
  //console.devLog('HeaderPage -> displayMode', displayMode);

  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();
  //const subMenuTheme = displayMode.toLowerCase(); //displayMode === 'DARK' ? 'light' : 'dark';
  const MoonIcon = (props) => (
    <Icon {...props} component={() => <img src={moonSvg} alt="m" />} />
  );
  const SunIcon = (props) => (
    <Icon {...props} component={() => <img src={sunSvg} alt="s" />} />
  );
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signOut({ user_name: authUser.user_name })).unwrap();
      await dispatch(setDisplayMode("LIGHT")).unwrap();
      // message.success('Sign Out Successfully');
    } catch (err) {
      console.devLog(err);
    }
  };

  const showModal = (key) => {
    const onCancel = () => {
      modalInstance.destroy();
    };
    const modalInstance = modal.confirm({
      icon: null,
      title: "",
      content: getContent(key, onCancel),
      destroyOnClose: true,
      footer: null,
      style: { minWidth: 500, display: "flex" },
    });
  };

  const getContent = (key, onCancel) => {
    switch (key) {
      case LINK_STORE.CHANGE_PASSWORD_USER_MANAGEMENT:
        return <ChangePassword onCancel={onCancel} />;
      case LINK_STORE.ABOUT:
        return <About onCancel={onCancel} />;
      default:
        return null;
    }
  };

  const onMenuClick = (props) => {
    const { menuProps, menuType } = props;
    console.log("OnMenuClick ee", props);
    // const menuType = getTypeFromKey(e.key);
    switch (menuType) {
      case MENU_TYPE.NAVIGATE:
        navigate(menuProps.key);
        break;
      case MENU_TYPE.DIALOG:
        break;
      case MENU_TYPE.MODAL:
        showModal(menuProps.key);
        break;
      case MENU_TYPE.EXTERNAL_LINK:
        break;

      default:
        console.devLog("No selections for menu", menuProps.key);

        break;
    }
  };

  const profileContent = (
    <div style={{ borderRadius: 5, margin: 0 }}>
      <Space direction="vertical" style={{ padding: 0, width: "100%" }}>
        <Space
          onClick={() => {
            navigate(LINK_STORE.PROFILE);
          }}
          style={{
            // backgroundColor:
            //   displayMode === 'DARK'
            //     ? colorPrimary + '80'
            //     : colorPrimary + '25',
            //
            width: "100%",
            height: "30px",
            borderRadius: 5,
            marginBottom: 0,
            paddingLeft: 5,
            cursor: "pointer",
          }}
        >
          <ProfileOutlined
            style={{
              color: displayMode === "DARK" ? "white" : "black",
              cursor: "pointer",
            }}
          />
          <div
            style={{
              color: displayMode === "DARK" ? "white" : "black",
            }}
          >
            Profile{" "}
          </div>
          {/* <div> {item.jobCardId}</div> */}
        </Space>

        {/* <Space
          style={{
            // backgroundColor:
            //   displayMode === 'DARK'
            //     ? colorPrimary + '80'
            //     : colorPrimary + '25',
            width: '100%',
            height: '30px',
            borderRadius: 5,
            marginBottom: 0,
            paddingLeft: 5,
          }}>
          <LockOutlined
            style={{
              color: displayMode === 'DARK' ? 'white' : 'black',
              cursor: 'pointer',
            }}
          />
          <div style={{ color: displayMode === 'DARK' ? 'white' : 'black' }}>
            Change Password
          </div>
          {/* <div> {item.jobCardId}</div> 
        </Space> */}

        <Space
          style={{
            // backgroundColor:
            //   displayMode === 'DARK'
            //     ? colorPrimary + '80'
            //     : colorPrimary + '25',
            width: "100%",
            height: "30px",
            borderRadius: 5,
            marginBottom: 0,
            paddingLeft: 5,
          }}
        >
          <LogoutOutlined
            style={{ color: displayMode === "DARK" ? "white" : "black" }}
          />
          <div
            style={{
              color: displayMode === "DARK" ? "white" : "black",
              cursor: "pointer",
            }}
            onClick={handleSignOut}
            type="link"
          >
            Sign Out
          </div>
          {/* <div> {item.jobCardId}</div> */}
        </Space>
      </Space>
    </div>
  );

  const navigateToHomePage = () => {
    window.location.href = "/home";
  };

  //className={style['top-menu']}
  //https://codyhouse.co/nuggets/beautiful-css-shadows
  return (
    <Header
      style={{
        background: colorBgContainer,
        // position: 'sticky',
        // top: 0,
        // zIndex: 1,
        boxShadow:
          displayMode === "LIGHT"
            ? "0 0 4px 4px rgba(0, 0, 0, 0.08)"
            : "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
      }}
      className={style["header"]}
    >
      {/* COMPANY LOGO  */}
      <div>
        <img
          src={require("../../assets/images/Bharat-Electronics.png")}
          alt=""
          width={"50px"}
          height={"60px"}
          style={{
            marginLeft: "5px",
            filter: displayMode === "DARK" ? "invert(100%)" : undefined,
          }}
          draggable="false"
          onClick={navigateToHomePage}
        />
      </div>
      <div style={{ width: "80%" }} className={style["top-menu"]}>
        <Menu
          theme={displayMode.toLowerCase()}
          mode="horizontal"
          defaultSelectedKeys={["/main/home"]}
          selectedKeys={[selectedKeys]}
          onClick={(e) => {
            e.domEvent.preventDefault();
          }}
          style={{
            backgroundColor: displayMode === "DARK" ? "#141414" : "white",
            color: displayMode === "DARK" ? "white" : "black",
          }}
        >
          {MENU_ITEMS.map((m) => {
            if (m.children) {
              return (
                <Menu.SubMenu
                  key={m.key}
                  onClick={(event) =>
                    onMenuClick({ menuProps: event, menuType: m.menuType })
                  }
                  style={{
                    color: displayMode === "DARK" ? "white" : "black",
                  }}
                  icon={m.icon}
                  items={m.children}
                  title={m.label}
                >
                  {m.children.map((subMenu) => (
                    <Menu.Item
                      key={subMenu.key}
                      onClick={(event) =>
                        onMenuClick({
                          menuProps: event,
                          menuType: subMenu.menuType,
                        })
                      }
                      style={{
                        color: displayMode === "DARK" ? "white" : "black",
                      }}
                      icon={subMenu.icon}
                    >
                      {subMenu.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            } else
              return (
                <Menu.Item
                  key={m.key}
                  onClick={(event) =>
                    onMenuClick({ menuProps: event, menuType: m.menuType })
                  }
                  style={{
                    color: displayMode === "DARK" ? "white" : "black",
                  }}
                  icon={m.icon}
                >
                  {m.label}
                </Menu.Item>
              );
          })}
        </Menu>
      </div>
      <div className={style["profile-container"]}>
        {/* <span>
          <LanguageSelector displayMode={displayMode} />
        </span> */}
        <span style={{ margin: "20px" }}>
          <Tooltip
            title={displayMode === "DARK" ? "Dark Mode" : "Light Mode"}
            color={displayMode === "DARK" ? "gray" : colorPrimary}
          >
            <Button
              //type={displayMode === 'DARK' ? 'primary' : 'default'}
              style={{
                backgroundColor: displayMode === "DARK" ? "gray" : "white",
                border:
                  displayMode === "DARK"
                    ? "1px solid black"
                    : "1px solid #ca8a00 ",
              }}
              shape="circle"
              size="small"
              // icon={<MoonIcon />}
              icon={displayMode === "DARK" ? <MoonIcon /> : <SunIcon />}
              onClick={() => {
                dispatch(
                  setDisplayMode(displayMode === "DARK" ? "LIGHT" : "DARK")
                );
              }}
            />
          </Tooltip>
        </span>
        <Popover
          content={profileContent}
          placement="bottomRight"
          style={{ float: "right" }}
          trigger="click"
        >
          {/* <Button shape="circle" icon={<UserOutlined />} /> */}
          <Avatar
            size={34}
            src={
              authUser?.gender === "MALE"
                ? require("../../assets/images/man.png")
                : require("../../assets/images/women.png")
            }
            style={{
              border: `4px solid ${colorPrimary}`,
              marginRight: "10px",
            }}
          />
        </Popover>
      </div>
      {/* This is for handling theme */}
      {contextHolder}
    </Header>
  );
};

export default HeaderPage;
