import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  // Handle login
  const handleLogin = (values) => {
    setLoading(true);

    // Fake authentication logic
    if (values.username === "admin" && values.password === "Admin@12345") {
      localStorage.setItem("token", "fake-jwt-token"); // Store fake token
      message.success("Login successful!");
      navigate("/home");
    } else {
      message.error("Invalid username or password.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>Sign In</h2>
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              placeholder="Username"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Password"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{
              background: "#ff7eb3",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
