import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { HOME_BY_ROLE } from "../../constants/HomeByRole";
import { LINKS } from "../../constants/LinksUtility";
import "./LoginSignup.css";
import Loader from "../../Loader/Loader";
import { accessToken } from "../../constants/constant";
import { AuthProvider } from "../../contexts/authcontext/AuthProvider";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authcontext/AuthProvider";
import { useEffect } from "react";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const {user,setUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoader(true);

    try {
      const res = await axios.post(
    `${LINKS.API_BASE_URL}/auth/login`,
    { mobile, password },
    { withCredentials: true }
  );

  if (res.data === "Login Successful") {

    const res2 = await axios.get(
      `${LINKS.API_BASE_URL}/auth/getUserRole`,
      { withCredentials: true }
    );

    setUser(res2.data);
    console.log(res2.data);
    navigate(HOME_BY_ROLE[res2.data.toLowerCase()]);

  }


      setLoader(false);

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
        {loader ? <Loader /> : <button type="submit">Login</button>}

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
