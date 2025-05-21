"use client"
import { ClippedCard } from "@/components/clipped-card"
import HistorySection from "@/components/history-section"
import HomeHeader from "@/components/home-header"
import { PlayerIcon, RobuxIcon, SearchIcon, TradeIcon } from "@/components/icons/icons"
import RecentTradesSection from "@/components/recent-trades-section"
import { Button } from "@/components/ui/button"
import { useRoblosecurity } from "@/providers/RoblosecurityProvider"
import { HomeIcon, KeyIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DashboardPage() {
    const trades = [
        { status: "received", text: "Received" },
        { status: "accepted", text: "Accepted" },
        { status: "accepted", text: "Accepted" },
        { status: "declined", text: "Declined" },
        { status: "accepted", text: "Accepted" },
        { status: "accepted", text: "Accepted" },
        { status: "declined", text: "Declined" }
    ]

    const [isPageLocked, setIsPageLocked] = useState(true)
    const { isRobloCookieVerified, isLoadingCookieStatus } = useRoblosecurity()

    const router = useRouter()

    return (
        <div className="flex flex-col gap-6">
            <div className="relative flex min-h-full flex-col">
                <main className="flex-1 rounded-2xl bg-background p-6 pb-24 shadow-inner">
                    <HomeHeader
                        pageTitle="Dashboard"
                        previousPage={<HomeIcon className="h-4 w-4" />}
                    />

                    <div className="w-full rounded-xl bg-[#181818] p-4 pb-8 shadow-inner">
                        <div className="relative h-full w-full">
                            <div
                                className="h-full w-full"
                                style={{
                                    filter:
                                        isLoadingCookieStatus || !isRobloCookieVerified
                                            ? "blur(4px)"
                                            : "none",
                                    transition: "filter 0.3s ease-out"
                                }}
                            >
                                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                                    <ClippedCard
                                        icon={<RobuxIcon />}
                                        iconClassName="absolute top-[-60px] right-[-60px] w-[180px] h-[200px] md:top-[-80px] md:right-[-100px] md:w-[240px] md:h-[300px] lg:top-[-100px] lg:right-[-140px] lg:w-[300px] lg:h-[350px]"
                                    >
                                        <h3 className="mb-1 font-normal text-base text-gray-300">
                                            Total income
                                        </h3>
                                        <p className="mb-1 font-bold text-3xl text-white">
                                            R$1,350.00
                                        </p>
                                        <p className="text-gray-300 text-sm">Over last 30 days</p>
                                    </ClippedCard>
                                    <ClippedCard
                                        icon={<TradeIcon />}
                                        iconClassName="absolute top-[-10px] right-[-10px] w-[120px] h-[120px] md:top-[-30px] md:right-[-30px] md:w-[160px] md:h-[160px] lg:top-[-10px] lg:right-[-40px] lg:w-[210px] lg:h-[300px]"
                                    >
                                        <h3 className="mb-1 font-normal text-base text-gray-300">
                                            Total trades
                                        </h3>
                                        <p className="mb-1 font-bold text-3xl text-white">85</p>
                                        <p className="text-gray-300 text-sm">Over last 30 days</p>
                                    </ClippedCard>
                                    <ClippedCard
                                        icon={<PlayerIcon />}
                                        iconClassName="absolute top-[-10px] right-[-10px] w-[120px] h-[120px] md:top-[-20px] md:right-[-30px] md:w-[140px] md:h-[180px] lg:top-[-30px] lg:right-[-70px] lg:w-[180px] lg:h-[300px]"
                                    >
                                        <h3 className="mb-1 font-normal text-base text-gray-300">
                                            Total users you&apos;ve traded with
                                        </h3>
                                        <p className="mb-1 font-bold text-3xl text-white">44</p>
                                        <p className="text-gray-300 text-sm">Over last 30 days</p>
                                    </ClippedCard>
                                    <ClippedCard
                                        icon={<SearchIcon />}
                                        iconClassName="absolute top-[-10px] right-[-10px] w-[120px] h-[120px] md:top-[-20px] md:right-[-20px] md:w-[160px] md:h-[180px] lg:top-[-20px] lg:right-[-20px] lg:w-[220px] lg:h-[300px]"
                                    >
                                        <h3 className="mb-1 font-normal text-base text-gray-300">
                                            New items discovered
                                        </h3>
                                        <p className="mb-1 font-bold text-3xl text-white">51</p>
                                        <p className="text-gray-300 text-sm">Over last 30 days</p>
                                    </ClippedCard>
                                </div>
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <RecentTradesSection />
                                    <HistorySection />
                                </div>
                            </div>

                            {isLoadingCookieStatus ||
                                (!isRobloCookieVerified && (
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
                                                    Complete step 2 of authentication to view this
                                                    dashboard.
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
                                ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
