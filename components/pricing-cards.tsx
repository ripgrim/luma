"use client"

import { Check, Lock, Sparkles } from "lucide-react"
import { type ReactNode, useState } from "react"
import NumberFlow from "@number-flow/react"

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
    icon: <Lock className="w-4 h-4" />,
    iconBgClass: "bg-gray-800/80",
    iconColorClass: "text-gray-400",
    pricing: {
      monthly: {
        amount: "Free",
        detail: "",
      },
      yearly: {
        amount: "Free",
        detail: "",
      },
    },
    description: "Start with the essentials — ideal for personal use and light trading.",
    features: [
      {
        text: "Basic trading tools",
        subtext: "Access to core trading features and item management.",
      },
      {
        text: "Standard analytics",
        subtext: "View recent trades, basic account & item stats.",
      },
      {
        text: "Limited trade history",
        subtext: "Access your last 30 days of trades.",
      },
      {
        text: "Basic notifications",
        subtext: "Get notified when you receive trades or account updates",
      },
    ],
    buttonText: "Current Plan",
    buttonClass: "bg-gray-800/80 text-gray-200",
  }

  const proPlan: PlanData = {
    id: "pro",
    title: "Luma Pro",
    icon: <Sparkles className="w-4 h-4" />,
    iconBgClass: "bg-purple-900/80",
    iconColorClass: "text-purple-300",
    pricing: {
      monthly: {
        amount: "$25",
        detail: "/month",
      },
      yearly: {
        amount: "$17",
        detail: "/month",
      },
    },
    description: "For professional traders and power users who want to grow the quickest.",
    features: [
      {
        text: "Advanced trading tools",
        subtext: "Unlock automation, bulk actions, and trade templates.",
      },
      {
        text: "Full analytics suite",
        subtext: "Deep insights, price trends, and custom reports.",
      },
      {
        text: "Unlimited trade history",
        subtext: "Access your complete trading record.",
      },
      {
        text: "Advanced notifications",
        subtext: "Instant notifications for trades, price changes, and more.",
      },
      {
        text: "AI-powered trade suggestions",
        subtext: "Receive feedback in incoming and outbound trades.",
      },
      {
        text: "Priority customer support",
        subtext: "Get help within 24 hours from our dedicated team",
      },
      {
        text: "Access to private Discord community",
        subtext: "Join our exclusive community of power users",
      },
    ],
    buttonText: "Get Luma Pro",
    buttonClass: "bg-white text-black",
    isPopular: true,
    hasTrial: true,
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Billing Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-5 bg-gray-800 rounded-full relative cursor-pointer" onClick={toggleBilling}>
          <div
            className={`absolute w-4 h-4 rounded-full top-0.5 transition-all duration-300 ${
              isAnnual ? "right-0.5 bg-gray-400" : "left-0.5 bg-gray-600"
            }`}
          ></div>
        </div>
        <span className="text-gray-300 text-sm">Annual billing (save 30%)</span>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto">
        {/* Free Plan Card */}
        <PlanCard plan={freePlan} isAnnual={isAnnual} transparentBg />

        {/* Pro Plan Card */}
        <PlanCard plan={proPlan} isAnnual={isAnnual} />
      </div>
    </div>
  )
}

// Plan Card Component
function PlanCard({ plan, isAnnual, transparentBg = false }: { plan: PlanData; isAnnual: boolean; transparentBg?: boolean }) {
  const pricing = isAnnual ? plan.pricing.yearly : plan.pricing.monthly
  const priceValue = pricing.amount === "Free" ? 0 : parseInt(pricing.amount.replace("$", ""))

  if (plan.isPopular) {
    return (
      <div className="flex-1 rounded-xl p-[1px] relative overflow-hidden">
        {/* Gradient border - now grey */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-700/60 via-gray-500/40 to-gray-700/60 opacity-80"></div>

        {/* Card content with improved contrast */}
        <div className="relative h-full rounded-xl bg-black/90 backdrop-blur-sm p-6 flex flex-col z-10">
          {/* Grey glow effects */}
          <div className="absolute -top-24 -left-20 w-64 h-64 bg-gray-500/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -right-20 w-64 h-64 bg-gray-500/20 rounded-full blur-[80px]"></div>

          <div className="flex items-center gap-2 mb-4 relative z-10">
            <div className={`w-8 h-8 rounded-lg bg-gray-800/80 flex items-center justify-center`}>
              <span className="text-gray-300">{plan.icon}</span>
            </div>
            <span className="text-gray-200 font-medium">{plan.title}</span>

            {/* Most Popular Badge - now grey */}
            <div className="bg-gray-700/30 border border-gray-500/30 text-gray-300 text-xs px-2 py-0.5 rounded-full ml-auto">
              Popular
            </div>
          </div>

          {/* Fixed height pricing section to prevent layout shift */}
          <div className="h-24 relative z-10">
            <h2 className="text-5xl font-bold text-white mb-0 flex items-baseline">
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
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                  <span className="ml-2 text-gray-400 text-base font-normal">/ per month</span>
                </>
              )}
            </h2>
          </div>

          <p className="text-gray-300 text-sm mb-8 relative z-10">{plan.description}</p>

          <div className="flex-1 space-y-5 mb-8 relative z-10">
            {plan.features.map((feature, index) => (
              <div key={`${plan.id}-feature-${index}`} className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-800/90 flex items-center justify-center">
                    <Check className="w-3 h-3 text-gray-300" />
                  </div>
                  <span className="text-gray-200 text-sm font-medium">{feature.text}</span>
                </div>
                <div className="pl-8">
                  <span className="text-gray-400 text-xs">{feature.subtext}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className={`h-12 w-full flex items-center justify-center rounded-md ${plan.buttonClass} font-medium relative z-10`}
          >
            {plan.buttonText}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex-1 rounded-xl border border-gray-800/60 ${transparentBg ? "bg-transparent" : "bg-black/90 backdrop-blur-sm"} p-6 flex flex-col relative overflow-hidden`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-8 h-8 rounded-lg ${plan.iconBgClass} flex items-center justify-center`}>
          <span className={plan.iconColorClass}>{plan.icon}</span>
        </div>
        <span className="text-gray-200 font-medium">{plan.title}</span>
      </div>

      {/* Fixed height pricing section to prevent layout shift */}
      <div className="h-24">
        <h2 className="text-5xl font-bold text-white mb-0 flex items-baseline">
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
                  maximumFractionDigits: 0,
                }}
                transformTiming={{
                  duration: 500,
                  easing: "ease-out",
                }}
                willChange
                className="font-variant-numeric: tabular-nums"
              />
              <span className="ml-2 text-gray-400 text-base font-normal">/ per month</span>
            </>
          )}
        </h2>
      </div>

      <p className="text-gray-300 text-sm mb-8">{plan.description}</p>

      <div className="flex-1 space-y-5 mb-8">
        {plan.features.map((feature, index) => (
          <div key={`${plan.id}-feature-${index}`} className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-gray-800/90 flex items-center justify-center">
                <Check className="w-3 h-3 text-gray-300" />
              </div>
              <span className="text-gray-200 text-sm font-medium">{feature.text}</span>
            </div>
            <div className="pl-8">
              <span className="text-gray-400 text-xs">{feature.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      <button className={`h-12 w-full flex items-center justify-center rounded-md ${plan.buttonClass} font-medium`}>
        {plan.buttonText}
      </button>
    </div>
  )
}
