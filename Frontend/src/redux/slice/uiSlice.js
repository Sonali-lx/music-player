import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui", // this slice is all about the changes that happens in the ui
  initialState: {
    authModalOpen: false, // pop up open or close
    authMode: "login", // 3 types of popups -> for login/signup/forgotpassword
  },

  reducers: {
    openAuthModal: (state, action) => {
      state.authModalOpen = true;
      state.authMode = action.payload || "login";
    },

    closeAuthModal: (state, action) => {
      state.authModalOpen = false;
      state.authMode = action.payload || "login";
    },

    switchAuthModal: (state, action) => {
      state.authMode = action.payload;
    },
  },
});

export const { openAuthModal, closeAuthModal, switchAuthModal } =
  uiSlice.actions;

export default uiSlice.reducer;
