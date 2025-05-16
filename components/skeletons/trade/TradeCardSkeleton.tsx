import { Skeleton } from "@/components/ui/skeleton"

export function TradeCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
} 