"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ClippedCardSkeleton() {
    return (
        <div className="relative flex aspect-[1.6/1] min-h-[180px] flex-col justify-end overflow-hidden rounded-xl border border-border bg-card p-6">
            <div className="relative z-10">
                {/* Mimicking typical children structure: h3, p, p */}
                <Skeleton className="mb-2 h-5 w-3/4" /> {/* For title-like text */}
                <Skeleton className="mb-1 h-8 w-1/2" /> {/* For main value-like text */}
                <Skeleton className="h-4 w-2/3" /> {/* For subtitle-like text */}
            </div>
        </div>
    )
}
