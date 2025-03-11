import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainApp from "./container/MainApp";
import reportWebVitals from "./reportWebVitals";
import { store } from "./appRedux/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
window.console.devLog = (...args) => {
  return process.env.NODE_ENV === "development"
    ? console.log(...args)
    : undefined;
};
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainApp />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
