"use client"
import { TradeItem } from "@/components/trades/TradeItem"
import { useRobloxAvatarsContext } from "@/providers/RobloxAvatarsProvider"
import { useRobloxItemsContext } from "@/providers/RobloxItemsProvider"
import { Loader2 } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { RobuxIcon2 } from "../icons/robux-icon"

interface TradeItem {
    id: string
    assetId: string
    assetName: string
    serialNumber?: number | null
    recentAveragePrice?: number | null
    offerType: string
    robuxAmount?: number | null
}

interface TradeDisplayProps {
    id: string
    originalId: string
    tradePartnerId: string
    tradePartnerName: string
    tradePartnerDisplayName?: string | null
    created: string
    expiration: string
    status: string
    tradeType: string
    items: TradeItem[]
}

export function TradeDisplay({
    id,
    originalId,
    tradePartnerId,
    tradePartnerName,
    tradePartnerDisplayName,
    created,
    expiration,
    status,
    tradeType,
    items
}: TradeDisplayProps) {
    const [isLoadingItems, setIsLoadingItems] = useState(true)

    // Set loading state false after items are received
    useEffect(() => {
        // For empty items, wait a bit in case they're still loading
        const timer = setTimeout(() => {
            setIsLoadingItems(false)
        }, 1500) // 1.5 second grace period for loading

        // If we have items, we can immediately set loading to false
        if (items.length > 0) {
            clearTimeout(timer)
            setIsLoadingItems(false)
        }

        // Reset loading state when changing trades
        return () => {
            clearTimeout(timer)
            setIsLoadingItems(true)
        }
    }, [items, id])

    const displayName = tradePartnerDisplayName || tradePartnerName
    const username = tradePartnerName

    // Get avatar URL from the avatar provider
    const { getAvatarUrl } = useRobloxAvatarsContext()
    const avatarUrl = getAvatarUrl(tradePartnerId)

    // Get item thumbnails provider
    const { preloadItemThumbnails } = useRobloxItemsContext()

    // Filter items into user's and partner's offers
    const userItems = items.filter((item) => item.offerType === "user_offer")
    const partnerItems = items.filter((item) => item.offerType === "partner_offer")

    // Calculate totals
    const calculateTotals = (itemsList: TradeItem[]) => {
        let totalRap = 0
        let totalRobux = 0

        itemsList.forEach((item) => {
            if (item.recentAveragePrice) {
                totalRap += item.recentAveragePrice
            }
            if (item.assetId === "robux" && item.robuxAmount) {
                totalRap += item.robuxAmount
                totalRobux += item.robuxAmount
            }
        })

        return { totalRap, totalRobux }
    }

    const userTotals = calculateTotals(userItems)
    const partnerTotals = calculateTotals(partnerItems)

    // Calculate difference (partner value minus user value)
    const rapDifference = partnerTotals.totalRap - userTotals.totalRap

    // Determine the appropriate verbiage based on trade type and status
    const { userItemsLabel, partnerItemsLabel } = useMemo(() => {
        // For inactive trades (expired, declined)
        if (tradeType === "inactive") {
            return {
                userItemsLabel: "Items you would have given",
                partnerItemsLabel: "Items you would have received"
            }
        }

        // For completed trades
        if (tradeType === "completed") {
            return {
                userItemsLabel: "Items you gave",
                partnerItemsLabel: "Items you received"
            }
        }

        // For inbound or outbound trades (pending trades)
        if (tradeType === "inbound" || tradeType === "outbound") {
            return {
                userItemsLabel: "Items you will give",
                partnerItemsLabel: "Items you will receive"
            }
        }

        // Default fallback
        return {
            userItemsLabel: "Your offer",
            partnerItemsLabel: "Their offer"
        }
    }, [tradeType, status])

    // Preload all item thumbnails when items change
    useEffect(() => {
        if (items.length > 0) {
            const assetIds = items
                .filter((item) => item.assetId !== "robux")
                .map((item) => item.assetId)

            preloadItemThumbnails(assetIds)
        }
    }, [items, preloadItemThumbnails])

    // Render empty state message for user items
    const renderUserEmptyState = () => {
        if (isLoadingItems) {
            return (
                <div className="col-span-full flex items-center justify-center p-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="text-muted-foreground text-sm">Loading items...</span>
                </div>
            )
        }

        return (
            <p className="col-span-full text-muted-foreground text-sm">
                {tradeType === "completed"
                    ? "No items were given"
                    : tradeType === "inactive"
                      ? "No items would have been given"
                      : "No items offered"}
            </p>
        )
    }

    // Render empty state message for partner items
    const renderPartnerEmptyState = () => {
        if (isLoadingItems) {
            return (
                <div className="col-span-full flex items-center justify-center p-4">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="text-muted-foreground text-sm">Loading items...</span>
                </div>
            )
        }

        return (
            <p className="col-span-full text-muted-foreground text-sm">
                {tradeType === "completed"
                    ? "No items were received"
                    : tradeType === "inactive"
                      ? "No items would have been received"
                      : "No items offered"}
            </p>
        )
    }

    // Format number with commas
    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return (
        <div className="rounded-lg bg-background p-6 pt-0">
            <h1 className="mb-6 font-bold text-2xl">
                Trade with {displayName}{" "}
                <span className="text-muted-foreground">(@{username})</span>
            </h1>

            <div className="space-y-8">
                {/* User's Items */}
                <div className="space-y-4">
                    <h3 className="font-medium text-lg">{userItemsLabel}</h3>
                    <div className="grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {userItems
                            .filter((item) => item.assetId !== "robux")
                            .map((item) => (
                                <div key={item.id} className="w-full max-w-[200px]">
                                    <TradeItemCard item={item} />
                                </div>
                            ))}
                        {userItems.length === 0 && renderUserEmptyState()}
                    </div>

                    <div className="flex max-w-4xl justify-between pt-2 text-sm">
                        <div>
                            <div className="text-muted-foreground">Total RAP</div>
                            {userTotals.totalRobux > 0 && (
                                <div className="text-muted-foreground">Total Robux</div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center justify-end gap-1">
                                <span className="flex items-center gap-2 font-bold text-2xl">
                                    <RobuxIcon2 className="h-4 w-4 fill-white text-white" />
                                    {formatNumber(userTotals.totalRap)}
                                </span>
                            </div>
                            {userTotals.totalRobux > 0 && (
                                <div className="flex items-center justify-end gap-1">
                                    <span className="flex items-center gap-2 font-bold text-xl">
                                        <RobuxIcon2 className="h-4 w-4 fill-white text-white" />
                                        {formatNumber(userTotals.totalRobux)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Value Difference Indicator */}
                <div className="my-6 max-w-full">
                    <div className="flex w-full justify-center py-2">
                        <div className="flex w-full items-center gap-2">
                            <div className="h-[1px] w-full bg-border opacity-30" />
                            <div className="flex items-center gap-2 px-[5px]">
                                <span className="text-blue-400">
                                    <RobuxIcon2 className="h-4 w-4 fill-white text-white" />
                                </span>
                                <span
                                    className={`font-bold text-lg ${rapDifference > 0 ? "text-green-500" : "text-red-500"}`}
                                >
                                    {rapDifference > 0 ? "+" : ""}
                                    {formatNumber(rapDifference)}
                                </span>
                            </div>
                            <div className="h-[1px] w-full bg-border opacity-30" />
                        </div>
                    </div>
                </div>

                {/* Partner's Items */}
                <div className="space-y-4">
                    <div className="grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
                        {partnerItems
                            .filter((item) => item.assetId !== "robux")
                            .map((item) => (
                                <div key={item.id} className="w-full max-w-[200px]">
                                    <TradeItemCard item={item} />
                                </div>
                            ))}
                        {partnerItems.length === 0 && renderPartnerEmptyState()}
                    </div>

                    <div className="flex max-w-4xl justify-between pt-2 text-sm">
                        <div>
                            <div className="text-muted-foreground">Total RAP</div>
                            {partnerTotals.totalRobux > 0 && (
                                <div className="text-muted-foreground">Total Robux</div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center justify-end gap-1">
                                <span className="flex items-center gap-2 font-bold text-2xl">
                                    <RobuxIcon2 className="h-4 w-4 fill-white text-white" />
                                    {formatNumber(partnerTotals.totalRap)}
                                </span>
                            </div>
                            {partnerTotals.totalRobux > 0 && (
                                <div className="flex items-center justify-end gap-1">
                                    <span className="flex items-center gap-2 font-bold text-xl">
                                        <RobuxIcon2 className="h-4 w-4 fill-white text-white" />
                                        {formatNumber(partnerTotals.totalRobux)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TradeItemCard({ item }: { item: TradeItem }) {
    // Use our RobloxItemsContext to get the thumbnail
    const { getItemThumbnailUrl } = useRobloxItemsContext()

    // Get thumbnail from the context
    const thumbnailUrl = getItemThumbnailUrl(item.assetId)

    // Default fallback URL until our thumbnail loads
    const fallbackUrl = `https://www.roblox.com/asset-thumbnail/image?assetId=${item.assetId}&width=420&height=420&format=png`

    return <TradeItem item={item} fallbackUrl={fallbackUrl} thumbnailUrl={thumbnailUrl} />
}
