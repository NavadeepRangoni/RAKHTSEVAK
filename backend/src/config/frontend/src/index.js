import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Find the root element from index.html
const container = document.getElementById("root");
const root = createRoot(container);

// Render the App component inside React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
