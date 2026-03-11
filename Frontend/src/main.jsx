import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import App from "./App.jsx";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* // the store which we have created // Provider comes from from react-Redux */}
      <App />
    </Provider>
  </StrictMode>,
);
