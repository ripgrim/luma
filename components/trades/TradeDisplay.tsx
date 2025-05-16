"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

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
  const displayName = tradePartnerDisplayName || tradePartnerName
  const createdDate = new Date(created).toLocaleString()
  const expirationDate = new Date(expiration).toLocaleString()
  
  // Filter items into user's and partner's offers
  const userItems = items.filter(item => item.offerType === 'user_offer')
  const partnerItems = items.filter(item => item.offerType === 'partner_offer')
  
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-muted/50 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={`https://www.roblox.com/headshot-thumbnail/image?userId=${tradePartnerId}&width=100&height=100&format=png`} 
                alt={displayName} 
              />
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
            <h3 className="font-medium text-primary">Your Offer</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {userItems.map(item => (
                <TradeItemCard key={item.id} item={item} />
              ))}
              {userItems.length === 0 && (
                <p className="col-span-full text-sm text-muted-foreground">No items offered</p>
              )}
            </div>
          </div>
          
          <Separator />
          
          {/* Partner's Offer */}
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Their Offer</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {partnerItems.map(item => (
                <TradeItemCard key={item.id} item={item} />
              ))}
              {partnerItems.length === 0 && (
                <p className="col-span-full text-sm text-muted-foreground">No items offered</p>
              )}
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
          <p className="text-sm text-green-600 dark:text-green-400">R${item.robuxAmount}</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <img 
          src={`https://www.roblox.com/asset-thumbnail/image?assetId=${item.assetId}&width=420&height=420&format=png`} 
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