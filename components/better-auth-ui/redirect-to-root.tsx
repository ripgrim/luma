"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function RedirectToRoot() {
    const router = useRouter()

    useEffect(() => {
        router.replace("/")
    }, [router])

    return null
}
