import { db } from "@/database/db" // If you want db in context
import { auth } from "@/lib/auth" // Your initialized better-auth instance
import { TRPCError, initTRPC } from "@trpc/server"
import type { NextApiRequest, NextApiResponse } from "next" // For type checking

// Define the shape of the user object you expect from better-auth adapter
interface AuthenticatedUser {
    id: string
    // Add other properties from your user schema if you expect them
    // e.g., email?: string | null; name?: string | null;
    [key: string]: any // Allow other properties from the user object
}

// Define a more generic opts type for createContext
interface CreateContextOptions {
    req: NextApiRequest | Request // Accept NextApiRequest (Pages) or standard Request (App/Fetch)
    res: NextApiResponse | { setHeader: (...args: any[]) => void; [key: string]: any } // Accept NextApiResponse or a mock with setHeader
}

export const createContext = async (opts: CreateContextOptions) => {
    const { req, res } = opts
    let user: AuthenticatedUser | null = null

    try {
        // Use better-auth's auth.api.getSession to get the user session
        // req.headers is available on both NextApiRequest and the standard Request object.
        const session = await auth.api.getSession({ headers: req.headers as Headers })

        if (session && session.user) {
            user = session.user as AuthenticatedUser
        }
    } catch (e: any) {
        console.error(`[Auth Context] Error during session retrieval: ${e.message}`)
        user = null // Ensure user is null on error
    }

    return {
        user,
        req, // Store the original req for potential use in procedures
        res, // Store the original res/mock for potential use
        db
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create({
    // Optional: Add error formatting or transformers here
    // errorFormatter({ shape, error }) {
    //   return {
    //     ...shape,
    //     data: {
    //       ...shape.data,
    //       zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    //     },
    //   };
    // },
})

export const router = t.router
export const publicProcedure = t.procedure

const isAuthenticatedMiddleware = t.middleware(({ ctx, next }) => {
    // Now, ctx.user can be AuthenticatedUser | null based on successful session retrieval
    if (!ctx.user || !ctx.user.id) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message:
                "User not authenticated. Ensure session retrieval is correctly implemented in tRPC context."
        })
    }
    return next({
        ctx: {
            ...ctx,
            user: ctx.user // user is now known to be AuthenticatedUser (non-null) here
        }
    })
})

export const protectedProcedure = t.procedure.use(isAuthenticatedMiddleware)
