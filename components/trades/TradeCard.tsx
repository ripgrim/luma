"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRobloxAvatarsContext } from "@/providers/RobloxAvatarsProvider"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Copy, Image, UserCircle } from "lucide-react"

interface TradeCardProps {
  id: string
  userId: string
  userName: string
  userDisplayName?: string | null
  created: string
  isActive: boolean
  isSelected: boolean
  onClick: () => void
}

export function TradeCard({
  id,
  userId,
  userName,
  userDisplayName,
  created,
  isActive,
  isSelected,
  onClick,
}: TradeCardProps) {
  const displayName = userDisplayName || userName
  const formattedDate = new Date(created).toLocaleDateString()
  
  // Get avatar URL from the avatar provider
  const { getAvatarUrl } = useRobloxAvatarsContext()
  const avatarUrl = getAvatarUrl(userId)
  
  // Get first letter of name for avatar fallback
  const firstLetter = displayName.charAt(0).toUpperCase()
  
  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.roblox.com/users/${userId}/profile`, "_blank");
  }
  
  const handleCopyTradeId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    console.log(`Copied trade ID: ${id}`);
  }
  
  return (
    <div className="mb-3 last:mb-0">
      <ContextMenu>
        <ContextMenuTrigger className="w-full block">
          <Card 
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md bg-card/20 p-2",
              isSelected ? "bg-card border-border" : ""
            )}
            onClick={onClick}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  {avatarUrl ? (
                    <AvatarImage 
                      src={avatarUrl} 
                      alt={displayName} 
                    />
                  ) : (
                    <AvatarFallback>{firstLetter}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <p className="font-medium truncate">{displayName}</p>
                  <p className="text-sm text-muted-foreground">{isActive ? "Active" : "Inactive"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
        <ContextMenuItem className="cursor-pointer border-b border-border rounded-none" onClick={handleViewProfile}>
            <Image className="w-4 h-4 mr-2" />
            Generate Screenshot
          </ContextMenuItem>
          <ContextMenuItem className="cursor-pointer border-b border-border rounded-none" onClick={handleViewProfile}>
            <UserCircle className="w-4 h-4 mr-2" />
            View Roblox Profile
          </ContextMenuItem>
          <ContextMenuItem className="cursor-pointer rounded-none" onClick={handleCopyTradeId}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Trade ID
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
} 