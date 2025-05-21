"use client"

import { TradesPageClient } from "@/components/trades/TradesPageClient"
import { Suspense } from "react"

export default function TradesPage() {
    return (
        <Suspense fallback={null}>
            <TradesPageClient />
        </Suspense>
    )
}
