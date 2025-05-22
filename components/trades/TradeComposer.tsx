"use client"

// Removed unused: import { Cube, MediumStack } from "@/components/icons/icons"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { RobuxIcon2 } from "@/components/icons/robux-icon" // Path needs to be adjusted if TradeComposer moves
import { ChevronDown, Plus, TrendingUp, Scale, X as LucideX } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { AITextSequence } from "../ui/ai-text-sequence"
import { StarSummarizeButton } from "../ui/star-summarize-button"

interface ItemData {
    name: string;
    image: string;
    price: number;
    quantity: number;
    total: number;
}

interface SideData {
    items: ItemData[];
    total: number;
    user?: { // Optional user receiving the items
        name: string;
        avatarInitial: string;
        avatarColorClass: string;
    };
}

interface Recipient {
    name: string;
    image: string; // We'll keep this for now, but prioritize initials for display
    // Add other relevant fields if necessary
}

// Helper to get a color class for avatar based on username
const FAKE_AVATAR_COLORS = [
    'bg-emerald-600',
    'bg-blue-600',
    'bg-indigo-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-red-600',
    'bg-orange-600',
    'bg-yellow-500',
];
const getAvatarColorClass = (name: string) => {
    // Simple hash to get a somewhat consistent color
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % FAKE_AVATAR_COLORS.length);
    return FAKE_AVATAR_COLORS[index];
};

// Sample recipients data (replace with your actual data source)
const allRecipientsData: Recipient[] = [
    { name: "7sw7", image: "/lander/items/7sw7.png" },
    { name: "jonnyblox", image: "/lander/items/jonnyblox.png" },
    { name: "user3", image: "/lander/items/user3.png" }, // Example
    { name: "anotheruser", image: "/lander/items/another.png" }, // Example
    { name: "testuser", image: "/lander/items/test.png" }, // Example
];

// Define your known contacts here
const knownContactsData: Recipient[] = [
    { name: "7sw7", image: "/lander/items/7sw7.png" },
    { name: "jonnyblox", image: "/lander/items/jonnyblox.png" },
    // Add up to 3 known contacts
];

function ItemSlot({ item }: { item: ItemData }) {
    return (
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-zinc-800">
            <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="h-full w-full object-cover p-1" // Reduced padding slightly
                style={{ objectPosition: "center" }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1.5 py-0.5">
                <p className="truncate text-center text-[10px] font-medium text-white">
                    {item.name}
                </p>
            </div>
        </div>
    )
}

// Main Trade Composer Component
export default function TradeComposer({ className }: { className?: string }) {
    const [showSummary, setShowSummary] = useState(false)
    const [showSendOptionsDropdown, setShowSendOptionsDropdown] = useState(false)
    const sendOptionsDropdownRef = useRef<HTMLDivElement>(null)

    const [recipientSearch, setRecipientSearch] = useState("");
    const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
    const [showRecipientDropdown, setShowRecipientDropdown] = useState(false);
    const recipientInputRef = useRef<HTMLInputElement>(null);
    const recipientDropdownRef = useRef<HTMLDivElement>(null);

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

    // Handle click outside to close send options dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sendOptionsDropdownRef.current && !sendOptionsDropdownRef.current.contains(event.target as Node)) {
                setShowSendOptionsDropdown(false)
            }
            if (recipientDropdownRef.current && !recipientDropdownRef.current.contains(event.target as Node) && recipientInputRef.current && !recipientInputRef.current.contains(event.target as Node)) {
                setShowRecipientDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const filteredRecipients = recipientSearch
        ? allRecipientsData.filter(
            (r) =>
                r.name.toLowerCase().includes(recipientSearch.toLowerCase()) &&
                !selectedRecipients.find((sr) => sr.name === r.name) &&
                !knownContactsData.find(kc => kc.name === r.name) // Exclude known contacts from general results if they are already listed
        )
        : [];

    const displayedKnownContacts = knownContactsData.filter(kc => !selectedRecipients.find(sr => sr.name === kc.name));

    const handleSelectRecipient = (recipient: Recipient) => {
        if (!selectedRecipients.find(r => r.name === recipient.name)) {
            setSelectedRecipients([...selectedRecipients, recipient]);
        }
        setRecipientSearch("");
        setShowRecipientDropdown(false);
        recipientInputRef.current?.focus();
    };

    const handleRemoveRecipient = (recipientName: string) => {
        setSelectedRecipients(selectedRecipients.filter(r => r.name !== recipientName));
    };

    return (
        <div
            className={cn(
                'no-scrollbar max-h-[700px] w-full max-w-[750px] overflow-hidden',
                className,
            )}
        >
            <div
                className="relative flex items-center justify-center"
            >
                {showSummary && (
                    <div

                        className="absolute top-[160px] left-0 z-20 flex-col items-start justify-start gap-3 overflow-hidden rounded-xl border border-[#8B5CF6] bg-[#2A1D48] p-4 shadow-lg"
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
                    </div>
                )}

                <div
                    className="relative z-10 mx-auto w-full flex-col overflow-hidden rounded-xl bg-[#1A1A1A] shadow-lg"
                >
                    <div className="flex h-auto min-h-[40px] items-center gap-2 border-zinc-800/50 border-b px-4 py-1.5 flex-wrap">
                        <div className="text-sm text-zinc-500 shrink-0">Send trade to:</div>
                        <div className="flex flex-1 items-center gap-2 flex-wrap min-w-[200px]">
                            {selectedRecipients.map(recipient => (
                                <div key={recipient.name} className="flex items-center gap-1.5 rounded-full border border-zinc-700 py-0.5 pr-1.5 pl-1 bg-zinc-800">
                                    {/* {recipient.image && <Image src={recipient.image} alt={recipient.name} width={20} height={20} className="rounded-full" />} */}
                                    <div className={cn("flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium text-white", getAvatarColorClass(recipient.name))}>
                                        {recipient.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-sm text-white">{recipient.name}</div>
                                    <button onClick={() => handleRemoveRecipient(recipient.name)} className="text-zinc-400 hover:text-white">
                                        <LucideX size={14} />
                                    </button>
                                </div>
                            ))}
                            <div className="relative flex-grow">
                                <input
                                    ref={recipientInputRef}
                                    type="text"
                                    value={recipientSearch}
                                    onChange={(e) => {
                                        setRecipientSearch(e.target.value);
                                        setShowRecipientDropdown(true);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && recipientSearch === '' && selectedRecipients.length > 0) {
                                            setSelectedRecipients(selectedRecipients.slice(0, -1));
                                            // Optionally, keep dropdown open or closed based on preference
                                            // setShowRecipientDropdown(true); 
                                        }
                                    }}
                                    onFocus={() => setShowRecipientDropdown(true)}
                                    placeholder="Enter username"
                                    className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none py-1"
                                />
                                {showRecipientDropdown && (displayedKnownContacts.length > 0 || filteredRecipients.length > 0) && (
                                    <div ref={recipientDropdownRef} className="absolute top-full left-0 mt-1 w-full max-h-60 overflow-y-auto rounded-md bg-zinc-800 shadow-lg z-20 border border-zinc-700">
                                        {displayedKnownContacts.length > 0 && (
                                            <div>
                                                <div className="px-3 py-2 text-xs text-zinc-400 font-semibold">Known Contacts</div>
                                                {displayedKnownContacts.map(recipient => (
                                                    <div
                                                        key={recipient.name}
                                                        onClick={() => handleSelectRecipient(recipient)}
                                                        className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-700 cursor-pointer"
                                                    >
                                                        {/* {recipient.image && <Image src={recipient.image} alt={recipient.name} width={24} height={24} className="rounded-full" />} */}
                                                        <div className={cn("flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white", getAvatarColorClass(recipient.name))}>
                                                            {recipient.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-sm text-white">{recipient.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {filteredRecipients.length > 0 && (
                                             <div>
                                                {displayedKnownContacts.length > 0 && <div className="h-px bg-zinc-700 mx-3 my-1"></div>}
                                                <div className="px-3 py-2 text-xs text-zinc-400 font-semibold">Results</div>
                                                {filteredRecipients.map(recipient => (
                                                    <div
                                                        key={recipient.name}
                                                        onClick={() => handleSelectRecipient(recipient)}
                                                        className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-700 cursor-pointer"
                                                    >
                                                        {/* {recipient.image && <Image src={recipient.image} alt={recipient.name} width={24} height={24} className="rounded-full" />} */}
                                                        <div className={cn("flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white", getAvatarColorClass(recipient.name))}>
                                                            {recipient.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-sm text-white">{recipient.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-900 p-4">
                        <div className="space-y-4">
                            <div>
                                <div className="mb-2 font-medium text-sm text-zinc-300">
                                    Items you would give:
                                </div>
                                <div className="grid grid-cols-4 gap-3">
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
                                <div className="grid grid-cols-4 gap-3">
                                    <ItemSlot item={side2.item1} />
                                </div>
                                <div className="mt-3 text-right font-semibold text-lg text-white">
                                    <RobuxIcon2 className="inline-block h-4 w-4 fill-white" />{" "}
                                    {side2.total.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 border-zinc-800/50 border-t p-3">
                        <div className="flex items-center gap-2">
                            <div className="relative" ref={sendOptionsDropdownRef}>
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
                                        onClick={() => setShowSendOptionsDropdown(!showSendOptionsDropdown)}
                                        className="flex h-7 items-center justify-center gap-1.5 overflow-hidden rounded-tr-md rounded-br-md bg-base-gray-950 pr-2 transition-colors duration-150 hover:bg-[#E5E5E5]"
                                    >
                                        <motion.div
                                            animate={{ rotate: showSendOptionsDropdown ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown className="h-2 w-2 fill-black" />
                                        </motion.div>
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {showSendOptionsDropdown && (
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
                            <button className="flex h-7 items-center gap-1.5 rounded-md bg-red-800/30 px-2 text-sm text-zinc-300">
                                <Scale className="h-3 w-3 fill-white" />
                                Unfair trade
                            </button>
                            <button className="flex h-7 items-center gap-1.5 rounded-md bg-zinc-800 px-2 text-sm text-zinc-300">
                                <TrendingUp className="h-3 w-3 fill-white" />
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
                </div>
            </div>
        </div>
    )
}

