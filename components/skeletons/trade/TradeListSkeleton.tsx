import { TradeCardSkeleton } from "./TradeCardSkeleton"

export function TradeListSkeleton() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <TradeCardSkeleton key={index} />
            ))}
        </div>
    )
}
