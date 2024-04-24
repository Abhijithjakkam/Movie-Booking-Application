import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./apps/store.js";
import { registerNotification } from "./registerNotification.js";

const root = document.getElementById("root");
root.addEventListener("click", () => {
  console.log("clicked");
  registerNotification();
});
root.click();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
