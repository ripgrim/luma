import { Card } from "../ui/card"

export function TradeItem({
    item,
    fallbackUrl,
    thumbnailUrl
}: { item: any; fallbackUrl: string; thumbnailUrl: any }) {
    return (
        <div>
            <Card className="w-full overflow-hidden border-border bg-card p-0">
                <div className="relative aspect-square w-full">
                    {item.serialNumber && (
                        <div className="absolute top-2 left-2 z-10 rounded border-1 border-border bg-background/20 p-1 font-medium text-xs backdrop-blur-sm">
                            #{item.serialNumber}
                        </div>
                    )}
                    <img
                        src={thumbnailUrl || fallbackUrl}
                        alt={item.assetName}
                        className="absolute inset-0 h-full w-full object-contain p-5"
                    />
                </div>
            </Card>
            <div className="p-3">
                <p className="font-medium text-sm">{item.assetName}</p>
            </div>
        </div>
    )
}
