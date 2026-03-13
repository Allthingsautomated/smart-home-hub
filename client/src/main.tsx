import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { trpc, getTRPCClient } from "./lib/trpc";

const queryClient = new QueryClient();

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

try {
  const trpcClient = getTRPCClient();
  createRoot(root).render(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
} catch (error) {
  console.error("Failed to initialize app:", error);
  root.innerHTML = `<div style="padding: 20px; color: red;">Failed to initialize application: ${error instanceof Error ? error.message : String(error)}</div>`;
}
