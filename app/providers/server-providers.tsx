// This file fetches server-side data and uses AutumnProvider
import { headers } from "next/headers"
import { authClient } from "@/lib/auth-client"
import type { ReactNode } from "react"
import { AutumnProvider } from "autumn-js/next"

// Fetch session data on the server
export async function SessionDataProvider({ 
    children 
}: { 
    children: ReactNode
}) {
    const session = await authClient.getSession({
        fetchOptions: { headers: await headers() },
    });
    
    // Use AutumnProvider in server component
    return (
        <AutumnProvider 
            customerId={session.data?.user?.id || "unauthenticated"}
            customerData={session.data ? {
                name: session.data.user.name,
                email: session.data.user.email
            } : undefined}
        >
            {children}
        </AutumnProvider>
    );
}
