import { Skeleton } from "@/components/ui/skeleton"

export function TradeDisplaySkeleton() {
    return (
        <div className="space-y-6 rounded-lg border p-6">
            {/* Header */}
            <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Items section */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-32" />

                <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="space-y-2 rounded-lg border p-4">
                            <Skeleton className="mx-auto h-16 w-16 rounded-md" />
                            <Skeleton className="mx-auto h-4 w-3/4" />
                            <Skeleton className="mx-auto h-3 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Status section */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        </div>
    )
}
