"use client"

import { TradePageLayout } from "@/components/trades/TradePageLayout"
import { useSearchParams } from "next/navigation"

export function TradesPageClient() {
    const searchParams = useSearchParams()
    const type = searchParams.get("type") || "inbound"
    return <TradePageLayout tradeType={type as any} />
}
