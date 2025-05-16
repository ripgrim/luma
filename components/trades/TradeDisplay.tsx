"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useRobloxAvatarsContext } from "@/providers/RobloxAvatarsProvider"
import { useRobloxItemsContext } from "@/providers/RobloxItemsProvider"
import { useEffect, useMemo, useState } from "react"
import { Loader2 } from "lucide-react"

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
  const createdDate = new Date(created).toLocaleString()
  const expirationDate = new Date(expiration).toLocaleString()
  
  // Debug - check items received
  console.log(`[TradeDisplay] Received ${items.length} items for trade ${id}`);
  if (items.length > 0) {
    console.log('[TradeDisplay] First few items:', items.slice(0, 3));
  }
  
  // Get avatar URL from the avatar provider
  const { getAvatarUrl } = useRobloxAvatarsContext()
  const avatarUrl = getAvatarUrl(tradePartnerId)
  
  // Get item thumbnails provider
  const { preloadItemThumbnails } = useRobloxItemsContext()
  
  // Filter items into user's and partner's offers
  const userItems = items.filter(item => item.offerType === 'user_offer')
  const partnerItems = items.filter(item => item.offerType === 'partner_offer')
  
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
  
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-muted/50 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {avatarUrl && (
                <AvatarImage 
                  src={avatarUrl} 
                  alt={displayName} 
                />
              )}
              <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{displayName}</CardTitle>
              <CardDescription>Trade #{originalId}</CardDescription>
            </div>
          </div>
          <Badge 
            variant={
              status === "Completed" ? "default" :
              status === "Open" || status === "Pending" ? "outline" :
              "secondary"
            }
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* User's Offer (Always on top) */}
          <div className="space-y-3">
            <h3 className="font-medium text-primary">{userItemsLabel}</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {userItems.map(item => (
                <TradeItemCard key={item.id} item={item} />
              ))}
              {userItems.length === 0 && renderUserEmptyState()}
            </div>
          </div>
          
          <Separator />
          
          {/* Partner's Offer */}
          <div className="space-y-3">
            <h3 className="font-medium text-primary">{partnerItemsLabel}</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {partnerItems.map(item => (
                <TradeItemCard key={item.id} item={item} />
              ))}
              {partnerItems.length === 0 && renderPartnerEmptyState()}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between text-sm text-muted-foreground">
          <span>Created: {createdDate}</span>
          <span>Expires: {expirationDate}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function TradeItemCard({ item }: { item: TradeItem }) {
  // Use our RobloxItemsContext to get the thumbnail
  const { getItemThumbnailUrl } = useRobloxItemsContext()
  
  // Special case for Robux
  if (item.assetId === 'robux') {
    return (
      <Card className="overflow-hidden">
        <div className="relative aspect-square">
          <div className="flex h-full w-full items-center justify-center bg-green-100 dark:bg-green-900">
            <span className="text-xl font-bold text-green-600 dark:text-green-300">R$</span>
          </div>
        </div>
        <CardContent className="p-3">
          <p className="truncate text-sm font-medium">Robux</p>
          <p className="text-sm text-green-600 dark:text-green-400">
            R${typeof item.robuxAmount === 'number' ? Math.floor(item.robuxAmount) : item.robuxAmount}
          </p>
        </CardContent>
      </Card>
    )
  }
  
  // Get thumbnail from the context
  const thumbnailUrl = getItemThumbnailUrl(item.assetId)
  
  // Default fallback URL until our thumbnail loads
  const fallbackUrl = `https://www.roblox.com/asset-thumbnail/image?assetId=${item.assetId}&width=420&height=420&format=png`
  
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <img 
          src={thumbnailUrl || fallbackUrl} 
          alt={item.assetName}
          className="h-full w-full object-cover"
        />
        {item.serialNumber && (
          <Badge variant="secondary" className="absolute bottom-1 right-1 text-xs">
            #{item.serialNumber}
          </Badge>
        )}
      </div>
      <CardContent className="p-3">
        <p className="truncate text-sm font-medium">{item.assetName}</p>
        {item.recentAveragePrice && (
          <p className="text-xs text-muted-foreground">Value: R${item.recentAveragePrice}</p>
        )}
      </CardContent>
    </Card>
  )
} 