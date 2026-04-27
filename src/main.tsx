import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";
import { useAuthStore } from "./store/auth-store.ts";

// Initialize Supabase auth session on app start
useAuthStore.getState().initAuth();

const container = document.getElementById("root");

createRoot(container!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
