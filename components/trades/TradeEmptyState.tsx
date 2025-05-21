import {
    ArrowDown,
    ArrowLeftRight,
    ArrowUp,
    Boxes,
    CheckCircle2,
    CircleUser,
    Clock,
    Inbox,
    PackageCheck,
    SendHorizonal
} from "lucide-react"

interface TradeEmptyStateProps {
    tradeType: "inbound" | "outbound" | "completed" | "inactive"
}

export function TradeEmptyState({ tradeType }: TradeEmptyStateProps) {
    // Define content based on trade type
    const content = {
        inbound: {
            icon: <Inbox className="h-12 w-12 stroke-muted-foreground" />,
            secondaryIcon: <ArrowDown className="h-8 w-8 stroke-primary/70" />,
            title: "No inbound trades",
            description: "You don't have any incoming trade offers yet.",
            message: "When someone sends you a trade, it will appear here."
        },
        outbound: {
            icon: <SendHorizonal className="h-12 w-12 stroke-muted-foreground" />,
            secondaryIcon: <ArrowUp className="h-8 w-8 stroke-primary/70" />,
            title: "No outbound trades",
            description: "You haven't sent any trade offers yet.",
            message: "Trades you send will appear here."
        },
        completed: {
            icon: <PackageCheck className="h-12 w-12 stroke-muted-foreground" />,
            secondaryIcon: <CheckCircle2 className="h-8 w-8 stroke-primary/70" />,
            title: "No completed trades",
            description: "You don't have any completed trades yet.",
            message: "Trades that have been accepted will appear here."
        },
        inactive: {
            icon: <Boxes className="h-12 w-12 stroke-muted-foreground" />,
            secondaryIcon: <Clock className="h-8 w-8 stroke-primary/70" />,
            title: "No inactive trades",
            description: "You don't have any inactive trades.",
            message: "Trades that have been declined or expired will appear here."
        }
    }

    const { icon, secondaryIcon, title, description, message } = content[tradeType]

    return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 px-4 py-12 text-center">
            {/* Main icon */}
            <div className="relative mb-8 rounded-full bg-background p-5 shadow-md">
                {icon}

                {/* Secondary icon positioned at bottom right of main icon */}
                <div className="-bottom-2 -right-2 absolute rounded-full border border-border bg-background p-1.5 shadow-sm">
                    {secondaryIcon}
                </div>
            </div>

            {/* Text content */}
            <h3 className="mb-2 font-semibold text-xl">{title}</h3>
            <p className="mb-1 text-muted-foreground">{description}</p>
            <p className="text-muted-foreground text-sm">{message}</p>

            {/* Visual trade representation */}
            <div className="mt-8 flex items-center justify-center gap-10 opacity-30">
                <div className="relative rounded-md border border-border bg-muted/20 p-3">
                    <CircleUser className="h-8 w-8 stroke-muted-foreground" />
                </div>

                {tradeType === "inbound" && (
                    <ArrowLeftRight className="h-6 w-6 stroke-muted-foreground" />
                )}

                {tradeType === "outbound" && (
                    <ArrowLeftRight className="h-6 w-6 stroke-muted-foreground" />
                )}

                {tradeType === "completed" && (
                    <CheckCircle2 className="h-6 w-6 stroke-muted-foreground" />
                )}

                {tradeType === "inactive" && <Clock className="h-6 w-6 stroke-muted-foreground" />}

                <div className="relative rounded-md border border-border bg-muted/20 p-3">
                    <CircleUser className="h-8 w-8 stroke-muted-foreground" />
                </div>
            </div>
        </div>
    )
}
