'use client';
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { useState } from 'react';
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
let browserQueryClient: QueryClient;
/**
 * Return a QueryClient instance appropriate for the current runtime environment.
 *
 * In server environments this always creates and returns a new QueryClient. In browser
 * environments it returns a single cached QueryClient, creating it on first access to
 * avoid recreating the client across renders (e.g., during React suspense).
 *
 * @returns A `QueryClient` — a new instance on the server; a cached singleton in the browser.
 */
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
/**
 * Compute the TRPC API URL appropriate for the current runtime environment.
 *
 * In a browser this returns a relative path; on server, if VERCEL_URL is set it uses `https://<VERCEL_URL>`, otherwise `http://localhost:3000`.
 *
 * @returns The full TRPC API URL (e.g., `"/api/trpc"` in browser, `"https://<VERCEL_URL>/api/trpc"` on Vercel, or `"http://localhost:3000/api/trpc"` on local server)
 */
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  })();
  return `${base}/api/trpc`;
}

/**
 * Provides TRPC and React Query contexts to descendant components.
 *
 * Initializes the TRPC client and obtains an appropriate QueryClient, then renders
 * the children wrapped in QueryClientProvider and TRPCProvider so they can use
 * TRPC hooks and TanStack Query.
 *
 * @returns A React element that renders `props.children` wrapped with `QueryClientProvider` and `TRPCProvider`.
 */
export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          // transformer: superjson, <-- if you use a data transformer
          url: getUrl(),
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}