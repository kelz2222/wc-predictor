import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app-v3.jsx";

const loader = document.getElementById("initial-loader");
if (loader) loader.remove();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
