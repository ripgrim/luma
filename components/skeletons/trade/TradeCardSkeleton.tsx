import { Skeleton } from "@/components/ui/skeleton"

export function TradeCardSkeleton() {
    return (
        <div className="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-accent">
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
            </div>
        </div>
    )
}
