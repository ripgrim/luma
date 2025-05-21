"use client"

import { Instrument_Serif } from "next/font/google"
import { Button } from "../ui/button"
import { SignedIn, SignedOut } from "@daveyplate/better-auth-ui"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Roblox } from "../logos/logos"

const instrumentSerif = Instrument_Serif({
    variable: "--font-instrument-serif",
    subsets: ["latin"],
    weight: "400"
})

export function HeroSection() {
    const router = useRouter()
    return (
        <div className="relative isolate overflow-hidden pb-8 sm:pb-10 pt-40">
            <div className="mx-auto max-w-[1200px] md:px-8">
                <div className="border-input/50 mb-6 inline-flex items-center gap-4 rounded-full border border-[#2A2A2A] bg-[#1E1E1E] px-4 py-1">
                <span className="flex items-center gap-2 text-sm">
                    <Image
                        src="/gc-small.svg"
                        alt="Y Combinator"
                        className="rounded-[2px]"
                        width={18}
                        height={18}
                    />{' '}
                    Backed by G Combinator
                </span>
                </div>
                <div className="max-w-2xl mx-auto sm:mx-0">
                    <div className="space-y-6 text-center sm:text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-700 text-white leading-[1.3] sm:leading-[1.1] tracking-normal">The <span className="text-white/90 italic">only</span> <Roblox className="inline-block h-12" /> trading platform you&apos;ll ever need</h1>
                        <p className="text-lg sm:text-xl leading-[1.2] tracking-tight font-500 text-white/40 max-w-lg mx-auto sm:mx-0">
                            Easily trade, <span className="text-white/90">scale account value</span>, and <span className="text-white/90">maximize</span> your income
                        </p>
                    </div>
                    <div className="h-10"></div>
                    <div className="flex justify-center sm:justify-start">
                        <SignedIn>
                            <Button
                                onClick={() => router.push("/dashboard")}
                            >Start Trading</Button>
                        </SignedIn>
                        <SignedOut>
                            <Button
                                variant="outline"
                                className="bg-white/10 hover:bg-white/20"
                            >Sign In</Button>
                        </SignedOut>
                    </div>
                </div>
            </div>
        </div>
    )
}
