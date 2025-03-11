import React from "react";
import { Outlet } from "react-router-dom";
import { Watermark, theme, Layout } from "antd";
import AppInitializer from "../Initializer/app";
import style from "./index.module.css";
import { useSelector } from "react-redux";
import { changeLogs } from "../../routes/help/changelog/index";
//import { TAB_SIZE } from 'constants';
//import { MOBILE_SIZE } from 'constants';
const { Content } = Layout;

/**
 * Renders the content of the page, including the watermark, app initializer, and outlet.
 * @returns The rendered page content.
 */
const PageContent = () => {
  const {
    token: {
      colorPrimary,
      //colorBorderSecondary, colorBgSpotlight
    },
  } = theme.useToken();
  const { displayMode } = useSelector((state) => state.themeConfig);

  const screenHeight = window.innerHeight;
  const minHeight = screenHeight * 0.9; // 90% of screen height
  const version = changeLogs[changeLogs.length - 1].title;
  return (
    <Content
      style={{
        marginLeft: "2px",
        marginTop: "20px",
        // marginBottom: '5px',
        //backgroundColor: displayMode === 'DARK' ? colorBgSpotlight : colorBorderSecondary,
        color: displayMode === "DARK" ? "white" : colorPrimary,
        padding: "0 30px",
        minHeight: `${minHeight}px`,
      }}
      className={style["scrollable-content"]}
    >
      <Watermark
        font={{
          color:
            displayMode === "DARK"
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,.06)",
        }}
        // content={["SOAR", "Copyright CRL", version]}
        zIndex={0}
        style={{ position: "relative" }}
      >
        <AppInitializer />
        <Outlet />
      </Watermark>
    </Content>
  );
};

export default PageContent;
