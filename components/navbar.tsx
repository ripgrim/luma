"use client"

import { Menu, X, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { GitHub, Discord } from "@/components/icons/icons"
import { trpc } from "@/utils/trpc"
import { SignedIn, SignedOut } from "@daveyplate/better-auth-ui"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { DISCORD_INVITE, GITHUB_REPO } from "@/lib/constants"
import { Drawer } from "vaul"
import Image from "next/image"
const headerLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
  { label: "Pricing", href: "/pricing" },
]
const footerLinks = [
  { label: "Sign In", href: "/login" },
  { label: "Discord", href: DISCORD_INVITE },
  { label: "Support", href: "/support" },
]

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 select-none">
      <span className="flex items-center justify-center">
        {/* Replace with your SVG or image if needed */}
        {/* <Image src="/logo.png" alt="Luma" width={206} height={68} /> */}
        <h1 className="text-white text-2xl font-bold">Luma</h1>
      </span>
    </a>
  )
}

function LogoMobile() {
  return (
    <h1 className="text-white text-2xl font-bold">Luma</h1>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const githubData = trpc.github.getGithubData.useQuery()
  const router = useRouter()

  // Function to render GitHub stars with proper loading state
  const renderGitHubStars = () => {
    if (githubData.isLoading) {
      return "Loading...";
    }
    
    if (githubData.isError) {
      return "Error";
    }
    
    return githubData.data?.stars === 0
      ? '0 stars :('
      : `${githubData.data?.stars} Stars`;
  };

  return (
    <div className="fixed top-0 z-50 w-full max-w-[1200px] md:left-1/2 md:top-4 md:-translate-x-1/2 md:px-8">
      <div className="relative before:pointer-events-none before:absolute before:inset-[-1px] before:z-20 before:hidden before:rounded-2xl before:border before:border-white/10 before:content-[''] md:before:block">
        <div className="absolute inset-0 -z-[1] hidden overflow-hidden rounded-2xl transition-all md:block backdrop-blur-lg"></div>
        <header className="bg-background/60 border-b-border sticky top-0 z-10 flex flex-col items-center border-b py-2 backdrop-blur md:static md:bg-transparent md:rounded-2xl md:max-w-[1200px] md:border-transparent md:backdrop-none [&>div:first-child]:px-3 md:backdrop-blur-none">
          <div className="w-full px-8 flex min-h-10 flex-col justify-center gap-4">
            <div className="flex w-full items-center gap-4">
              {/* Mobile menu button */}
              <Drawer.Root direction="left" open={isMenuOpen} onOpenChange={setIsMenuOpen} modal>
                <Drawer.Trigger asChild>
                  <button className="group inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 w-10 shrink-0 md:hidden text-foreground" type="button" aria-haspopup="dialog" aria-expanded={isMenuOpen} aria-controls="mobile-menu">
                    <Menu className="size-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </button>
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 z-50 bg-black/60" />
                  <Drawer.Content className="fixed left-0 top-0 bottom-0 z-50 w-[85vw] max-w-xs bg-[#131110] flex flex-col h-full px-5 pt-6 pb-8 shadow-2xl border-r border-[#282522] animate-in slide-in-from-left duration-200">
                    <div className="flex items-center justify-between mb-8">
                      <LogoMobile />
                      <button onClick={() => setIsMenuOpen(false)} className="rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500/10 w-8 h-8 flex items-center justify-center">
                        <X className="w-5 h-5" />
                        <span className="sr-only">Close menu</span>
                      </button>
                    </div>
                    <nav className="flex flex-col gap-2 flex-1">
                      {headerLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="text-white/80 hover:text-white text-lg py-2 px-1 rounded transition-colors font-medium"
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
                          className="text-white/60 hover:text-white text-base py-1 px-1 rounded transition-colors"
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
                <div className="ml-1 w-20 hidden md:flex items-center">
                  <Logo />
                </div>
                <div className="hidden md:flex">
                  <div className="flex items-center font-v2 subpixel-antialiased">
                    {headerLinks.map((link) => (
                      <div key={link.href} className="px-2.5 py-2 opacity-60 hover:opacity-100 transition-all duration-200"><a className="text-white" href={link.href}>{link.label}</a></div>
                    ))}
                  </div>
                </div>
              </nav>
              <div className="gap-6 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm">
                <div className="flex flex-row items-center">
                  <a className="p-2 mr-4 text-white/90 hover:text-white transition-colors" href={DISCORD_INVITE} title="Discord">
                    <Discord className="drop-shadow-md w-[15px] h-[15px] text-white fill-white" />
                  </a>
                  <a href={GITHUB_REPO} target="_blank" rel="noreferrer" className="gap-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-white/10 px-4 py-2 h-10 text-sm mr-2 hover:border-white/20 text-white/90 hover:text-white transition-colors">
                    <GitHub className="w-[15px] h-[15px] text-white fill-white" />
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
