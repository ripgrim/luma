import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { db } from "@/database/db"
import * as schema from "@/database/schema"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
        schema
    }),
    socialProviders: {
        roblox: {
            clientId: process.env.ROBLOX_CLIENT_ID as string,
            clientSecret: process.env.ROBLOX_CLIENT_SECRET as string
        }
    }
})

//callbackUrl: "http://localhost:3000/api/auth/callback/roblox"
//https://luma-restack.vercel.app/api/auth/callback/roblox
