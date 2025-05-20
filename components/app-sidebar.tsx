"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Database,
  Frame,
  GalleryVerticalEnd,
  Key,
  Keyboard,
  Link,
  Map,
  PieChart,
  Search,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSession } from "@/hooks/auth-hooks"
import { UserSwitcher } from "@/components/user-switcher"
import Logo from "@/components/logo"
import { Logo2 } from "@/components/logo"
import Image from "next/image"

import { ROOT_PAGE } from "@/lib/constants"
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  users: [
    {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  ],
  navMain: [
    {
      title: "Trades",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Inbound",
          url: "/trades?type=inbound",
        },
        {
          title: "Outbound",
          url: "/trades?type=outbound",
        },
        {
          title: "Inactive",
          url: "/trades?type=inactive",
        },
        {
          title: "Completed",
          url: "/trades?type=completed",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      isActive: true,
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "/auth/settings",
        },
      ],
    },
  ],
  utility: [
    {
      name: "Hotkeys",
      url: "#",
      icon: Keyboard,
    },
    {
      name: "Analytics",
      url: "/analytics",
      icon: Database,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSession()
  const userData = {
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.image?.toString() || "",
  }

  console.log(userData)
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <a href={ROOT_PAGE}>
          <Image src="/luma-icon.png" alt="Luma" width={30} height={30} />
        </a>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.utility} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
