"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { keyboardShortcuts } from "@/config/shortcuts"
import { useRouter } from "next/navigation"
import { useShortcuts } from "./use-hotkey-utils"

export function GlobalHotkeys() {
    const router = useRouter()
    let sidebarControls = null
    try {
        sidebarControls = useSidebar()
        console.log(
            `[GlobalHotkeys] Initializing for scope: global. Sidebar context found. Sidebar open: ${sidebarControls.open}`
        )
    } catch (error) {
        console.log(
            "[GlobalHotkeys] Initializing for scope: global. Sidebar context NOT found. Sidebar hotkeys will log warnings if used."
        )
    }

    const scope = "global"

    const handlers = {
        search: (event: KeyboardEvent) => {
            console.log(`[GlobalHotkeys] Search handler triggered by event:`, event)
            const searchInput = document.querySelector(
                'input[type="search"], input[name="q"], #global-search'
            ) as HTMLInputElement | null
            if (searchInput) {
                console.log("[GlobalHotkeys] Search input found, focusing...", searchInput)
                searchInput.focus()
            } else {
                console.warn(
                    "[GlobalHotkeys] Search Hotkey: No common search input found on the page."
                )
            }
        },
        goToTrades: (event: KeyboardEvent) => {
            console.log(`[GlobalHotkeys] goToTrades handler triggered by event:`, event)
            router.push("/trades")
        },
        goToAnalytics: (event: KeyboardEvent) => {
            console.log(`[GlobalHotkeys] goToAnalytics handler triggered by event:`, event)
            router.push("/analytics")
        },
        collapseSidebar: (event: KeyboardEvent) => {
            if (sidebarControls && sidebarControls.toggleSidebar) {
                console.log(
                    `[GlobalHotkeys] collapseSidebar handler triggered. Current state: ${sidebarControls.open ? "open" : "collapsed"}. Toggling.`
                )
                sidebarControls.toggleSidebar()
            } else {
                console.warn(
                    "[GlobalHotkeys] collapseSidebar hotkey triggered, but toggleSidebar function is not available. Is SidebarProvider an ancestor and context found?"
                )
            }
        }
    }

    const activeShortcuts = keyboardShortcuts.filter(
        (shortcut) => shortcut.scope === scope && handlers.hasOwnProperty(shortcut.id)
    )

    if (activeShortcuts.length > 0) {
        console.log("[GlobalHotkeys] Active shortcuts being registered:", activeShortcuts)
        useShortcuts(activeShortcuts, handlers, {
            scopes: scope,
            stopPropagation: true
        })
    }

    return null
}
