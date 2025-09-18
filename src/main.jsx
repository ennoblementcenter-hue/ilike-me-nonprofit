import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";              // <- REQUIRED

createRoot(document.getElementById("root")).render(<App />);
