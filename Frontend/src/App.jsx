import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  setLoading,
  setError,
  setUser,
} from "./redux/slice/authSlice";
import axios from "axios";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedToken = token || localStorage.getItem("token");
    if (!storedToken || user) {
      return;
    }

    const fetchUser = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/me`,
          // in backend, functionality is in authMiddleware
          // from the authorization bearer token is taken and it is split using space, and the token is used to find the user info., from the db
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );
        dispatch(setUser({ user: res.data, token: storedToken }));
      } catch (error) {
        console.error("getMe failed", error);
        dispatch(
          setError(
            error?.response?.data?.message ||
              "Session expired. Please Login again",
          ),
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch, token, user]); // dependency array

  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Homepage />} />
        <Route path="reset-password/:token" element={<ResetPassword />}></Route>
        {/* token is access throught he params */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
