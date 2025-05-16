import React from "react"
import { Search, Settings, Bell, User, HomeIcon } from "lucide-react"
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
import { Breadcrumb, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "./ui/breadcrumb"
import { Separator } from "@radix-ui/react-separator"

interface HomeHeaderProps {
  pageTitle: string
  previousPage: React.ReactNode
}

export default function HomeHeader({ pageTitle, previousPage }: HomeHeaderProps) {
  return (
    <header className="flex flex-col gap-4 mb-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 w-[1px] bg-card"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  {previousPage}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {/* <div className="relative w-full max-w-md">
        <input
          type="search"
          placeholder="Search (shift + k)"
          className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-md py-2 px-4 pl-10 text-white"
          name="q"
          id="global-search"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div> */}
    </header>
  )
} 