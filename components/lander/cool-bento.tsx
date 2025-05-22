"use client"
import { X } from "@/components/icons/icons"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

export function CoolBento() {
    // Create refs for the sections
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    // Only start animations when section is in view
    const headingControls = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    const cardControls = {
        hidden: { opacity: 0, y: -20 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.3 + custom * 0.2 }
        })
    }

    const smartSearch = {
        user: {
            image: "/lander/users/pokemon1075.webp",
            name: "Pokemon1075"
        },
        game: {
            image: "/lander/games/trade-hangout.webp",
            name: "Trade Hangout",
            creator: "Merely"
        },
        item: {
            image: "/lander/items/frig.webp",
            name: "Dominus Frigidus"
        },
        group: {
            image: "/lander/groups/merely-studios-group.webp",
            name: "Merely Studios",
            creator: "Merely"
        }
    }

    return (
        <div
            ref={sectionRef}
            className="relative px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-18 max-w-7xl mx-auto"
        >
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={headingControls}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-2 flex flex-col items-center justify-center md:mt-6"
            >
                <h1 className="text-center font-medium text-4xl text-white md:text-6xl">
                    Intuitive features
                </h1>
                <h1 className="text-center font-medium text-4xl text-white/40 md:text-6xl">
                    Optimized for your needs
                </h1>
            </motion.div>
            <div className="mx-auto mt-12 grid max-w-[1250px] gap-12 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                    custom={0}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={cardControls}
                >
                    <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl">
                        <div className="absolute top-0 left-0 h-full w-full rounded-2xl bg-[#2B2B2B]" />
                        <div className="absolute top-[34px] left-[34px] inline-flex w-[600px] flex-col items-start justify-start overflow-hidden rounded-xl bg-[#1A1A1A]">
                            <div className="inline-flex h-12 items-center justify-center gap-3 self-stretch overflow-hidden border-tokens-stroke-light/5 border-b-[0.50px] bg-tokens-surface-secondary px-4 py-3">
                                <div className="flex h-6 items-center justify-center overflow-hidden rounded bg-[#262626] pr-1.5 pl-1">
                                    <X className="relative h-3.5 w-3.5 overflow-hidden fill-[#767676]" />
                                    <div className="flex items-center justify-center gap-2.5 px-0.5 text-[#767676]">
                                        esc
                                    </div>
                                </div>
                                <div className="flex flex-1 items-center justify-start gap-1">
                                    <div className="relative w-px self-stretch rounded-full bg-[#767676]" />
                                    <div className="flex-1 justify-center font-normal text-[#767676] text-sm leading-none">
                                        Search by account, item, or game...
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start self-stretch overflow-hidden border-tokens-stroke-light/5 border-b-[0.50px] bg-tokens-surface-secondary">
                                <div className="inline-flex items-center justify-start gap-1.5 self-stretch px-5 pt-5 pb-3">
                                    <div className="flex-1 justify-start text-[#8C8C8C] text-sm leading-none">
                                        Recently interacted
                                    </div>
                                </div>
                                <div className="flex flex-col items-start justify-start gap-2 self-stretch p-2">
                                    <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-lg p-3">
                                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden bg-indigo-500/10">
                                            <Image
                                                src={smartSearch.item.image}
                                                alt={smartSearch.item.name}
                                                width={24}
                                                height={24}
                                                className="h-full w-full object-cover"
                                                style={{ objectPosition: "center" }}
                                            />
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-center justify-center gap-2.5">
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="justify-start text-base-gray-950 text-sm leading-none">
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
                                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden bg-indigo-500/10">
                                            <Image
                                                src={smartSearch.game.image}
                                                alt={smartSearch.game.name}
                                                width={24}
                                                height={24}
                                                className="h-full w-full object-cover"
                                                style={{ objectPosition: "center" }}
                                            />
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-center justify-center gap-2.5">
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="justify-start text-base-gray-950 text-sm leading-none">
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
                                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden bg-indigo-500/10">
                                            <Image
                                                src={smartSearch.group.image}
                                                alt={smartSearch.group.name}
                                                width={24}
                                                height={24}
                                                className="h-full w-full object-cover"
                                                style={{ objectPosition: "center" }}
                                            />
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-center justify-center gap-2.5">
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="justify-start text-base-gray-950 text-sm leading-none">
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
                                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden bg-indigo-500/10">
                                            <Image
                                                src={smartSearch.user.image}
                                                alt={smartSearch.user.name}
                                                width={24}
                                                height={24}
                                                className="h-full w-full object-cover"
                                                style={{ objectPosition: "center" }}
                                            />
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-center justify-center gap-2.5">
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="justify-start text-base-gray-950 text-sm leading-none">
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
                                <div className="flex h-12 flex-1 items-center justify-center gap-2 border-tokens-stroke-light/5 border-r-[0.50px]">
                                    <div className="flex h-5 items-center justify-center overflow-hidden rounded bg-tokens-button-surface/10 px-1.5">
                                        <div className="h-2 w-3 bg-base-gray-500/50" />
                                    </div>
                                    <div className="justify-start text-base-gray-500/50 text-sm leading-none">
                                        Open
                                    </div>
                                </div>
                                <div className="flex h-12 flex-1 items-center justify-center gap-2 border-tokens-stroke-light/5 border-r-[0.50px]">
                                    <div className="flex h-5 items-center justify-center overflow-hidden rounded bg-tokens-button-surface/10 px-1">
                                        <div className="justify-start text-center text-base-gray-500/50 text-sm leading-none">
                                            ⌘R
                                        </div>
                                    </div>
                                    <div className="justify-start text-base-gray-500/50 text-sm leading-none">
                                        Reply
                                    </div>
                                </div>
                                <div className="flex h-12 flex-1 items-center justify-center gap-2 border-tokens-stroke-light/5 border-r-[0.50px]">
                                    <div className="flex h-5 items-center justify-center overflow-hidden rounded bg-tokens-button-surface/10 px-1">
                                        <div className="justify-start text-center text-base-gray-500/50 text-sm leading-none">
                                            ⌘E
                                        </div>
                                    </div>
                                    <div className="justify-start text-base-gray-500/50 text-sm leading-none">
                                        Archive
                                    </div>
                                </div>
                                <div className="flex h-12 flex-1 items-center justify-center gap-2 border-tokens-stroke-light/5 border-r-[0.50px]">
                                    <div className="flex h-5 items-center justify-center overflow-hidden rounded bg-tokens-button-surface/10 px-1">
                                        <div className="justify-start text-center text-base-gray-500/50 text-sm leading-none">
                                            ⌘M
                                        </div>
                                    </div>
                                    <div className="justify-start text-base-gray-500/50 text-sm leading-none">
                                        Mark read
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h1 className="mb-2 font-regular text-lg text-white leading-loose">
                            Smart Search
                        </h1>
                        <p className="max-w-sm font-regular text-[#979797] text-sm">
                            Your account, your rules. Search for{" "}
                            <span className="itallic text-white">any content</span> on Roblox
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
                    <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl">
                        <div className="absolute top-0 left-0 h-full w-full rounded-2xl" />
                        <Image
                            src="/composer.jpg"
                            alt="Trade Composer"
                            width={1000}
                            height={1000}
                            className="w-full h-full object-cover blur-[30px]"
                        />
                        <h1 className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 font-bold font-mono text-7xl text-white">
                            ?
                        </h1>
                    </div>
                    <div className="mt-4 gap-4">
                        <h1 className="mb-2 font-medium text-white text-xl leading-loose">
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
                    <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl">
                        <div className="absolute top-0 left-0 h-full w-full rounded-2xl" />
                        <Image
                            src="/composer.jpg"
                            alt="Trade Composer"
                            width={1000}
                            height={1000}
                            className="w-full h-full object-cover blur-[30px] scale-x-[-1]"
                        />
                        <h1 className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 font-bold font-mono text-7xl text-white">
                            ?
                        </h1>
                    </div>
                    <div>
                        <h1 className="mt-4 mb-2 font-medium text-lg text-white leading-loose">
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
