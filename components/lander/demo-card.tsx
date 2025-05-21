"use client"
import { motion } from "framer-motion";
import { Clock, Plus, Cube, ChevronDown, MediumStack } from "@/components/icons/icons";
import Image from "next/image";

export function DemoCards() {
    return (
        <div className="relative mt-52">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center"
            >
                <h1 className="text-lg font-light text-white/40 md:text-xl">
                    Designed for power users who value time
                </h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-2 flex flex-col items-center justify-center md:mt-8"
            >
                <h1 className="text-center text-4xl font-medium text-white md:text-6xl">
                    Speed Is Everything
                </h1>
                <h1 className="text-center text-4xl font-medium text-white/40 md:text-6xl">
                    Reply in seconds
                </h1>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative bottom-3 mx-12 flex items-center justify-center bg-[#0c0a09] md:mx-0"
            >
                <div className="mx-auto inline-flex max-w-[600px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#1A1A1A] shadow-md">
                    <div className="inline-flex h-12 items-center justify-start gap-2 self-stretch border-b-[0.50px] p-4">
                        <div className="text-base-gray-500/50 justify-start text-sm leading-none">To:</div>
                        <div className="flex flex-1 items-center justify-start gap-1">
                            <div className="outline-tokens-badge-default/10 flex items-center justify-start gap-1.5 rounded-full border border-[#2B2B2B] py-1 pl-1 pr-1.5">
                                <Image
                                    height={20}
                                    width={20}
                                    className="h-5 w-5 rounded-full"
                                    src="https://0.email/_next/image?url=%2Fadam.jpg&w=32&q=75"
                                    alt="Adam"
                                />
                                <div className="flex items-center justify-start">
                                    <div className="flex items-center justify-center gap-2.5 pr-0.5">
                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                            Adam
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="outline-tokens-badge-default/10 flex items-center justify-start gap-1.5 rounded-full border border-[#2B2B2B] py-1 pl-1 pr-1.5">
                                <Image
                                    height={20}
                                    width={20}
                                    className="h-5 w-5 rounded-full"
                                    src="https://0.email/_next/image?url=%ryan.jpg&w=32&q=75"
                                    alt="Ryan"
                                />{' '}
                                <div className="flex items-center justify-start">
                                    <div className="flex items-center justify-center gap-2.5 pr-0.5">
                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                            Ryan
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex h-12 items-center justify-start gap-2.5 self-stretch p-4">
                        <Clock className="relative h-3.5 w-3.5 overflow-hidden fill-[#9A9A9A]" />
                        <div className="inline-flex flex-1 flex-col items-start justify-start gap-3">
                            <div className="inline-flex items-center justify-start gap-1 self-stretch">
                                <div className="text-base-gray-950 flex-1 justify-start text-sm font-normal leading-none">
                                    Re: Code review feedback
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-12 self-stretch rounded-2xl bg-[#202020] px-4 py-3">
                        <div className="flex flex-col items-start justify-start gap-3 self-stretch">
                            <div className="justify-start self-stretch text-sm font-normal leading-normal text-white">
                                Hey team,
                            </div>
                            <div className="justify-start self-stretch text-sm font-normal leading-normal text-white">
                                I took a look at the code review feedback. Really like the keyboard navigation -
                                it makes everything much faster to access. The search implementation is clean,
                                though I'd love to see the link to test it out myself.
                            </div>
                            <div className="justify-start self-stretch text-sm font-normal leading-normal text-white">
                                Let me know when you can share the preview and I'll provide more detailed
                                feedback.
                            </div>
                        </div>
                        <div className="inline-flex items-center justify-between self-stretch">
                            <div className="flex items-center justify-start gap-3">
                                <div className="flex items-center justify-start rounded-md bg-white text-black">
                                    <div className="flex h-7 items-center justify-center gap-1.5 overflow-hidden rounded-bl-md rounded-tl-md bg-white pl-1.5 pr-1">
                                        <div className="flex items-center justify-center gap-2.5 pl-0.5">
                                            <div className="justify-start text-center text-sm leading-none text-black">
                                                Send <span className="hidden md:inline">now</span>
                                            </div>
                                        </div>
                                        <div className="flex h-5 items-center justify-center gap-2.5 rounded bg-[#E7E7E7] px-1 outline outline-1 outline-offset-[-1px] outline-[#D2D2D2]">
                                            <div className="text-tokens-shortcut-primary-symbol justify-start text-center text-sm font-semibold leading-none">
                                                ⏎
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-base-gray-950 flex items-center justify-start gap-2.5 self-stretch px-2 pr-3">
                                        <div className="relative h-3 w-px rounded-full bg-[#D0D0D0]" />
                                    </div>
                                    <div className="bg-base-gray-950 flex h-7 items-center justify-center gap-1.5 overflow-hidden rounded-br-md rounded-tr-md pr-2">
                                        <ChevronDown className="relative h-2 w-2 overflow-hidden fill-black" />
                                    </div>
                                </div>
                                <div className="flex h-7 items-center justify-center gap-0.5 overflow-hidden rounded-md bg-[#373737] px-1.5">
                                    <Plus className="relative h-2.5 w-2.5 overflow-hidden fill-[#9A9A9A]" />
                                    <div className="flex items-center justify-center gap-2.5 px-0.5">
                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                            Add <span className="hidden md:inline">files</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden items-start justify-start gap-3 md:flex">
                                <div className="flex h-7 items-center justify-center gap-0.5 overflow-hidden rounded-md bg-[#373737] px-1.5">
                                    <Cube className="relative h-3 w-3 overflow-hidden fill-[#9A9A9A]" />

                                    <div className="flex items-center justify-center gap-2.5 px-0.5">
                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                            Neutral
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-7 items-center justify-center gap-0.5 overflow-hidden rounded-md bg-[#373737] px-1.5">
                                    <MediumStack className="relative mx-1 h-2.5 w-2.5 overflow-hidden fill-[#9A9A9A]" />

                                    <div className="flex items-center justify-center gap-2.5 px-0.5">
                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                            Medium-length
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex items-start justify-start self-stretch">
                        <div className="border-tokens-stroke-light/5 flex h-12 flex-1 items-center justify-center gap-2 border-r-[0.50px]">
                            <div className="flex items-center justify-start gap-1">
                                <div className="flex h-5 w-5 items-center justify-center gap-2.5 rounded-[5px] bg-[#2B2B2B] px-1.5">
                                    <div className="justify-start text-center text-sm font-semibold leading-none text-[#8C8C8C]">
                                        ↓
                                    </div>
                                </div>
                                <div className="flex h-5 w-5 items-center justify-center gap-2.5 rounded-[5px] bg-[#2B2B2B] px-1.5">
                                    <div className="justify-start text-center text-sm font-semibold leading-none text-[#8C8C8C]">
                                        ↑
                                    </div>
                                </div>
                            </div>
                            <div className="justify-start text-sm leading-none text-[#8C8C8C]">to navigate</div>
                        </div>
                        <div className="flex h-12 flex-1 items-center justify-center gap-2">
                            <div className="flex h-5 items-center justify-center gap-2.5 rounded-[5px] bg-[#2B2B2B] px-1">
                                <div className="justify-start text-center text-sm font-semibold leading-none text-[#8C8C8C]">
                                    ⌘Z
                                </div>
                            </div>
                            <div className="justify-start text-sm leading-none text-[#8C8C8C]">
                                return generation
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
