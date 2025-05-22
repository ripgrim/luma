"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { trpc } from "@/utils/trpc"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { type FormEvent, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

// Form validation schema
const emailSchema = z.string().email("Please enter a valid email address")
const codeSchema = z.string().length(6, "Verification code must be 6 digits")

export function EarlyAccessForm() {
    // Form states
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [emailError, setEmailError] = useState("")
    const [codeError, setCodeError] = useState("")

    // UI states
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showVerification, setShowVerification] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    // tRPC mutations
    const registerMutation = trpc.earlyAccess.register.useMutation()
    const verifyEmailMutation = trpc.earlyAccess.verifyEmail.useMutation()
    const resendCodeMutation = trpc.earlyAccess.resendCode.useMutation()

    // Submit email for early access
    async function handleEmailSubmit(e: FormEvent) {
        e.preventDefault()
        setEmailError("")

        // Validate email
        try {
            emailSchema.parse(email)
        } catch (error) {
            if (error instanceof z.ZodError) {
                setEmailError(error.errors[0]?.message || "Invalid email")
            }
            return
        }

        try {
            setIsSubmitting(true)

            const result = await registerMutation.mutateAsync({
                email
            })

            if (result.success) {
                toast.success(result.message)
                setShowVerification(true)

                if (!result.emailSent) {
                    toast.error("Failed to send verification email. Please try resending the code.")
                }
            } else {
                toast.error("Failed to register for early access")
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Submit verification code
    async function handleCodeSubmit(e: FormEvent) {
        e.preventDefault()
        setCodeError("")

        // Validate code
        try {
            codeSchema.parse(code)
        } catch (error) {
            if (error instanceof z.ZodError) {
                setCodeError(error.errors[0]?.message || "Invalid code")
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
                toast.success(result.message)
                setIsVerified(true)
            } else {
                toast.error("Failed to verify email")
            }
        } catch (error: any) {
            toast.error(error.message || "Invalid verification code")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Resend verification code
    async function handleResendCode() {
        try {
            const result = await resendCodeMutation.mutateAsync({
                email
            })

            if (result.success) {
                toast.success("Verification code sent")
            } else {
                toast.error("Failed to send verification code")
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to resend code")
        }
    }

    // Show success state after verification
    if (isVerified) {
        return (
            <Card className="mx-auto w-full max-w-md border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Early Access Confirmed!</CardTitle>
                    <CardDescription className="text-center">
                        Thank you for joining our early access program.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="mb-4 rounded-full bg-green-500/20 p-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-10 w-10 text-green-500"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <p className="mb-4 text-center text-gray-400">
                            We'll notify you when you've been granted access. Keep an eye on your
                            email!
                        </p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    // Show verification form after email submission
    if (showVerification) {
        return (
            <Card className="mx-auto w-full max-w-md border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Verify Your Email</CardTitle>
                    <CardDescription className="text-center">
                        We've sent a 6-digit code to {email}. Enter it below to verify your email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCodeSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="code" className="font-medium text-sm leading-none">
                                Verification Code
                            </label>
                            <InputOTP
                                maxLength={6}
                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                value={code}
                                onChange={(e) => setCode(e)}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            {codeError && (
                                <p className="font-medium text-red-500 text-sm">{codeError}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Verifying..." : "Verify Email"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-gray-800 border-t pt-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResendCode}
                        disabled={!!resendCodeMutation.isPending}
                    >
                        {resendCodeMutation.isPending ? "Sending..." : "Resend Code"}
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    // Initial email submission form
    return (
        <Card className="mx-auto w-full max-w-md border-border bg-card">
            <CardHeader>
                <CardTitle className="text-center text-2xl">Sign Up for Early Access</CardTitle>
                <CardDescription className="text-center">
                    Enter your email to join our early access program and be the first to try our
                    platform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="font-medium text-sm leading-none">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                        {emailError && (
                            <p className="font-medium text-red-500 text-sm">{emailError}</p>
                        )}
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Get Early Access"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
