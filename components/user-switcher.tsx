"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, LogOut, UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "@/hooks/auth-hooks"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function UserSwitcher() {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const { user: currentUser, status } = useSession()

  if (status === "pending") {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled className="w-full">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg border bg-muted">
              <UserCircle className="size-5 animate-pulse" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-sm font-medium text-muted-foreground">Loading...</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  if (!currentUser) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            onClick={() => router.push("/auth/signIn")}
            className="w-full"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
              <UserCircle className="size-5" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-sm font-medium">Sign In</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const userAvatar = currentUser.image || "/default-avatar.png"
  const userName = currentUser.name || "User"
  const userEmail = currentUser.email || ""

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                <img src={userAvatar} alt={userName} className="size-full rounded-lg object-cover" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userName}</span>
                <span className="truncate text-xs text-muted-foreground">{userEmail}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[calc(var(--radix-dropdown-menu-trigger-width)_-_8px)] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={isMobile ? 8: 4}
          >
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
              Signed in as
            </DropdownMenuLabel>
            <DropdownMenuItem disabled className="group flex-col items-start px-2 py-1.5 opacity-100 focus:bg-transparent">
                <div className="font-semibold text-primary">{userName}</div>
                <div className="text-xs text-muted-foreground">{userEmail}</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={() => router.push("/auth/signIn")}>
              <Plus className="size-4 text-muted-foreground" />
              <span>Add or manage accounts</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 p-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
              onClick={() => router.push("/auth/signOut")}
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
