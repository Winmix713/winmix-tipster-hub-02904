import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FeatureFlagsProvider } from "./providers/FeatureFlagsProvider";

createRoot(document.getElementById("root")!).render(
  <FeatureFlagsProvider>
    <App />
  </FeatureFlagsProvider>
);
