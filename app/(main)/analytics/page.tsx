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
import { useSession, useListAccounts } from "@/hooks/auth-hooks";
import HomeHeader from "@/components/home-header"
import { ClippedCard } from "@/components/clipped-card"
import RecentTradesSection from "@/components/recent-trades-section"
import HistorySection from "@/components/history-section"
import { RobuxIcon, TradeIcon, PlayerIcon, SearchIcon } from "@/components/icons/icons"
import { CardMask } from "@/components/ui/card-mask";
import { KeyIcon } from "lucide-react";
export default function SettingsPage() {
    const { user } = useSession()
    const { data: accounts, isPending: accountsLoading } = useListAccounts();
    const userData = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        avatar: user?.image?.toString(),
        robloxPlatformId: accounts?.find(account => account.provider === "roblox")?.accountId,
    }

    const trades = [
        { status: "received", text: "Received" },
        { status: "accepted", text: "Accepted" },
        { status: "accepted", text: "Accepted" },
        { status: "declined", text: "Declined" },
        { status: "accepted", text: "Accepted" },
        { status: "accepted", text: "Accepted" },
        { status: "declined", text: "Declined" },
    ]

    console.log(userData)

    return (
        <div className="flex flex-col gap-6">
            <div className="flex min-h-full flex-col relative">
                <main className="flex-1 p-6 pb-24 rounded-2xl shadow-inner bg-background">
                    <HomeHeader userName="ripgrim" />
                    <div className="rounded-xl bg-[#181818] p-4 pb-8 shadow-inner w-full">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-1 xl:grid-cols-3">
                            <HistorySection />
                            <HistorySection />
                            <HistorySection />
                            <HistorySection />
                            <HistorySection />
                            <HistorySection />
                            <HistorySection />
                            <HistorySection />
                            <HistorySection />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}