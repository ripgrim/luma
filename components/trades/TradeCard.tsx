"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRobloxAvatarsContext } from "@/providers/RobloxAvatarsProvider"

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
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected ? "border-primary ring-2 ring-primary/20" : ""
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar className="h-12 w-12">
          {avatarUrl ? (
            <AvatarImage 
              src={avatarUrl} 
              alt={displayName} 
            />
          ) : (
            <AvatarFallback>{firstLetter}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <p className="truncate font-medium">{displayName}</p>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
        <div className="flex items-center">
          <span className={cn(
            "h-2 w-2 rounded-full",
            isActive ? "bg-green-500" : "bg-amber-500"
          )}></span>
        </div>
      </CardContent>
    </Card>
  )
} 