import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "@/styles/globals.css"
import { Providers } from "@/app/providers"
import { AppSidebar } from "@/components/app-sidebar"
import { RedirectToRoot } from "@/components/better-auth-ui/redirect-to-root"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { HotkeyProviderWrapper } from "@/lib/hotkeys/hotkey-provider-wrapper"
import { RedirectToSignIn, SignedIn, SignedOut } from "@daveyplate/better-auth-ui"
import type { ReactNode } from "react"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
})

export const metadata: Metadata = {
    title: "Luma",
    description: "Trading on Roblox, smarter."
}

export const viewport: Viewport = {
    initialScale: 1,
    viewportFit: "cover",
    width: "device-width",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "oklch(1 0 0)" },
        { media: "(prefers-color-scheme: dark)", color: "oklch(0.145 0 0)" }
    ]
}

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <div className="flex min-h-svh flex-col">
                        <SidebarProvider>
                            <AppSidebar />
                            <SidebarInset>
                                <HotkeyProviderWrapper>
                                    <SignedIn>{children}</SignedIn>
                                    <SignedOut>
                                        <RedirectToSignIn />
                                    </SignedOut>
                                </HotkeyProviderWrapper>
                            </SidebarInset>
                        </SidebarProvider>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
