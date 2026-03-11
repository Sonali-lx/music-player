import React, { useState } from "react";
import "../../css/auth/Login.css";
import Input from "../common/input";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux"; // to get data from store
import {
  clearError,
  setLoading,
  setError,
  setUser,
} from "../../redux/slice/authSlice";
import { closeAuthModal, switchAuthModal } from "../../redux/slice/uiSlice";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state for forgot password
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");

  const dispatch = useDispatch(); // to get data from redux store
  const { isLoading, error } = useSelector((state) => state.auth); // to send data to redux store

  const { authMode } = useSelector((state) => state.ui);
  const isForgot = authMode === "forgot";

  // runs when login
  const handleLogin = async (e) => {
    // happens when we submit
    // async since api call
    e.preventDefault();
    dispatch(clearError()); // clearError() - we wrote in authSlice

    if (!validator.isEmail(email)) {
      dispatch(setError("Please enter a valid email address")); // the texts are the payload sent to the redux-store (authSlice)
      return;
    }

    if (!password) {
      dispatch(setError("Please enter your password"));
      return;
    }

    dispatch(setLoading(true)); // api call, so loading

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
      );

      const data = res.data || {};

      dispatch(
        // sending data to the store
        setUser({
          // from authSlice
          user: data.user,
          token: data.token,
        }),
      );

      localStorage.setItem("token", data.token);

      dispatch(closeAuthModal()); // from uiSlice
      console.log("Login successful:");
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message || error?.response?.data?.error;
      //   if error is there check for error.response,
      // if error is there in response too, then check for data, then message
      dispatch(setError(serverMessage || "Login Failed"));
      console.error("Login error:", error);
    }
  };

  // forgot password
  const handleForgotPassword = async (e) => {
    // normal
    if (!forgotEmail) {
      setForgotMsg("Please enter your email");
      return;
    }

    // forgot
    try {
      setForgotMsg("Sending reset link...");
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/forgot-password`,
        {
          email: forgotEmail,
        },
      );

      setForgotMsg("Reset link sent! Check your email 📩");
    } catch (error) {
      setForgotMsg(
        error?.response?.data?.message || "Failed to send reset link",
      );
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">
      <h3 className="login-title">Welcome Back</h3>
      <p className="login-subtitle">Please enter your details to login</p>

      <form className="login-form" onSubmit={handleLogin}>
        {/* normal */}
        {!isForgot && (
          <>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="johndoe@email.com"
              type="email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Min 6 characters"
              type="password"
            />
          </>
        )}

        {/* normal, below lane - forgot password, and signup link area in login */}
        <div className="forgot-wrapper">
          {!isForgot ? (
            <>
              <span
                className="forgot-link"
                onClick={() => {
                  dispatch(clearError());
                  dispatch(switchAuthModal("forgot"));
                }}
              >
                Forgot Password
              </span>

              <span
                className="signup-link"
                onClick={() => {
                  dispatch(clearError());
                  dispatch(switchAuthModal("signup"));
                }}
              >
                Don't have an account? Sign up!
              </span>
            </>
          ) : (
            // forgot
            <div className="forgot-box">
              <Input
                label={"Email"}
                type={"email"}
                placeholder={"Enter your registered email"}
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />

              {forgotMsg && <p className="forgot-msg">{forgotMsg}</p>}

              <button
                className="forgot-btn"
                type="button"
                onClick={handleForgotPassword}
              >
                Send the Reset link
              </button>
            </div>
          )}
        </div>

        {error && <div className="login-error">{error}</div>}

        {/* normal */}
        {!isForgot && (
          <button
            type="submit"
            className="login-submit-button"
            disabled={isLoading} // from authSlice
          >
            <span>{isLoading ? "Logging in..." : "Login"}</span>
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
