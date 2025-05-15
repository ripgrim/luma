import React from "react"
import { Search, Settings, Bell, User } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface HomeHeaderProps {
  userName: string
}

export default function HomeHeader({ userName }: HomeHeaderProps) {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search (shift + k)"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md py-2 px-4 pl-10 text-white"
            name="q"
            id="global-search"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>
    </header>
  )
} 