"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { keyboardShortcuts } from "@/config/shortcuts"
import { useRouter } from "next/navigation"
import { useShortcuts } from "./use-hotkey-utils"
import { useQueryState } from "nuqs"

/**
 * Registers and manages global keyboard shortcuts for navigation and UI actions.
 *
 * Sets up handlers for global hotkeys such as focusing search, navigating to key routes, toggling the sidebar, and opening the trade composer. Shortcuts are filtered by the "global" scope and registered with the appropriate handlers. No UI is rendered.
 *
 * @remark Logs warnings if sidebar controls are unavailable or if expected UI elements (like the search input) are not found when a shortcut is triggered.
 */
export function GlobalHotkeys() {
    const router = useRouter()
    const sidebarControls = useSidebar()
    const [tradeComposerOpen, setTradeComposerOpen] = useQueryState('isTradeComposerOpen');

    if (sidebarControls && sidebarControls.open !== undefined) {
        console.log(
            `[GlobalHotkeys] Initializing for scope: global. Sidebar context found. Sidebar open: ${sidebarControls.open}`
        )
    } else {
        console.log(
            "[GlobalHotkeys] Initializing for scope: global. Sidebar context potentially NOT found or not providing expected shape. Sidebar hotkeys might log warnings if used."
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
        },
        openTradeComposer: () => setTradeComposerOpen('true')
    }

    const activeShortcuts = keyboardShortcuts.filter(
        (shortcut) => shortcut.scope === scope && handlers.hasOwnProperty(shortcut.id)
    )

    useShortcuts(activeShortcuts, handlers, {
        scopes: scope,
        stopPropagation: true
    })

    if (activeShortcuts.length > 0) {
        console.log("[GlobalHotkeys] Active shortcuts being registered:", activeShortcuts)
    } else {
        console.log("[GlobalHotkeys] No active shortcuts for this scope.")
    }

    return null
}
