'use client';
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

interface StarSummarizeButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: ReactNode;
  className?: string;
}

export function StarSummarizeButton({
  onClick,
  isActive = true,
  children,
  className,
}: StarSummarizeButtonProps) {
  // A subtle pulse effect for the button
  const [isPulsing, setIsPulsing] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      // Set up pulse interval
      const interval = setInterval(() => {
        setIsPulsing(prev => !prev);
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [isActive]);
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative h-7 rounded-md px-2 text-sm overflow-hidden transition-all duration-300",
        isActive 
          ? "bg-[#2A1D48] text-white border border-[#8B5CF6]" 
          : "bg-zinc-800 text-zinc-300",
        isPulsing ? "shadow-[0_0_10px_2px_rgba(139,92,246,0.3)]" : "",
        className
      )}
    >
      <div className="relative z-10 flex items-center gap-1.5">
        {children}
      </div>
    </button>
  );
} 