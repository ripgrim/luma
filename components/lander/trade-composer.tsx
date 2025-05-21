"use client"

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Cube, MediumStack, Clock } from "@/components/icons/icons";
import Image from "next/image";
import { RobuxIcon, RobuxIcon2 } from "../icons/robux-icon";
import { AITextSequence } from "../ui/ai-text-sequence";
import { useState, useRef, useEffect } from "react";
import { StarSummarizeButton } from "../ui/star-summarize-button";

export default function TradingComposer() {
    const [showSummary, setShowSummary] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const side1 = {
        "item1": {
            name: "DMHP",
            image: "/lander/items/dmhp.png",
            price: 100,
            quantity: 1,
            total: 100,
        },
        "item2": {
            name: "DOMINUS",
            image: "/lander/items/dom.webp",
            price: 100,
            quantity: 1,
            total: 100,
        },
        "item3": {
            name: "Dominus Astra",
            image: "/lander/items/domastra.webp",
            price: 100,
            quantity: 1,
            total: 100,
        },
        "item4": {
            name: "Dominus Frigidus",
            image: "/lander/items/frig.webp",
            price: 100,
            quantity: 1,
            total: 100,
        },
        total: 56100584,
    }

    const side2 = {
        "item1": {
            name: "Eggmunition",
            image: "/lander/items/eggmunition.png",
            price: 100,
            quantity: 1,
            total: 100,
        },
        total: 139,
    }

    const handleSummarize = () => {
        setShowSummary(true);
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div className="relative mt-40 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center"
            >
                <h1 className="text-lg font-light text-white/40 md:text-xl">
                    Designed for advanced traders who value time
                </h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-2 flex flex-col items-center justify-center md:mt-6"
            >
                <h1 className="text-center text-4xl font-medium text-white md:text-6xl">
                    Speed Is Everything
                </h1>
                <h1 className="text-center text-4xl font-medium text-white/40 md:text-6xl">
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
                        className="absolute z-20 left-0 top-[160px] w-[300px] flex-col items-start justify-start gap-3 overflow-hidden rounded-xl border border-[#8B5CF6] bg-[#2A1D48] p-4 shadow-lg"
                    >
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="relative h-3.5 w-3.5">
                                <img src="https://0.email/star.svg" alt="AI Summary" width={16} height={16} className="" />
                            </div>
                            <div className="flex items-center gap-1 text-xs text-[#948CA4]">
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
                        filter: showSummary ? "blur(0.5px) brightness(0.7)" : "blur(0px) brightness(1)",
                        opacity: showSummary ? 0.95 : 1 
                    }}
                    transition={{ 
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                    className="mx-auto w-full flex-col overflow-hidden rounded-xl bg-[#1A1A1A] shadow-lg z-10 relative"
                >
                    <div className="flex h-10 items-center gap-2 border-b border-zinc-800/50 px-4">
                        <div className="text-zinc-500 text-sm">Send trade to:</div>
                        <div className="flex flex-1 items-center gap-2">
                            <div className="flex items-center gap-1.5 rounded-full border border-zinc-700 py-0.5 pl-1 pr-2">
                                <div className="h-5 w-5 rounded-full bg-emerald-600 text-[10px] text-white flex items-center justify-center font-medium">7</div>
                                <div className="text-white text-sm">7sw7</div>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full border border-zinc-700 py-0.5 pl-1 pr-2">
                                <div className="h-5 w-5 rounded-full bg-blue-600 text-[10px] text-white flex items-center justify-center font-medium">J</div>
                                <div className="text-white text-sm">jonnyblox</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-900 p-4">
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 text-sm font-medium text-zinc-300">Items you would give:</div>
                                <div className="grid grid-cols-4 gap-2">
                                    <ItemSlot item={side1.item1} />
                                    <ItemSlot item={side1.item2} />
                                    <ItemSlot item={side1.item3} />
                                    <ItemSlot item={side1.item4} />
                                </div>
                                <div className="mt-3 text-right text-lg font-semibold text-white">
                                    <RobuxIcon2 className="inline-block w-4 h-4 fill-white" /> {side1.total.toLocaleString()}
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 text-sm font-medium text-zinc-300">Items you would receive:</div>
                                <div className="grid grid-cols-4 gap-2">
                                    <ItemSlot item={side2.item1} />
                                </div>
                                <div className="mt-3 text-right text-lg font-semibold text-white">
                                    <RobuxIcon2 className="inline-block w-4 h-4 fill-white" /> {side2.total.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-zinc-800/50 p-3">
                        <div className="flex items-center gap-2">
                            <div className="relative" ref={dropdownRef}>
                                <div className="flex items-center justify-start rounded-md bg-white text-black">
                                    <div className="flex h-7 items-center justify-center gap-1.5 overflow-hidden rounded-bl-md rounded-tl-md bg-white pl-1.5 pr-1">
                                        <div className="flex items-center justify-center gap-2.5 pl-0.5">
                                            <div className="justify-start text-center text-sm leading-none text-black">Send <span className="hidden md:inline">now</span>
                                            </div>
                                        </div>
                                        <div className="flex h-5 items-center justify-center gap-2.5 rounded bg-[#E7E7E7] px-1 outline outline-1 outline-offset-[-1px] outline-[#D2D2D2]">
                                            <div className="text-tokens-shortcut-primary-symbol justify-start text-center text-sm font-semibold leading-none">⏎</div>
                                        </div>
                                    </div>
                                    <div className="bg-base-gray-950 flex items-center justify-start gap-2.5 self-stretch px-2 pr-3">
                                        <div className="relative h-3 w-px rounded-full bg-[#D0D0D0]"></div>
                                    </div>
                                    <button 
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="bg-base-gray-950 flex h-7 items-center justify-center gap-1.5 overflow-hidden rounded-br-md rounded-tr-md pr-2 hover:bg-[#E5E5E5] transition-colors duration-150"
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
                                            initial={{ opacity: 0, y: -5, height: 0, scaleY: 0.95, transformOrigin: "top" }}
                                            animate={{ opacity: 1, y: 0, height: 'auto', scaleY: 1 }}
                                            exit={{ opacity: 0, y: -5, height: 0, scaleY: 0.95 }}
                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                            className="absolute left-0 right-0 mt-1 overflow-hidden rounded-md bg-white shadow-lg z-30"
                                        >
                                            <button className="flex w-full items-center justify-start gap-1.5 px-3 py-1 text-sm text-black hover:bg-[#F5F5F5] transition-colors">
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
                                    <img src="https://0.email/star.svg" alt="AI Summary" width={14} height={14} className="" />
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
                    <div className="flex items-center justify-end border-t border-zinc-800/50 px-4 py-3 text-xs text-zinc-500">
                        <div className="flex items-center gap-2">
                            <kbd className="flex h-5 min-w-[20px] items-center justify-center rounded bg-zinc-800 px-1 text-center">⌘Z</kbd>
                            <span>cancel trade</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

function ItemSlot({ item }: { item: { image: string, name: string, price: number, quantity: number, total: number } }) {
    return (
        <div className="aspect-square rounded bg-zinc-800 flex items-center justify-center shadow-inner overflow-hidden">
            <Image 
                src={item.image} 
                alt={item.name} 
                width={100}
                height={100}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center" }}
            />
        </div>
    )
}
