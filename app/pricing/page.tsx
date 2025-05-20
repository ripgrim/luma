import React from "react"
import PricingCards from "@/components/pricing-cards"
import { HeroSection } from "@/components/lander/hero-section"
import { CoolCards } from "@/components/lander/cool-cards"
import { Features } from "@/components/lander/features"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0c0a09] text-white flex flex-col">
      <Navbar />
      {/* Section Divider */}
      {/* PRICING SECTION (KEEPING YOURS) */}
      <div className="relative isolate overflow-hidden pb-8 sm:pb-10 pt-40">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#0c0a09] pointer-events-none" />
        <section className="py-16 px-4" id="pricing">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 text-lg">Choose the plan that's right for you</p>
          </div>
          <PricingCards />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}