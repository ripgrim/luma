import Image from "next/image";
import { 
  Package, 
  ArrowLeftRight, 
  Clock, 
  CheckCircle2, 
  PackageOpen, 
  ShoppingBag, 
  PackageCheck, 
  Boxes,
  ArrowDown,
  ArrowUp, 
  Inbox,
  SendHorizonal,
  PersonStanding,
  CircleUser
} from "lucide-react";

interface TradeEmptyStateProps {
  tradeType: "inbound" | "outbound" | "completed" | "inactive";
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
  };

  const { icon, secondaryIcon, title, description, message } = content[tradeType];

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12 border-2 border-dashed rounded-lg bg-muted/30">
      
      {/* Main icon */}
      <div className="relative mb-8 bg-background rounded-full p-5 shadow-md">
        {icon}
        
        {/* Secondary icon positioned at bottom right of main icon */}
        <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1.5 shadow-sm border border-border">
          {secondaryIcon}
        </div>
      </div>
      
      {/* Text content */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-1">{description}</p>
      <p className="text-sm text-muted-foreground">{message}</p>
      
      {/* Visual trade representation */}
      <div className="mt-8 flex items-center justify-center gap-10 opacity-30">
        <div className="relative border border-border rounded-md p-3 bg-muted/20">
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
        
        {tradeType === "inactive" && (
          <Clock className="h-6 w-6 stroke-muted-foreground" />
        )}
        
        <div className="relative border border-border rounded-md p-3 bg-muted/20">
          <CircleUser className="h-8 w-8 stroke-muted-foreground" />
        </div>
      </div>
    </div>
  );
} 