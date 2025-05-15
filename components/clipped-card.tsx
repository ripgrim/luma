import React from "react"

interface ClippedCardProps {
  icon: React.ReactNode
  iconClassName?: string
  children: React.ReactNode
}

export function ClippedCard({ icon, iconClassName = "", children }: ClippedCardProps) {
  return (
    <div className="p-6 relative overflow-hidden rounded-xl aspect-[1.6/1] flex flex-col justify-end min-h-[180px] bg-card border border-border">
      <div className={`absolute ${iconClassName} overflow-hidden pointer-events-none select-none`} style={{ zIndex: 1 }}>
        {icon}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 