"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useSession } from "@/hooks/auth-hooks"
import { trpc } from "@/utils/trpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Create a Roblox Icon component for consistent branding
const RobloxIcon = () => (
    <svg
        width="200"
        height="auto"
        viewBox="0 0 800 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M96.449 96.0107L119.477 138.156H76.7498L57.3066 102.139H38.8866V138.156H0V10.4827H71.1215C100.542 10.4827 119.221 26.8115 119.221 56.1765C119.221 75.0722 110.522 88.6083 96.449 96.0107ZM38.8866 43.6644V68.9438H66.5165C74.7032 68.9438 79.8198 64.0922 79.8198 56.1765C79.8198 48.2607 74.7032 43.6644 66.5165 43.6644H38.8866ZM243.044 147.594L126.64 116.186L157.852 0L216.053 15.7039L274.255 31.4077L243.044 147.594ZM221.042 62.0494L188.551 53.1123L179.853 85.5414L212.344 94.4813L221.042 62.0494ZM407.547 102.139C407.547 126.652 391.941 138.156 367.637 138.156H291.399V10.4827H365.079C389.383 10.4827 404.989 22.9947 404.989 44.9546C404.989 58.7434 399.872 67.9386 390.15 74.3223C401.151 79.1577 407.547 88.8636 407.547 102.139ZM329.262 41.1244V60.0201H354.576C361.484 60.0201 365.577 56.9559 365.577 50.3169C365.577 44.1886 361.484 41.1244 354.576 41.1244H329.262ZM329.262 107.515H357.66C364.311 107.515 368.162 103.94 368.162 97.8089C368.162 91.1725 364.325 88.1083 357.66 88.1083H329.262V107.515ZM426.735 10.4827H465.616V100.354H521.387V138.156H426.729L426.735 10.4827ZM664.406 74.3223C664.406 87.453 660.505 100.289 653.196 111.207C645.887 122.125 635.498 130.634 623.344 135.659C611.19 140.684 597.816 141.999 584.913 139.437C572.01 136.875 560.158 130.552 550.855 121.267C541.553 111.982 535.217 100.153 532.651 87.2744C530.084 74.3959 531.402 61.047 536.436 48.9158C541.471 36.7845 549.996 26.4158 560.935 19.1207C571.873 11.8256 584.734 7.9319 597.889 7.9319C606.628 7.91455 615.284 9.6195 623.362 12.9489C631.439 16.2784 638.778 21.1668 644.958 27.3337C651.138 33.5007 656.037 40.8248 659.374 48.8859C662.712 56.9471 664.422 65.5866 664.406 74.3088V74.3223ZM625.519 74.3223C625.519 58.488 612.983 45.976 597.889 45.976C582.795 45.976 570.257 58.488 570.257 74.3223C570.257 90.1565 582.795 102.666 597.889 102.666C612.983 102.666 625.519 90.1377 625.519 74.3088V74.3223ZM758.041 72.2768L800 138.156H753.681L730.667 100.607L706.874 138.156H659.801L703.548 73.8062L663.383 10.4827H709.688L730.922 44.9546L751.389 10.4827H797.439L758.041 72.2768Z"
            fill="white"
        />
    </svg>
)

// Check icon for the connected status
const CheckIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
        />
    </svg>
)

// Spinner component for loading states
const Spinner = () => (
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent" />
)

// We'll need to create this query to check if a user has a roblosecurity cookie
const useRobloxAuthStatus = (userId: string | undefined) => {
    const [hasRobloxAuth, setHasRobloxAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!userId) {
            setIsLoading(false)
            return
        }

        // In a real implementation, you would create a TRPC procedure to check this
        // For now, we'll just check if there is a roblosecurity_cookie in localStorage
        // as a placeholder for the real implementation
        const checkAuth = async () => {
            try {
                // This is a placeholder implementation until you add a proper TRPC procedure
                // In a real app, you would call something like:
                // const result = await trpc.robloxAuth.checkUserAuthStatus.query({ userId });
                // setHasRobloxAuth(result.hasRobloxAuth);

                // For demo purposes:
                const hasAuth = localStorage.getItem(`robloxAuth_${userId}`) === "true"
                setHasRobloxAuth(hasAuth)
            } catch (err) {
                console.error("Error checking Roblox auth status:", err)
                setHasRobloxAuth(false)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [userId])

    return { hasRobloxAuth, isLoading }
}

export default function RobloxAuthCard() {
    const { data: session } = useSession()
    const router = useRouter()

    const user = session?.user
    const userId = user?.id
    const { hasRobloxAuth, isLoading } = useRobloxAuthStatus(userId)

    const logoutRobloxMutation = trpc.robloxAuth.logoutRobloxUserSession.useMutation({
        onSuccess: () => {
            // For demo purposes, update localStorage
            if (userId) localStorage.setItem(`robloxAuth_${userId}`, "false")

            // Force a full page refresh to update all components
            window.location.reload()
        }
    })

    const handleLogout = () => {
        if (userId) {
            logoutRobloxMutation.mutate({ userId })
        }
    }

    // For our demo, when someone successfully logs in with Roblox,
    // we'll set a localStorage flag (this simulates the database check)
    useEffect(() => {
        // Check if we just arrived from the roblox-login page with a success parameter
        const url = new URL(window.location.href)
        if (url.searchParams.get("roblox") === "success" && userId) {
            localStorage.setItem(`robloxAuth_${userId}`, "true")
            // Remove the query parameter
            url.searchParams.delete("roblox")
            window.history.replaceState({}, "", url.toString())
            router.refresh()
        }
    }, [userId, router])

    return (
        <Card className="roblox-auth-card max-w-xl">
            <CardHeader>
                <div className="flex flex-col items-center gap-2">
                    <RobloxIcon />
                    {/* <CardTitle className="text-xl">
            Roblox Account
          </CardTitle> */}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                    Connect your Roblox account to use Roblox authentication features
                </p>

                {isLoading ? (
                    <div className="flex h-9 items-center gap-2">
                        <Spinner />
                        <span className="text-muted-foreground text-sm">Checking status...</span>
                    </div>
                ) : hasRobloxAuth ? (
                    <div className="rounded-md bg-primary/10 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 text-primary">
                                <CheckIcon />
                            </div>
                            <div className="ml-3">
                                <p className="font-medium text-sm">
                                    Your Roblox account is connected
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-md bg-muted p-4">
                        <p className="text-sm">
                            No Roblox account is currently connected. Connect your account to enjoy
                            Roblox authentication features.
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                {hasRobloxAuth ? (
                    <Button
                        variant="destructive"
                        onClick={handleLogout}
                        disabled={logoutRobloxMutation.isPending}
                        className="w-full"
                    >
                        {logoutRobloxMutation.isPending ? (
                            <>
                                <Spinner />
                                <span>Disconnecting...</span>
                            </>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Disconnect Roblox</span>
                            </>
                        )}
                    </Button>
                ) : (
                    <Button asChild className="w-full">
                        <Link href="/roblox-login">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                            </svg>
                            <span>Connect Roblox Account</span>
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
