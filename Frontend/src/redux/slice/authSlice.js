import { createSlice } from "@reduxjs/toolkit";

// initial State
const initialState = {
  // response during authentication
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false, // initially
  isLoading: false, // once running true
  error: null,
};

// functionality based on data access and their effects
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // set loading state during API calls (login, register, fetchUser)
    setLoading: (state, action) => {
      // state -> initial state, action -> the updated state
      state.isLoading = action.payload;
      // based on the payload (response)
      // true -> false, false -> true
      state.error = null;
    },

    // set user after successful login/register/fetchuser
    // also stores the token in localstorage for persistance
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false; // since already got the data
      state.error = false;

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false; // since got error
    },

    // for logout -> clear all auth state and remove token from the local storage
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },

    updateFavourites: (state, action) => {
      if (state.user) {
        state.user.favourites = action.payload;
      }
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setUser,
  setError,
  logout,
  updateFavourites,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
