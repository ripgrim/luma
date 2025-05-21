"use client"

import { trpc } from "@/utils/trpc"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, ReactNode, useEffect } from "react"
import { httpBatchLink } from "@trpc/client"

interface EarlyAccessProviderProps {
  children: ReactNode;
}

export function EarlyAccessProvider({ children }: EarlyAccessProviderProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient, setTrpcClient] = useState<ReturnType<typeof trpc.createClient> | null>(null)
  
  useEffect(() => {
    // Only create the client on the browser
    setTrpcClient(
      trpc.createClient({
        links: [
          httpBatchLink({
            url: `${window.location.origin}/api/trpc`,
          }),
        ],
      })
    )
  }, [])
  
  // Show the children even before the client is ready
  // The tRPC hooks won't work until the provider is ready,
  // but at least the page layout and non-tRPC components will render
  if (!trpcClient) {
    return <>{children}</>; // Just render children without the tRPC provider
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
} 