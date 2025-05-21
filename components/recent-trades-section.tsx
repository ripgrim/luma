"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useRoblosecurity } from "@/providers/RoblosecurityProvider"
import { RobloxAvatarsProvider } from "@/providers/RobloxAvatarsProvider"
import { useRobloxAvatarsContext } from "@/providers/RobloxAvatarsProvider"
import { trpc } from "@/utils/trpc"
import { UserIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface RecentTrade {
    id: string
    username: string
    displayName: string | null
    userId: string
    status: "inbound" | "outbound" | "completed" | "inactive"
    created: string
}

const statusConfig = {
    inbound: {
        text: "Received",
        colorClass: "text-orange-500",
        bgClass: "bg-orange-500"
    },
    outbound: {
        text: "Sent",
        colorClass: "text-blue-500",
        bgClass: "bg-blue-500"
    },
    completed: {
        text: "Completed",
        colorClass: "text-green-500",
        bgClass: "bg-green-500"
    },
    inactive: {
        text: "Inactive",
        colorClass: "text-red-500",
        bgClass: "bg-red-500"
    }
}

// Wrap the component with the provider
export default function RecentTradesSection() {
    return (
        <RobloxAvatarsProvider>
            <RecentTradesContent />
        </RobloxAvatarsProvider>
    )
}

// Content component with access to the provider
function RecentTradesContent() {
    const { isRobloCookieVerified, isLoadingCookieStatus } = useRoblosecurity()
    const [recentTrades, setRecentTrades] = useState<RecentTrade[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Access the avatars context
    const { queueAvatarLoading, getAvatarUrl } = useRobloxAvatarsContext()

    // Get all trade types
    const { data: inboundTrades } = trpc.robloxTrades.getStoredTrades.useQuery(
        { tradeType: "inbound", limit: 50 },
        { enabled: isRobloCookieVerified }
    )

    const { data: outboundTrades } = trpc.robloxTrades.getStoredTrades.useQuery(
        { tradeType: "outbound", limit: 50 },
        { enabled: isRobloCookieVerified }
    )

    const { data: completedTrades } = trpc.robloxTrades.getStoredTrades.useQuery(
        { tradeType: "completed", limit: 50 },
        { enabled: isRobloCookieVerified }
    )

    const { data: inactiveTrades } = trpc.robloxTrades.getStoredTrades.useQuery(
        { tradeType: "inactive", limit: 50 },
        { enabled: isRobloCookieVerified }
    )

    useEffect(() => {
        if (!isRobloCookieVerified) return

        // Wait for all data to be loaded
        if (!inboundTrades || !outboundTrades || !completedTrades || !inactiveTrades) return

        // Process and merge trades
        const processTrades = async () => {
            // Get trades from all sources
            const allTrades = [
                ...(inboundTrades.trades || []).map((trade) => ({
                    id: trade.id,
                    username: trade.tradePartnerName,
                    displayName: trade.tradePartnerDisplayName,
                    userId: trade.tradePartnerId,
                    status: "inbound" as const,
                    created: trade.created
                })),
                ...(outboundTrades.trades || []).map((trade) => ({
                    id: trade.id,
                    username: trade.tradePartnerName,
                    displayName: trade.tradePartnerDisplayName,
                    userId: trade.tradePartnerId,
                    status: "outbound" as const,
                    created: trade.created
                })),
                ...(completedTrades.trades || []).map((trade) => ({
                    id: trade.id,
                    username: trade.tradePartnerName,
                    displayName: trade.tradePartnerDisplayName,
                    userId: trade.tradePartnerId,
                    status: "completed" as const,
                    created: trade.created
                })),
                ...(inactiveTrades.trades || []).map((trade) => ({
                    id: trade.id,
                    username: trade.tradePartnerName,
                    displayName: trade.tradePartnerDisplayName,
                    userId: trade.tradePartnerId,
                    status: "inactive" as const,
                    created: trade.created
                }))
            ]

            // Sort all trades by date (newest first) regardless of type
            const sortedTrades = allTrades.sort(
                (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
            )

            // Take exactly 7 most recent trades (6 full + 1 partial)
            const topTrades = sortedTrades.slice(0, 7)

            setRecentTrades(topTrades)
            setIsLoading(false)
        }

        processTrades()
    }, [isRobloCookieVerified, inboundTrades, outboundTrades, completedTrades, inactiveTrades])

    // Queue avatars for loading when trades are ready
    useEffect(() => {
        if (!recentTrades.length || isLoading) return

        // Extract user IDs from trades
        const userIds = recentTrades.map((trade) => trade.userId).filter(Boolean)

        // Queue them for loading with high priority since they're immediately visible
        queueAvatarLoading(userIds, true)
    }, [recentTrades, isLoading, queueAvatarLoading])

    // Show placeholder when loading or not verified
    if (isLoadingCookieStatus || !isRobloCookieVerified || isLoading) {
        return (
            <div className="relative flex w-full flex-col justify-end overflow-hidden rounded-xl border border-border bg-card p-6">
                <Skeleton className="mb-4 h-6 w-32" />
                <div className="max-h-[300px] space-y-4 overflow-hidden">
                    {[...Array(7)].map((_, index) => (
                        <div key={index} className="flex h-10 items-center justify-between">
                            <div className="flex items-center">
                                <Skeleton className="mr-3 h-10 w-10 rounded-md" />
                                <div>
                                    <Skeleton className="mb-1 h-4 w-20" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                            <Skeleton className="h-4 w-12" />
                        </div>
                    ))}
                </div>
                <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-card/90 via-card/80 to-transparent" />
            </div>
        )
    }

    // Show trades or placeholders if fewer than 7 trades
    const tradesToRender =
        recentTrades.length > 0
            ? recentTrades
            : Array(7)
                  .fill(null)
                  .map((_, i) => ({
                      id: `placeholder-${i}`,
                      username: "No recent trades",
                      displayName: null,
                      userId: "",
                      status: "inactive" as const,
                      created: new Date().toISOString()
                  }))

    return (
        <div className="relative flex w-full flex-col justify-end overflow-hidden rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg text-white">Recent trades</h3>
            <div className="max-h-[300px] space-y-4 overflow-hidden">
                {tradesToRender.map((trade, index) => {
                    const config = statusConfig[trade.status]
                    const avatarUrl = getAvatarUrl(trade.userId)

                    if (trade.id.startsWith("placeholder")) {
                        return (
                            <div
                                key={trade.id}
                                className="flex h-10 items-center justify-between opacity-50"
                            >
                                <div className="flex items-center">
                                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-md bg-border">
                                        <UserIcon className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white">No activity</p>
                                        <p className="text-gray-400 text-xs">--</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-muted-foreground text-xs">
                                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-muted-foreground" />
                                    No trades
                                </div>
                            </div>
                        )
                    }

                    return (
                        <div key={trade.id} className="flex h-10 items-center justify-between">
                            <div className="flex items-center">
                                <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-md">
                                    {avatarUrl ? (
                                        <Image
                                            src={avatarUrl}
                                            alt={trade.username}
                                            fill
                                            sizes="40px"
                                            className="object-cover"
                                            onError={(e) => {
                                                // If image fails to load, replace with fallback
                                                const target = e.target as HTMLImageElement
                                                target.onerror = null
                                                target.src =
                                                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUtdXNlciI+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI1Ii8+PHBhdGggZD0iTTIwIDIxdi0yYTcgNyAwIDAgMC0xNC0wdi0yIi8+PC9zdmc+"
                                            }}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-border">
                                            <UserIcon className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm text-white">{trade.username}</p>
                                    <p className="text-gray-400 text-xs">
                                        {trade.displayName || "--"}
                                    </p>
                                </div>
                            </div>
                            <div className={`flex items-center text-xs ${config.colorClass}`}>
                                <span
                                    className={`mr-2 inline-block h-2 w-2 rounded-full ${config.bgClass}`}
                                />
                                {config.text}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-card/90 via-card/80 to-transparent" />
        </div>
    )
}
