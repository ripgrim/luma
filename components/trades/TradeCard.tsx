"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger
} from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"
import { useRobloxAvatarsContext } from "@/providers/RobloxAvatarsProvider"
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
    onClick
}: TradeCardProps) {
    const displayName = userDisplayName || userName
    const formattedDate = new Date(created).toLocaleDateString()

    // Get avatar URL from the avatar provider
    const { getAvatarUrl } = useRobloxAvatarsContext()
    const avatarUrl = getAvatarUrl(userId)

    // Get first letter of name for avatar fallback
    const firstLetter = displayName.charAt(0).toUpperCase()

    const handleViewProfile = (e: React.MouseEvent) => {
        e.stopPropagation()
        window.open(`https://www.roblox.com/users/${userId}/profile`, "_blank")
    }

    const handleCopyTradeId = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigator.clipboard.writeText(id)
        console.log(`Copied trade ID: ${id}`)
    }

    return (
        <div className="mb-3 last:mb-0">
            <ContextMenu>
                <ContextMenuTrigger className="block w-full">
                    <Card
                        className={cn(
                            "cursor-pointer bg-card/20 p-2 transition-all duration-200 hover:shadow-md",
                            isSelected ? "border-border bg-card" : ""
                        )}
                        onClick={onClick}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12 flex-shrink-0">
                                    {avatarUrl ? (
                                        <AvatarImage src={avatarUrl} alt={displayName} />
                                    ) : (
                                        <AvatarFallback>{firstLetter}</AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="flex min-w-0 flex-col">
                                    <p className="truncate font-medium">{displayName}</p>
                                    <p className="text-muted-foreground text-sm">
                                        {isActive ? "Active" : "Inactive"}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    <ContextMenuItem
                        className="cursor-pointer rounded-none border-border border-b"
                        onClick={handleViewProfile}
                    >
                        <Image className="mr-2 h-4 w-4" />
                        Generate Screenshot
                    </ContextMenuItem>
                    <ContextMenuItem
                        className="cursor-pointer rounded-none border-border border-b"
                        onClick={handleViewProfile}
                    >
                        <UserCircle className="mr-2 h-4 w-4" />
                        View Roblox Profile
                    </ContextMenuItem>
                    <ContextMenuItem
                        className="cursor-pointer rounded-none"
                        onClick={handleCopyTradeId}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Trade ID
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    )
}
