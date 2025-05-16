"use client";

import {
    DeleteAccountCard
} from "@daveyplate/better-auth-ui";
import { useSession, useListAccounts } from "@/hooks/auth-hooks";
import RobloxAuthCard from "@/app/components/RobloxAuthCard";

export default function SettingsPage() {
    const { data: session } = useSession();
    const user = session?.user;
    const { data: accounts, isPending: accountsLoading } = useListAccounts();
    const userData = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        avatar: user?.image?.toString(),
        robloxPlatformId: accounts?.find(account => account.provider === "roblox")?.accountId,
    }
    
    return (
        <div className="container py-8 justify-center items-center flex flex-col min-h-full">
            {/* <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Manage your account settings and connected services
                </p>
            </div> */}
            <div className="flex flex-col gap-8">
                <RobloxAuthCard />
                <DeleteAccountCard />
            </div>
        </div>
    )
}