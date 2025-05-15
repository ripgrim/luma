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

   console.log(userData)
    
    return (
        <div className="flex flex-col gap-6 mx-auto max-w-xl">
            <UserAvatar user={user} />
            <SettingsCards />
        </div>
    )
}