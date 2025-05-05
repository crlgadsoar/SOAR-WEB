import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import backgroundImage from "../assets/images/background.jpg";
import { login, signUp } from "api/api";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await login(values);

      if (response.statusText) {
        message.success("Login successful!");
        navigate("/dashboard");
      } else {
        message.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      message.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (values) => {
    setLoading(true);
    try {
      const result = await signUp(values);
      if (result.success) {
        message.success(result.message);
        setIsSignUp(false);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (   
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >  
      
      <h1
    style={{
      color: "#fff",
      fontSize: "40px",
      fontWeight: "bold",
      position: "absolute",
      top: "20%", // Adjust vertical position
      textAlign: "center",
      width: "100%",
      textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)", // Adds a shadow for better visibility
    }}
    >
      Security Orchestration Automation Response
    </h1>

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

        <h2 style={{ color: "#fff", marginBottom: "20px" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <Form onFinish={isSignUp ? handleSignUp : handleLogin} layout="vertical">
          <Form.Item name="username" rules={[{ required: true, message: "Please enter your username" }]}>
            <Input placeholder="Username" style={{ padding: "10px", borderRadius: "5px", border: "none" }} />
          </Form.Item>

          {isSignUp && (
            <Form.Item name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
              <Input placeholder="Email" style={{ padding: "10px", borderRadius: "5px", border: "none" }} />
            </Form.Item>
          )}

          <Form.Item name="password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password placeholder="Password" style={{ padding: "10px", borderRadius: "5px", border: "none" }} />
          </Form.Item>

          {/* ✅ Button with Hover Effect */}
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
              transition: "all 0.3s ease-in-out", // Smooth transition
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#ff4d88"; // Darker shade on hover
              e.target.style.transform = "scale(1.05)"; // Slightly bigger on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ff7eb3"; // Revert to original color
              e.target.style.transform = "scale(1)"; // Reset size
            }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </Form>

        <p style={{ color: "#fff", marginTop: "10px", cursor: "pointer" }} onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
