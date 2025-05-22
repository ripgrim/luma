"use client"

import { TradePageSkeleton } from "@/components/skeletons/trade/TradePageSkeleton"
import { TradeCard } from "@/components/trades/TradeCard"
import { TradeDisplay } from "@/components/trades/TradeDisplay"
import { TradeEmptyState } from "@/components/trades/TradeEmptyState"
import { TradeSwitcher } from "@/components/trades/TradeSwitcher"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { RobloxAvatarsProvider } from "@/providers/RobloxAvatarsProvider"
import { useRobloxAvatarsContext } from "@/providers/RobloxAvatarsProvider"
import { RobloxItemsProvider } from "@/providers/RobloxItemsProvider"
import { trpc } from "@/utils/trpc"
import { Loader2 } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Drawer } from "vaul"

interface Trade {
    id: string
    originalId: string
    userId: string
    tradePartnerId: string
    tradePartnerName: string
    tradePartnerDisplayName: string | null
    created: string
    expiration: string
    isActive: boolean
    status: string
    tradeType: string
    rawData?: string
}

interface TradePageLayoutProps {
    tradeType: "inbound" | "outbound" | "completed" | "inactive"
}

// Number of trades to fetch per page
const PAGE_SIZE = 20

// Main component wrapped with the providers
export function TradePageLayout({ tradeType: initialTradeType }: TradePageLayoutProps) {
    return (
        <RobloxAvatarsProvider>
            <RobloxItemsProvider>
                <TradePageContent initialTradeType={initialTradeType} />
            </RobloxItemsProvider>
        </RobloxAvatarsProvider>
    )
}

// Content component that uses the provider context
function TradePageContent({
    initialTradeType
}: { initialTradeType: TradePageLayoutProps["tradeType"] }) {
    const [isClient, setIsClient] = useState(false)
    const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const isMobile = useIsMobile()
    const [windowWidth, setWindowWidth] = useState(0)
    const isDrawerMode = windowWidth < 1024 // Use drawer for all screens below lg breakpoint

    // State to track current trade type (can change without page refresh)
    const [tradeType, setTradeType] = useState<TradePageLayoutProps["tradeType"]>(initialTradeType)
    const [pendingType, setPendingType] = useState<TradePageLayoutProps["tradeType"] | null>(null)

    // State for trades pagination
    const [trades, setTrades] = useState<Trade[]>([])
    const [nextCursor, setNextCursor] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const previousCursorRef = useRef<string | null>(null)
    const cursorRepeatCountRef = useRef(0)
    const [tradeItems, setTradeItems] = useState<Record<string, any[]>>({})

    // Access tRPC utils for manual invalidation
    const utils = trpc.useContext()

    // Get avatar loading functionality
    const { queueAvatarLoading } = useRobloxAvatarsContext()

    // Set isClient to true on mount to avoid hydration mismatch
    useEffect(() => {
        setIsClient(true)

        // Set initial window width
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth)

            // Update width on resize
            const handleResize = () => {
                setWindowWidth(window.innerWidth)
            }

            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [])

    // Update tradeType when initialTradeType changes from props
    useEffect(() => {
        if (initialTradeType !== tradeType) {
            setTradeType(initialTradeType)
            setSelectedTrade(null)
            setTrades([])
            setNextCursor(null)
            setHasMore(true)
        }
    }, [initialTradeType])

    const handleTradeTypeChange = useCallback(
        (newTypeString: string) => {
            const newType = newTypeString as TradePageLayoutProps["tradeType"]
            if (newType === tradeType) return

            setPendingType(newType)
            setSelectedTrade(null)
            setTrades([])
            setNextCursor(null)
            setHasMore(true)
            setTradeType(newType)
            utils.robloxTrades.getStoredTrades.invalidate()
        },
        [tradeType, utils]
    )

    const {
        isLoading: isQueryLoading,
        data: queryData,
        isFetching: isQueryFetching
    } = trpc.robloxTrades.getStoredTrades.useQuery(
        {
            tradeType,
            limit: PAGE_SIZE
        },
        {
            enabled: isClient,
            trpc: { context: { skipBatch: true } },
            refetchOnMount: true,
            refetchOnReconnect: true
        }
    )

    useEffect(() => {
        if (pendingType && tradeType === pendingType && !isQueryFetching && queryData) {
            setPendingType(null)
        }
    }, [pendingType, tradeType, isQueryFetching, queryData])

    useEffect(() => {
        if (queryData?.trades) {
            setTrades(queryData.trades)
            setNextCursor(queryData.nextCursor)
            setHasMore(queryData.nextCursor !== null || queryData.trades.length >= PAGE_SIZE)
            const partnerIds = queryData.trades.map((trade) => trade.tradePartnerId).filter(Boolean)
            if (partnerIds.length > 0) {
                setTimeout(() => queueAvatarLoading(partnerIds, true), 0)
            }
        } else if (queryData) {
            setTrades([])
            setNextCursor(queryData.nextCursor)
            setHasMore(queryData.nextCursor !== null)
        } else if (!isQueryLoading && !queryData) {
            setTrades([])
            setHasMore(false)
            setNextCursor(null)
        }
    }, [queryData, queueAvatarLoading, isQueryLoading, tradeType])

    // Function to load more trades
    const loadMoreTrades = useCallback(async () => {
        if (!nextCursor || !hasMore || isLoadingMore) return

        // Check if we're getting the same cursor repeatedly (possible backend issue)
        if (nextCursor === previousCursorRef.current) {
            cursorRepeatCountRef.current += 1

            // If we get the same cursor 3 times in a row, assume there's an issue
            if (cursorRepeatCountRef.current >= 3) {
                console.warn("Same cursor detected multiple times, stopping pagination")
                setHasMore(false)
                return
            }
        } else {
            // Reset count if cursor is different
            cursorRepeatCountRef.current = 0
            previousCursorRef.current = nextCursor
        }

        setIsLoadingMore(true)

        try {
            const result = await utils.robloxTrades.getStoredTrades.fetch({
                tradeType,
                limit: PAGE_SIZE,
                cursor: nextCursor
            })

            if (result.trades && result.trades.length > 0) {
                // Create an improved duplicate detection using both ID and originalId
                setTrades((prevTrades) => {
                    // Create a map of existing trade IDs for faster lookup
                    const existingTradeMap = new Map()
                    prevTrades.forEach((trade) => {
                        const uniqueKey = `${trade.id}-${trade.originalId}`
                        existingTradeMap.set(uniqueKey, true)
                    })

                    // Filter out duplicates using the combined key
                    const newUniquesTrades = result.trades.filter((trade) => {
                        const uniqueKey = `${trade.id}-${trade.originalId}`
                        return !existingTradeMap.has(uniqueKey)
                    })

                    // If we have new trades to add, do so
                    if (newUniquesTrades.length > 0) {
                        // Load avatars for the new page - use setTimeout to avoid React setState during render
                        const partnerIds = newUniquesTrades
                            .map((trade: Trade) => trade.tradePartnerId)
                            .filter(Boolean)

                        if (partnerIds.length > 0) {
                            // Queue avatar loading outside of render cycle
                            setTimeout(() => {
                                queueAvatarLoading(partnerIds, false) // Lower priority for subsequent pages
                            }, 0)
                        }

                        return [...prevTrades, ...newUniquesTrades]
                    }

                    // If all trades were duplicates, return the current list
                    return prevTrades
                })

                // Only set hasMore to false if we explicitly get null cursor AND fewer trades than page size
                const hasMoreData = result.nextCursor !== null || result.trades.length >= PAGE_SIZE
                setNextCursor(result.nextCursor)
                setHasMore(hasMoreData)
            } else {
                setHasMore(false)
            }
        } catch (error) {
            console.error("Error loading more trades:", error)
        } finally {
            setIsLoadingMore(false)
        }
    }, [
        nextCursor,
        hasMore,
        isLoadingMore,
        tradeType,
        utils.robloxTrades.getStoredTrades,
        queueAvatarLoading
    ])

    // Sort trades by date (newest first)
    const sortedTrades = [...trades].sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    )

    // Auto-select the first trade when data is loaded
    useEffect(() => {
        if (sortedTrades.length > 0 && !selectedTrade) {
            setSelectedTrade(sortedTrades[0])
        }
    }, [sortedTrades, selectedTrade])

    const handleTradeClick = (trade: Trade) => {
        setSelectedTrade(trade)
        if (isDrawerMode) {
            setIsDrawerOpen(true)
        }

        // Fetch and log the trade details when a trade is selected
        if (trade.originalId) {
            console.log(`Selected trade: ${trade.originalId}, trade.id: ${trade.id}`)

            // Log if we already have items for this trade, but still fetch fresh data
            if (tradeItems[trade.id] && tradeItems[trade.id].length > 0) {
                console.log(
                    `Already have ${tradeItems[trade.id].length} items for trade ${trade.id}, but refreshing data.`
                )
            }

            // Fetch detailed trade data to get userAssets
            utils.robloxTrades.getTradeDetails
                .fetch({
                    tradeId: trade.originalId
                })
                .then((result) => {
                    if (result.success && result.trade) {
                        console.log("Trade details loaded:", trade.originalId)

                        // Create an array to store items
                        const items: any[] = []

                        // Log the offers and userAssets
                        if (result.trade.offers && Array.isArray(result.trade.offers)) {
                            result.trade.offers.forEach((offer, index) => {
                                console.log(
                                    `Offer ${index} ${index === 0 ? "(Your offer)" : "(Partner offer)"}`
                                )
                                const offerType = index === 0 ? "user_offer" : "partner_offer"

                                // Log Robux if present
                                if (offer.robux) {
                                    console.log(`Robux in offer ${index}:`, offer.robux)
                                    // Add Robux as a special item
                                    items.push({
                                        id: `robux-${trade.originalId}-${index}`,
                                        assetId: "robux",
                                        assetName: "Robux",
                                        offerType,
                                        robuxAmount: offer.robux
                                    })
                                }

                                // Log user assets
                                if (offer.userAssets && Array.isArray(offer.userAssets)) {
                                    console.log(`User assets in offer ${index}:`, offer.userAssets)
                                    console.table(
                                        offer.userAssets.map((asset) => ({
                                            id: asset.id,
                                            assetId: asset.assetId,
                                            name: asset.name,
                                            serialNumber: asset.serialNumber,
                                            recentAveragePrice: asset.recentAveragePrice
                                        }))
                                    )

                                    // Add all assets to the items array
                                    offer.userAssets.forEach((asset) => {
                                        items.push({
                                            id:
                                                asset.id?.toString() ||
                                                `asset-${trade.originalId}-${asset.assetId}-${Math.random().toString(36).substring(2, 9)}`,
                                            assetId: asset.assetId?.toString(),
                                            assetName: asset.name,
                                            serialNumber: asset.serialNumber,
                                            recentAveragePrice: asset.recentAveragePrice,
                                            offerType
                                        })
                                    })
                                } else {
                                    console.log(`No userAssets in offer ${index} or not an array`)
                                }
                            })

                            // Debug for tracking our items state
                            console.log(`Items for trade ${trade.id}:`, items)
                            console.log(`Items by offer type:`, {
                                user_offer: items.filter((item) => item.offerType === "user_offer"),
                                partner_offer: items.filter(
                                    (item) => item.offerType === "partner_offer"
                                )
                            })

                            // Store items in state
                            setTradeItems((prev) => {
                                const updated = {
                                    ...prev,
                                    [trade.id]: items
                                }
                                console.log("Updated tradeItems state:", updated)
                                return updated
                            })
                        } else {
                            console.log("No offers found in trade data or not an array")
                        }
                    }
                })
                .catch((err) => {
                    console.error("Error fetching trade details:", err)
                })
        }
    }

    const processedTradesRef = useRef<Set<string>>(new Set())

    // Effect to update items in selected trade when selectedTrade changes
    useEffect(() => {
        if (!selectedTrade || !selectedTrade.originalId) return

        const tradeKey = selectedTrade.id

        // Check if we've processed this trade already in this session
        if (
            processedTradesRef.current.has(tradeKey) &&
            tradeItems[tradeKey] &&
            tradeItems[tradeKey].length > 0
        ) {
            console.log(`Already processed trade ${tradeKey} in this session`)
            return
        }

        console.log(`Processing trade ${selectedTrade.originalId} (${tradeKey})`)

        // Fetch detailed trade data when a trade is selected
        utils.robloxTrades.getTradeDetails
            .fetch({
                tradeId: selectedTrade.originalId
            })
            .then((result) => {
                if (result.success && result.trade) {
                    const items: any[] = []

                    if (result.trade.offers && Array.isArray(result.trade.offers)) {
                        result.trade.offers.forEach((offer, index) => {
                            const offerType = index === 0 ? "user_offer" : "partner_offer"

                            // Add Robux if present
                            if (offer.robux) {
                                items.push({
                                    id: `robux-${selectedTrade.originalId}-${index}`,
                                    assetId: "robux",
                                    assetName: "Robux",
                                    offerType,
                                    robuxAmount: offer.robux
                                })
                            }

                            // Add user assets
                            if (offer.userAssets && Array.isArray(offer.userAssets)) {
                                offer.userAssets.forEach((asset) => {
                                    items.push({
                                        id:
                                            asset.id?.toString() ||
                                            `asset-${selectedTrade.originalId}-${asset.assetId}-${Math.random().toString(36).substring(2, 9)}`,
                                        assetId: asset.assetId?.toString(),
                                        assetName: asset.name,
                                        serialNumber: asset.serialNumber,
                                        recentAveragePrice: asset.recentAveragePrice,
                                        offerType
                                    })
                                })
                            }
                        })

                        if (items.length > 0) {
                            console.log(
                                `[Auto-fetch] Got ${items.length} items for trade ${tradeKey}`
                            )

                            // Store items in state
                            setTradeItems((prev) => ({
                                ...prev,
                                [tradeKey]: items
                            }))

                            // Mark this trade as processed
                            processedTradesRef.current.add(tradeKey)
                        }
                    }
                }
            })
            .catch((err) => {
                console.error("Error auto-fetching trade details:", err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTrade?.id, selectedTrade?.originalId, utils.robloxTrades.getTradeDetails])

    // Determine if the current queryData (if it exists) has actual trade entries
    const hasLoadedTradesInQueryData = !!(queryData?.trades && queryData.trades.length > 0)

    const showLoadingState =
        !isClient ||
        pendingType ||
        (isQueryLoading && trades.length === 0 && !hasLoadedTradesInQueryData)

    if (showLoadingState) {
        return (
            <div className="flex min-h-full flex-col gap-6">
                <div className="relative flex min-h-full flex-col">
                    <main className="flex-1 rounded-2xl bg-background p-6 pb-24 shadow-inner">
                        <div className="mb-6 flex justify-center">
                            <TradeSwitcher onTypeChange={handleTradeTypeChange} />
                        </div>
                        <TradePageSkeleton />
                    </main>
                </div>
            </div>
        )
    }

    // Empty state - no trades found
    if (trades.length === 0 && !isQueryLoading && !pendingType) {
        return (
            <div className="flex min-h-full flex-col gap-6">
                <div className="relative flex min-h-full flex-col">
                    <main className="flex-1 rounded-2xl bg-background p-6 pb-24 shadow-inner">
                        <div className="mb-6 flex justify-center">
                            <TradeSwitcher onTypeChange={handleTradeTypeChange} />
                        </div>
                        <div className="flex min-h-[calc(100vh-300px)] items-center justify-center">
                            <div className="w-full max-w-md">
                                <TradeEmptyState tradeType={tradeType} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

    // Render all trades in a list
    const renderTrades = () => {
        return sortedTrades.map((trade, index) => (
            <TradeCard
                key={`${trade.id}-${index}`}
                id={trade.id}
                userId={trade.tradePartnerId}
                userName={trade.tradePartnerName}
                userDisplayName={trade.tradePartnerDisplayName}
                created={trade.created}
                isActive={trade.isActive}
                isSelected={selectedTrade?.id === trade.id}
                onClick={() => handleTradeClick(trade)}
            />
        ))
    }

    // Simple loading indicator for "Load More" button
    const LoadMoreButton = () => (
        <div className="flex justify-center py-4">
            {hasMore ? (
                <Button
                    onClick={loadMoreTrades}
                    disabled={isLoadingMore}
                    variant="outline"
                    className="w-full max-w-md"
                >
                    {isLoadingMore ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Load More Trades"
                    )}
                </Button>
            ) : (
                <p className="text-muted-foreground text-xs">End of trades</p>
            )}
        </div>
    )

    // Drawer mode for mobile and medium screens (below lg breakpoint)
    if (isDrawerMode) {
        return (
            <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <div className="flex min-h-full flex-col gap-6">
                    <div className="relative flex min-h-full flex-col">
                        <main className="flex-1 rounded-2xl bg-background p-6 pb-24 shadow-inner">
                            <div className="mx-auto max-w-full">
                                <div className="mb-6 flex justify-center">
                                    <TradeSwitcher onTypeChange={handleTradeTypeChange} />
                                </div>

                                <div className="mt-6 space-y-3">
                                    {renderTrades()}
                                    <LoadMoreButton />
                                </div>
                            </div>
                        </main>
                    </div>
                </div>

                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
                    <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 mt-10 flex h-[85%] flex-col rounded-t-[10px] bg-background shadow-lg focus:outline-none">
                        <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-background p-4">
                            <div className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-muted" />
                            {selectedTrade && (
                                <TradeDisplay
                                    id={selectedTrade.id}
                                    originalId={selectedTrade.originalId}
                                    tradePartnerId={selectedTrade.tradePartnerId}
                                    tradePartnerName={selectedTrade.tradePartnerName}
                                    tradePartnerDisplayName={selectedTrade.tradePartnerDisplayName}
                                    created={selectedTrade.created}
                                    expiration={selectedTrade.expiration}
                                    status={selectedTrade.status}
                                    tradeType={tradeType}
                                    items={tradeItems[selectedTrade.id] || []}
                                />
                            )}
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        )
    }

    // Desktop layout with side-by-side view (lg breakpoint and above)

    // Debug log for selected trade items
    if (selectedTrade) {
        console.log(
            `Rendering TradeDisplay for trade ${selectedTrade.id} with ${tradeItems[selectedTrade.id]?.length || 0} items`
        )
    }

    return (
        <div className="flex min-h-full flex-col gap-6">
            <div className="relative flex min-h-full flex-col">
                <main className="flex-1 rounded-2xl bg-background p-6 shadow-inner">
                    <div className="mb-6 flex justify-center">
                        <TradeSwitcher onTypeChange={handleTradeTypeChange} />
                    </div>

                    <div className="mx-auto grid min-h-[calc(100vh-200px)] max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-1">
                            <div className="relative mt-6 h-[calc(100vh-300px)]">
                                <div className="h-full space-y-3 overflow-auto pr-4 pb-12">
                                    {renderTrades()}
                                    <LoadMoreButton />
                                </div>
                                {/* Progressive blur overlay at the bottom */}
                                <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-background to-transparent" />
                            </div>
                        </div>

                        <div className="sticky top-[90px] mt-6 lg:col-span-2">
                            {selectedTrade ? (
                                <>
                                    {/* Debug logging happens outside JSX */}
                                    <TradeDisplay
                                        id={selectedTrade.id}
                                        originalId={selectedTrade.originalId}
                                        tradePartnerId={selectedTrade.tradePartnerId}
                                        tradePartnerName={selectedTrade.tradePartnerName}
                                        tradePartnerDisplayName={
                                            selectedTrade.tradePartnerDisplayName
                                        }
                                        created={selectedTrade.created}
                                        expiration={selectedTrade.expiration}
                                        status={selectedTrade.status}
                                        tradeType={tradeType}
                                        items={tradeItems[selectedTrade.id] || []}
                                    />
                                </>
                            ) : (
                                <div className="flex h-full min-h-[400px] items-center justify-center rounded-lg border border-dashed">
                                    <p className="text-muted-foreground">
                                        Select a trade to view details
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
