import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext";
import { SearchProvider } from "./context/searchContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <Toaster></Toaster>
        <App />
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

reportWebVitals();
