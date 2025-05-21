import type { ReactNode } from "react"
import { ClientProviders } from "./providers/client-providers"
import { SessionDataProvider } from "./providers/server-providers"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionDataProvider>
            <ClientProviders>{children}</ClientProviders>
        </SessionDataProvider>
    )
}
