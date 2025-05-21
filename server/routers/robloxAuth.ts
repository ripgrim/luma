import { users } from "@/auth-schema"
import { db } from "@/database/db"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { publicProcedure, router } from "../trpc"

// Define the structure for an active session
interface ActiveQuickLoginSession {
    code: string
    privateKey: string
    status: string // e.g., Pending, Validated, Cancelled, Expired
    expirationTime: string // ISO string
    lastChecked: Date
    userId?: string // To associate with a user if they are logged in when creating the session
    accountName?: string
    roblosecurityCookie?: string
}

// In-memory store for active quick login sessions
const activeSessions: Record<string, ActiveQuickLoginSession> = {}

// Utility function to get CSRF token from Roblox
async function getCsrfToken(): Promise<string> {
    try {
        // Make a request that will fail but return a CSRF token
        const response = await fetch("https://auth.roblox.com/v2/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const csrfToken = response.headers.get("x-csrf-token")
        if (csrfToken) return csrfToken

        // Try logout endpoint as a fallback for CSRF
        const logoutResponse = await fetch("https://auth.roblox.com/v2/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const logoutCsrfToken = logoutResponse.headers.get("x-csrf-token")
        if (logoutCsrfToken) return logoutCsrfToken

        throw new Error("Failed to get CSRF token from both login and logout attempts")
    } catch (error: any) {
        console.error("Failed to obtain CSRF token from Roblox:", error)
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to obtain CSRF token from Roblox."
        })
    }
}

export const robloxAuthRouter = router({
    createQuickLoginSession: publicProcedure
        .input(z.object({ userId: z.string().optional() }))
        .output(
            z.object({
                success: z.boolean(),
                sessionId: z.string(),
                code: z.string(),
                expirationTime: z.string(),
                directQrUrl: z.string(),
                message: z.string().optional()
            })
        )
        .mutation(async ({ input }) => {
            try {
                const csrfToken = await getCsrfToken()

                const response = await fetch(
                    "https://apis.roblox.com/auth-token-service/v1/login/create",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-csrf-token": csrfToken
                        },
                        body: JSON.stringify({})
                    }
                )

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(
                        `Roblox API Error: ${errorData?.errors?.[0]?.message || errorData?.message || response.statusText}`
                    )
                }

                const data = await response.json()
                const { code, privateKey, status, expirationTime } = data

                if (!code || !privateKey || !status || !expirationTime) {
                    console.error("Missing data from Roblox create session response:", data)
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Incomplete data from Roblox API."
                    })
                }

                const sessionId =
                    Math.random().toString(36).substring(2, 15) +
                    Math.random().toString(36).substring(2, 15)
                activeSessions[sessionId] = {
                    code,
                    privateKey,
                    status,
                    expirationTime,
                    lastChecked: new Date(),
                    userId: input.userId
                }

                const qrCodeRobloxUrl = `https://apis.roblox.com/auth-token-service/v1/login/qr-code-image?key=${privateKey}&code=${code}`

                return {
                    success: true,
                    sessionId,
                    code,
                    expirationTime,
                    directQrUrl: qrCodeRobloxUrl
                }
            } catch (error: any) {
                console.error("Error creating Roblox quick login session:", error)
                let trpcErrorCode: TRPCError["code"] = "INTERNAL_SERVER_ERROR"
                const message = error.message || "Failed to create session"

                if (error instanceof Response) {
                    const status = error.status
                    if (status === 400) trpcErrorCode = "BAD_REQUEST"
                    if (status === 401) trpcErrorCode = "UNAUTHORIZED"
                    if (status === 403) trpcErrorCode = "FORBIDDEN"
                    if (status === 429) trpcErrorCode = "TOO_MANY_REQUESTS"
                }

                throw new TRPCError({
                    code: trpcErrorCode,
                    message: `Roblox API Error: ${message}`,
                    cause: error
                })
            }
        }),

    checkQuickLoginStatus: publicProcedure
        .input(
            z.object({
                sessionId: z.string()
            })
        )
        .output(
            z.object({
                success: z.boolean(),
                status: z.string(),
                accountName: z.string().optional(),
                expirationTime: z.string().optional(),
                message: z.string().optional(),
                isFinal: z.boolean().optional()
            })
        )
        .query(async ({ input }) => {
            const { sessionId } = input
            console.log("Checking login status for session:", sessionId)

            if (!sessionId || sessionId.trim() === "") {
                console.error("Empty sessionId provided")
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Session ID cannot be empty"
                })
            }

            if (!activeSessions[sessionId]) {
                console.error("Session not found:", sessionId)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invalid or expired session ID."
                })
            }

            const session = activeSessions[sessionId]
            console.log("Found session, current status:", session.status)

            // Check if session is already in a final state to avoid unnecessary API calls
            if (
                session.status === "Validated" ||
                session.status === "Cancelled" ||
                session.status === "Expired"
            ) {
                console.log("Session already in final state:", session.status)
                return {
                    success: true,
                    status: session.status,
                    accountName: session.accountName,
                    expirationTime: session.expirationTime,
                    isFinal: true
                }
            }

            try {
                // Get CSRF token, but don't fail the whole request if this fails
                let csrfToken
                try {
                    csrfToken = await getCsrfToken()
                    console.log("Got CSRF token, checking Roblox session status")
                } catch (csrfError) {
                    console.error(
                        "Failed to get CSRF token, but continuing with null token:",
                        csrfError
                    )
                    // We'll try without a token
                }

                // Add basic rate limiting protection
                const now = new Date()
                const lastCheckedTime = session.lastChecked ? session.lastChecked.getTime() : 0
                const timeSinceLastCheck = now.getTime() - lastCheckedTime

                // If checked in the last 2 seconds, use cached status
                if (timeSinceLastCheck < 2000) {
                    console.log("Using cached status due to rate limiting", session.status)
                    return {
                        success: true,
                        status: session.status,
                        accountName: session.accountName,
                        expirationTime: session.expirationTime,
                        isFinal: false
                    }
                }

                // Mark as checked now
                session.lastChecked = now

                const headers: Record<string, string> = {
                    "Content-Type": "application/json"
                }

                if (csrfToken) {
                    headers["x-csrf-token"] = csrfToken
                }

                let responseData
                try {
                    const response = await fetch(
                        "https://apis.roblox.com/auth-token-service/v1/login/status",
                        {
                            method: "POST",
                            headers,
                            body: JSON.stringify({
                                code: session.code,
                                privateKey: session.privateKey
                            })
                        }
                    )

                    console.log("Status check response status:", response.status)

                    // If we get a 429 Too Many Requests, just return the current status
                    if (response.status === 429) {
                        console.log("Rate limited by Roblox API, using cached status")
                        return {
                            success: true,
                            status: session.status,
                            accountName: session.accountName,
                            expirationTime: session.expirationTime,
                            message: "Rate limited by Roblox API",
                            isFinal: false
                        }
                    }

                    // Handle other non-200 responses
                    if (!response.ok) {
                        const errorText = await response.text()
                        const status = response.status
                        console.error("Error response from Roblox status check:", status, errorText)

                        // Special case for 400 with "CodeInvalid"
                        if (status === 400 && errorText === '"CodeInvalid"') {
                            console.log("Code invalid, updating session status to Cancelled")
                            session.status = "Cancelled"
                            delete activeSessions[sessionId]
                            return {
                                success: false,
                                status: "Cancelled",
                                message: "Code invalid or expired",
                                isFinal: true
                            }
                        }

                        // For all other errors, just return the current status with an error message
                        return {
                            success: false,
                            status: session.status,
                            accountName: session.accountName,
                            expirationTime: session.expirationTime,
                            message: `API Error: ${errorText || response.statusText}`,
                            isFinal: false
                        }
                    }

                    try {
                        const responseText = await response.text()
                        if (!responseText || responseText.trim() === "") {
                            console.error("Empty response from Roblox API")
                            return {
                                success: false,
                                status: session.status,
                                message: "Empty response from Roblox API",
                                isFinal: false
                            }
                        }

                        responseData = JSON.parse(responseText)
                        console.log("Status check successful, received data:", responseData)
                    } catch (jsonError) {
                        console.error("Failed to parse JSON response:", jsonError)
                        return {
                            success: false,
                            status: session.status,
                            message: "Failed to parse Roblox API response",
                            isFinal: false
                        }
                    }
                } catch (fetchError) {
                    console.error("Fetch error during status check:", fetchError)
                    return {
                        success: false,
                        status: session.status,
                        message: "Network error during status check",
                        isFinal: false
                    }
                }

                // Once we've made it here, we have a valid response!
                try {
                    const { status, accountName, expirationTime: newExpirationTime } = responseData

                    // Update the session in memory
                    session.status = status
                    if (accountName) session.accountName = accountName
                    if (newExpirationTime) session.expirationTime = newExpirationTime

                    let isFinalStatus = false
                    if (status === "Validated" || status === "Cancelled" || status === "Expired") {
                        console.log("Session reached final status:", status)
                        isFinalStatus = true
                        if (status === "Cancelled" || status === "Expired") {
                            console.log("Cleaning up session")
                            delete activeSessions[sessionId] // Clean up if cancelled/expired by Roblox
                        }
                    }

                    return {
                        success: true,
                        status,
                        accountName,
                        expirationTime: newExpirationTime,
                        isFinal: isFinalStatus
                    }
                } catch (processingError) {
                    console.error(
                        "Error processing response data:",
                        processingError,
                        "Data:",
                        responseData
                    )
                    return {
                        success: false,
                        status: session.status,
                        message: "Error processing response data",
                        isFinal: false
                    }
                }
            } catch (error: any) {
                console.error("Unexpected error in status check:", error)
                // Always return a valid response even on unexpected errors
                return {
                    success: false,
                    status: session.status || "Pending",
                    message: error.message || "Unexpected error during status check",
                    isFinal: false
                }
            }
        }),

    completeQuickLoginAndStoreCookie: publicProcedure
        .input(
            z.object({
                sessionId: z.string(),
                userId: z.string()
            })
        )
        .output(
            z.object({
                success: z.boolean(),
                message: z.string(),
                cookieStored: z.boolean().optional(),
                accountName: z.string().nullable().optional()
            })
        )
        .mutation(async ({ input }) => {
            const { sessionId, userId } = input
            console.log("Completing login for session:", sessionId, "userId:", userId)

            if (!userId || !sessionId) {
                console.error("Missing userId or sessionId:", { userId, sessionId })
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Both userId and sessionId are required"
                })
            }

            // Check if user already has a Roblox cookie (might be a duplicate request)
            try {
                const existingUser = await db
                    .select({ roblosecurity_cookie: users.roblosecurity_cookie })
                    .from(users)
                    .where(eq(users.id, userId))
                    .limit(1)

                if (
                    existingUser &&
                    existingUser.length > 0 &&
                    existingUser[0].roblosecurity_cookie
                ) {
                    console.log(
                        "User already has Roblosecurity cookie, might be a duplicate request"
                    )
                    return {
                        success: true,
                        message: "User is already authenticated with Roblox",
                        cookieStored: true
                    }
                }
            } catch (dbError) {
                console.error("Error checking existing cookie:", dbError)
                // Continue with the process - not a critical error
            }

            // Check if session exists
            if (!activeSessions[sessionId]) {
                console.error("Session not found:", sessionId)
                // If session doesn't exist but user has cookie, consider it successful
                try {
                    const existingUser = await db
                        .select({ roblosecurity_cookie: users.roblosecurity_cookie })
                        .from(users)
                        .where(eq(users.id, userId))
                        .limit(1)

                    if (
                        existingUser &&
                        existingUser.length > 0 &&
                        existingUser[0].roblosecurity_cookie
                    ) {
                        return {
                            success: true,
                            message:
                                "Already authenticated with Roblox (session expired but cookie exists)",
                            cookieStored: true
                        }
                    }
                } catch (dbError) {
                    console.error(
                        "Error checking for existing cookie after session not found:",
                        dbError
                    )
                }

                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invalid or expired session ID."
                })
            }

            const session = activeSessions[sessionId]
            console.log("Found session, status:", session.status)

            // We want to be flexible with validation status - if we have a code and privateKey,
            // we can still attempt to complete login even if status isn't fully "Validated"
            if (session.status !== "Validated") {
                console.log("Session not in Validated state:", session.status)
                // We'll still attempt to login if we have all required data
                if (!session.code || !session.privateKey) {
                    console.error("Cannot complete login without code and privateKey")
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: `Session missing required data. Current status: ${session.status}`
                    })
                }
            }

            // Optional: associate userId with session if it wasn't done at creation and matches
            if (session.userId && session.userId !== userId) {
                console.warn(
                    `Session ${sessionId} was initiated for user ${session.userId} but completion attempted by ${userId}`
                )
            } else if (!session.userId) {
                session.userId = userId // Associate if not already done.
            }

            // Store accountName for return value if available
            const accountName = session.accountName || null

            try {
                console.log("Getting CSRF token for login completion")
                const csrfToken = await getCsrfToken()

                console.log("Sending login request to Roblox")
                const response = await fetch("https://auth.roblox.com/v2/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-csrf-token": csrfToken
                    },
                    body: JSON.stringify({
                        ctype: "AuthToken",
                        cvalue: session.code,
                        password: session.privateKey
                    }),
                    redirect: "manual" // Similar to maxRedirects: 0 in axios
                })

                console.log("Login response status:", response.status)
                console.log("Response headers:", [...response.headers.entries()])

                const cookies = response.headers.get("set-cookie")
                console.log("Set-Cookie header:", cookies)

                let roblosecurityCookieValue: string | null = null

                if (cookies) {
                    console.log("Parsing cookies")
                    const cookieMatch = cookies.match(/\.ROBLOSECURITY=([^;]+)/)
                    if (cookieMatch && cookieMatch[1]) {
                        roblosecurityCookieValue = cookieMatch[1]
                        console.log(
                            "Found ROBLOSECURITY cookie, length:",
                            roblosecurityCookieValue.length
                        )
                    } else {
                        console.log("ROBLOSECURITY cookie not found in cookie string")
                    }
                } else {
                    console.log("No cookies found in response headers")
                }

                if (!roblosecurityCookieValue) {
                    console.error(
                        "No .ROBLOSECURITY cookie found in response from Roblox /v2/login"
                    )

                    // Try to get response body for further debugging
                    try {
                        const responseBody = await response.text()
                        console.log("Response body:", `${responseBody.substring(0, 200)}...`)

                        // Check if the response indicates the user is already authenticated
                        if (
                            responseBody.includes("already authenticated") ||
                            responseBody.includes("already logged in") ||
                            response.status === 200
                        ) {
                            console.log("User might already be authenticated with Roblox")

                            // Clean up the session
                            console.log("Cleaning up session")
                            delete activeSessions[sessionId]

                            return {
                                success: true,
                                message: "User may already be authenticated with Roblox",
                                cookieStored: false,
                                accountName
                            }
                        }
                    } catch (e) {
                        console.log("Failed to read response body:", e)
                    }

                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to retrieve .ROBLOSECURITY cookie from Roblox."
                    })
                }

                // Store the cookie in the database
                console.log("Updating user record with ROBLOSECURITY cookie")
                try {
                    await db
                        .update(users)
                        .set({ roblosecurity_cookie: roblosecurityCookieValue })
                        .where(eq(users.id, userId))

                    console.log(`.ROBLOSECURITY cookie stored for user ${userId}`)
                } catch (dbError) {
                    console.error("Database error while storing cookie:", dbError)
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Failed to store cookie in database",
                        cause: dbError
                    })
                }

                // Clean up the session
                console.log("Cleaning up session")
                delete activeSessions[sessionId]

                return {
                    success: true,
                    message: "Authentication successful and Roblosecurity cookie stored.",
                    cookieStored: true,
                    accountName
                }
            } catch (error: any) {
                console.error("Error completing Roblox quick login for session:", sessionId, error)
                delete activeSessions[sessionId] // Clean up session on error too

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Roblox Authentication Error: ${error.message || "Unknown error"}`,
                    cause: error
                })
            }
        }),

    cancelQuickLoginSession: publicProcedure
        .input(
            z.object({
                sessionId: z.string()
            })
        )
        .output(
            z.object({
                success: z.boolean(),
                message: z.string()
            })
        )
        .mutation(async ({ input }) => {
            const { sessionId } = input

            if (!activeSessions[sessionId]) {
                return {
                    success: true,
                    message: "Session not found or already inactive."
                }
            }

            const session = activeSessions[sessionId]

            try {
                const csrfToken = await getCsrfToken()

                const response = await fetch(
                    "https://apis.roblox.com/auth-token-service/v1/login/cancel",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "x-csrf-token": csrfToken
                        },
                        body: JSON.stringify({
                            code: session.code
                        })
                    }
                )

                if (!response.ok) {
                    throw new Error(`Failed to cancel session: ${response.statusText}`)
                }

                delete activeSessions[sessionId]

                return {
                    success: true,
                    message: "Quick login session cancelled successfully."
                }
            } catch (error: any) {
                console.error("Error cancelling Roblox quick login session:", sessionId, error)
                delete activeSessions[sessionId]

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Roblox API Error during cancellation: ${error.message || "Unknown error"}`,
                    cause: error
                })
            }
        }),

    logoutRobloxUserSession: publicProcedure
        .input(
            z.object({
                userId: z.string()
            })
        )
        .output(
            z.object({
                success: z.boolean(),
                message: z.string()
            })
        )
        .mutation(async ({ input }) => {
            const { userId } = input
            console.log("Attempting to logout Roblox session for user:", userId)

            const dbUser = await db
                .select({ roblosecurity_cookie: users.roblosecurity_cookie })
                .from(users)
                .where(eq(users.id, userId))
                .limit(1)

            if (!dbUser || dbUser.length === 0 || !dbUser[0].roblosecurity_cookie) {
                console.log("No Roblosecurity cookie found for user or user not found")
                return {
                    success: false,
                    message: "No Roblosecurity cookie found for this user or user not found."
                }
            }

            const roblosecurity = dbUser[0].roblosecurity_cookie
            console.log("Found Roblosecurity cookie, length:", roblosecurity.length)

            try {
                // Get a CSRF token
                console.log("Getting CSRF token for logout")
                let csrfToken
                try {
                    csrfToken = await getCsrfToken()
                    console.log("Got CSRF token for logout")
                } catch (csrfError) {
                    console.error("Failed to get CSRF token for logout:", csrfError)
                    // We can't proceed without a token for logout
                    throw new Error("Failed to get CSRF token for logout")
                }

                // Format the cookie properly
                const cookieHeader = `.ROBLOSECURITY=${roblosecurity}`
                console.log("Sending logout request with cookie header")

                const response = await fetch("https://auth.roblox.com/v2/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-csrf-token": csrfToken,
                        Cookie: cookieHeader
                    }
                })

                console.log("Logout response status:", response.status)

                // Handle different response statuses
                if (response.status === 403) {
                    console.error(
                        "Forbidden response from Roblox logout. This is common and we can still clear the local cookie."
                    )
                    // Even if Roblox logout fails with 403, we'll still clear our local cookie
                } else if (!response.ok) {
                    // Try to get more information about the error
                    let errorText = response.statusText
                    try {
                        const errorBody = await response.text()
                        if (errorBody) {
                            console.error("Error response body:", errorBody)
                            errorText = `${response.statusText}: ${errorBody.substring(0, 100)}`
                        }
                    } catch (e) {
                        console.error("Failed to read error response body")
                    }

                    console.error(`Failed to logout from Roblox: ${errorText}`)
                    // Continue anyway to clear local cookie
                } else {
                    console.log("Roblox logout successful")
                }

                // Clear the cookie from the database regardless of Roblox's response
                console.log("Clearing cookie from database")
                await db
                    .update(users)
                    .set({ roblosecurity_cookie: null })
                    .where(eq(users.id, userId))

                console.log("Cookie cleared successfully")
                return {
                    success: true,
                    message: "Successfully cleared Roblox authentication data."
                }
            } catch (error: any) {
                console.error("Error during Roblox logout for user:", userId, error)

                // Try to clear the cookie anyway if there was an error
                try {
                    console.log("Attempting to clear cookie despite error")
                    await db
                        .update(users)
                        .set({ roblosecurity_cookie: null })
                        .where(eq(users.id, userId))
                    console.log("Cookie cleared despite logout error")

                    return {
                        success: true,
                        message: "Cookie cleared locally, but Roblox logout may have failed."
                    }
                } catch (dbError) {
                    console.error("Failed to clear cookie from database:", dbError)
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: `Failed to clear Roblox authentication: ${error.message || "Unknown error"}`,
                        cause: error
                    })
                }
            }
        })
})

// Cleanup expired sessions periodically
setInterval(() => {
    const now = new Date()
    for (const [sessionId, session] of Object.entries(activeSessions)) {
        try {
            const expirationTime = new Date(session.expirationTime)
            if (expirationTime < now) {
                console.log(`Roblox Quick Login session ${sessionId} expired, cleaning up.`)
                delete activeSessions[sessionId]
            }
        } catch (e) {
            console.error(
                `Error parsing expirationTime for session ${sessionId}, removing from active sessions. Error: ${e}`
            )
            delete activeSessions[sessionId]
        }
    }
}, 60000) // Check every minute
