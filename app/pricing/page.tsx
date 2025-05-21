import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PricingCards from "@/components/pricing-cards"

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#0c0a09] text-white">
            <Navbar />
            {/* Section Divider */}
            {/* PRICING SECTION (KEEPING YOURS) */}
            <div className="relative isolate overflow-hidden pt-40 pb-8 sm:pb-10">
                <div className="-z-10 pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c0a09]" />
                <section className="px-4 py-16" id="pricing">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 font-bold text-3xl md:text-4xl">
                                Simple, Transparent Pricing
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Choose the plan that's right for you
                            </p>
                        </div>
                        <PricingCards />
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}
