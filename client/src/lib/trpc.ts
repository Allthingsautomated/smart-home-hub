import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import type { AppRouter } from "../../../server/routers";

export const trpc = createTRPCReact<AppRouter>();

let clientCache: ReturnType<typeof trpc.createClient> | null = null;

export function getTRPCClient() {
  if (!clientCache) {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    clientCache = trpc.createClient({
      links: [
        httpBatchLink({
          url: `${baseUrl}/api/trpc`,
          transformer: SuperJSON,
          // Send credentials (cookies) with requests
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
        }),
      ],
    });
  }
  return clientCache;
}
