"use client"

import { SquareTerminal, Archive, AlertCircle, Trash2, MessageSquare, Settings as SettingsIcon, HomeIcon } from "lucide-react"
import type * as React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useIsMobile } from "@/hooks/use-mobile"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail, SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar
} from "@/components/ui/sidebar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { useSession } from "@/hooks/auth-hooks"
import { PencilCompose } from "./icons/icons"
import CreateTrade from "./trades/create-trade"

import { useQueryState } from "nuqs"

const sidebarData = {
    profile: {
        name: "User",
        verified: false,
        email: "user@example.com",
        avatar: "/luma-icon.png",
    },
    core: [
        { title: "Dashboard", icon: HomeIcon, url: "/dashboard" },
        {
            title: "Trades",
            count: 10,
            url: "/trades",
            icon: SquareTerminal,
            dropdown: true,
            items: [
                {
                    title: "Inbound",
                    url: "/trades?type=inbound"
                },
                {
                    title: "Outbound",
                    url: "/trades?type=outbound"
                },
                {
                    title: "Inactive",
                    url: "/trades?type=inactive"
                },
                {
                    title: "Completed",
                    url: "/trades?type=completed"
                }
            ]
        },
    ],
    management: [
        { title: "Archive", icon: Archive, url: "/archive" },
        { title: "Spam", icon: AlertCircle, count: 371, url: "/spam" },
        { title: "Bin", icon: Trash2, count: 9, url: "/bin" }
    ],
    footer: [
        { title: "Feedback", icon: MessageSquare, url: "/feedback" },
        { title: "Settings", icon: SettingsIcon, url: "/auth/settings" }
    ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user } = useSession()
    const isMobile = useIsMobile();
    const { state } = useSidebar();
    const pathname = usePathname();
    const displayUser = {
        name: user?.name || sidebarData.profile.name,
        email: user?.email || sidebarData.profile.email,
        avatar: user?.image?.toString() || sidebarData.profile.avatar
    }

    const handleOpenChange = (open: boolean) => {
        setTradeComposerOpen(open ? 'true' : null);
    };

    const [tradeComposerOpen, setTradeComposerOpen] = useQueryState('isTradeComposerOpen');

    return (
        <Sidebar variant="inset" collapsible="icon" {...props} className="bg-sidebar text-sidebar-foreground">
            <SidebarHeader className="p-3 space-y-2">
                <NavUser user={displayUser} />
            </SidebarHeader>
            <SidebarContent className="flex flex-col gap-y-1 px-2">
                <div className="px-1 py-2">
                    <Dialog open={!!tradeComposerOpen} onOpenChange={handleOpenChange}>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>

                        <DialogTrigger asChild>
                            <button type="button" className="inline-flex h-8 w-full items-center justify-center gap-1 self-stretch overflow-hidden rounded-md border border-gray-200 bg-transparent text-black dark:border-none dark:bg-gradient-to-b dark:from-white/20 dark:to-white/10 dark:text-white dark:outline dark:outline-1 dark:outline-offset-[-1px] dark:outline-white/5">
                                {state === 'collapsed' && !isMobile ? (
                                    <PencilCompose className="fill-iconLight dark:fill-iconDark mt-0.5 text-black" />
                                ) : (
                                    <div className="flex items-center justify-center gap-2.5 pl-0.5 pr-1">
                                        <PencilCompose className="fill-zinc-500 dark:fill-zinc-400" />
                                        <div className="justify-start text-sm leading-none">
                                            New Trade
                                        </div>
                                    </div>
                                )}
                            </button>
                        </DialogTrigger>

                        <DialogContent className="fixed inset-0 z-50 h-screen min-w-screen max-w-none border-none bg-[#FAFAFA] p-0 shadow-none dark:bg-[#141414] translate-x-0 translate-y-0">
                            <CreateTrade />
                        </DialogContent>
                    </Dialog>
                </div>

                <NavMain items={sidebarData.core} groupTitle="Core" />
                <NavMain items={sidebarData.management} groupTitle="Management" />

            </SidebarContent>
            <SidebarFooter className="mt-auto p-2 border-t border-neutral-800/50">
                <SidebarMenu>
                    {sidebarData.footer.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.url}
                                className="text-sm h-8 flex items-center px-2 py-1.5 w-full"
                            >
                                <Link href={item.url}>
                                    {item.icon && <item.icon size={16} className="mr-2 shrink-0" />}
                                    <span className="truncate grow">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
