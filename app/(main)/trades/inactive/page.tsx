"use client"

import { useEffect, useState } from "react"
import { TradeList } from "@/components/trades/TradeList"
import { TradeSwitcher } from "@/components/trades/TradeSwitcher"
import { trpc } from "@/utils/trpc"

export default function InactiveTradesPage() {
  const [isClient, setIsClient] = useState(false)
  
  // Set isClient to true on mount to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Fetch inactive trades
  const { data: tradesData, isLoading } = trpc.robloxTrades.fetchTrades.useQuery(
    { tradeStatusType: 4, limit: 100 },
    { enabled: isClient }
  )
  
  // Get stored trades from database
  const { data: storedTrades } = trpc.robloxTrades.getStoredTrades.useQuery(
    { tradeType: "inactive", limit: 100 },
    { enabled: isClient }
  )
  
  // Format the data for trade list
  const trades = storedTrades?.trades || []
  
  // Create a record of trade items by trade ID
  // This is a placeholder - you would normally fetch this data from your API
  const tradeItems: Record<string, any[]> = {}
  
  // If no trades yet, show loading state
  if (!isClient || (isLoading && trades.length === 0)) {
    return (
      <div className="container py-10">
        <TradeSwitcher />
        <div className="flex min-h-[300px] w-full items-center justify-center">
          <p className="text-muted-foreground">Loading trades...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container py-10">
      <TradeSwitcher />
      
      <TradeList 
        trades={trades}
        items={tradeItems}
        isLoading={isLoading && trades.length === 0}
      />
    </div>
  )
}
