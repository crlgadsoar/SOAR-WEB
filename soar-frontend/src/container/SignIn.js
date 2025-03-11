import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  App,
  Form,
  theme,
  ConfigProvider,
  Input,
  Button,
  // Button,
  // Checkbox,
} from "antd";
import Loader from "components/Loader";
import { signIn } from "../appRedux/reducers/Auth";
import styles from "./SignIn.module.css";
import backgroundVideo from "../assets/files/railway_bg.mp4";

const SignIn = () => {
  //console.log(' window.innerWidth', window.innerWidth);
  const { message } = App.useApp();
  const {
    token: { colorPrimaryHover },
  } = theme.useToken();

  const { authUser, loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fromLocation = location.state?.from?.pathname;

  React.useEffect(() => {
    console.devLog("SignIn  From Location is ", location.state?.from?.pathname);
    console.devLog("Inside SignIn Form authUser", authUser);
    if (authUser) {
      navigate(fromLocation || "/main/home", {
        state: { from: location },
        replace: true,
      });
    }
    if (localStorage.getItem("token") && !fromLocation) {
      navigate("/main/home", {
        state: { from: location },
        replace: true,
      });
    }
  }, [authUser, location, navigate, fromLocation]);

  const handleSubmit = async (value) => {
    //e.preventDefault();
    try {
      await dispatch(
        signIn({
          username: value.username,
          password: value.password,
          version: "V-1.5.6",
        })
      ).unwrap();
      navigate(fromLocation, { replace: true });
      //message.success('Login Successful');
    } catch (signInError) {
      message.error({
        content: signInError.message,
        key: "UI",
        duration: 2,
      });
    }
  };

  const onFinish = (values) => {
    console.devLog("onFinish:", values);
    handleSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.devLog("Failed:", errorInfo);
  };

  if (localStorage.getItem("token")) {
    return <Loader />;
  }
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <video
        id={styles["background-video"]}
        autoPlay
        loop
        muted
        disablePictureInPicture={true}
      >
        <source src={backgroundVideo} type="video/mp4" />
        {"Sorry, your browser does not support videos"}
      </video>
      <div
        style={{
          backgroundColor: colorPrimaryHover,
        }}
      ></div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles["form"]}
        initialValues={{ username: "admin_cikms", password: "Admin@12345" }}
        style={{
          height: " 480px",
          width: " 400px",
          backgroundColor: " rgba(255,255,255,0.13)",
          position: "fixed",
          transform: "translate(-50%,-50%)",
          top: "50%",
          left: "50%",
          borderRadius: " 10px",
          backdropFilter: " blur(10px)",
          border: " 2px solid rgba(255,255,255,0.1)",
          boxShadow: " 0 0 40px rgba(8,7,16,0.6)",
          padding: " 50px 35px",
          fontFamily: "Poppins,sans-serif",
          letterSpacing: "0.5px",
          outline: "none",
        }}
      >
        <div style={{ display: "flex", flexFlow: "column" }}>
          <img
            src={require("../assets/images/Bharat-Electronics.png")}
            alt="bck_img"
            draggable="false"
            style={{
              width: "150px",
              height: "150px",
              marginLeft: "85px",
            }}
          />

          <div>
            <h2
              style={{
                color: "white",
                textAlign: "center",
                marginTop: "5px",
                marginBottom: "15px",
                fontWeight: "bold",
                fontFamily: "NoirPro,sans-serif",
                letterSpacing: "1px",
              }}
            >
              {" "}
              SPLUNK SOAR
            </h2>
          </div>
        </div>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Username is Required" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is Required" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading === "pending"}
          block
        >
          Sign In
        </Button>
      </Form>
    </ConfigProvider>
  );
};

export default SignIn;
