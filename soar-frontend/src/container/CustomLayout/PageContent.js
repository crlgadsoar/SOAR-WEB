import React from "react";
import { Outlet } from "react-router-dom";
import { Watermark, theme, Layout } from "antd";
import AppInitializer from "../Initializer/app";
import style from "./index.module.css";
import { useSelector } from "react-redux";
import { TAB_SIZE } from "constants";
import { MOBILE_SIZE } from "constants";
const { Content } = Layout;
/**
 * Renders the content of the page, including the primary color token, display mode,
 * collapsed state, current window width, watermark, app initializer, and outlet.
 * @returns The rendered page content.
 */
const PageContent = () => {
  const {
    token: {
      colorPrimary,
      //colorBorderSecondary, colorBgSpotlight
    },
  } = theme.useToken();
  const { displayMode, collapsed, currWindowWidth } = useSelector(
    (state) => state.themeConfig
  );

  return (
    <Content
      style={{
        marginLeft:
          currWindowWidth < MOBILE_SIZE
            ? "2px"
            : currWindowWidth < TAB_SIZE
              ? "10px"
              : collapsed
                ? "100px"
                : "210px",

        padding: 24,
        //backgroundColor: displayMode === 'DARK' ? colorBgSpotlight : colorBorderSecondary,
        color: displayMode === "DARK" ? "white" : colorPrimary,
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
        content={["Copyright CRL", "Bharat Electronics Ltd."]}
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
