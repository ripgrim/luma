"use client"

import { useState } from "react"
import { TradeCard } from "./TradeCard"
import { TradeDisplay } from "./TradeDisplay"
import { cn } from "@/lib/utils"

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

interface TradeItem {
  id: string
  assetId: string
  assetName: string
  serialNumber?: number | null
  recentAveragePrice?: number | null
  offerType: string
  robuxAmount?: number | null
}

interface TradeListProps {
  trades: Trade[]
  items: Record<string, TradeItem[]>
  isLoading?: boolean
}

export function TradeList({ trades, items, isLoading = false }: TradeListProps) {
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(
    trades.length > 0 ? trades[0].id : null
  )
  
  // Handle trade selection and toggle
  const handleTradeClick = (tradeId: string) => {
    if (selectedTradeId === tradeId) {
      setSelectedTradeId(null) // Toggle off if already selected
    } else {
      setSelectedTradeId(tradeId) // Select new trade
    }
  }
  
  // Find selected trade and its items
  const selectedTrade = selectedTradeId 
    ? trades.find(trade => trade.id === selectedTradeId) 
    : null
    
  const selectedTradeItems = selectedTradeId ? items[selectedTradeId] || [] : []
  
  if (isLoading) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center">
        <p className="text-muted-foreground">Loading trades...</p>
      </div>
    )
  }
  
  if (trades.length === 0) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center">
        <p className="text-muted-foreground">No trades found</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <h2 className="mb-4 text-lg font-medium">Trades</h2>
        <div className="h-[600px] overflow-auto pr-4">
          <div className="space-y-3">
            {trades.map(trade => (
              <TradeCard
                key={trade.id}
                id={trade.id}
                userId={trade.tradePartnerId}
                userName={trade.tradePartnerName}
                userDisplayName={trade.tradePartnerDisplayName}
                created={trade.created}
                isActive={trade.isActive}
                isSelected={selectedTradeId === trade.id}
                onClick={() => handleTradeClick(trade.id)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2">
        {selectedTrade ? (
          <TradeDisplay
            id={selectedTrade.id}
            originalId={selectedTrade.originalId}
            tradePartnerId={selectedTrade.tradePartnerId}
            tradePartnerName={selectedTrade.tradePartnerName}
            tradePartnerDisplayName={selectedTrade.tradePartnerDisplayName}
            created={selectedTrade.created}
            expiration={selectedTrade.expiration}
            status={selectedTrade.status}
            tradeType={selectedTrade.tradeType}
            items={selectedTradeItems}
          />
        ) : (
          <div className="flex h-full min-h-[400px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">Select a trade to view details</p>
          </div>
        )}
      </div>
    </div>
  )
} 