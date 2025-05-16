import { TradeListSkeleton } from "./TradeListSkeleton"
import { TradeDisplaySkeleton } from "./TradeDisplaySkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export function TradePageSkeleton() {
  return (
    <div className="space-y-6">
      {/* TradeSwitcher skeleton */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-24" />
          ))}
        </div>
      </div>
      
      {/* Desktop layout skeleton */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TradeListSkeleton />
        </div>
        <div className="lg:col-span-2">
          <TradeDisplaySkeleton />
        </div>
      </div>
      
      {/* Mobile layout skeleton */}
      <div className="lg:hidden">
        <TradeListSkeleton />
      </div>
    </div>
  )
} 