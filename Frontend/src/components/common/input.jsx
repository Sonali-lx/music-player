import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "../../css/auth/Input.css";

const Input = ({ value, onChange, label, placeholder, type }) => {
  // input value, onChange prop, label (email, password), placeholder text, input type

  const [showPassword, setShowPassword] = useState(false); // memory element

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <div className="input-container">
        <input
          className="input-field"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
            // if type is password,
            // and if showPassword memory state is true,
            // then the type is text,
            // else
            // it'll be password - hidden
            // else given type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <>
            <button
              type="button"
              className="input-eye-button"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FaRegEye size={22} onClick={() => toggleShowPassword()} /> // eye open, 1st toggleshow false, when clicked, will become true
              ) : (
                <FaRegEyeSlash size={22} onClick={() => toggleShowPassword()} />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
