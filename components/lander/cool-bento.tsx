"use client"
import { motion } from "framer-motion";
import { Clock, Plus, Cube, ChevronDown, MediumStack, Search, Filter, PanelLeftOpen, Lightning, ExclamationTriangle, User, Bell, Tag, ChevronLeft, ChevronRight, Calendar, ImageFile, Figma, Docx, X, Check, GroupPeople } from "@/components/icons/icons";
import Image from "next/image";

export function CoolBento() {
    return (
        <div className="relative mt-52 flex items-center justify-center mx-auto max-w-[1200px]">
            <div className="mx-auto grid max-w-[1250px] gap-12 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col"
                >
                    <div className="relative h-96 w-full overflow-hidden rounded-2xl">
                        <div className="absolute left-0 top-0 h-96 w-96 rounded-2xl border border-[#252525] bg-neutral-800" />
                        <div className="outline-tokens-stroke-light/5 absolute left-[39px] top-[34px] inline-flex h-[771px] w-72 flex-col items-start justify-start overflow-hidden rounded-lg bg-[#1A1A1A]">
                            <div className="inline-flex h-10 items-center justify-start gap-3 self-stretch overflow-hidden border-b-[0.38px] border-[#252525] px-4 py-5">
                                <div className="flex flex-1 items-center justify-start gap-2">
                                    <div className="flex flex-1 items-center justify-start gap-1.5">
                                        <PanelLeftOpen className="h-3 w-3 fill-[#8C8C8C]" />
                                        <div className="ml-1 justify-start text-xs leading-3 text-white">Inbox</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start gap-1">
                                    <Check className="h-2.5 w-2.5 fill-[#8C8C8C]" />
                                    <div className="justify-start text-xs leading-3 text-[#8C8C8C]">Select</div>
                                </div>
                                <div className="relative h-2.5 w-[0.76px] rounded-full bg-[#252525]" />
                                <div className="flex items-center justify-start gap-2">
                                    <Filter className="relative h-3 w-3 fill-[#8C8C8C]" />
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-3 self-stretch p-4">
                                <div className="inline-flex h-7 items-center justify-start gap-1 self-stretch overflow-hidden rounded bg-[#141414] pl-1.5 pr-[3.04px]">
                                    <Search className="relative mr-1 h-3 w-3 overflow-hidden rounded-[1.14px] fill-[#8C8C8C]" />
                                    <div className="flex-1 justify-start text-xs leading-3 text-[#929292]">
                                        Search
                                    </div>
                                    <div className="flex h-5 items-center justify-center gap-2 rounded-sm bg-[#262626] px-1">
                                        <div className="justify-start text-xs leading-3 text-[#929292]">⌘K</div>
                                    </div>
                                </div>
                                <div className="inline-flex items-start justify-start gap-1.5 self-stretch">
                                    <div className="flex h-6 w-6 items-center justify-center gap-[3.04px] overflow-hidden rounded bg-[#313131]">
                                        <Lightning className="relative h-3 w-3 overflow-hidden fill-[#989898]" />
                                    </div>
                                    <div className="flex h-6 w-6 items-center justify-center gap-[3.04px] overflow-hidden rounded bg-[#313131]">
                                        <ExclamationTriangle className="relative h-3.5 w-3.5 overflow-hidden fill-[#989898]" />
                                    </div>
                                    <div className="flex h-6 flex-1 items-center justify-center gap-[3.04px] overflow-hidden rounded bg-[#39AE4A] px-2.5">
                                        <User className="relative h-3 w-3 overflow-hidden fill-white" />
                                        <div className="flex items-center justify-center gap-2 px-[1.52px]">
                                            <div className="justify-start text-xs leading-3 text-white">Personal</div>
                                        </div>
                                    </div>
                                    <div className="flex h-6 w-6 items-center justify-center gap-[3.04px] overflow-hidden rounded bg-[#313131]">
                                        <Bell className="relative h-3 w-3 overflow-hidden fill-[#989898]" />
                                    </div>
                                    <div className="flex h-6 w-6 items-center justify-center gap-[3.04px] overflow-hidden rounded bg-[#313131]">
                                        <Tag className="relative h-3 w-3 overflow-hidden fill-[#989898]" />
                                    </div>
                                </div>
                                <div className="relative flex flex-col items-start justify-center gap-2.5 self-stretch overflow-hidden rounded-md bg-[#12341D] px-2 py-2.5">
                                    <div className="justify-start self-stretch text-xs leading-3 text-[#A3E1B3]">
                                        Security, Deadlines, and Urgent Updates
                                    </div>
                                    <div className="justify-start self-stretch text-xs font-normal leading-none text-[#F4FBF6]">
                                        Time-sensitive notifications, security alerts, <br />
                                        and critical project updates.
                                    </div>
                                    <div className="absolute left-[239.80px] top-[6.07px] h-3 w-3 overflow-hidden opacity-50" />
                                </div>
                            </div>
                            <div className="inline-flex items-center justify-start gap-1 self-stretch px-4 pb-3 pt-5">
                                <div className="flex flex-1 items-center justify-start gap-1">
                                    <div className="justify-start text-xs leading-3 text-[#8C8C8C]">Pinned</div>
                                    <div className="justify-start text-xs leading-3 text-[#8C8C8C]">[3]</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-1.5 self-stretch px-1.5">
                                <div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-md p-2.5">
                                    <Image
                                        alt="Nizzy"
                                        height={250}
                                        width={250}
                                        objectFit="cover"
                                        className="h-6 w-6 rounded-full"
                                        src="https://0.email/_next/image?url=%2Fnizzy.jpg&w=32&q=75"
                                    />
                                    <div className="inline-flex h-7 flex-1 flex-col items-start justify-start gap-2">
                                        <div className="inline-flex items-start justify-start gap-2 self-stretch">
                                            <div className="flex flex-1 items-center justify-start gap-2.5">
                                                <div className="flex items-center justify-start gap-[3.04px]">
                                                    <div className="text-base-gray-950 justify-start text-xs leading-3">
                                                        Nizzy
                                                    </div>
                                                    <div className="justify-start text-center text-xs leading-3 text-[#8C8C8C]">
                                                        [9]
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-xs font-normal leading-3 text-[#8C8C8C]">Mar 29</div>
                                        </div>
                                        <div className="inline-flex items-center justify-start gap-2 self-stretch">
                                            <div className="text-xs font-normal leading-3 text-[#8C8C8C]">
                                                New design review
                                            </div>
                                            <div className="flex items-start justify-start gap-[3.04px]">
                                                <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="inline-flex items-center justify-start gap-2.5 self-stretch rounded-lg p-2.5">
                                    <div className="inline-flex h-6 w-6 flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-[#313131] px-1 py-2">
                                        <GroupPeople className="relative h-5 w-5 overflow-hidden fill-[#989898]" />
                                    </div>
                                    <div className="inline-flex flex-1 flex-col items-start justify-start gap-2">
                                        <div className="inline-flex items-start justify-start gap-2 self-stretch">
                                            <div className="flex flex-1 items-center justify-start gap-2.5">
                                                <div className="flex items-center justify-start gap-1">
                                                    <div className="text-base-gray-950 justify-start text-xs leading-3">
                                                        Alex, Ali, Sarah
                                                    </div>
                                                    <div className="justify-start text-center text-xs leading-3 text-[#8C8C8C]">
                                                        [6]
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-xs font-normal leading-3 text-[#8C8C8C]">Mar 28</div>
                                        </div>
                                        <div className="inline-flex items-center justify-start gap-2 self-stretch">
                                            <div className="text-xs font-normal leading-3 text-[#8C8C8C]">
                                                Re: Design review feedback
                                            </div>
                                            <div className="flex items-start justify-start gap-[3.04px]">
                                                <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                                <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 gap-4">
                        <h1 className="mb-2 text-xl font-medium leading-loose text-white">
                            Lightning-Fast Interface
                        </h1>
                        <p className="max-w-sm text-sm font-light text-[#979797]">
                            Email at the speed of thought. Navigate your entire inbox using just your keyboard.
                            Process hundreds of emails in minutes.
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative h-96 w-96 overflow-hidden rounded-2xl">
                        <div className="absolute left-0 top-0 h-96 w-96 rounded-2xl bg-[#2B2B2B]" />
                        <div className="absolute left-[44px] top-0 h-[720px] w-[610px]">
                            <div className="absolute left-[31px] top-[29px] inline-flex h-[720px] w-[547px] flex-col items-start justify-start overflow-hidden rounded-lg bg-[#202020] opacity-20">
                                <div className="border-tokens-stroke-light/5 inline-flex h-9 items-center justify-between self-stretch overflow-hidden border-b-[0.35px] py-3 pl-3.5 pr-2">
                                    <div className="flex items-center justify-start gap-3">
                                        <X className="relative h-3 w-3 overflow-hidden fill-[#8C8C8C]" />
                                        <div className="relative h-2 w-[0.71px] rounded-full bg-[#2B2B2B]" />
                                        <div className="flex items-center justify-start gap-2">
                                            <ChevronLeft className="relative h-3 w-3 overflow-hidden fill-[#8C8C8C]" />
                                            <ChevronRight className="relative h-3 w-3 overflow-hidden fill-[#8C8C8C]" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start gap-2">
                                        <div className="bg-tokens-button-surface/10 flex h-5 w-5 items-center justify-center gap-[2.83px] overflow-hidden rounded">
                                            <div className="relative h-4 w-4 overflow-hidden">
                                                <div className="bg-base-warning-500 absolute left-[5.37px] top-[3.90px] h-2.5 w-1.5" />
                                            </div>
                                        </div>
                                        <div className="bg-tokens-stroke-light/5 relative h-2 w-[0.71px] rounded-full" />
                                        <div className="bg-tokens-button-surface/10 flex h-5 items-center justify-center gap-[1.42px] overflow-hidden rounded px-1">
                                            <div className="relative h-3 w-3" />
                                            <div className="flex items-center justify-center gap-2 pl-[0.71px] pr-[1.42px]">
                                                <div className="text-base-gray-950 justify-start text-[9.92px] leading-[9.92px]">
                                                    Reply all
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-tokens-button-surface/10 flex h-5 w-5 items-center justify-center gap-[2.83px] overflow-hidden rounded">
                                            <div className="relative h-3 w-3 overflow-hidden" />
                                        </div>
                                        <div className="bg-tokens-button-surface/10 flex h-5 w-5 items-center justify-center gap-[2.83px] overflow-hidden rounded">
                                            <div className="relative h-3 w-3" />
                                        </div>
                                        <div className="bg-tokens-button-surface/10 flex h-5 w-5 items-center justify-center gap-[2.83px] overflow-hidden rounded">
                                            <div className="relative h-3 w-3 overflow-hidden" />
                                        </div>
                                        <div className="bg-base-danger-100 outline-base-danger-200 flex h-5 w-5 items-center justify-center gap-[2.83px] overflow-hidden rounded outline outline-[0.35px]">
                                            <div className="relative h-3 w-3 overflow-hidden" />
                                        </div>
                                    </div>
                                </div>
                                <div className="border-tokens-stroke-light/5 flex flex-col items-start justify-start gap-6 self-stretch overflow-hidden border-b-[0.35px] p-3.5">
                                    <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                                        <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
                                            <div className="inline-flex items-start justify-start gap-[2.83px] self-stretch">
                                                <div className="text-base-gray-950 justify-start text-xs leading-3">
                                                    Re: Design review feedback
                                                </div>
                                                <div className="text-base-gray-500/50 justify-start text-center text-xs leading-3">
                                                    [6]
                                                </div>
                                            </div>
                                            <div className="inline-flex items-start justify-start gap-1 self-stretch">
                                                <Calendar className="relative bottom-[1px] h-2.5 w-2.5 overflow-hidden fill-[#8C8C8C]" />
                                                <div className="text-base-gray-500/50 flex-1 justify-start text-[9.92px] font-normal leading-[9.92px]">
                                                    March 25 - March 29
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline-flex items-center justify-start gap-3">
                                            <div className="flex items-center justify-start gap-1 overflow-hidden shadow-[0px_0.7086613774299622px_1.4173227548599243px_0px_rgba(255,255,255,0.00)] shadow-[0px_0px_0px_0.3543306887149811px_rgba(255,255,255,0.00)]">
                                                <div className="flex items-center justify-start">
                                                    <div className="bg-base-success-500 outline-tokens-surface-secondary flex h-5 w-5 items-center justify-center gap-[2.83px] rounded px-2 outline outline-1">
                                                        <div className="relative h-3 w-3 overflow-hidden" />
                                                    </div>
                                                    <div className="bg-base-secondary-500 flex h-5 w-5 items-center justify-center gap-[2.83px] rounded px-2">
                                                        <div className="relative h-3 w-3 overflow-hidden" />
                                                    </div>
                                                </div>
                                                <div className="relative h-3 w-3 overflow-hidden" />
                                            </div>
                                            <div className="bg-tokens-stroke-light/5 relative h-2 w-[0.71px] rounded-full" />
                                            <div className="flex items-center justify-start gap-[2.83px]">
                                                <div className="outline-tokens-badge-default/10 flex items-center justify-start gap-1 overflow-hidden rounded-full py-[2.83px] pl-[2.83px] pr-2 outline outline-[0.35px] outline-offset-[-0.35px]">
                                                    <img
                                                        className="h-3.5 w-3.5 rounded-full px-[2.66px] py-1"
                                                        src="https://placehold.co/14x14"
                                                    />
                                                    <div className="text-base-gray-950 justify-start text-[9.92px] leading-[9.92px]">
                                                        Ali
                                                    </div>
                                                </div>
                                                <div className="outline-tokens-badge-default/10 flex items-center justify-start gap-1 overflow-hidden rounded-full py-[2.83px] pl-[2.83px] pr-2 outline outline-[0.35px] outline-offset-[-0.35px]">
                                                    <div className="inline-flex h-3.5 w-3.5 flex-col items-center justify-center gap-2 overflow-hidden rounded-full">
                                                        <img className="h-4 w-4" src="https://placehold.co/17x17" />
                                                    </div>
                                                    <div className="text-base-gray-950 justify-start text-[9.92px] leading-[9.92px]">
                                                        Nick
                                                    </div>
                                                </div>
                                                <div className="outline-tokens-badge-default/10 flex items-center justify-start gap-1 overflow-hidden rounded-full py-[2.83px] pl-[2.83px] pr-2 outline outline-[0.35px] outline-offset-[-0.35px]">
                                                    <img
                                                        className="h-3.5 w-3.5 rounded-full"
                                                        src="https://placehold.co/14x14"
                                                    />
                                                    <div className="text-base-gray-950 justify-start text-[9.92px] leading-[9.92px]">
                                                        Sarah
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-tokens-surface-on-secondary/5 outline-base-secondary-500 flex flex-col items-start justify-start gap-3.5 self-stretch rounded-lg p-3 outline outline-[0.35px] outline-offset-[-0.35px]">
                                        <div className="inline-flex items-center justify-start gap-1">
                                            <div className="justify-start text-[9.92px] leading-[9.92px] text-[#948CA4]">
                                                AI Summary
                                            </div>
                                        </div>
                                        <div className="text-base-gray-950 justify-start self-stretch text-[9.92px] font-normal leading-none">
                                            Design review of new email client features. Team discussed command center
                                            improvements and category system. General positive feedback, with
                                            suggestions for quick actions placement.
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
                                        <div className="inline-flex items-center justify-start gap-[2.83px]">
                                            <div className="text-base-gray-950 justify-start text-[9.92px] leading-[9.92px]">
                                                Attachments
                                            </div>
                                            <div className="text-base-gray-500/50 justify-start text-center text-[9.92px] leading-[9.92px]">
                                                [4]
                                            </div>
                                        </div>
                                        <div className="inline-flex flex-wrap content-start items-start justify-start gap-2 self-stretch">
                                            <div className="outline-tokens-stroke-element/0 flex h-5 items-center justify-start gap-1 overflow-hidden rounded bg-[#26232C] px-1.5 py-1 shadow">
                                                <div className="relative overflow-hidden">
                                                    <Figma className="relative h-2 w-2 overflow-hidden" />
                                                </div>
                                                <div className="flex items-center justify-start gap-[2.83px]">
                                                    <div className="text-base-gray-950 justify-start text-[9.92px] leading-[9.92px]">
                                                        cmd.center.fig
                                                    </div>
                                                    <div className="justify-start text-[9.92px] leading-[9.92px] opacity-50">
                                                        21 MB
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-start gap-1 overflow-hidden rounded bg-[#26232C] py-1 pl-1 pr-1.5 shadow">
                                                <Docx className="relative h-2 w-2 overflow-hidden fill-blue-500" />
                                                <div className="flex items-center justify-start gap-[2.83px]">
                                                    <div className="text-base-gray-950 justify-start text-[9.92px] leading-[9.92px]">
                                                        comments.docx
                                                    </div>
                                                    <div className="justify-start text-[9.92px] leading-[9.92px] opacity-50">
                                                        3.7 MB
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-start gap-1 overflow-hidden rounded bg-[#26232C] py-1 pl-1 pr-1.5 shadow">
                                                <ImageFile className="relative h-2 w-2 overflow-hidden fill-purple-500" />
                                                <div className="flex items-center justify-start gap-[2.83px]">
                                                    <div className="text-base-gray-950 justify-start text-[9.92px] leading-[9.92px]">
                                                        img.png
                                                    </div>
                                                    <div className="justify-start text-[9.92px] leading-[9.92px] opacity-50">
                                                        2.3 MB
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-tokens-stroke-light/5 flex-col items-start justify-start gap-6 self-stretch overflow-hidden border-b-[0.35px] p-3.5">
                                    <div className="inline-flex items-center justify-start gap-3 self-stretch">
                                        <Image
                                            alt="Ahmet"
                                            height={200}
                                            width={200}
                                            className="h-6 w-6 rounded-full"
                                            src="https://0.email/_next/image?url=%2Fahmet.jpg&w=32&q=75"
                                        />
                                        <div className="inline-flex flex-1 flex-col items-start justify-start gap-2">
                                            <div className="inline-flex items-start justify-start gap-2 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-2">
                                                    <div className="flex items-center justify-start gap-[2.83px]">
                                                        <div className="text-base-gray-950 justify-start text-[9.92px] leading-[9.92px]">
                                                            Ahmet
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center justify-start gap-[2.83px] self-stretch opacity-50">
                                                <div className="text-base-gray-500/50 justify-start text-[9.92px] font-normal leading-[9.92px]">
                                                    To:
                                                </div>
                                                <div className="text-base-gray-500/50 justify-start text-[9.92px] font-normal leading-[9.92px]">
                                                    Alex, Sarah
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="from-tokens-scroll-overlay-primary to-tokens-scroll-overlay-top/0 absolute left-0 top-[668.98px] h-12 w-[547.09px] bg-gradient-to-l" />
                                <div className="bg-tokens-agent-surface/10 border-tokens-agent-stroke absolute left-[498.90px] top-[674.65px] h-8 w-8 rounded-full border-2 px-1 shadow-[0px_8.503936767578125px_17.00787353515625px_0px_rgba(0,0,0,0.15)] backdrop-blur-lg" />
                            </div>
                            <div className="absolute left-0 top-[121px] inline-flex w-[650px] flex-col items-start justify-start gap-4 overflow-hidden rounded-3xl border border-[#8B5CF6] bg-[#2A1D48] p-6 outline outline-[#3F325F]">
                                <div className="inline-flex items-center justify-start gap-1.5">
                                    <div className="relative h-3.5 w-3.5">
                                        <Image src="https://0.email/star.svg" alt="AI Summary" width={16} height={16} className="" />
                                    </div>
                                    <div className="flex items-center justify-start gap-1 text-xs leading-3 text-[#948CA4]">
                                        AI Summary
                                        <ChevronDown className="relative h-2 w-2 overflow-hidden fill-[#8C8C8C]" />
                                    </div>
                                </div>
                                <div className="justify-start self-stretch text-base font-normal leading-snug text-white">
                                    Design review of new email client features. Team discussed command center
                                    improvements and{' '}
                                    <span className="text-[#D8C8FC]">
                                        category system. General positive feedback, with suggestions for quick actions
                                        placement.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="mb-2 mt-4 text-lg font-medium leading-loose text-white">
                            AI-Powered Summaries
                        </h1>
                        <p className="max-w-sm text-sm font-light text-[#979797]">
                            Your personal email copilot. Let our AI draft responses, summarize long threads, and
                            extract action items automatically.
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
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
                                        Search by sender, subject, or content...
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
                                        <div className="relative h-8 w-8 rounded-full bg-indigo-500/10">
                                            <div className="absolute left-[10.2px] top-[4px] h-7 w-3 overflow-hidden">
                                                <Image
                                                    src="https://0.email/stripe.svg"
                                                    alt="Stripe"
                                                    width={12}
                                                    height={24}
                                                    className="w-18 absolute h-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-start justify-start gap-2.5">
                                            <div className="inline-flex items-start justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                                            Stripe
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-base-gray-500/50 justify-start text-sm font-normal leading-none">
                                                    Mar 29
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex-1 justify-start text-sm font-normal leading-none text-[#8C8C8C]">
                                                    Payment confirmation #1234
                                                </div>
                                                <div className="flex items-start justify-start gap-1">
                                                    <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                                    <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-lg p-3">
                                        <div className="relative h-8 w-8 rounded-full bg-red-600/10">
                                            <div className="absolute left-0 top-0 h-8 w-8 rounded-full" />
                                            <div className="absolute left-[11px] top-[4px] h-7 w-2.5">
                                                <Image
                                                    src="https://0.email/netflix.svg"
                                                    alt="Stripe"
                                                    width={12}
                                                    height={24}
                                                    className="w-18 absolute h-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-start justify-start gap-2.5">
                                            <div className="inline-flex items-start justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                                            Netflix
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-base-gray-500/50 justify-start text-sm font-normal leading-none">
                                                    Mar 29
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex-1 justify-start text-sm font-normal leading-none text-[#8C8C8C]">
                                                    New shows added to your list
                                                </div>
                                                <div className="flex items-start justify-start gap-1">
                                                    <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                                    <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-[10px] bg-[#202020] p-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src="https://0.email/dudu.jpg"
                                            alt="Dudu"
                                            width={32}
                                            height={32}
                                        />
                                        <div className="inline-flex h-9 flex-1 flex-col items-start justify-start gap-2.5">
                                            <div className="inline-flex items-start justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                                            Dudu
                                                        </div>
                                                        <div className="justify-start text-center text-sm leading-none text-[#8C8C8C]">
                                                            [9]
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-base-gray-500/50 justify-start text-sm font-normal leading-none">
                                                    Mar 29
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="flex-1 justify-start text-sm font-normal leading-none text-[#8C8C8C]">
                                                    New design review
                                                </div>
                                                <div className="flex items-start justify-start gap-1">
                                                    <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-lg p-3">
                                        <div className="inline-flex h-8 w-8 flex-col items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#2B2B2B]">
                                            <div className="relative h-8 w-8 overflow-hidden">
                                                <div className="absolute left-[10.60px] top-[8px] h-4 w-2.5 overflow-hidden">
                                                    <Figma className="relative h-4 w-2.5 overflow-hidden" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-start justify-start gap-2.5">
                                            <div className="inline-flex items-start justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                                            Figma
                                                        </div>
                                                        <div className="justify-start text-center text-sm leading-none text-[#8C8C8C]">
                                                            [5]
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-base-gray-500/50 justify-start text-sm font-normal leading-none">
                                                    Mar 26
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="text-base-gray-500/50 flex-1 justify-start text-sm font-normal leading-none">
                                                    Comments on "Landing Page v2"
                                                </div>
                                                <div className="flex items-start justify-start gap-1">
                                                    <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                                    <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-lg p-3">
                                        <div className="inline-flex h-8 w-8 flex-col items-center justify-center gap-2.5 overflow-hidden rounded-full bg-red-500/10 px-1.5 py-2.5">
                                            <div className="relative h-8 w-8 overflow-hidden">
                                                <div className="absolute left-[7.30px] top-[7px] h-4 w-4 overflow-hidden">
                                                    <div className="absolute left-0 top-0 h-4 w-4 bg-red-500" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-start justify-start gap-2.5">
                                            <div className="inline-flex items-start justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                                            Asana
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-base-gray-500/50 justify-start text-sm font-normal leading-none">
                                                    Mar 25
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="text-base-gray-500/50 flex-1 justify-start text-sm font-normal leading-none">
                                                    Weekly task summary
                                                </div>
                                                <div className="flex items-start justify-start gap-1">
                                                    <div className="relative h-3.5 w-3.5 overflow-hidden" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center justify-start gap-3 self-stretch rounded-lg p-3">
                                        <div className="relative inline-flex h-8 w-8 flex-col items-center justify-center gap-2.5 rounded-full px-1.5 py-2.5">
                                            <div className="bg-base-primary-500 outline-tokens-surface-secondary absolute left-[24px] top-[24px] h-2 w-2 rounded-full outline outline-2" />
                                        </div>
                                        <div className="inline-flex flex-1 flex-col items-start justify-start gap-2.5">
                                            <div className="inline-flex items-start justify-start gap-2.5 self-stretch">
                                                <div className="flex flex-1 items-center justify-start gap-3">
                                                    <div className="flex items-center justify-start gap-1">
                                                        <div className="text-base-gray-950 justify-start text-sm leading-none">
                                                            Nick
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-base-gray-500/50 justify-start text-sm font-normal leading-none">
                                                    Mar 28
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                                                <div className="text-base-gray-500/50 flex-1 justify-start text-sm font-normal leading-none">
                                                    Coffee next week?
                                                </div>
                                                <div className="flex items-start justify-start gap-1">
                                                    <div className="relative h-3.5 w-3.5 overflow-hidden" />
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
                        <h1 className="mb-2 text-lg font-medium leading-loose text-white">Smart Search</h1>
                        <p className="max-w-sm text-sm font-light text-[#979797]">
                            Your inbox, your rules. Create personalized email processing flows that match
                            exactly how you organize,write, reply, and work.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
