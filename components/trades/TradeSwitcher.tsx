"use client"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { SidebarTrigger } from "../ui/sidebar"
import { useCallback } from "react"

const tradeTypes = [
  { label: "Inbound", href: "/trades/inbound", type: "inbound" },
  { label: "Outbound", href: "/trades/outbound", type: "outbound" },
  { label: "Completed", href: "/trades/completed", type: "completed" },
  { label: "Inactive", href: "/trades/inactive", type: "inactive" },
]

interface TradeSwitcherProps {
  onTypeChange?: (type: string) => void; // Optional callback for parent components
}

export function TradeSwitcher({ onTypeChange }: TradeSwitcherProps = {}) {
  const pathname = usePathname()
  const router = useRouter()
  
  // Client-side navigation handler
  const handleTypeChange = useCallback((href: string, type: string) => {
    // Avoid navigation if already on the page
    if (pathname === href) return;
    
    // If parent provided a callback, call it first
    if (onTypeChange) {
      onTypeChange(type);
    }
    
    // Use shallow routing to avoid full page refresh
    router.push(href, { scroll: false });
  }, [pathname, router, onTypeChange]);
  
  return (
    <nav className="items-center relative mb-8 flex justify-center">
      <SidebarTrigger />
      <div className="relative flex gap-2 rounded-lg bg-muted p-1">
        {tradeTypes.map((type) => {
          const isActive = pathname === type.href
          return (
            <button
              key={type.href}
              onClick={() => handleTypeChange(type.href, type.type)}
              className={cn(
                "relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <span 
                  className="absolute inset-0 rounded-md bg-primary transition-all duration-300"
                  style={{ 
                    transform: "scale(1)",
                    opacity: 1,
                  }}
                />
              )}
              <span className="relative z-10">{type.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
} 