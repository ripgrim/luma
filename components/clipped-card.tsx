"use client" // Ensure this is a client component

import { ClippedCardSkeleton } from "@/components/skeletons/ClippedCardSkeleton"
import { useRoblosecurity } from "@/providers/RoblosecurityProvider"
import type React from "react"

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
        return <ClippedCardSkeleton />
    }

    return (
        <div className="relative flex aspect-[1.6/1] min-h-[180px] flex-col justify-end overflow-hidden rounded-xl border border-border bg-card p-6">
            <div
                className={`absolute ${iconClassName} pointer-events-none select-none overflow-hidden`}
                style={{ zIndex: 1 }}
            >
                {icon}
            </div>
            <div className="relative z-10">{children}</div>
        </div>
    )
}
