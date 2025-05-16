"use client";

import { useSession, useListAccounts } from "@/hooks/auth-hooks";
import HomeHeader from "@/components/home-header";
import HistorySection from "@/components/history-section";
import { RoblosecurityGuard } from "@/components/RoblosecurityGuard";
import { HomeIcon } from "lucide-react";
import { usePageTitle } from "@/hooks/use-metadata";

export default function SettingsPage() {
    usePageTitle("Analytics");
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
            <RoblosecurityGuard>
                <div className="flex min-h-full flex-col relative">
                    <main className="flex-1 p-6 pb-24 rounded-2xl shadow-inner bg-background">
                        <HomeHeader pageTitle="Analytics" previousPage={<HomeIcon className="w-4 h-4" />} />
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
            </RoblosecurityGuard>
        </div>

    )
}