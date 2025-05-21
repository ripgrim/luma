"use client"
import { motion, useInView } from "framer-motion";
import { Clock, Plus, Cube, ChevronDown, MediumStack, Search, Filter, PanelLeftOpen, Lightning, ExclamationTriangle, User, Bell, Tag, ChevronLeft, ChevronRight, Calendar, ImageFile, Figma, Docx, X, Check, GroupPeople } from "@/components/icons/icons";
import Image from "next/image";
import { useRef } from "react";

export function CoolBento() {
    // Create refs for the sections
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    
    // Only start animations when section is in view
    const headingControls = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };
    
    const cardControls = {
        hidden: { opacity: 0, y: -20 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.3 + (custom * 0.2) }
        })
    };

    const smartSearch = {
        user: 
        {
            image: "/lander/users/pokemon1075.webp",
            name: "Pokemon1075"
        },
        game: 
        {
            image: "/lander/games/trade-hangout.webp",
            name: "Trade Hangout",
            creator: "Merely"
        },
        item: 
        {
            image: "/lander/items/frig.webp",
            name: "Dominus Frigidus"
        },
        group: 
        {
            image: "/lander/groups/merely-studios-group.webp",
            name: "Merely Studios",
            creator: "Merely"
        }
    }

    return (
        <div ref={sectionRef} className="relative mt-52 mb-32 flex items-center flex-col justify-center mx-auto max-w-[1200px]">
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={headingControls}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-2 flex flex-col items-center justify-center md:mt-6"
            >
                <h1 className="text-center text-4xl font-medium text-white md:text-6xl">
                    Intuitive features
                </h1>
                <h1 className="text-center text-4xl font-medium text-white/40 md:text-6xl">
                    Optimized for your needs
                </h1>
            </motion.div>
            <div className="mx-auto grid max-w-[1250px] gap-12 md:grid-cols-2 lg:grid-cols-3 mt-12">
                <motion.div
                    custom={0}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={cardControls}
                >
                    <div className="relative h-96 w-96 overflow-hidden rounded-2xl">
                        <div className="absolute left-0 top-0 h-96 w-96 rounded-2xl bg-[#2B2B2B]" />
                        <div className="absolute left-[34px] top-[34px] inline-flex w-[600px] flex-col items-start justify-start overflow-hidden rounded-xl bg-[#1A1A1A]">
                            <div className="bg-tokens-surface-secondary border-tokens-stroke-light/5 inline-flex h-12 items-center justify-center gap-3 self-stretch overflow-hidden border-b-[0.50px] px-4 py-3">
                                <div className="flex h-6 items-center justify-center overflow-hidden rounded bg-[#262626] pl-1 pr-1.5">
                                    <X className="relative h-3.5 w-3.5 overflow-hidden fill-[#767676]" />
                                    <div className="flex items-center justify-center gap-2.5 px-0.5 text-[#767676]">
                                        esc
                                    </div>
                                </div>
                                <div className="flex flex-1 items-center justify-start gap-1">
                                    <div className="relative w-px self-stretch rounded-full bg-[#767676]" />
                                    <div className="flex-1 justify-center text-sm font-normal leading-none text-[#767676]">
                                        Search by account, item, or game...
                                    </div>
                                </div>
                            </div>
                            <div className="bg-tokens-surface-secondary border-tokens-stroke-light/5 flex flex-col items-start justify-start self-stretch overflow-hidden border-b-[0.50px]">
                                <div className="inline-flex items-center justify-start gap-1.5 self-stretch px-5 pb-3 pt-5">
                                    <div className="flex-1 justify-start text-sm leading-none text-[#8C8C8C]">
                                        Recently interacted
                                    </div>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-2 self-stretch p-2">
                                        <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-lg p-3">
                                        <div className="relative h-10 w-10 bg-indigo-500/10 overflow-hidden flex items-center justify-center">
                                                <Image
                                                    src={smartSearch.item.image}
                                                    alt={smartSearch.item.name}
                                                    width={24}
                                                    height={24}
                                                className="w-full h-full object-cover"
                                                style={{ objectPosition: "center" }}
                                                />
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-center justify-center gap-2.5">
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                                            {smartSearch.item.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-2 self-stretch p-2">
                                        <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-lg p-3">
                                        <div className="relative h-10 w-10 bg-indigo-500/10 overflow-hidden flex items-center justify-center">
                                                <Image
                                                    src={smartSearch.game.image}
                                                    alt={smartSearch.game.name}
                                                    width={24}
                                                    height={24}
                                                className="w-full h-full object-cover"
                                                style={{ objectPosition: "center" }}
                                                />
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-center justify-center gap-2.5">
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                                            {smartSearch.game.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-2 self-stretch p-2">
                                        <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-lg p-3">
                                        <div className="relative h-10 w-10 bg-indigo-500/10 overflow-hidden flex items-center justify-center">
                                                <Image
                                                    src={smartSearch.group.image}
                                                    alt={smartSearch.group.name}
                                                    width={24}
                                                    height={24}
                                                className="w-full h-full object-cover"
                                                style={{ objectPosition: "center" }}
                                                />
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-center justify-center gap-2.5">
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                                            {smartSearch.group.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-2 self-stretch p-2">
                                        <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-lg p-3">
                                        <div className="relative h-10 w-10 bg-indigo-500/10 overflow-hidden flex items-center justify-center">
                                                <Image
                                                    src={smartSearch.user.image}
                                                    alt={smartSearch.user.name}
                                                    width={24}
                                                    height={24}
                                                className="w-full h-full object-cover"
                                                style={{ objectPosition: "center" }}
                                                />
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-center justify-center gap-2.5">
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                                            {smartSearch.user.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                            </div>
                            <div className="inline-flex items-center justify-between self-stretch overflow-hidden">
                                <div className="border-tokens-stroke-light/5 flex h-12 flex-1 items-center justify-center gap-2 border-r-[0.50px]">
                                    <div className="bg-tokens-button-surface/10 flex h-5 items-center justify-center overflow-hidden rounded px-1.5">
                                        <div className="bg-base-gray-500/50 h-2 w-3" />
                                    </div>
                                    <div className="text-base-gray-500/50 justify-start text-sm leading-none">
                                        Open
                                    </div>
                                </div>
                                <div className="border-tokens-stroke-light/5 flex h-12 flex-1 items-center justify-center gap-2 border-r-[0.50px]">
                                    <div className="bg-tokens-button-surface/10 flex h-5 items-center justify-center overflow-hidden rounded px-1">
                                        <div className="text-base-gray-500/50 justify-start text-center text-sm leading-none">
                                            ⌘R
                                        </div>
                                    </div>
                                    <div className="text-base-gray-500/50 justify-start text-sm leading-none">
                                        Reply
                                    </div>
                                </div>
                                <div className="border-tokens-stroke-light/5 flex h-12 flex-1 items-center justify-center gap-2 border-r-[0.50px]">
                                    <div className="bg-tokens-button-surface/10 flex h-5 items-center justify-center overflow-hidden rounded px-1">
                                        <div className="text-base-gray-500/50 justify-start text-center text-sm leading-none">
                                            ⌘E
                                        </div>
                                    </div>
                                    <div className="text-base-gray-500/50 justify-start text-sm leading-none">
                                        Archive
                                    </div>
                                </div>
                                <div className="border-tokens-stroke-light/5 flex h-12 flex-1 items-center justify-center gap-2 border-r-[0.50px]">
                                    <div className="bg-tokens-button-surface/10 flex h-5 items-center justify-center overflow-hidden rounded px-1">
                                        <div className="text-base-gray-500/50 justify-start text-center text-sm leading-none">
                                            ⌘M
                                        </div>
                                    </div>
                                    <div className="text-base-gray-500/50 justify-start text-sm leading-none">
                                        Mark read
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h1 className="mb-2 text-lg font-regular leading-loose text-white">Smart Search</h1>
                        <p className="max-w-sm text-sm font-regular text-[#979797]">
                            Your account, your rules. Search for <span className="text-white itallic">any content</span> on Roblox
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    custom={1}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={cardControls}
                    className="flex flex-col"
                >
                    <div className="relative h-96 w-96 overflow-hidden rounded-2xl">
                        <div className="absolute left-0 top-0 h-96 w-96 rounded-2xl bg-[#2B2B2B]" />
                        <h1 className="text-white text-7xl font-bold font-mono absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">?</h1>
                    </div>
                    <div className="mt-4 gap-4">
                        <h1 className="mb-2 text-xl font-medium leading-loose text-white">
                            Revealing soon...
                        </h1>
                        {/* <p className="max-w-sm text-sm font-light text-[#979797]">
                                Email at the speed of thought. Navigate your entire inbox using just your keyboard.
                                Process hundreds of emails in minutes.
                            </p> */}
                    </div>
                </motion.div>
                <motion.div
                    custom={2}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={cardControls}
                >
                    <div className="relative h-96 w-96 overflow-hidden rounded-2xl">
                        <div className="absolute left-0 top-0 h-96 w-96 rounded-2xl bg-[#2B2B2B]" />
                        <h1 className="text-white text-7xl font-bold font-mono absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">?</h1>
                    </div>
                    <div>
                        <h1 className="mb-2 mt-4 text-lg font-medium leading-loose text-white">
                            Revealing soon...
                        </h1>
                        {/* <p className="max-w-sm text-sm font-light text-[#979797]">
                            Your personal email copilot. Let our AI draft responses, summarize long threads, and
                            extract action items automatically.
                        </p> */}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
