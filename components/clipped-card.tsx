"use client"; // Ensure this is a client component

import React from "react"
import { useRoblosecurity } from "@/providers/RoblosecurityProvider"
import { CardMask } from "@/components/ui/card-mask"
import { ClippedCardSkeleton } from "@/components/skeletons/ClippedCardSkeleton"
import { KeyIcon } from "lucide-react"

interface ClippedCardProps {
  icon: React.ReactNode
  iconClassName?: string
  children: React.ReactNode
  cardMaskMessage?: string
  cardMaskDescription?: string
}

export function ClippedCard({ 
  icon, 
  iconClassName = "", 
  children, 
  cardMaskMessage = "Authentication Required", 
  cardMaskDescription = "Complete step 2 auth to view this." 
}: ClippedCardProps) {
  const { isRobloCookieVerified, isLoadingCookieStatus } = useRoblosecurity()

  if (isLoadingCookieStatus) {
    return <ClippedCardSkeleton />
  }

  if (!isRobloCookieVerified) {
    return (
        <ClippedCardSkeleton />
    )
  }

  return (
    <div className="p-6 relative overflow-hidden rounded-xl aspect-[1.6/1] flex flex-col justify-end min-h-[180px] bg-card border border-border">
      <div className={`absolute ${iconClassName} overflow-hidden pointer-events-none select-none`} style={{ zIndex: 1 }}>
        {icon}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 