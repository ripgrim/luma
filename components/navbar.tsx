"use client"

import { Discord, GitHub } from "@/components/icons/icons"
import { DISCORD_INVITE, GITHUB_REPO } from "@/lib/constants"
import { trpc } from "@/utils/trpc"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Drawer } from "vaul"
const headerLinks = [
    { label: "Docs", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
    { label: "Pricing", href: "/pricing" }
]
const footerLinks = [
    { label: "Sign In", href: "/login" },
    { label: "Discord", href: DISCORD_INVITE },
    { label: "Support", href: "/support" }
]

function Logo() {
    return (
        <a href="/" className="flex select-none items-center gap-2">
            <span className="flex items-center justify-center">
                {/* Replace with your SVG or image if needed */}
                {/* <Image src="/logo.png" alt="Luma" width={206} height={68} /> */}
                <h1 className="font-bold text-2xl text-white">Luma</h1>
            </span>
        </a>
    )
}

function LogoMobile() {
    return <h1 className="font-bold text-2xl text-white">Luma</h1>
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const githubData = trpc.github.getGithubData.useQuery()
    const router = useRouter()

    // Function to render GitHub stars with proper loading state
    const renderGitHubStars = () => {
        if (githubData.isLoading) {
            return "Loading..."
        }

        if (githubData.isError) {
            return "Error"
        }

        return githubData.data?.stars === 0 ? "0 stars :(" : `${githubData.data?.stars} Stars`
    }

    return (
        <div className="md:-translate-x-1/2 fixed top-0 z-50 w-full max-w-[1200px] md:top-4 md:left-1/2 md:px-8">
            <div className="relative before:pointer-events-none before:absolute before:inset-[-1px] before:z-20 before:hidden before:rounded-2xl before:border before:border-white/10 before:content-[''] md:before:block">
                <div className="-z-[1] absolute inset-0 hidden overflow-hidden rounded-2xl backdrop-blur-lg transition-all md:block" />
                <header className="md:backdrop-none sticky top-0 z-10 flex flex-col items-center py-2 backdrop-blur md:static md:max-w-[1200px] md:rounded-2xl md:border-transparent md:bg-transparent md:backdrop-blur-none [&>div:first-child]:px-3">
                    <div className="flex min-h-10 w-full flex-col justify-center gap-4 px-8">
                        <div className="flex w-full items-center gap-4">
                            {/* Mobile menu button */}
                            <Drawer.Root
                                direction="left"
                                open={isMenuOpen}
                                onOpenChange={setIsMenuOpen}
                                modal
                            >
                                <Drawer.Trigger asChild>
                                    <button
                                        className="group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-transparent font-medium text-foreground text-sm hover:bg-accent hover:text-accent-foreground md:hidden"
                                        type="button"
                                        aria-haspopup="dialog"
                                        aria-expanded={isMenuOpen}
                                        aria-controls="mobile-menu"
                                    >
                                        <Menu className="size-5" />
                                        <span className="sr-only">Toggle navigation menu</span>
                                    </button>
                                </Drawer.Trigger>
                                <Drawer.Portal>
                                    <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
                                    <Drawer.Content className="slide-in-from-left fixed top-0 bottom-0 left-0 z-50 flex h-full w-[85vw] max-w-xs animate-in flex-col border-[#282522] border-r bg-[#131110] px-5 pt-6 pb-8 shadow-2xl duration-200">
                                        <div className="mb-8 flex items-center justify-between">
                                            <LogoMobile />
                                            <button
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
                                            >
                                                <X className="h-5 w-5" />
                                                <span className="sr-only">Close menu</span>
                                            </button>
                                        </div>
                                        <nav className="flex flex-1 flex-col gap-2">
                                            {headerLinks.map((link) => (
                                                <a
                                                    key={link.href}
                                                    href={link.href}
                                                    className="rounded px-1 py-2 font-medium text-lg text-white/80 transition-colors hover:text-white"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </nav>
                                        <div className="mt-auto flex flex-col gap-2 pb-2">
                                            {footerLinks.map((link) => (
                                                <a
                                                    key={link.href}
                                                    href={link.href}
                                                    className="rounded px-1 py-1 text-base text-white/60 transition-colors hover:text-white"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    </Drawer.Content>
                                </Drawer.Portal>
                            </Drawer.Root>
                            {/* Desktop nav */}
                            <nav className="flex-1 font-medium md:flex md:flex-row md:items-center md:gap-3 md:text-sm lg:gap-4">
                                <div className="ml-1 hidden w-20 items-center md:flex">
                                    <Logo />
                                </div>
                                <div className="hidden md:flex">
                                    <div className="flex items-center font-v2 subpixel-antialiased">
                                        {headerLinks.map((link) => (
                                            <div
                                                key={link.href}
                                                className="px-2.5 py-2 opacity-60 transition-all duration-200 hover:opacity-100"
                                            >
                                                <a className="text-white" href={link.href}>
                                                    {link.label}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </nav>
                            <div className="gap-6 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm">
                                <div className="flex flex-row items-center">
                                    <a
                                        className="mr-4 p-2 text-white/90 transition-colors hover:text-white"
                                        href={DISCORD_INVITE}
                                        title="Discord"
                                    >
                                        <Discord className="h-[15px] w-[15px] fill-white text-white drop-shadow-md" />
                                    </a>
                                    <a
                                        href={GITHUB_REPO}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mr-2 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm text-white/90 transition-colors hover:border-white/20 hover:text-white"
                                    >
                                        <GitHub className="h-[15px] w-[15px] fill-white text-white" />
                                        <span className="hidden md:inline">
                                            {renderGitHubStars()}
                                        </span>
                                    </a>
                                    {/* <SignedIn>
                    <Button className="font-v2 subpixel-antialiased inline-flex items-center justify-center whitespace-nowrap rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white shadow-sm hover:border-white/20 transition-colors hover:text-black" onClick={() => router.push("/dashboard")}>Start Trading</Button>
                  </SignedIn>
                  <SignedOut>
                    <Button className="font-v2 subpixel-antialiased inline-flex items-center justify-center whitespace-nowrap rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm text-white shadow-sm hover:border-white/20 transition-colors" onClick={() => router.push("/login")}>Sign In</Button>
                  </SignedOut> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}
