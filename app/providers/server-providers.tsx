import { authClient } from "@/lib/auth-client"
import { AutumnProvider } from "autumn-js/next"
// This file fetches server-side data and uses AutumnProvider
import { headers } from "next/headers"
import type { ReactNode } from "react"

// Fetch session data on the server
export async function SessionDataProvider({
    children
}: {
    children: ReactNode
}) {
    const session = await authClient.getSession({
        fetchOptions: { headers: await headers() }
    })

    // Use AutumnProvider in server component
    return (
        <AutumnProvider
            customerId={session.data?.user?.id || "unauthenticated"}
            customerData={
                session.data
                    ? {
                          name: session.data.user.name,
                          email: session.data.user.email
                      }
                    : undefined
            }
        >
            {children}
        </AutumnProvider>
    )
}
