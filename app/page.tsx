import React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { HeroSection } from "@/components/lander/hero-section"
import { CoolCards } from "@/components/lander/cool-cards"
import { Features } from "@/components/lander/features"
import { EarlyAccessProvider } from "@/components/early-access/early-access-provider"
import { DemoCards } from "@/components/lander/demo-card"
import { CoolBento } from "@/components/lander/cool-bento"
import { CoolList } from "@/components/lander/cool-list"
import TradeComposer from "@/components/lander/trade-composer"
import { Divider } from "@/components/ui/divider"
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0c0a09] text-white flex flex-col">
      <Navbar />
      <EarlyAccessProvider>
        <HeroSection />
      </EarlyAccessProvider>
      <Divider className="mt-24" />
      <TradeComposer />
      <CoolBento />
      {/* <CoolList />
      <DemoCards />
      <Features /> */}
      <Footer />
    </div>
  )
}