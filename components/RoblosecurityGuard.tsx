"use client"

import { useRoblosecurity } from "@/providers/RoblosecurityProvider"
import { KeyIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import type { ReactNode } from "react"
import { Button } from "./ui/button"

interface RoblosecurityGuardProps {
    children: ReactNode
    blurAmount?: string // e.g., '4px'
}

export const RoblosecurityGuard: React.FC<RoblosecurityGuardProps> = ({
    children,
    blurAmount = "4px"
}) => {
    const { isRobloCookieVerified, isLoadingCookieStatus } = useRoblosecurity()
    const router = useRouter()

    return (
        <div className="relative h-full w-full">
            <div
                className="h-full w-full"
                style={{
                    filter: isLoadingCookieStatus || !isRobloCookieVerified ? "blur(4px)" : "none",
                    transition: "filter 0.3s ease-out"
                }}
            >
                {children}
            </div>

            {(isLoadingCookieStatus || !isRobloCookieVerified) && (
                <>
                    <div
                        className="absolute inset-0 z-10"
                        style={{ backgroundColor: "rgba(26, 26, 26, 0.5)" }}
                    />

                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
                        <div className="flex max-w-md flex-col items-center justify-center text-center">
                            <div className="mb-4 text-gray-400">
                                <KeyIcon size={48} />
                            </div>
                            <h3 className="mt-0 mb-2 font-bold text-2xl text-white">
                                Authentication Required
                            </h3>
                            <p className="mb-4 text-gray-400 text-sm">
                                Complete step 2 of authentication to view this dashboard.
                            </p>
                            <Button
                                variant="outline"
                                className="rounded-md bg-background px-4 py-2 text-white"
                                onClick={() => {
                                    router.push("/user/settings")
                                }}
                            >
                                Complete Step 2
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
