import { EarlyAccessProvider } from "@/components/early-access/early-access-provider"
import Footer from "@/components/footer"
import { CoolBento } from "@/components/lander/cool-bento"
import { HeroSection } from "@/components/lander/hero-section"
import TradeComposer from "@/components/lander/trade-composer"
import Navbar from "@/components/navbar"
import { Divider } from "@/components/ui/divider"
export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#0c0a09] text-white">
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
