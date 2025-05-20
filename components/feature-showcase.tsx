import type React from "react"
import { ArrowRight, Bot, Zap } from "lucide-react"

export default function FeatureShowcase() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Trading Dashboard */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-6">Lightning Fast Interface</h2>
            <p className="text-gray-400 text-lg mb-6">
              Process trades in seconds, not minutes. Our optimized interface puts everything you need at your
              fingertips.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-gray-300">Real-time trade updates and notifications</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-gray-300">Customizable dashboard layouts</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-gray-300">Quick actions for common trading tasks</span>
              </li>
            </ul>
            <a href="#" className="inline-flex items-center text-purple-400 mt-6 group">
              Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-amber-500/10 rounded-xl"></div>
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Luma Trading Dashboard"
              className="rounded-xl border border-gray-800 relative z-10"
            />
          </div>
        </div>

        {/* AI Assistant */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 md:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-amber-500/10 rounded-xl"></div>
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="AI Trade Assistant"
              className="rounded-xl border border-gray-800 relative z-10"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">AI-Powered</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">AI Trade Assistant</h2>
            <p className="text-gray-400 text-lg mb-6">
              Get intelligent trade suggestions and insights based on your inventory, trading history, and market
              trends.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-gray-300">Personalized trade recommendations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-gray-300">Automated value analysis on incoming trades</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-purple-400" />
                </div>
                <span className="text-gray-300">Market trend insights and predictions</span>
              </li>
            </ul>
            <a href="#" className="inline-flex items-center text-purple-400 mt-6 group">
              Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Automation */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium">Automation</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">Custom Workflows</h2>
            <p className="text-gray-400 text-lg mb-6">
              Create custom rules and automations to handle repetitive trading tasks and save hours of manual work.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-900/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span className="text-gray-300">Automated trade acceptance/rejection based on your rules</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-900/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span className="text-gray-300">Bulk actions for managing multiple trades at once</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-900/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-amber-400" />
                </div>
                <span className="text-gray-300">Custom notification rules for important events</span>
              </li>
            </ul>
            <a href="#" className="inline-flex items-center text-amber-400 mt-6 group">
              Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-purple-500/10 rounded-xl"></div>
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Custom Workflows"
              className="rounded-xl border border-gray-800 relative z-10"
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
