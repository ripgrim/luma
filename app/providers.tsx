import { SessionDataProvider } from "./providers/server-providers"
import { ClientProviders } from "./providers/client-providers"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionDataProvider>
            <ClientProviders>
                {children}
            </ClientProviders>
        </SessionDataProvider>
    )
}
