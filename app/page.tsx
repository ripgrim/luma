"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/lander.png" alt="Background" fill priority className="object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-purple-500 mr-2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Luma
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif italic tracking-tight text-white mb-6">
              Trading <span className="font-normal not-italic">Reimagined</span>
              <br />
              Through AI
            </h1>
            <p className="text-xl text-white mb-8">Trade, research and create in one AI-powered workspace.</p>
            <button 
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
                onClick={() => router.push("/auth/signIn")}
            >
              Start Trading
            </button>
            <p className="text-sm text-white/80 mt-3">Free to use, no credit card</p>
          </div>
        </main>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-6 flex justify-between items-center text-white/70 text-sm">
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
          <div>Created by Luma</div>
        </footer>
      </div>
    </div>
  )
}
