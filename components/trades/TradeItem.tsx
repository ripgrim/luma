import { Card } from "../ui/card";


export function TradeItem({ item, fallbackUrl, thumbnailUrl }: { item: any, fallbackUrl: string, thumbnailUrl: any }) {


    return (
        <div>
            <Card className="overflow-hidden border-border bg-card w-full p-0">
                <div className="relative aspect-square w-full">
                    {item.serialNumber && (
                        <div className="absolute top-2 left-2 z-10 bg-background/20 border-border border-1 backdrop-blur-sm p-1 rounded text-xs font-medium">
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
                <p className="text-sm font-medium">{item.assetName}</p>
            </div>
        </div>
    )
}