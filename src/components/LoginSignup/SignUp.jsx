import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginSignup.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- SEND OTP ----------------
  const sendOtp = async () => {
    setError("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return setError("Enter valid 10 digit mobile number");
    }

    try {
      setLoading(true);

      await axios.post("/auth/send-otp", {
        mobile,
        role,
      });

      setStep(2);
    } catch (err) {
      setError("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- VERIFY OTP & LOGIN ----------------
  const verifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return setError("Enter valid OTP");
    }

    try {
      setLoading(true);

      const res = await axios.post("/auth/verify-otp", {
        mobile,
        otp,
        role,
      });

      localStorage.setItem("accessToken", res.data.accessToken);

      if (role === "CUSTOMER") navigate("/customer/home");
      else navigate("/pending-approval");

    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={verifyOtp}>
        <h2>Login / Signup</h2>

        {error && <p className="error-text">{error}</p>}

        {/* ---------- STEP 1 ---------- */}
        {step === 1 && (
          <>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />

            <div className="role-group">
              <label>
                <input
                  type="radio"
                  value="CUSTOMER"
                  checked={role === "CUSTOMER"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Customer
              </label>

              <label>
                <input
                  type="radio"
                  value="SHOPKEEPER"
                  onChange={(e) => setRole(e.target.value)}
                />
                Shopkeeper
              </label>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={sendOtp}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* ---------- STEP 2 ---------- */}
        {step === 2 && (
          <>
            <p className="otp-info">
              OTP sent to <b>{mobile}</b>
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              required
            />

            <button disabled={loading}>
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>

            <button
              type="button"
              className="link-btn"
              disabled={loading}
              onClick={sendOtp}
            >
              Resend OTP
            </button>
          </>
        )}

        <p>
          Already registered?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
