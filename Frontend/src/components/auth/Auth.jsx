import React from "react";
import "../../css/auth/Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, logout } from "../../redux/slice/authSlice";
import { closeAuthModal, openAuthModal } from "../../redux/slice/uiSlice";
import Login from "./Login";
import Signup from "./Signup";
import Modal from "../common/Modal";

const Auth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  // isAuthenticated already defined, we'll just use it through dispatch from redux

  const { authModalOpen, authMode } = useSelector((state) => state.ui);

  return (
    <>
      {/* when to open the auth modal */}
      <div className="auth-container">
        {!isAuthenticated ? (
          // not authenticated -> show signup and login
          <>
            <button
              className="auth-btn signup "
              onClick={() => {
                dispatch(clearError());
                dispatch(openAuthModal("signup"));
              }}
            >
              Signup
            </button>
            <button
              className="auth-btn login"
              onClick={() => {
                dispatch(clearError());
                dispatch(openAuthModal("login"));
              }}
            >
              Login
            </button>
          </>
        ) : (
          // already authenticated, so can only logout
          <button
            className="auth-btn logout"
            onClick={() => dispatch(logout())}
          >
            logout
          </button>
        )}
      </div>

      {authModalOpen && (
        <Modal
          onClose={() => {
            dispatch(closeAuthModal());
            dispatch(clearError());
          }}
        >
          {authMode === "signup" && <Signup />}
          {authMode === "login" && <Login />}
          {authMode === "forgot" && <Login />}
        </Modal>
      )}
    </>
  );
};

export default Auth;
