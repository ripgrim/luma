"use client"

import { RoblosecurityProvider } from "@/providers/RoblosecurityProvider"
import { TRPCProvider } from "@/providers/trpc-provider"
import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack"
import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { type ReactNode, useState } from "react"
import { Toaster, toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { PostHogProvider } from "../../providers/PostHogProvider"

export function ClientProviders({ children }: { children: ReactNode }) {
    // Create a client-side query client
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        retry: 1
                    }
                }
            })
    )

    // Set up error handling for client-side queries
    queryClient.getQueryCache().config.onError = (error, query) => {
        console.error(error, query)
        if (error.message) toast.error(error.message)
    }

    const router = useRouter()

    return (
        <PostHogProvider>
            <QueryClientProvider client={queryClient}>
                <AuthQueryProvider>
                    <RoblosecurityProvider>
                        <TRPCProvider>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <AuthUIProviderTanstack
                                    authClient={authClient}
                                    navigate={router.push}
                                    replace={router.replace}
                                    settingsURL="/user/settings"
                                    onSessionChange={() => {
                                        router.refresh()
                                    }}
                                    redirectTo="/dashboard"
                                    providers={["roblox"]}
                                    Link={Link}
                                >
                                    <NuqsAdapter>
                                        {children}
                                        <Analytics />
                                        <SpeedInsights />
                                    </NuqsAdapter>

                                    <Toaster />
                                </AuthUIProviderTanstack>
                            </ThemeProvider>
                        </TRPCProvider>
                    </RoblosecurityProvider>
                </AuthQueryProvider>
            </QueryClientProvider>
        </PostHogProvider>
    )
}
