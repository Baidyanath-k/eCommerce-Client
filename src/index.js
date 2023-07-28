import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { SearchProvider } from "./context/searchContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <Toaster></Toaster>
      <App />
    </SearchProvider>
  </AuthProvider>
);

reportWebVitals();
