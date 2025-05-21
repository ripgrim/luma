"use client"

import NumberFlow from "@number-flow/react"
import { Check, Lock, Sparkles } from "lucide-react"
import { type ReactNode, useState } from "react"

// Define types for our plan data
type PlanFeature = {
    text: string
    subtext: string
}

type PlanPricing = {
    monthly: {
        amount: string
        detail: string
    }
    yearly: {
        amount: string
        detail: string
    }
}

type PlanData = {
    id: string
    title: string
    icon: ReactNode
    iconBgClass: string
    iconColorClass: string
    pricing: PlanPricing
    description: string
    features: PlanFeature[]
    buttonText: string
    buttonClass: string
    isPopular?: boolean
    hasTrial?: boolean
}

export default function PricingCards() {
    const [isAnnual, setIsAnnual] = useState(true)

    // Calculate savings percentage
    const monthlyCost = 25 * 12 // $300 per year
    const yearlyCost = 200 // $200 per year
    const savingsPercent = Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100)

    // Toggle billing period
    const toggleBilling = () => {
        setIsAnnual(!isAnnual)
    }

    // Plan data
    const freePlan: PlanData = {
        id: "free",
        title: "Free Plan",
        icon: <Lock className="h-4 w-4" />,
        iconBgClass: "bg-gray-800/80",
        iconColorClass: "text-gray-400",
        pricing: {
            monthly: {
                amount: "Free",
                detail: ""
            },
            yearly: {
                amount: "Free",
                detail: ""
            }
        },
        description: "Start with the essentials — ideal for personal use and light trading.",
        features: [
            {
                text: "Basic trading tools",
                subtext: "Access to core trading features and item management."
            },
            {
                text: "Standard analytics",
                subtext: "View recent trades, basic account & item stats."
            },
            {
                text: "Limited trade history",
                subtext: "Access your last 30 days of trades."
            },
            {
                text: "Basic notifications",
                subtext: "Get notified when you receive trades or account updates"
            }
        ],
        buttonText: "Current Plan",
        buttonClass: "bg-gray-800/80 text-gray-200"
    }

    const proPlan: PlanData = {
        id: "pro",
        title: "Luma Pro",
        icon: <Sparkles className="h-4 w-4" />,
        iconBgClass: "bg-purple-900/80",
        iconColorClass: "text-purple-300",
        pricing: {
            monthly: {
                amount: "$25",
                detail: "/month"
            },
            yearly: {
                amount: "$17",
                detail: "/month"
            }
        },
        description: "For professional traders and power users who want to grow the quickest.",
        features: [
            {
                text: "Advanced trading tools",
                subtext: "Unlock automation, bulk actions, and trade templates."
            },
            {
                text: "Full analytics suite",
                subtext: "Deep insights, price trends, and custom reports."
            },
            {
                text: "Unlimited trade history",
                subtext: "Access your complete trading record."
            },
            {
                text: "Advanced notifications",
                subtext: "Instant notifications for trades, price changes, and more."
            },
            {
                text: "AI-powered trade suggestions",
                subtext: "Receive feedback in incoming and outbound trades."
            },
            {
                text: "Priority customer support",
                subtext: "Get help within 24 hours from our dedicated team"
            },
            {
                text: "Access to private Discord community",
                subtext: "Join our exclusive community of power users"
            }
        ],
        buttonText: "Get Luma Pro",
        buttonClass: "bg-white text-black",
        isPopular: true,
        hasTrial: true
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Billing Toggle */}
            <div className="mb-6 flex items-center gap-2">
                <div
                    className="relative h-5 w-10 cursor-pointer rounded-full bg-gray-800"
                    onClick={toggleBilling}
                >
                    <div
                        className={`absolute top-0.5 h-4 w-4 rounded-full transition-all duration-300 ${
                            isAnnual ? "right-0.5 bg-gray-400" : "left-0.5 bg-gray-600"
                        }`}
                    />
                </div>
                <span className="text-gray-300 text-sm">Annual billing (save 30%)</span>
            </div>

            {/* Cards Container */}
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 md:flex-row">
                {/* Free Plan Card */}
                <PlanCard plan={freePlan} isAnnual={isAnnual} transparentBg />

                {/* Pro Plan Card */}
                <PlanCard plan={proPlan} isAnnual={isAnnual} />
            </div>
        </div>
    )
}

// Plan Card Component
function PlanCard({
    plan,
    isAnnual,
    transparentBg = false
}: { plan: PlanData; isAnnual: boolean; transparentBg?: boolean }) {
    const pricing = isAnnual ? plan.pricing.yearly : plan.pricing.monthly
    const priceValue =
        pricing.amount === "Free" ? 0 : Number.parseInt(pricing.amount.replace("$", ""))

    if (plan.isPopular) {
        return (
            <div className="relative flex-1 overflow-hidden rounded-xl p-[1px]">
                {/* Gradient border - now grey */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-700/60 via-gray-500/40 to-gray-700/60 opacity-80" />

                {/* Card content with improved contrast */}
                <div className="relative z-10 flex h-full flex-col rounded-xl bg-black/90 p-6 backdrop-blur-sm">
                    {/* Grey glow effects */}
                    <div className="-top-24 -left-20 absolute h-64 w-64 rounded-full bg-gray-500/20 blur-[80px]" />
                    <div className="-bottom-24 -right-20 absolute h-64 w-64 rounded-full bg-gray-500/20 blur-[80px]" />

                    <div className="relative z-10 mb-4 flex items-center gap-2">
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800/80`}
                        >
                            <span className="text-gray-300">{plan.icon}</span>
                        </div>
                        <span className="font-medium text-gray-200">{plan.title}</span>

                        {/* Most Popular Badge - now grey */}
                        <div className="ml-auto rounded-full border border-gray-500/30 bg-gray-700/30 px-2 py-0.5 text-gray-300 text-xs">
                            Popular
                        </div>
                    </div>

                    {/* Fixed height pricing section to prevent layout shift */}
                    <div className="relative z-10 h-24">
                        <h2 className="mb-0 flex items-baseline font-bold text-5xl text-white">
                            {pricing.amount === "Free" ? (
                                "Free"
                            ) : (
                                <>
                                    <NumberFlow
                                        value={priceValue}
                                        format={{
                                            style: "currency",
                                            currency: "USD",
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0
                                        }}
                                        transformTiming={{
                                            duration: 500,
                                            easing: "ease-out"
                                        }}
                                        willChange
                                        className="font-variant-numeric: tabular-nums"
                                    />
                                    <span className="ml-2 font-normal text-base text-gray-400">
                                        / per month
                                    </span>
                                </>
                            )}
                        </h2>
                    </div>

                    <p className="relative z-10 mb-8 text-gray-300 text-sm">{plan.description}</p>

                    <div className="relative z-10 mb-8 flex-1 space-y-5">
                        {plan.features.map((feature, index) => (
                            <div key={`${plan.id}-feature-${index}`} className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-800/90">
                                        <Check className="h-3 w-3 text-gray-300" />
                                    </div>
                                    <span className="font-medium text-gray-200 text-sm">
                                        {feature.text}
                                    </span>
                                </div>
                                <div className="pl-8">
                                    <span className="text-gray-400 text-xs">{feature.subtext}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className={`flex h-12 w-full items-center justify-center rounded-md ${plan.buttonClass} relative z-10 font-medium`}
                    >
                        {plan.buttonText}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div
            className={`flex-1 rounded-xl border border-gray-800/60 ${transparentBg ? "bg-transparent" : "bg-black/90 backdrop-blur-sm"} relative flex flex-col overflow-hidden p-6`}
        >
            <div className="mb-4 flex items-center gap-2">
                <div
                    className={`h-8 w-8 rounded-lg ${plan.iconBgClass} flex items-center justify-center`}
                >
                    <span className={plan.iconColorClass}>{plan.icon}</span>
                </div>
                <span className="font-medium text-gray-200">{plan.title}</span>
            </div>

            {/* Fixed height pricing section to prevent layout shift */}
            <div className="h-24">
                <h2 className="mb-0 flex items-baseline font-bold text-5xl text-white">
                    {pricing.amount === "Free" ? (
                        "Free"
                    ) : (
                        <>
                            <NumberFlow
                                value={priceValue}
                                format={{
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }}
                                transformTiming={{
                                    duration: 500,
                                    easing: "ease-out"
                                }}
                                willChange
                                className="font-variant-numeric: tabular-nums"
                            />
                            <span className="ml-2 font-normal text-base text-gray-400">
                                / per month
                            </span>
                        </>
                    )}
                </h2>
            </div>

            <p className="mb-8 text-gray-300 text-sm">{plan.description}</p>

            <div className="mb-8 flex-1 space-y-5">
                {plan.features.map((feature, index) => (
                    <div key={`${plan.id}-feature-${index}`} className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-800/90">
                                <Check className="h-3 w-3 text-gray-300" />
                            </div>
                            <span className="font-medium text-gray-200 text-sm">
                                {feature.text}
                            </span>
                        </div>
                        <div className="pl-8">
                            <span className="text-gray-400 text-xs">{feature.subtext}</span>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className={`flex h-12 w-full items-center justify-center rounded-md ${plan.buttonClass} font-medium`}
            >
                {plan.buttonText}
            </button>
        </div>
    )
}
