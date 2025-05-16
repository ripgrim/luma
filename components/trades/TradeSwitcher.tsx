"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

const tradeTypes = [
  { label: "Inbound", href: "/trades/inbound" },
  { label: "Outbound", href: "/trades/outbound" },
  { label: "Completed", href: "/trades/completed" },
  { label: "Inactive", href: "/trades/inactive" },
]

export function TradeSwitcher() {
  const pathname = usePathname()
  
  return (
    <nav className="relative mb-8 flex justify-center">
      <div className="relative flex gap-2 rounded-lg bg-muted p-1">
        {tradeTypes.map((type) => {
          const isActive = pathname === type.href
          return (
            <Link
              key={type.href}
              href={type.href}
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
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 