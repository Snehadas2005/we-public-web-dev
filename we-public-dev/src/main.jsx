import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { validateRequiredEnvVars } from "./config/env";
import { CmsProvider } from "./context/CmsContext";
import "./style/home.css";


const rootElement = document.getElementById("root");
const missingEnvVars = validateRequiredEnvVars();

if (missingEnvVars.length > 0) {
  createRoot(rootElement).render(
    <StrictMode>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "system-ui, sans-serif",
          background: "#fff7f7",
          color: "#8f1d1d",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "12px", fontSize: "1.3rem" }}>
            Missing environment variables
          </h1>
          <p style={{ marginBottom: "8px" }}>
            The app cannot start because required env values are missing.
          </p>
          <p>
            Missing: <strong>{missingEnvVars.join(", ")}</strong>
          </p>
          <p style={{ marginTop: "8px", color: "#6c6c6c" }}>
            Add them to your `.env` file and restart the dev server.
          </p>
        </div>
      </div>
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <CmsProvider>
          <App />
        </CmsProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
