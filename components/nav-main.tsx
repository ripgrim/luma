"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"; // Import Link for navigation
import { usePathname, useRouter } from "next/navigation"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from "@/components/ui/sidebar"

interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    count?: number;
    dropdown?: boolean; // Added dropdown flag
    items?: NavItem[];
}

/**
 * Renders a sidebar navigation group with support for collapsible dropdown menus and active state highlighting.
 *
 * Displays a labeled group of navigation items, each rendered as either a direct link or a collapsible dropdown containing sub-items. Active items are highlighted based on the current route, and optional count badges are shown for items and sub-items.
 *
 * @param items - The navigation items to display, each optionally supporting dropdowns and nested sub-items.
 * @param groupTitle - The label displayed at the top of the navigation group.
 */
export function NavMain({
    items,
    groupTitle
}: {
    items: NavItem[];
    groupTitle: string;
}) {
    const router = useRouter() // Keep for imperative routing if needed elsewhere
    const pathname = usePathname()

    const checkActive = (itemUrl: string, subItems?: NavItem[]) => {
        if (pathname === itemUrl) return true;
        if (subItems) {
            return subItems.some(subItem => pathname === subItem.url);
        }
        return false;
    };

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-neutral-500 dark:text-neutral-400 uppercase text-xs font-medium tracking-wider mt-3 mb-1.5 px-3">
                {groupTitle}
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = item.isActive !== undefined ? item.isActive : checkActive(item.url, item.items);

                    if (item.dropdown && item.items && item.items.length > 0) {
                        // Render as Collapsible Dropdown
                        return (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={isActive} // Open if parent or any child is active
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton 
                                            isActive={isActive} // Highlight trigger if section is active
                                            className="text-sm h-8 flex items-center px-3 py-1.5 w-full"
                                        >
                                            {item.icon && <item.icon size={16} className="mr-2 shrink-0" />}
                                            <span className="truncate grow">{item.title}</span>
                                            {item.count !== undefined && (
                                                <span className="ml-auto mr-2 text-xs text-neutral-500 dark:text-neutral-400">
                                                    {item.count.toLocaleString()}
                                                </span>
                                            )}
                                            <ChevronRight size={16} className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={pathname === subItem.url}
                                                        className="text-xs h-7"
                                                    >
                                                        <Link href={subItem.url}>
                                                            {/* Sub item icon if any, or indent styling */}
                                                            {/* <span className=\"w-4 mr-2 shrink-0\"></span> Placeholder for indent or sub-icon */} 
                                                            <span className="truncate grow">{subItem.title}</span>
                                                            {subItem.count !== undefined && (
                                                                <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">
                                                                    {subItem.count.toLocaleString()}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    } else {
                        // Render as Direct Link Item
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    className="text-sm h-8 flex items-center px-3 py-1.5 w-full"
                                >
                                    <Link href={item.url}>
                                        {item.icon && <item.icon size={16} className="mr-2 shrink-0" />}
                                        <span className="truncate grow">{item.title}</span>
                                        {item.count !== undefined && (
                                            <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">
                                                {item.count.toLocaleString()}
                                            </span>
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    }
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
