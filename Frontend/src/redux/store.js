import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.js";
//import songSlice from "./slice/songSlice.js";
import uiReducer from "./slice/uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    //songs: songSlice.reducer,
    ui: uiReducer,
  },
});

export default store;
