import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Environment validation
if (!import.meta.env.VITE_API_BASE) {
    console.error(
        "⚠️ VITE_API_BASE is not set. Please check your .env file.\n" +
            "Expected format: VITE_API_BASE=http://localhost:8080",
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />,
    </StrictMode>,
);
