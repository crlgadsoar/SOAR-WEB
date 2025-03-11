import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication (Replace this with API call)
    if (username === "admin" && password === "admin123") {
     // localStorage.setItem("role", "admin"); // Store role in localStorage
      navigate("/home"); // Redirect to home after login
    } else if (username === "analyst" && password === "analyst123") {
      //localStorage.setItem("role", "analyst");
      navigate("/home");
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 bg-cover bg-center" 
      style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?technology,security")' }}>
      
      <div className="bg-white/90 p-8 rounded-lg shadow-2xl w-96 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Forgot password? <a href="#" className="text-blue-500 hover:underline">Reset here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
