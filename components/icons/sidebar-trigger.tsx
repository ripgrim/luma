import * as React from "react"
import { SVGProps } from "react"

export function SidebarTriggerClosed(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-panel-left" aria-hidden="true">
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
        </svg>

    )
}

export function SidebarTriggerOpened(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-panel-left" aria-hidden="true">
            <rect x="1" y="1" width="18" height="18" rx="2" ry="2" />
            <path d="m7,1v18" />
            <rect fill="currentColor" x="1.88" y="1.34" width="5.12" height="17.66" />
        </svg>

    )
}
