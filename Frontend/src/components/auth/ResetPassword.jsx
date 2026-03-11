import React, { useState } from "react";
import axios from "axios";
import "../../css/auth/ResetPassword.css";
import Input from "../common/input";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // from react-router-dom
  const navigate = useNavigate(); // from react-router-dom
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(""); // success or fail
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    if (!password || password.length < 6) {
      setStatus("error");
      setMessage("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setStatus("info"); // gathering information
      setMessage("Reseting password");

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/reset-password/${token}`,
        { password },
      );

      setStatus("success");
      setMessage("Password reset successfully! Redirecting....");
      setTimeout(() => navigate("/"), 2000); // 2000 millisec = 2 sec
    } catch (error) {
      setStatus("error");
      setMessage(error?.response?.data?.message || "Reset failed. Try again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // static page:
  return (
    <div className="reset-wrapper">
      <h3 className="reset-title">Reset Password</h3>
      <p className="reset-subtitle">Enter your new password to regain access</p>
      <div className="reset-from">
        <Input
          label="New Password"
          type="password"
          placeholder={"Enter new password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        {status === "error" && <div className="reset-error">{message}</div>}
        {status === "success" && <div className="reset-success">{message}</div>}

        <button
          className="reset-submit-btn"
          onClick={handleReset}
          disabled={loading}
        >
          <span>{loading ? "Resetting..." : "Reset Password"}</span>
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
