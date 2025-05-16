"use client";

import {
    ProvidersCard,
    ChangeEmailCard,
    SettingsCards,
    UpdateAvatarCard,
    DeleteAccountCard,
    SessionsCard,
    ChangePasswordCard,
    UpdateUsernameCard,
    UserAvatar,
} from "@daveyplate/better-auth-ui";
import HomeHeader from "@/components/home-header"
import { ClippedCard } from "@/components/clipped-card"
import RecentTradesSection from "@/components/recent-trades-section"
import HistorySection from "@/components/history-section"
import { RobuxIcon, TradeIcon, PlayerIcon, SearchIcon } from "@/components/icons/icons"
import { KeyIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useRoblosecurity } from "@/providers/RoblosecurityProvider";


export default function DashboardPage() {
    const trades = [
        { status: "received", text: "Received" },
        { status: "accepted", text: "Accepted" },
        { status: "accepted", text: "Accepted" },
        { status: "declined", text: "Declined" },
        { status: "accepted", text: "Accepted" },
        { status: "accepted", text: "Accepted" },
        { status: "declined", text: "Declined" },
    ]

    const [isPageLocked, setIsPageLocked] = useState(true);
    const { isRobloCookieVerified, isLoadingCookieStatus } = useRoblosecurity();

    const router = useRouter();


    return (
        <div className="flex flex-col gap-6">
            <div className="flex min-h-full flex-col relative">
                <main className="flex-1 p-6 pb-24 rounded-2xl shadow-inner bg-background">
                    <HomeHeader pageTitle="Dashboard" previousPage={<HomeIcon className="w-4 h-4" />} />

                    <div className="rounded-xl bg-[#181818] p-4 pb-8 shadow-inner w-full">
                        <div className="relative w-full h-full">
                            <div
                                className="w-full h-full"
                                style={{
                                    filter:  isLoadingCookieStatus || !isRobloCookieVerified ? "blur(4px)" : "none",
                                    transition: 'filter 0.3s ease-out'
                                }}
                            >
                                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-4">
                                    <ClippedCard
                                        icon={<RobuxIcon />}
                                        iconClassName="absolute top-[-60px] right-[-60px] w-[180px] h-[200px] md:top-[-80px] md:right-[-100px] md:w-[240px] md:h-[300px] lg:top-[-100px] lg:right-[-140px] lg:w-[300px] lg:h-[350px]"
                                    >
                                        <h3 className="text-gray-300 text-base mb-1 font-normal">Total income</h3>
                                        <p className="text-white text-3xl font-bold mb-1">R$1,350.00</p>
                                        <p className="text-gray-300 text-sm">Over last 30 days</p>
                                    </ClippedCard>
                                    <ClippedCard
                                        icon={<TradeIcon />}
                                        iconClassName="absolute top-[-10px] right-[-10px] w-[120px] h-[120px] md:top-[-30px] md:right-[-30px] md:w-[160px] md:h-[160px] lg:top-[-10px] lg:right-[-40px] lg:w-[210px] lg:h-[300px]"
                                    >
                                        <h3 className="text-gray-300 text-base mb-1 font-normal">Total trades</h3>
                                        <p className="text-white text-3xl font-bold mb-1">85</p>
                                        <p className="text-gray-300 text-sm">Over last 30 days</p>
                                    </ClippedCard>
                                    <ClippedCard
                                        icon={<PlayerIcon />}
                                        iconClassName="absolute top-[-10px] right-[-10px] w-[120px] h-[120px] md:top-[-20px] md:right-[-30px] md:w-[140px] md:h-[180px] lg:top-[-30px] lg:right-[-70px] lg:w-[180px] lg:h-[300px]"
                                    >
                                        <h3 className="text-gray-300 text-base mb-1 font-normal">Total users you&apos;ve traded with</h3>
                                        <p className="text-white text-3xl font-bold mb-1">44</p>
                                        <p className="text-gray-300 text-sm">Over last 30 days</p>
                                    </ClippedCard>
                                    <ClippedCard
                                        icon={<SearchIcon />}
                                        iconClassName="absolute top-[-10px] right-[-10px] w-[120px] h-[120px] md:top-[-20px] md:right-[-20px] md:w-[160px] md:h-[180px] lg:top-[-20px] lg:right-[-20px] lg:w-[220px] lg:h-[300px]"
                                    >
                                        <h3 className="text-gray-300 text-base mb-1 font-normal">New items discovered</h3>
                                        <p className="text-white text-3xl font-bold mb-1">51</p>
                                        <p className="text-gray-300 text-sm">Over last 30 days</p>
                                    </ClippedCard>
                                </div>
                                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                                    <RecentTradesSection />
                                    <HistorySection />
                                </div>
                            </div>

                            {isLoadingCookieStatus || !isRobloCookieVerified && (
                                <>
                                    <div 
                                        className="absolute inset-0 z-10" 
                                        style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
                                    />
                                    
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
                                        <div className="flex flex-col items-center justify-center text-center max-w-md">
                                            <div className="text-gray-400 mb-4"><KeyIcon size={48} /></div>
                                            <h3 className="text-white text-2xl font-bold mb-2 mt-0">Authentication Required</h3>
                                            <p className="text-gray-400 text-sm mb-4">Complete step 2 of authentication to view this dashboard.</p>
                                            <Button 
                                                variant="outline" 
                                                className="bg-background text-white px-4 py-2 rounded-md"
                                                onClick={() => {
                                                    router.push("/user/settings")
                                                }}
                                            >Complete Step 2</Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}