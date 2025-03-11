import React from "react";
import MainLayout from "./MainLayout";
import MainLayoutTop from "./MainLayoutTop";
import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
/**
 * A wrapper component that applies a custom layout based on the display mode and navigation type
 * specified in the theme configuration state.
 * @returns The custom layout component based on the display mode and navigation type.
 */
const CustomLayoutWrapper = () => {
  const { displayMode, navigationType } = useSelector(
    (state) => state.themeConfig
  );
  return (
    <ConfigProvider
      theme={{
        algorithm:
          displayMode === "DARK" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {navigationType === "SIDE" ? <MainLayout /> : <MainLayoutTop />}
    </ConfigProvider>
  );
};

export default CustomLayoutWrapper;
