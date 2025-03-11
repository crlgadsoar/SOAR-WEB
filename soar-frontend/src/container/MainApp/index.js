import React, { useEffect } from "react";
import { ConfigProvider, App, theme } from "antd";
import ProjectRouter from "../ProjectRouter";
import "antd/dist/reset.css";
import { themeToken } from "./themeToken.js";
import TokenInitializer from "container/Initializer/reAuth";
import AppLocale from "lngProvider";
import { useSelector, useDispatch } from "react-redux";
import { IntlProvider } from "react-intl";
import {
  updateNavigationType,
  updateCollapsed,
} from "appRedux/reducers/ThemeConfig";

/**
 * The main component of the application
 */
const MainApp = () => {
  const { language } = useSelector((state) => state.themeConfig); // Get language from redux
  const dispatch = useDispatch();

  //console.log('language', language);
  const currentAppLocale = AppLocale[language];
  //console.log('currentAppLocale', currentAppLocale);

  //UPDATE NAVIGATION TYPE TO REDUX
  useEffect(() => {
    dispatch(updateNavigationType(themeToken.navigationType || "SIDE"));
    if (themeToken.navigationType === "SIDE") {
      dispatch(updateCollapsed(themeToken.sideCollapsed));
    }
    return () => {};
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        token: themeToken.token,
        algorithm: theme.defaultAlgorithm,
      }}
      locale={currentAppLocale.antd}
    >
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <App>
          <TokenInitializer />
          <div className="App">
            <ProjectRouter />
          </div>
        </App>
      </IntlProvider>
    </ConfigProvider>
  );
};
export default MainApp;
