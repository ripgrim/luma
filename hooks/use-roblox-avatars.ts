"use client"

import { trpc } from "@/utils/trpc"
import { useCallback, useEffect, useRef, useState } from "react"

// AvatarCache to prevent duplicate requests
const globalAvatarCache: Record<string, string> = {}
// Loading queue to prioritize
let avatarLoadingQueue: string[] = []

export function useRobloxAvatars() {
    const [avatarMap, setAvatarMap] = useState<Record<string, string>>({})
    const [queuedUserIds, setQueuedUserIds] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const pendingAvatarsRef = useRef<Set<string>>(new Set())
    const processedRef = useRef<Set<string>>(new Set()) // Track processed IDs to prevent loops

    const avatarQuery = trpc.robloxAvatars.getUserAvatars.useQuery(
        { userIds: queuedUserIds },
        {
            enabled: queuedUserIds.length > 0,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            staleTime: 1000 * 60 * 60
        }
    )

    // Copy global cache to local state ONCE - no dependency on avatarMap
    useEffect(
        () => {
            const cachedIds = Object.keys(globalAvatarCache)
            if (cachedIds.length > 0) {
                const entries: Record<string, string> = {}
                cachedIds.forEach((id) => {
                    entries[id] = globalAvatarCache[id]
                })

                setAvatarMap((prev) => {
                    // Only add entries that aren't already in the map
                    const newEntries: Record<string, string> = {}
                    let hasChanges = false

                    Object.entries(entries).forEach(([id, url]) => {
                        if (!prev[id]) {
                            newEntries[id] = url
                            hasChanges = true
                        }
                    })

                    return hasChanges ? { ...prev, ...newEntries } : prev
                })
            }
        },
        [
            /* No dependencies to avoid loops */
        ]
    )

    // Handle query results
    useEffect(() => {
        if (avatarQuery.data) {
            const newAvatars = avatarQuery.data.avatars

            // Update global cache
            Object.entries(newAvatars).forEach(([userId, url]) => {
                globalAvatarCache[userId] = url
            })

            // Update state with new avatars only if they don't already exist
            setAvatarMap((prev) => {
                const updatedMap = { ...prev }
                let hasChanges = false

                Object.entries(newAvatars).forEach(([id, url]) => {
                    if (!prev[id]) {
                        updatedMap[id] = url
                        hasChanges = true
                    }
                })

                return hasChanges ? updatedMap : prev
            })

            // Clear queue and reset loading state
            setQueuedUserIds([])
            setIsLoading(false)
            pendingAvatarsRef.current.clear()
        }
    }, [avatarQuery.data])

    // Function to queue userIds for avatar loading with priority
    const queueAvatarLoading = useCallback(
        (userIds: string[], isPriority = false) => {
            if (!userIds.length) return

            // Filter out userIds that are already cached or being processed
            const uncachedIds = userIds.filter((id) => {
                if (!id || globalAvatarCache[id] || processedRef.current.has(id)) {
                    return false
                }
                // Mark as processed to prevent reprocessing
                processedRef.current.add(id)
                return true
            })

            if (!uncachedIds.length) {
                // If all are cached, just ensure they're in the local state
                const cachedResults: Record<string, string> = {}
                let hasNewEntries = false

                userIds.forEach((id) => {
                    if (globalAvatarCache[id] && !avatarMap[id]) {
                        cachedResults[id] = globalAvatarCache[id]
                        hasNewEntries = true
                    }
                })

                if (hasNewEntries) {
                    setAvatarMap((prev) => ({ ...prev, ...cachedResults }))
                }
                return
            }

            // Update global queue
            if (isPriority) {
                // For priority loading, add to front of queue
                avatarLoadingQueue = [...uncachedIds, ...avatarLoadingQueue]
            } else {
                // For normal loading, add to end of queue
                avatarLoadingQueue = [...avatarLoadingQueue, ...uncachedIds]
            }

            // Remove duplicates
            avatarLoadingQueue = [...new Set(avatarLoadingQueue)]

            // Batch load up to 100 avatars at once
            const batchSize = 100
            const nextBatch = avatarLoadingQueue.slice(0, batchSize)

            setQueuedUserIds(nextBatch)
            setIsLoading(true)
        },
        [avatarMap]
    ) // Only depend on avatarMap to check what's already loaded

    // Process pending avatars (outside of render)
    const processPendingAvatars = useCallback(() => {
        if (pendingAvatarsRef.current.size > 0 && !isLoading) {
            const pendingIds = Array.from(pendingAvatarsRef.current)
            pendingAvatarsRef.current.clear()

            // Filter out IDs that are already in avatarMap or globalCache
            const idsToLoad = pendingIds.filter(
                (id) => !avatarMap[id] && !globalAvatarCache[id] && !processedRef.current.has(id)
            )

            if (idsToLoad.length > 0) {
                queueAvatarLoading(idsToLoad, true)
            }
        }
    }, [isLoading, avatarMap, queueAvatarLoading])

    // Effect to process pending avatars with a debounce
    useEffect(() => {
        if (pendingAvatarsRef.current.size === 0) return

        const timeoutId = setTimeout(() => {
            processPendingAvatars()
        }, 50) // Small debounce to batch closely-timed requests

        return () => clearTimeout(timeoutId)
    }, [pendingAvatarsRef.current.size, processPendingAvatars])

    // Reset processed IDs when switching pages/views
    useEffect(() => {
        return () => {
            processedRef.current.clear()
        }
    }, [])

    // Safe to call during render - doesn't cause updates directly
    const getAvatarUrl = useCallback(
        (userId: string) => {
            if (!userId) return null

            // Return from local state if available
            if (avatarMap[userId]) {
                return avatarMap[userId]
            }

            // Return from global cache if available
            if (globalAvatarCache[userId]) {
                return globalAvatarCache[userId]
            }

            // Only queue if not already pending and not already processed
            if (!pendingAvatarsRef.current.has(userId) && !processedRef.current.has(userId)) {
                pendingAvatarsRef.current.add(userId)
            }

            return null
        },
        [avatarMap]
    )

    return {
        avatarMap,
        queueAvatarLoading,
        getAvatarUrl,
        isLoading
    }
}
