"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ClippedCardSkeleton() {
  return (
    <div className="p-6 relative overflow-hidden rounded-xl aspect-[1.6/1] flex flex-col justify-end min-h-[180px] bg-card border border-border">
      <div className="relative z-10">
        {/* Mimicking typical children structure: h3, p, p */}
        <Skeleton className="h-5 w-3/4 mb-2" /> {/* For title-like text */}
        <Skeleton className="h-8 w-1/2 mb-1" /> {/* For main value-like text */}
        <Skeleton className="h-4 w-2/3" />    {/* For subtitle-like text */}
      </div>
    </div>
  );
} 