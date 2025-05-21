"use client"

import { trpc } from "@/utils/trpc"
import { SignedIn, SignedOut } from "@daveyplate/better-auth-ui"
import { CheckCircle2 } from "lucide-react"
import { Instrument_Serif } from "next/font/google"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { Roblox } from "../logos/logos"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const instrumentSerif = Instrument_Serif({
    variable: "--font-instrument-serif",
    subsets: ["latin"],
    weight: "400"
})

// Validation schemas
const emailSchema = z.string().email("Please enter a valid email address")
const codeSchema = z.string().length(6, "Verification code must be 6 digits")

// Memoized components
const MemoizedRoblox = memo(Roblox)

// Memoized Input components
const EmailInput = memo(
    ({
        value,
        onChange
    }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <Input
            type="email"
            placeholder="Enter your email"
            value={value}
            onChange={onChange}
            className="border-white/20 bg-white/10 text-white placeholder-white/40 focus:border-white/30"
        />
    )
)
EmailInput.displayName = "EmailInput"

const CodeInput = memo(
    ({
        value,
        onChange
    }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <Input
            type="text"
            placeholder="Enter 6-digit code"
            value={value}
            onChange={onChange}
            maxLength={6}
            className="border-white/20 bg-white/10 text-center text-white placeholder-white/40 focus:border-white/30"
        />
    )
)
CodeInput.displayName = "CodeInput"

// Countdown Timer Component
const CountdownButton = memo(
    ({
        initialTime = 15,
        onResend,
        disabled = false
    }: {
        initialTime?: number
        onResend: () => void
        disabled?: boolean
    }) => {
        const [countdown, setCountdown] = useState(0)
        const timerRef = useRef<NodeJS.Timeout | null>(null)

        const startCountdown = useCallback(() => {
            setCountdown(initialTime)

            if (timerRef.current) {
                clearInterval(timerRef.current)
            }

            timerRef.current = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        if (timerRef.current) {
                            clearInterval(timerRef.current)
                            timerRef.current = null
                        }
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }, [initialTime])

        const handleClick = useCallback(() => {
            if (countdown > 0) return
            startCountdown()
            onResend()
        }, [countdown, onResend, startCountdown])

        // Clear interval on unmount
        useEffect(() => {
            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current)
                }
            }
        }, [])

        return (
            <Button
                type="button"
                variant="ghost"
                onClick={handleClick}
                disabled={countdown > 0 || disabled}
                className="whitespace-nowrap text-xs"
            >
                {countdown > 0 ? `Resend (${countdown})` : "Resend"}
            </Button>
        )
    }
)
CountdownButton.displayName = "CountdownButton"

// Memoized form components
const VerificationForm = memo(
    ({
        code,
        onCodeChange,
        onSubmit,
        isSubmitting,
        onResendCode
    }: {
        code: string
        onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        onSubmit: (e: React.FormEvent) => void
        isSubmitting: boolean
        onResendCode: () => void
    }) => (
        <form onSubmit={onSubmit} className="flex w-full max-w-sm items-center space-x-2">
            <CodeInput value={code} onChange={onCodeChange} />
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Verify"}
            </Button>
            <CountdownButton onResend={onResendCode} disabled={isSubmitting} />
        </form>
    )
)
VerificationForm.displayName = "VerificationForm"

const EarlyAccessForm = memo(
    ({
        email,
        onEmailChange,
        onSubmit,
        isSubmitting
    }: {
        email: string
        onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        onSubmit: (e: React.FormEvent) => void
        isSubmitting: boolean
    }) => (
        <form onSubmit={onSubmit} className="flex w-full max-w-sm items-center space-x-2">
            <EmailInput value={email} onChange={onEmailChange} />
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Get Early Access"}
            </Button>
        </form>
    )
)
EarlyAccessForm.displayName = "EarlyAccessForm"

const VerificationSuccess = memo(({ userExists }: { userExists?: boolean }) => (
    <div className="flex items-center gap-2 text-green-500">
        <CheckCircle2 className="h-5 w-5" />
        <span>
            {userExists
                ? "Email verified! You're on the early access list."
                : "Thank you for joining our early access list!"}
        </span>
    </div>
))
VerificationSuccess.displayName = "VerificationSuccess"

export function HeroSection() {
    const router = useRouter()

    // Form states
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [emailError, setEmailError] = useState("")
    const [codeError, setCodeError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [userExists, setUserExists] = useState(false)

    // Memoized input handlers
    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }, [])

    const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }, [])

    // tRPC mutations
    const registerMutation = trpc.earlyAccess.register.useMutation()
    const verifyEmailMutation = trpc.earlyAccess.verifyEmail.useMutation()
    const resendCodeMutation = trpc.earlyAccess.resendCode.useMutation()

    // Handle early access form submission
    const handleEarlyAccess = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            setEmailError("")

            // Validate email
            try {
                emailSchema.parse(email)
            } catch (error) {
                if (error instanceof z.ZodError) {
                    setEmailError(error.errors[0]?.message || "Invalid email")
                    toast.error(error.errors[0]?.message || "Please enter a valid email address")
                }
                return
            }

            try {
                setIsSubmitting(true)

                const result = await registerMutation.mutateAsync({
                    email
                })

                if (result.success) {
                    if (result.userExists) {
                        toast.info("Email already registered. Please verify your email.")
                        setUserExists(true)
                    } else {
                        toast.success("Check your email for verification code")
                    }
                    setIsRegistered(true)
                } else {
                    toast.error("Failed to register for early access")
                }
            } catch (error: any) {
                toast.error(error.message || "An error occurred")
            } finally {
                setIsSubmitting(false)
            }
        },
        [email, registerMutation]
    )

    // Handle verification code submission
    const handleVerification = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            setCodeError("")

            // Validate code
            try {
                codeSchema.parse(code)
            } catch (error) {
                if (error instanceof z.ZodError) {
                    setCodeError(error.errors[0]?.message || "Invalid code")
                    toast.error(error.errors[0]?.message || "Please enter a valid 6-digit code")
                }
                return
            }

            try {
                setIsSubmitting(true)

                const result = await verifyEmailMutation.mutateAsync({
                    email,
                    code
                })

                if (result.success) {
                    toast.success("Email verified successfully!")
                    setIsVerified(true)
                } else {
                    toast.error("Failed to verify code")
                }
            } catch (error: any) {
                toast.error(error.message || "Invalid verification code")
            } finally {
                setIsSubmitting(false)
            }
        },
        [code, email, verifyEmailMutation]
    )

    // Handle resend code
    const handleResendCode = useCallback(async () => {
        try {
            const result = await resendCodeMutation.mutateAsync({
                email
            })

            if (result.success) {
                toast.success("New verification code sent")
            } else {
                toast.error("Failed to send verification code")
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to resend code")
        }
    }, [email, resendCodeMutation])

    // Memoize header content to prevent re-renders
    const headerContent = useMemo(
        () => (
            <>
                <h1 className="font-700 text-5xl text-white leading-[1.3] tracking-normal sm:text-5xl sm:leading-[1.1] md:text-6xl">
                    The <span className="text-white/90 italic">only</span>{" "}
                    <MemoizedRoblox className="inline-block h-12" /> trading platform you&apos;ll
                    ever need
                </h1>
                <p className="mx-auto max-w-lg font-500 text-lg text-white/40 leading-[1.2] tracking-tight sm:mx-0 sm:text-lg md:text-xl">
                    Easily trade, <span className="text-white/90">scale account value</span>, and{" "}
                    <span className="text-white/90">maximize</span> your income
                </p>
            </>
        ),
        []
    )

    return (
        <div className="relative isolate mt-32 mb-auto overflow-hidden pt-0 pb-8 sm:pb-10 lg:pt-64">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-16">
                <div className="mx-auto mb-6 flex w-fit items-center justify-center gap-4 rounded-full border border-[#2A2A2A] border-input/50 bg-[#1E1E1E] px-4 py-1 md:mx-0 md:justify-start">
                    <span className="flex items-center gap-2 text-sm">
                        <Image
                            src="/gc-small.svg"
                            alt="Y Combinator"
                            className="rounded-[2px]"
                            width={18}
                            height={18}
                        />{" "}
                        Backed by G Combinator
                    </span>
                </div>
                <div className="mx-auto max-w-2xl sm:mx-0">
                    <div className="space-y-6 text-center sm:text-left">{headerContent}</div>
                    <div className="h-10" />
                    <div className="flex justify-center sm:justify-start">
                        <SignedIn>
                            <Button onClick={() => router.push("/dashboard")}>Start Trading</Button>
                        </SignedIn>
                        <SignedOut>
                            {isVerified ? (
                                <VerificationSuccess userExists={userExists} />
                            ) : isRegistered ? (
                                <VerificationForm
                                    code={code}
                                    onCodeChange={handleCodeChange}
                                    onSubmit={handleVerification}
                                    isSubmitting={isSubmitting}
                                    onResendCode={handleResendCode}
                                />
                            ) : (
                                <EarlyAccessForm
                                    email={email}
                                    onEmailChange={handleEmailChange}
                                    onSubmit={handleEarlyAccess}
                                    isSubmitting={isSubmitting}
                                />
                            )}
                        </SignedOut>
                    </div>
                </div>
            </div>
        </div>
    )
}
