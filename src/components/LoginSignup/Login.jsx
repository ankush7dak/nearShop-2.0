import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { HOME_BY_ROLE } from "../../constants/HomeByRole";
import { LINKS } from "../../constants/LinksUtility";
import "./LoginSignup.css";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${LINKS.API_BASE_URL}/auth/login`,
        { mobile, password }
      );
      console.log(res.data);

      const token = res.data;

      if (!token) {
        setError("Invalid server response");
        return;
      }

      // Save token
      localStorage.setItem("token", token);

      // Decode token
      const decoded = jwtDecode(token);
      console.log(decoded)

      const role = decoded?.role;

      if (!role || !HOME_BY_ROLE[role.toLowerCase()]) {
        setError("Invalid role in token");
        return;
      }

      localStorage.setItem("role", role);

      // Navigate based on role
      navigate(HOME_BY_ROLE[role.toLowerCase()]);

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
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

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
