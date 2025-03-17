import React from "react";
import {
  CodeOutlined,
  HomeOutlined,
  UploadOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  BugOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import style from "./index.module.css";
import { Menu, Button, Avatar, theme, Tooltip, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setDisplayMode,
  updateCollapsed,
  updateDrawerOpen,
} from "appRedux/reducers/ThemeConfig";
import { signOut } from "appRedux/reducers/Auth";
import { TAB_SIZE, MOBILE_SIZE } from "constants";
import IntlMessages from "util/IntlMessages";

const getItem = (label, key, icon, children, theme, type) => {
  return {
    key,
    icon,
    children,
    label,
    theme,
    type,
  };
};

/**
 * Renders the content of the sidebar component.
 */
const SidebarContent = ({ backgroundColorSidebar }) => {
  const { collapsed, currWindowWidth } = useSelector(
    (state) => state.themeConfig
  );
  const subMenuTheme = "light"; //displayMode === 'DARK' ? 'light' : 'dark';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const {
    token: { colorPrimary, colorPrimaryBorder },
  } = theme.useToken();
  /**
   * An array of items used to generate a menu.
   * Each item represents a menu item or a divider.
   */
  const items = [
    getItem(
      <IntlMessages id={"main"} />,
      "sub1",
      <UserOutlined />,
      [
        getItem(<IntlMessages id={"main.home"} />, "1", <HomeOutlined />),
        getItem(<IntlMessages id={"main.changelog"} />, "2", <CodeOutlined />),
        getItem(
          <IntlMessages id={"main.status"} />,
          "sub2",
          <CodeOutlined />,
          [
            getItem(
              <IntlMessages id={"main.status.equipment"} />,
              "3",
              <CodeOutlined />
            ),
            getItem("Faremode", "4"),
            getItem("JobCard", "5"),
            getItem("Train Health", "6"),
            getItem("Asset Offline", "7"),
            getItem("Preventive Maint.", "8"),
          ],
          subMenuTheme
        ),
      ],
      subMenuTheme
    ),
    {
      type: "divider",
    },
    getItem(
      <IntlMessages id={"configuration"} />,
      "sub3",
      <UploadOutlined />,
      [
        getItem("Line", "9"),
        getItem("Location", "10"),
        getItem("Option 3", "11"),
        getItem("Option 4", "12"),
      ],
      subMenuTheme
    ),
    {
      type: "divider",
    },
    getItem(
      <IntlMessages id={"asset"} />,
      "sub4",
      <UploadOutlined />,
      collapsed
        ? [
            getItem(
              <IntlMessages id={"asset"} />,
              null,
              null,
              [
                {
                  type: "divider",
                },
                getItem("Line", "13"),
                getItem("Location", "14"),
                getItem("Option 3", "15"),
                getItem("Option 4", "16"),
              ],
              "light",
              "group"
            ),
          ]
        : [
            getItem("Line", "13"),
            getItem("Location", "14"),
            getItem("Option 3", "15"),
            getItem("Option 4", "16"),
          ],
      "light"
    ),
    {
      type: "divider",
    },
    getItem(
      <IntlMessages id={"jcm"} />,
      "sub5",
      <UploadOutlined />,
      [
        getItem("Line", "17"),
        getItem("Location", "18"),
        getItem("Option 3", "19"),
        getItem("Option 4", "20"),
      ],
      subMenuTheme
    ),
    {
      type: "divider",
    },
    getItem(
      <IntlMessages id={"fm"} />,
      "sub6",
      <UploadOutlined />,
      [
        getItem("Line", "21"),
        getItem("Location", "22"),
        getItem("Option 3", "23"),
        getItem("Option 4", "24"),
      ],
      subMenuTheme
    ),
  ];
  /**
   * Handles the click event on the menu items.
   */
  const onMenuClick = (e) => {
    dispatch(updateDrawerOpen(false));
    switch (e.key) {
      case "13":
        //signout();
        break;

      case "1":
        navigate("/main/home");
        break;
      case "2":
        navigate("/main/changelog");
        break;

      case "3":
        navigate("/main/status/equipment");
        break;
      case "4":
        navigate("/main/status/faremode");
        break;

      default:
        console.devLog("No selections for menu", e.key);

        break;
    }
  };

  /**
   * Handles the sign out functionality.
   */
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

  /**
   * Generates the content for a profile section. The JSX element representing the profile section.
   */
  const profileContent = (
    <div>
      <Button icon={<ProfileOutlined />} type="text">
        Profile
      </Button>

      <div>
        <Button icon={<BugOutlined />} type="text">
          Change Password
        </Button>
      </div>
      <div>
        <Button icon={<LogoutOutlined />} onClick={handleSignOut} type="link">
          Sign Out
        </Button>
      </div>
    </div>
  );

  /**
   * A functional component that renders the title section of a component.
   * It displays the staff name and designation in a centered and stylized manner.
   */
  const TitleComponent = () => {
    return (
      <>
        <div
          style={{
            fontFamily: "Noirpro",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {authUser?.staffName?.toUpperCase()}
        </div>
        <div
          style={{
            fontFamily: "Noirpro",
            fontSize: "10px",
            textAlign: "center",
          }}
        >
          {authUser?.designation}
        </div>
      </>
    );
  };

  return (
    <>
      {currWindowWidth > TAB_SIZE && (
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(updateCollapsed(!collapsed))}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            color: "white",
          }}
        />
      )}
      {!collapsed && currWindowWidth > TAB_SIZE && (
        <span className={style["bel-logo"]}>
        <img
          alt="company_logo"
          src={require("../../assets/images/bel_logo_signin.png")}
          height={25}
          width={90}  // Change this value
          draggable="false"
        />
      </span>
      )}
      <div
        className={style["profile-container"]}
        style={{
          textAlign: "center",
          color: "white",
          borderBottom: `2px solid ${colorPrimary}`,
          width: collapsed ? "75%" : "85%",
          marginLeft: "10px",
        }}
      >
        <Tooltip color={colorPrimary} title={<TitleComponent />}>
          <Popover
            content={profileContent}
            placement="bottomRight"
            style={{ float: "right" }}
            trigger="click"
          >
            <Avatar
              size={collapsed ? 40 : currWindowWidth < MOBILE_SIZE ? 60 : 90}
              src={
                authUser?.gender === "MALE"
                  ? require("../../assets/images/man.png")
                  : require("../../assets/images/women.png")
              }
              style={{
                border: `${
                  currWindowWidth < MOBILE_SIZE ? "2px" : "4px"
                } solid ${colorPrimary}`,
                backgroundColor: "white",
              }}
            />
          </Popover>
        </Tooltip>
        {!collapsed ? (
          <div
            style={{
              fontSize: currWindowWidth < MOBILE_SIZE ? "10px" : "15px",
              color: colorPrimaryBorder,
              textAlign: "center",
            }}
          >
            {authUser?.staffName?.toUpperCase()}
          </div>
        ) : (
          <div>&nbsp;</div>
        )}
        {!collapsed && (
          <div
            style={{
              fontSize: "10px",
              color: colorPrimaryBorder,
              textAlign: "center",
              marginTop: "1px",
              marginBottom: "15px",
            }}
          >
            {authUser?.designation}
          </div>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        items={items}
        onClick={onMenuClick}
        style={{
          backgroundColor: backgroundColorSidebar[0],
          color: "white",
        }}
      />
    </>
  );
};

export default SidebarContent;
