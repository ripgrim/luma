"use client"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useQueryState } from "nuqs"
import { Button } from "../ui/button"
import { SidebarTrigger } from "../ui/sidebar"

const tradeTypes = [
    { label: "Inbound", type: "inbound" },
    { label: "Outbound", type: "outbound" },
    { label: "Completed", type: "completed" },
    { label: "Inactive", type: "inactive" }
]

interface TradeSwitcherProps {
    onTypeChange?: (type: string) => void // Optional callback for parent components
}

export function TradeSwitcher({ onTypeChange }: TradeSwitcherProps = {}) {
    const [currentType, setCurrentType] = useQueryState("type", { defaultValue: "inbound" })
    return (
        <nav className="relative mb-8 flex items-center justify-center">
            <SidebarTrigger />
            <div className="relative flex gap-2 rounded-lg bg-muted p-1">
                {tradeTypes.map((type) => {
                    const isActive = currentType === type.type
                    return (
                        <Button
                            key={type.type}
                            onClick={() => setCurrentType(type.type)}
                            className={cn(
                                "relative z-10 px-4 py-2 font-medium text-sm transition-colors duration-200",
                                isActive
                                    ? "text-primary-foreground hover:text-primary-foreground"
                                    : "text-muted-foreground hover:text-muted-foreground"
                            )}
                            variant="ghost"
                        >
                            <AnimatePresence>
                                {isActive && (
                                    <motion.span
                                        layoutId="trade-switcher-active"
                                        className="absolute inset-0 rounded-md bg-primary"
                                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                                        style={{ zIndex: 0 }}
                                    />
                                )}
                            </AnimatePresence>
                            <span className="relative z-10">{type.label}</span>
                        </Button>
                    )
                })}
            </div>
        </nav>
    )
}
