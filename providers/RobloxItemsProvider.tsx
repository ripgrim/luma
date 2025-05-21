"use client"

import { trpc } from "@/utils/trpc"
import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"

// Define the context type
type RobloxItemsContextType = {
    getItemThumbnailUrl: (assetId: string) => string | null
    preloadItemThumbnails: (assetIds: string[]) => void
}

// Create the context with default values
const RobloxItemsContext = createContext<RobloxItemsContextType>({
    getItemThumbnailUrl: () => null,
    preloadItemThumbnails: () => {}
})

// Create a provider component
export function RobloxItemsProvider({ children }: { children: ReactNode }) {
    const [thumbnailCache, setThumbnailCache] = useState<Record<string, string>>({})
    const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())
    const utils = trpc.useUtils()

    // Fetch thumbnails in batches
    const fetchThumbnails = useCallback(
        async (assetIds: string[]) => {
            if (!assetIds.length) return

            try {
                console.log(
                    `[RobloxItemsProvider] Fetching thumbnails for ${assetIds.length} items`
                )
                const result = await utils.robloxItems.getItemThumbnails.fetch({
                    assetIds
                })

                if (result.thumbnails) {
                    setThumbnailCache((prev) => ({
                        ...prev,
                        ...result.thumbnails
                    }))
                }
            } catch (error) {
                console.error("[RobloxItemsProvider] Error fetching item thumbnails:", error)
            }
        },
        [utils.robloxItems.getItemThumbnails]
    )

    // Process any pending IDs that need to be fetched
    useEffect(() => {
        if (pendingIds.size > 0) {
            const idsToFetch = Array.from(pendingIds)
            setPendingIds(new Set()) // Clear the pending set
            fetchThumbnails(idsToFetch)
        }
    }, [pendingIds, fetchThumbnails])

    // Get a thumbnail URL for a specific asset ID
    const getItemThumbnailUrl = useCallback(
        (assetId: string): string | null => {
            if (!assetId) return null

            // If we have it cached, return it
            if (thumbnailCache[assetId]) {
                return thumbnailCache[assetId]
            }

            // Otherwise add it to pending IDs to be fetched
            if (!pendingIds.has(assetId)) {
                setPendingIds((prev) => {
                    const newSet = new Set(prev)
                    newSet.add(assetId)
                    return newSet
                })
            }

            // Return null since we don't have it yet
            return null
        },
        [thumbnailCache, pendingIds]
    )

    // Preload multiple thumbnails
    const preloadItemThumbnails = useCallback(
        (assetIds: string[]) => {
            if (!assetIds.length) return

            // Filter out IDs we already have cached
            const idsToFetch = assetIds.filter((id) => !thumbnailCache[id])

            if (idsToFetch.length > 0) {
                setPendingIds((prev) => {
                    const newSet = new Set(prev)
                    idsToFetch.forEach((id) => newSet.add(id))
                    return newSet
                })
            }
        },
        [thumbnailCache]
    )

    const contextValue = {
        getItemThumbnailUrl,
        preloadItemThumbnails
    }

    return (
        <RobloxItemsContext.Provider value={contextValue}>{children}</RobloxItemsContext.Provider>
    )
}

// Create a custom hook to use the context
export function useRobloxItemsContext() {
    const context = useContext(RobloxItemsContext)

    if (!context) {
        throw new Error("useRobloxItemsContext must be used within a RobloxItemsProvider")
    }

    return context
}
