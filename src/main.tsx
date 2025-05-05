// external import
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

// internal import
import "./index.css";
import App from "./App.tsx";
import queryClient from "./react-query/client.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
