"use client"

import { ChevronDown, Cube, MediumStack } from "@/components/icons/icons"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { RobuxIcon2 } from "../icons/robux-icon"
import { AITextSequence } from "../ui/ai-text-sequence"
import { StarSummarizeButton } from "../ui/star-summarize-button"

export default function TradingComposer() {
    const [showSummary, setShowSummary] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const side1 = {
        item1: {
            name: "DMHP",
            image: "/lander/items/dmhp.png",
            price: 100,
            quantity: 1,
            total: 100
        },
        item2: {
            name: "DOMINUS",
            image: "/lander/items/dom.webp",
            price: 100,
            quantity: 1,
            total: 100
        },
        item3: {
            name: "Dominus Astra",
            image: "/lander/items/domastra.webp",
            price: 100,
            quantity: 1,
            total: 100
        },
        item4: {
            name: "Dominus Frigidus",
            image: "/lander/items/frig.webp",
            price: 100,
            quantity: 1,
            total: 100
        },
        total: 56100584
    }

    const side2 = {
        item1: {
            name: "Eggmunition",
            image: "/lander/items/eggmunition.png",
            price: 100,
            quantity: 1,
            total: 100
        },
        total: 139
    }

    const handleSummarize = () => {
        setShowSummary(true)
    }

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showDropdown])

    return (
        <div className="relative mt-40 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center"
            >
                <h1 className="font-light text-lg text-white/40 md:text-xl">
                    Designed for advanced traders who value time
                </h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-2 flex flex-col items-center justify-center md:mt-6"
            >
                <h1 className="text-center font-medium text-4xl text-white md:text-6xl">
                    Speed Is Everything
                </h1>
                <h1 className="text-center font-medium text-4xl text-white/40 md:text-6xl">
                    Trade in seconds
                </h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative bottom-2 mx-auto flex max-w-xl items-center justify-center bg-[#0c0a09]"
            >
                {showSummary && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-[160px] left-0 z-20 w-[300px] flex-col items-start justify-start gap-3 overflow-hidden rounded-xl border border-[#8B5CF6] bg-[#2A1D48] p-4 shadow-lg"
                    >
                        <div className="mb-2 flex items-center gap-1.5">
                            <div className="relative h-3.5 w-3.5">
                                <img
                                    src="https://0.email/star.svg"
                                    alt="AI Summary"
                                    width={16}
                                    height={16}
                                    className=""
                                />
                            </div>
                            <div className="flex items-center gap-1 text-[#948CA4] text-xs">
                                AI Summary
                                <ChevronDown className="h-2 w-2 fill-[#8C8C8C]" />
                            </div>
                        </div>
                        <AITextSequence
                            finalText="This trade would result in a significant value loss. Likely that it was sent by a troll, or not a serious trade."
                            thinkingDuration={2000}
                            typingSpeed={35}
                        />
                    </motion.div>
                )}

                <motion.div
                    animate={{
                        filter: showSummary
                            ? "blur(0.5px) brightness(0.7)"
                            : "blur(0px) brightness(1)",
                        opacity: showSummary ? 0.95 : 1
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                    className="relative z-10 mx-auto w-full flex-col overflow-hidden rounded-xl bg-[#1A1A1A] shadow-lg"
                >
                    <div className="flex h-10 items-center gap-2 border-zinc-800/50 border-b px-4">
                        <div className="text-sm text-zinc-500">Send trade to:</div>
                        <div className="flex flex-1 items-center gap-2">
                            <div className="flex items-center gap-1.5 rounded-full border border-zinc-700 py-0.5 pr-2 pl-1">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 font-medium text-[10px] text-white">
                                    7
                                </div>
                                <div className="text-sm text-white">7sw7</div>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full border border-zinc-700 py-0.5 pr-2 pl-1">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 font-medium text-[10px] text-white">
                                    J
                                </div>
                                <div className="text-sm text-white">jonnyblox</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-900 p-4">
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 font-medium text-sm text-zinc-300">
                                    Items you would give:
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    <ItemSlot item={side1.item1} />
                                    <ItemSlot item={side1.item2} />
                                    <ItemSlot item={side1.item3} />
                                    <ItemSlot item={side1.item4} />
                                </div>
                                <div className="mt-3 text-right font-semibold text-lg text-white">
                                    <RobuxIcon2 className="inline-block h-4 w-4 fill-white" />{" "}
                                    {side1.total.toLocaleString()}
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 font-medium text-sm text-zinc-300">
                                    Items you would receive:
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    <ItemSlot item={side2.item1} />
                                </div>
                                <div className="mt-3 text-right font-semibold text-lg text-white">
                                    <RobuxIcon2 className="inline-block h-4 w-4 fill-white" />{" "}
                                    {side2.total.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-zinc-800/50 border-t p-3">
                        <div className="flex items-center gap-2">
                            <div className="relative" ref={dropdownRef}>
                                <div className="flex items-center justify-start rounded-md bg-white text-black">
                                    <div className="flex h-7 items-center justify-center gap-1.5 overflow-hidden rounded-tl-md rounded-bl-md bg-white pr-1 pl-1.5">
                                        <div className="flex items-center justify-center gap-2.5 pl-0.5">
                                            <div className="justify-start text-center text-black text-sm leading-none">
                                                Send <span className="hidden md:inline">now</span>
                                            </div>
                                        </div>
                                        <div className="flex h-5 items-center justify-center gap-2.5 rounded bg-[#E7E7E7] px-1 outline outline-1 outline-[#D2D2D2] outline-offset-[-1px]">
                                            <div className="justify-start text-center font-semibold text-sm text-tokens-shortcut-primary-symbol leading-none">
                                                ⏎
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start gap-2.5 self-stretch bg-base-gray-950 px-2 pr-3">
                                        <div className="relative h-3 w-px rounded-full bg-[#D0D0D0]" />
                                    </div>
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex h-7 items-center justify-center gap-1.5 overflow-hidden rounded-tr-md rounded-br-md bg-base-gray-950 pr-2 transition-colors duration-150 hover:bg-[#E5E5E5]"
                                    >
                                        <motion.div
                                            animate={{ rotate: showDropdown ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown className="h-2 w-2 fill-black" />
                                        </motion.div>
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {showDropdown && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: -5,
                                                height: 0,
                                                scaleY: 0.95,
                                                transformOrigin: "top"
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                height: "auto",
                                                scaleY: 1
                                            }}
                                            exit={{ opacity: 0, y: -5, height: 0, scaleY: 0.95 }}
                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                            className="absolute right-0 left-0 z-30 mt-1 overflow-hidden rounded-md bg-white shadow-lg"
                                        >
                                            <button className="flex w-full items-center justify-start gap-1.5 px-3 py-1 text-black text-sm transition-colors hover:bg-[#F5F5F5]">
                                                <span>Schedule trade</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <StarSummarizeButton
                                onClick={handleSummarize}
                                isActive={!showSummary}
                                className="ml-2"
                            >
                                <div className="relative h-3.5 w-3.5">
                                    <img
                                        src="https://0.email/star.svg"
                                        alt="AI Summary"
                                        width={14}
                                        height={14}
                                        className=""
                                    />
                                </div>
                                <span className="font-medium">Summarize</span>
                            </StarSummarizeButton>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex h-7 items-center gap-1.5 rounded-md bg-zinc-800 px-2 text-sm text-zinc-300">
                                <Cube className="h-3 w-3 fill-white" />
                                Fair trade
                            </button>
                            <button className="flex h-7 items-center gap-1.5 rounded-md bg-zinc-800 px-2 text-sm text-zinc-300">
                                <MediumStack className="h-3 w-3 fill-white" />
                                Value-based
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-end border-zinc-800/50 border-t px-4 py-3 text-xs text-zinc-500">
                        <div className="flex items-center gap-2">
                            <kbd className="flex h-5 min-w-[20px] items-center justify-center rounded bg-zinc-800 px-1 text-center">
                                ⌘Z
                            </kbd>
                            <span>cancel trade</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

function ItemSlot({
    item
}: { item: { image: string; name: string; price: number; quantity: number; total: number } }) {
    return (
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded bg-zinc-800 shadow-inner">
            <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="h-full w-full object-cover"
                style={{ objectPosition: "center" }}
            />
        </div>
    )
}
