import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="849477574035-hmbn61b2pvrke5viv6a2evfahrfosipr.apps.googleusercontent.com">
  <Provider store={store}>
    <Toaster richColors position="top-center" />
    <App />
  </Provider>
  </GoogleOAuthProvider>
);

