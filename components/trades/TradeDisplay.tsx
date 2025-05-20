"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useRobloxAvatarsContext } from "@/providers/RobloxAvatarsProvider"
import { useRobloxItemsContext } from "@/providers/RobloxItemsProvider"
import { useEffect, useMemo, useState } from "react"
import { Loader2 } from "lucide-react"
import { RobuxIcon2 } from "../icons/robux-icon"
import { TradeItem } from "@/components/trades/TradeItem"

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
  const userItems = items.filter(item => item.offerType === 'user_offer')
  const partnerItems = items.filter(item => item.offerType === 'partner_offer')
  
  // Calculate totals
  const calculateTotals = (itemsList: TradeItem[]) => {
    let totalRap = 0;
    let totalRobux = 0;

    itemsList.forEach(item => {
      if (item.recentAveragePrice) {
        totalRap += item.recentAveragePrice;
      }
      if (item.assetId === 'robux' && item.robuxAmount) {
        totalRap += item.robuxAmount;
        totalRobux += item.robuxAmount;
      }
    });

    return { totalRap, totalRobux };
  };

  const userTotals = calculateTotals(userItems);
  const partnerTotals = calculateTotals(partnerItems);

  // Calculate difference (partner value minus user value)
  const rapDifference = partnerTotals.totalRap - userTotals.totalRap;
  
  // Determine the appropriate verbiage based on trade type and status
  const { userItemsLabel, partnerItemsLabel } = useMemo(() => {
    // For inactive trades (expired, declined)
    if (tradeType === 'inactive') {
      return {
        userItemsLabel: "Items you would have given",
        partnerItemsLabel: "Items you would have received"
      };
    }
    
    // For completed trades
    if (tradeType === 'completed') {
      return {
        userItemsLabel: "Items you gave",
        partnerItemsLabel: "Items you received"
      };
    }
    
    // For inbound or outbound trades (pending trades)
    if (tradeType === 'inbound' || tradeType === 'outbound') {
      return {
        userItemsLabel: "Items you will give",
        partnerItemsLabel: "Items you will receive"
      };
    }
    
    // Default fallback
    return {
      userItemsLabel: "Your offer",
      partnerItemsLabel: "Their offer"
    };
  }, [tradeType, status]);
  
  // Preload all item thumbnails when items change
  useEffect(() => {
    if (items.length > 0) {
      const assetIds = items
        .filter(item => item.assetId !== 'robux')
        .map(item => item.assetId);
      
      preloadItemThumbnails(assetIds);
    }
  }, [items, preloadItemThumbnails]);
  
  // Render empty state message for user items
  const renderUserEmptyState = () => {
    if (isLoadingItems) {
      return (
        <div className="col-span-full flex justify-center items-center p-4">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-muted-foreground">Loading items...</span>
        </div>
      );
    }
    
    return (
      <p className="col-span-full text-sm text-muted-foreground">
        {tradeType === 'completed' ? 'No items were given' :
         tradeType === 'inactive' ? 'No items would have been given' :
         'No items offered'}
      </p>
    );
  };
  
  // Render empty state message for partner items
  const renderPartnerEmptyState = () => {
    if (isLoadingItems) {
      return (
        <div className="col-span-full flex justify-center items-center p-4">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-muted-foreground">Loading items...</span>
        </div>
      );
    }
    
    return (
      <p className="col-span-full text-sm text-muted-foreground">
        {tradeType === 'completed' ? 'No items were received' :
         tradeType === 'inactive' ? 'No items would have been received' :
         'No items offered'}
      </p>
    );
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div className="bg-background rounded-lg p-6 pt-0">
      <h1 className="text-2xl font-bold mb-6">Trade with {displayName} <span className="text-muted-foreground">(@{username})</span></h1>
      
      <div className="space-y-8">
        {/* User's Items */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{userItemsLabel}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl">
            {userItems
              .filter(item => item.assetId !== 'robux')
              .map(item => (
                <div key={item.id} className="w-full max-w-[200px]">
                  <TradeItemCard item={item} />
                </div>
              ))}
            {userItems.length === 0 && renderUserEmptyState()}
          </div>

          <div className="flex justify-between text-sm pt-2 max-w-4xl">
            <div>
              <div className="text-muted-foreground">Total RAP</div>
              {userTotals.totalRobux > 0 && (
                <div className="text-muted-foreground">Total Robux</div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-end gap-1">
                <span className="flex items-center gap-2 text-2xl font-bold"><RobuxIcon2 className="w-4 h-4 fill-white text-white" />{formatNumber(userTotals.totalRap)}</span>
              </div>
              {userTotals.totalRobux > 0 && (
                <div className="flex items-center justify-end gap-1">
                  <span className="flex items-center gap-2 text-xl font-bold"><RobuxIcon2 className="w-4 h-4 fill-white text-white" />{formatNumber(userTotals.totalRobux)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Value Difference Indicator */}
        <div className="max-w-full my-6">
          <div className="flex justify-center py-2 w-full">
            <div className="flex items-center gap-2 w-full">
              <div className="w-full h-[1px] bg-border opacity-30"></div>
              <div className="flex items-center gap-2 px-[5px]">
                <span className="text-blue-400"><RobuxIcon2 className="w-4 h-4 fill-white text-white" /></span>
                <span className={`text-lg font-bold ${rapDifference > 0 ? "text-green-500" : "text-red-500"}`}>
                  {rapDifference > 0 ? "+" : ""}{formatNumber(rapDifference)}
                </span>
              </div>
              <div className="w-full h-[1px] bg-border opacity-30"></div>
            </div>
          </div>
        </div>
        
        {/* Partner's Items */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl">
            {partnerItems
              .filter(item => item.assetId !== 'robux')
              .map(item => (
                <div key={item.id} className="w-full max-w-[200px]">
                  <TradeItemCard item={item} />
                </div>
              ))}
            {partnerItems.length === 0 && renderPartnerEmptyState()}
          </div>

          <div className="flex justify-between text-sm pt-2 max-w-4xl">
            <div>
              <div className="text-muted-foreground">Total RAP</div>
              {partnerTotals.totalRobux > 0 && (
                <div className="text-muted-foreground">Total Robux</div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-end gap-1">
                <span className="flex items-center gap-2 text-2xl font-bold"><RobuxIcon2 className="w-4 h-4 fill-white text-white" />{formatNumber(partnerTotals.totalRap)}</span>
              </div>
              {partnerTotals.totalRobux > 0 && (
                <div className="flex items-center justify-end gap-1">
                  <span className="flex items-center gap-2 text-xl font-bold"><RobuxIcon2 className="w-4 h-4 fill-white text-white" />{formatNumber(partnerTotals.totalRobux)}</span>
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
  
  return (
    <TradeItem item={item} fallbackUrl={fallbackUrl} thumbnailUrl={thumbnailUrl} />
  )
} 