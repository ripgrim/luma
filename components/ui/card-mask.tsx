import type React from "react"
import { cn } from "@/lib/utils"
import { LockIcon } from "lucide-react"

interface CardMaskProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
  description?: string
  icon?: React.ReactNode
  opacity?: number
  blur?: number
  children?: React.ReactNode
}

export function CardMask({
  message,
  description,
  icon = <LockIcon className="h-10 w-10" />,
  opacity = 0.9,
  blur = 0,
  children,
  className,
  ...props
}: CardMaskProps) {
  return (
    <div className="relative w-full h-full overflow-hidden" {...props}>
      {/* Original content that will be masked */}
      <div
        className="w-full h-full select-none pointer-events-none"
        style={{
          filter: blur > 0 ? `blur(${blur}px)` : "none",
        }}
      >
        {children}
      </div>

      {/* Mask overlay */}
      <div
        className={cn("absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#1a1a1a] z-10", className)}
        style={{ opacity }}
      >
        <div className="flex flex-col items-center justify-center text-center max-w-md">
          <div className="text-gray-400 mb-4">{icon}</div>
          <h3 className="text-2xl font-bold mb-2 mt-0">{message}</h3>
          {description && <p className="text-gray-400 text-sm">{description}</p>}
        </div>
      </div>
    </div>
  )
}