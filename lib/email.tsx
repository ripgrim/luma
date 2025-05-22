import VerificationCodeEmail from "@/components/early-access/email"
import { Resend } from "resend"

// Initialize Resend with API key (with error handling)
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

// Generate a random 6-digit code
export function generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

// Send verification email
export async function sendVerificationEmail(email: string, code: string): Promise<boolean> {
    try {
        if (!resend) {
            console.error("Resend API key is missing")
            return false
        }

        const { data, error } = await resend.emails.send({
            from: "Luma <noreply@ripgrim.com>",
            to: email,
            subject: "Verify your email address",
            react: <VerificationCodeEmail verificationCode={code} />
        })

        if (error) {
            console.error("Error sending verification email:", error)
            return false
        }

        console.log("Verification email sent:", data)
        return true
    } catch (error) {
        console.error("Failed to send verification email:", error)
        return false
    }
}

// Testing utility function - use this for development
export async function sendTestEmail(toEmail: string): Promise<boolean> {
    const testCode = generateVerificationCode()
    console.log(`Sending test email with code: ${testCode} to ${toEmail}`)
    return sendVerificationEmail(toEmail, testCode)
}
