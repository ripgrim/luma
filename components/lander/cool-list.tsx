"use client"
import { motion } from "framer-motion";
import { Clock, Plus, Cube, ChevronDown, MediumStack, Search, Filter, PanelLeftOpen, Lightning, ExclamationTriangle, User, Bell, Tag, ChevronLeft, ChevronRight, Calendar, ImageFile, Figma, Docx, X, Check, GroupPeople } from "@/components/icons/icons";
import Image from "next/image";

export function CoolList() {
    return (
        <div className="relative mt-52">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative hidden lg:block"
            >
                <div className="mx-auto max-w-[920px] text-center text-4xl font-normal leading-[48px] text-white">
                    <span className="text-[#B7B7B7]">Work smarter, not harder.</span>{' '}
                    <span className="pr-8 text-white">Automate repetitive</span>{' '}
                    <span className="text-[#B7B7B7]">email</span>
                    <span className="text-[#B7B7B7]"> tasks with</span>{' '}
                    <span className="pr-8 text-white">smart templates, </span>{' '}
                    <span className="text-white">scheduled sends</span>
                    <span className="text-[#B7B7B7]">
                        , follow-up reminders, and batch processing capabilities that
                    </span>{' '}
                    <br />
                    <span className="text-white underline">save hours every week.</span>
                </div>
                <div className="flex items-center justify-center">
                    <Image
                        className="relative bottom-12 right-[162px]"
                        src="https://0.email/verified-home.png"
                        alt="tasks"
                        width={50}
                        height={50}
                    />
                    <Image
                        className="relative bottom-[150px] right-[-25px]"
                        src="https://0.email/snooze-home.png"
                        alt="tasks"
                        width={50}
                        height={50}
                    />
                    <Image
                        className="relative bottom-[195px] left-[278px]"
                        src="https://0.email/star-home.png"
                        alt="tasks"
                        width={50}
                        height={50}
                    />
                </div>
            </motion.div>
        </div>
    )
}
