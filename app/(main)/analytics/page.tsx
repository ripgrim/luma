"use client"

import { RoblosecurityGuard } from "@/components/RoblosecurityGuard"
import HistorySection from "@/components/history-section"
import HomeHeader from "@/components/home-header"
import { useListAccounts, useSession } from "@/hooks/auth-hooks"
import { usePageTitle } from "@/hooks/use-metadata"
import { HomeIcon } from "lucide-react"

export default function SettingsPage() {
    usePageTitle("Analytics")
    const { user } = useSession()
    const { data: accounts, isPending: accountsLoading } = useListAccounts()
    const userData = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        avatar: user?.image?.toString(),
        robloxPlatformId: accounts?.find((account) => account.provider === "roblox")?.accountId
    }

    const trades = [
        { status: "received", text: "Received" },
        { status: "accepted", text: "Accepted" },
        { status: "accepted", text: "Accepted" },
        { status: "declined", text: "Declined" },
        { status: "accepted", text: "Accepted" },
        { status: "accepted", text: "Accepted" },
        { status: "declined", text: "Declined" }
    ]

    console.log(userData)

    return (
        <div className="flex flex-col gap-6">
            <RoblosecurityGuard>
                <div className="relative flex min-h-full flex-col">
                    <main className="flex-1 rounded-2xl bg-background p-6 pb-24 shadow-inner">
                        <HomeHeader
                            pageTitle="Analytics"
                            previousPage={<HomeIcon className="h-4 w-4" />}
                        />
                        <div className="w-full rounded-xl bg-[#181818] p-4 pb-8 shadow-inner">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 xl:grid-cols-3">
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
