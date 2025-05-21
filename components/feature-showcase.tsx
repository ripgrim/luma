import { ArrowRight, Bot, Zap } from "lucide-react"
import type React from "react"

export default function FeatureShowcase() {
    return (
        <section className="px-4 py-16">
            <div className="mx-auto max-w-6xl">
                {/* Trading Dashboard */}
                <div className="mb-24 grid items-center gap-12 md:grid-cols-2">
                    <div>
                        <h2 className="mb-6 font-bold text-3xl">Lightning Fast Interface</h2>
                        <p className="mb-6 text-gray-400 text-lg">
                            Process trades in seconds, not minutes. Our optimized interface puts
                            everything you need at your fingertips.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-900/30">
                                    <Check className="h-3 w-3 text-purple-400" />
                                </div>
                                <span className="text-gray-300">
                                    Real-time trade updates and notifications
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-900/30">
                                    <Check className="h-3 w-3 text-purple-400" />
                                </div>
                                <span className="text-gray-300">
                                    Customizable dashboard layouts
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-900/30">
                                    <Check className="h-3 w-3 text-purple-400" />
                                </div>
                                <span className="text-gray-300">
                                    Quick actions for common trading tasks
                                </span>
                            </li>
                        </ul>
                        <a href="#" className="group mt-6 inline-flex items-center text-purple-400">
                            Learn more{" "}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-500/10 to-amber-500/10" />
                        <img
                            src="/placeholder.svg?height=400&width=600"
                            alt="Luma Trading Dashboard"
                            className="relative z-10 rounded-xl border border-gray-800"
                        />
                    </div>
                </div>

                {/* AI Assistant */}
                <div className="mb-24 grid items-center gap-12 md:grid-cols-2">
                    <div className="relative order-2 md:order-1">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-purple-500/10 to-amber-500/10" />
                        <img
                            src="/placeholder.svg?height=400&width=600"
                            alt="AI Trade Assistant"
                            className="relative z-10 rounded-xl border border-gray-800"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="mb-4 flex items-center gap-2">
                            <Bot className="h-5 w-5 text-purple-400" />
                            <span className="font-medium text-purple-400">AI-Powered</span>
                        </div>
                        <h2 className="mb-6 font-bold text-3xl">AI Trade Assistant</h2>
                        <p className="mb-6 text-gray-400 text-lg">
                            Get intelligent trade suggestions and insights based on your inventory,
                            trading history, and market trends.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-900/30">
                                    <Check className="h-3 w-3 text-purple-400" />
                                </div>
                                <span className="text-gray-300">
                                    Personalized trade recommendations
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-900/30">
                                    <Check className="h-3 w-3 text-purple-400" />
                                </div>
                                <span className="text-gray-300">
                                    Automated value analysis on incoming trades
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-900/30">
                                    <Check className="h-3 w-3 text-purple-400" />
                                </div>
                                <span className="text-gray-300">
                                    Market trend insights and predictions
                                </span>
                            </li>
                        </ul>
                        <a href="#" className="group mt-6 inline-flex items-center text-purple-400">
                            Learn more{" "}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>

                {/* Automation */}
                <div className="grid items-center gap-12 md:grid-cols-2">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Zap className="h-5 w-5 text-amber-400" />
                            <span className="font-medium text-amber-400">Automation</span>
                        </div>
                        <h2 className="mb-6 font-bold text-3xl">Custom Workflows</h2>
                        <p className="mb-6 text-gray-400 text-lg">
                            Create custom rules and automations to handle repetitive trading tasks
                            and save hours of manual work.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-900/30">
                                    <Check className="h-3 w-3 text-amber-400" />
                                </div>
                                <span className="text-gray-300">
                                    Automated trade acceptance/rejection based on your rules
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-900/30">
                                    <Check className="h-3 w-3 text-amber-400" />
                                </div>
                                <span className="text-gray-300">
                                    Bulk actions for managing multiple trades at once
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-900/30">
                                    <Check className="h-3 w-3 text-amber-400" />
                                </div>
                                <span className="text-gray-300">
                                    Custom notification rules for important events
                                </span>
                            </li>
                        </ul>
                        <a href="#" className="group mt-6 inline-flex items-center text-amber-400">
                            Learn more{" "}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-amber-500/10 to-purple-500/10" />
                        <img
                            src="/placeholder.svg?height=400&width=600"
                            alt="Custom Workflows"
                            className="relative z-10 rounded-xl border border-gray-800"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
