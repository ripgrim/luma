import React from "react"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import PricingCards from "../components/pricing-cards"
import { HeroSection } from "@/components/lander/hero-section"
import { CoolCards } from "@/components/lander/cool-cards"
import { Features } from "@/components/lander/features"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0c0a09] text-white flex flex-col">
      <Navbar />
      <HeroSection />
      <CoolCards />
      <Features />
      <Footer />
    </div>
  )
}