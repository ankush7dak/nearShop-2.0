import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { Roles } from "../../constants/Roles";
import { HOME_BY_ROLE } from "../../constants/HomeByRole";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "customer@nearshop.com" && password === "123456") {
        console.log('login handled');
      localStorage.setItem("role", "customer");
      navigate(HOME_BY_ROLE.customer);
    } else if (email === "shop@nearshop.com" && password === "123456") {
      localStorage.setItem("role", "shopkeeper");
      navigate(HOME_BY_ROLE.shopkeeper);
    } else if (email === "admin@nearshop.com" && password === "123456") {
      localStorage.setItem("role", "superadmin");
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login coming soon!");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        {error && <p style={{color: "red"}}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button
          type="button"
          className="google-login-btn"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
