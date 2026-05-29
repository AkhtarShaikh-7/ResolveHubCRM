import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./styles/global.css";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop/>

      <AuthProvider>
        <Toaster position="top-right" />

        <App />
      </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);