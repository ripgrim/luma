import { tradeItems, trades } from "@/auth-schema"
import { db } from "@/database/db"
import { redis } from "@/lib/redis"
import { TRPCError } from "@trpc/server"
import { and, eq, lt } from "drizzle-orm"
import { z } from "zod"
import { protectedProcedure, router } from "../trpc"
import {
    TradeStatusType,
    detailedTradeSchema,
    mapTradeStatus,
    mapTradeType,
    tradeListResponseSchema
} from "../types/robloxTrades"
import { getRoblosecurityTokenForUser, getRobloxHeaders } from "../utils/robloxApiHelpers"

// Mapping from getStoredTrades tradeType to TradeStatusType enum
const tradeTypeToStatusType = {
    inbound: TradeStatusType.Inbound,
    outbound: TradeStatusType.Outbound,
    completed: TradeStatusType.Completed,
    inactive: TradeStatusType.Inactive
    // 'all' is not mapped as it's a special case for getStoredTrades
}

// Refactored helper function to fetch and store trades
async function fetchAndStoreRobloxTrades(
    userId: string,
    tradeStatusType: TradeStatusType,
    db: any, // Replace 'any' with your actual Drizzle DB type
    limit = 100, // Default to Roblox API max for fetching
    sortOrder: "Asc" | "Desc" = "Desc",
    initialCursor?: string // Allow passing an initial cursor
) {
    console.log(
        `[fetchAndStoreRobloxTrades] Called for user: ${userId}, type: ${tradeStatusType}, limit: ${limit}, cursor: ${initialCursor}`
    )
    try {
        const roblosecurityToken = await getRoblosecurityTokenForUser(userId, db)
        console.log(
            `[fetchAndStoreRobloxTrades] Using Roblosecurity Token (first 20 chars): ${roblosecurityToken.substring(0, 20)}... for user: ${userId}`
        )

        const tradeStatusPathPart = mapTradeType(tradeStatusType)
        let url = `https://trades.roblox.com/v1/trades/${tradeStatusPathPart}?limit=${limit}&sortOrder=${sortOrder}`
        if (initialCursor) {
            url += `&cursor=${initialCursor}`
        }

        console.log(`[fetchAndStoreRobloxTrades] Fetching URL: ${url} for user: ${userId}`)
        const headers = await getRobloxHeaders(roblosecurityToken)
        const response = await fetch(url, { method: "GET", headers })

        console.log(
            `[fetchAndStoreRobloxTrades] Roblox API Response Status: ${response.status} for user: ${userId}`
        )

        if (!response.ok) {
            const errorData = await response.text()
            // Log the error but throw a more specific error for the caller to handle
            console.error(
                `[fetchAndStoreRobloxTrades] Roblox API Error (${response.status}) for user ${userId}: ${errorData}`
            )
            throw new Error(`Roblox API Error (${response.status}): ${errorData.substring(0, 200)}`)
        }

        const tradeData = await response.json()
        // Log the raw API response BEFORE parsing/validation
        console.log(
            `[fetchAndStoreRobloxTrades] Raw API response for user ${userId}, type ${tradeStatusType}:`,
            JSON.stringify(tradeData, null, 2)
        )

        const validatedData = tradeListResponseSchema.parse(tradeData)

        // Store the trades in the database
        await storeTrades(userId, validatedData.data, tradeStatusPathPart) // tradeStatusPathPart is 'Inbound', 'Outbound', etc.

        console.log(
            `[fetchAndStoreRobloxTrades] Successfully fetched and stored ${validatedData.data.length} trades for user ${userId}, type: ${tradeStatusType}. Next cursor: ${validatedData.nextPageCursor}`
        )
        return {
            success: true,
            tradesStored: validatedData.data.length,
            nextPageCursor: validatedData.nextPageCursor, // Return the next cursor for potential pagination
            message: `Stored ${validatedData.data.length} trades.`
        }
    } catch (error: any) {
        console.error(
            `[fetchAndStoreRobloxTrades] Error for user ${userId}, type ${tradeStatusType}:`,
            error
        )
        // Re-throw the error so the calling function knows something went wrong.
        // It's important not to throw TRPCError here as this is a helper.
        throw error // Let the caller (tRPC procedure) handle TRPCError creation
    }
}

export const robloxTradesRouter = router({
    fetchTrades: protectedProcedure
        .input(
            z.object({
                tradeStatusType: z.nativeEnum(TradeStatusType),
                limit: z.number().min(10).max(100).default(100), // Keep API limit
                cursor: z.string().optional(),
                sortOrder: z.enum(["Asc", "Desc"]).default("Desc")
            })
        )
        .output(
            z.object({
                success: z.boolean(),
                message: z.string().optional(),
                tradesStored: z.number().optional(),
                nextPageCursor: z.string().nullable().optional() // Add this
            })
        )
        .mutation(async ({ input, ctx }) => {
            // Changed to .mutation
            console.log("[robloxTrades.fetchTrades tRPC] Request:", {
                input,
                user: ctx.user
            })

            const { tradeStatusType, limit, cursor, sortOrder } = input
            const userId = ctx.user.id

            try {
                // Call the refactored helper function
                const result = await fetchAndStoreRobloxTrades(
                    userId,
                    tradeStatusType,
                    db, // Pass the db instance
                    limit,
                    sortOrder,
                    cursor
                )

                return {
                    success: result.success,
                    message: result.message,
                    tradesStored: result.tradesStored,
                    nextPageCursor: result.nextPageCursor
                }
            } catch (error: any) {
                console.error("[robloxTrades.fetchTrades tRPC] Error:", error)
                // Construct a TRPCError to send back to the client
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Failed to fetch or store trades: ${error.message || "Unknown error"}`,
                    cause: error
                })
            }
        }),

    // Fetch detailed information about a specific trade
    getTradeDetails: protectedProcedure
        .input(
            z.object({
                tradeId: z.string().or(z.number())
            })
        )
        .output(
            z.object({
                success: z.boolean(),
                trade: detailedTradeSchema.optional(),
                message: z.string().optional()
            })
        )
        .query(async ({ input, ctx }) => {
            const { tradeId } = input
            const userId = ctx.user.id

            try {
                // First check if we have this trade in the database with detailed data
                const existingTrade = await db
                    .select()
                    .from(trades)
                    .where(and(eq(trades.originalId, String(tradeId)), eq(trades.userId, userId)))
                    .limit(1)

                // If we have the full data stored (rawData would have it)
                if (existingTrade.length > 0 && existingTrade[0].rawData) {
                    try {
                        const parsedData = JSON.parse(existingTrade[0].rawData)
                        // Check if 'offers' exists and is an array, indicating detailed data
                        if (parsedData && Array.isArray(parsedData.offers)) {
                            const validatedData = detailedTradeSchema.parse(parsedData) // Attempt to parse
                            console.log(
                                `[getTradeDetails] Successfully parsed stored rawData for trade ID ${tradeId}`
                            )
                            return {
                                success: true,
                                trade: validatedData
                            }
                        } else {
                            console.log(
                                `[getTradeDetails] Stored rawData for trade ID ${tradeId} is not detailed (missing/invalid 'offers'). Fetching from API.`
                            )
                        }
                    } catch (parseError) {
                        // If we can't parse the stored data for any reason (e.g. schema mismatch), fetch from Roblox API
                        console.error(
                            `[getTradeDetails] Error parsing stored rawData for trade ID ${tradeId}. Fetching from API:`,
                            parseError
                        )
                    }
                }

                // Get user's Roblosecurity cookie
                const roblosecurityCookie = await getRoblosecurityTokenForUser(userId, db)

                // Prepare request headers
                const headers = await getRobloxHeaders(roblosecurityCookie)

                // Make the request to Roblox API
                const response = await fetch(`https://trades.roblox.com/v1/trades/${tradeId}`, {
                    method: "GET",
                    headers
                })

                if (!response.ok) {
                    const errorData = await response.text()
                    throw new Error(`Roblox API Error (${response.status}): ${errorData}`)
                }

                const tradeData = await response.json()

                // Log the raw response for debugging
                console.log(
                    `[getTradeDetails] Raw trade data for ID ${tradeId}:`,
                    JSON.stringify(tradeData, null, 2)
                )

                try {
                    const validatedData = detailedTradeSchema.parse(tradeData)

                    // Log the offers and userAssets data for debugging
                    console.log(`[getTradeDetails] Trade ID: ${tradeId} - Response data:`)
                    if (tradeData.offers && Array.isArray(tradeData.offers)) {
                        tradeData.offers.forEach((offer: any, index: number) => {
                            console.log(
                                `[getTradeDetails] Offer ${index} ${index === 0 ? "(Your offer)" : "(Partner offer)"}`
                            )
                            if (offer.userAssets && Array.isArray(offer.userAssets)) {
                                console.log(
                                    `[getTradeDetails] User assets in offer ${index}:`,
                                    JSON.stringify(offer.userAssets, null, 2)
                                )
                            } else {
                                console.log(
                                    `[getTradeDetails] No userAssets in offer ${index} or not an array`
                                )
                            }
                            if (offer.robux) {
                                console.log(
                                    `[getTradeDetails] Robux in offer ${index}:`,
                                    offer.robux
                                )
                            }
                        })
                    } else {
                        console.log(
                            "[getTradeDetails] No offers found in trade data or not an array"
                        )
                    }

                    // Store the detailed trade data
                    await storeDetailedTrade(userId, validatedData)

                    return {
                        success: true,
                        trade: validatedData
                    }
                } catch (parseError: any) {
                    console.error(
                        `[getTradeDetails] Schema validation error for trade ${tradeId} from API:`,
                        parseError
                    )
                    // Also log tradeData here to see what failed validation
                    console.error(
                        `[getTradeDetails] Failing API data for trade ${tradeId}:`,
                        JSON.stringify(tradeData, null, 2)
                    )
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: `Roblox API returned unexpected data structure for trade ${tradeId}. Please check server logs.`,
                        cause: parseError
                    })
                }
            } catch (error: any) {
                console.error(`Error fetching trade details for ${tradeId}:`, error)

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Failed to fetch trade details: ${error.message}`,
                    cause: error
                })
            }
        }),

    // Get trade data from database
    getStoredTrades: protectedProcedure
        .input(
            z.object({
                tradeType: z
                    .enum(["inbound", "outbound", "completed", "inactive", "all"])
                    .default("all"),
                limit: z.number().min(10).max(100).default(50),
                cursor: z.string().optional() // This cursor is for DB pagination
            })
        )
        .output(
            z.object({
                success: z.boolean(),
                trades: z.array(z.any()), // Consider using a more specific schema if possible
                nextCursor: z.string().nullable(), // DB pagination cursor
                count: z.number(),
                message: z.string().optional() // For messages like "fetched from API"
            })
        )
        .query(async ({ input, ctx }) => {
            console.log("[robloxTrades.getStoredTrades] Request:", {
                input,
                user: ctx.user,
                hasAuth: Boolean(ctx.user.id)
            })

            const { tradeType, limit, cursor: dbCursor } = input
            const userId = ctx.user.id
            let message: string | undefined = undefined

            try {
                const queryDb = async () => {
                    const conditions = [eq(trades.userId, userId)]
                    if (tradeType !== "all") {
                        conditions.push(eq(trades.tradeType, tradeType))
                    }
                    if (dbCursor) {
                        try {
                            const decodedCursor = JSON.parse(atob(dbCursor))
                            if (decodedCursor.lastId) {
                                // Assuming descending order of originalId for typical display
                                // If you sort ascending by originalId in DB, this needs to be gt
                                conditions.push(lt(trades.originalId, String(decodedCursor.lastId)))
                            }
                        } catch (e) {
                            console.error(
                                "[robloxTrades.getStoredTrades] Error parsing DB cursor:",
                                e
                            )
                        }
                    }
                    return await db
                        .select()
                        .from(trades)
                        .where(and(...conditions))
                        .orderBy(trades.originalId) // Ensure consistent order for pagination
                        .limit(limit + 1)
                }

                let results = await queryDb()

                if (
                    results.length === 0 &&
                    !dbCursor && // Only on initial load for this view
                    tradeType !== "all" &&
                    redis // Check if Redis client is available
                ) {
                    const apiFetchLockKey = `trades:fetchlock:${userId}:${tradeType}`
                    const lastFetchTimestamp = await redis.get<number>(apiFetchLockKey)
                    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000

                    if (!lastFetchTimestamp || lastFetchTimestamp < fiveMinutesAgo) {
                        console.log(
                            `[robloxTrades.getStoredTrades] No stored ${tradeType} trades for user ${userId}. Attempting API fetch.`
                        )
                        message = `No stored ${tradeType} trades. Attempting to fetch from Roblox...`

                        const mappedTradeStatusType =
                            tradeTypeToStatusType[tradeType as keyof typeof tradeTypeToStatusType]

                        if (mappedTradeStatusType !== undefined) {
                            try {
                                // We call with default limit for Roblox API to get a full page
                                // The 'limit' from input is for DB pagination of already stored trades
                                await fetchAndStoreRobloxTrades(
                                    userId,
                                    mappedTradeStatusType,
                                    db,
                                    100,
                                    "Desc"
                                )
                                await redis.set(apiFetchLockKey, Date.now(), { ex: 10 * 60 }) // Lock for 10 mins to be safe
                                message = `Fetched latest ${tradeType} trades from Roblox.`
                                results = await queryDb() // Re-query the DB
                            } catch (fetchError: any) {
                                console.error(
                                    `[robloxTrades.getStoredTrades] API fetch failed for ${tradeType} user ${userId}:`,
                                    fetchError
                                )
                                message = `Failed to fetch ${tradeType} trades from Roblox: ${fetchError.message?.substring(0, 100) || "Unknown API error"}`
                                // Proceed with empty 'results' from DB, but include the error message
                            }
                        } else {
                            console.warn(
                                `[robloxTrades.getStoredTrades] Could not map tradeType '${tradeType}' to TradeStatusType for API fetch.`
                            )
                            message = `Could not map tradeType '${tradeType}' for API fetch.`
                        }
                    } else {
                        console.log(
                            `[robloxTrades.getStoredTrades] API fetch for ${tradeType} user ${userId} skipped due to recent fetch.`
                        )
                        message = `Recently checked for ${tradeType} trades. Displaying stored data.`
                    }
                }

                let nextDbCursor = null
                if (results.length > limit) {
                    const lastItem = results[limit - 1]
                    nextDbCursor = btoa(JSON.stringify({ lastId: lastItem.originalId }))
                    results.pop()
                } else {
                    console.log(
                        `[robloxTrades.getStoredTrades] No more DB trades available beyond this batch for type: ${tradeType}`
                    )
                }

                console.log(
                    `[robloxTrades.getStoredTrades] Returning ${results.length} trades for user ${userId}, type: ${tradeType}. Next DB cursor: ${nextDbCursor}`
                )

                return {
                    success: true,
                    trades: results,
                    nextCursor: nextDbCursor,
                    count: results.length,
                    message
                }
            } catch (error: any) {
                console.error("[robloxTrades.getStoredTrades] Error:", error)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Failed to fetch stored trades: ${error.message}`,
                    cause: error
                })
            }
        }),

    // Get trade metadata
    getTradeMetadata: protectedProcedure
        .output(
            z.object({
                success: z.boolean(),
                metadata: z
                    .object({
                        maxItemsPerSide: z.number(),
                        minValueRatio: z.number(),
                        tradeSystemMaxRobuxPercent: z.number(),
                        tradeSystemRobuxFee: z.number()
                    })
                    .optional(),
                message: z.string().optional()
            })
        )
        .query(async ({ ctx }) => {
            const userId = ctx.user.id

            try {
                // Get user's Roblosecurity cookie
                const roblosecurityCookie = await getRoblosecurityTokenForUser(userId, db)

                // Prepare request headers
                const headers = await getRobloxHeaders(roblosecurityCookie)

                // Make the request to Roblox API
                const response = await fetch("https://trades.roblox.com/v1/trades/metadata", {
                    method: "GET",
                    headers
                })

                if (!response.ok) {
                    const errorData = await response.text()
                    throw new Error(`Roblox API Error (${response.status}): ${errorData}`)
                }

                const metadata = await response.json()

                return {
                    success: true,
                    metadata
                }
            } catch (error: any) {
                console.error("Error fetching trade metadata:", error)

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Failed to fetch trade metadata: ${error.message}`,
                    cause: error
                })
            }
        }),

    // Get inbound trade count
    getInboundTradeCount: protectedProcedure
        .output(
            z.object({
                success: z.boolean(),
                count: z.number().optional(),
                message: z.string().optional()
            })
        )
        .query(async ({ ctx }) => {
            const userId = ctx.user.id

            try {
                // Get user's Roblosecurity cookie
                const roblosecurityCookie = await getRoblosecurityTokenForUser(userId, db)

                // Prepare request headers
                const headers = await getRobloxHeaders(roblosecurityCookie)

                // Make the request to Roblox API
                const response = await fetch("https://trades.roblox.com/v1/trades/1/count", {
                    method: "GET",
                    headers
                })

                if (!response.ok) {
                    const errorData = await response.text()
                    throw new Error(`Roblox API Error (${response.status}): ${errorData}`)
                }

                const countData = await response.json()

                return {
                    success: true,
                    count: countData.count
                }
            } catch (error: any) {
                console.error("Error fetching inbound trade count:", error)

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Failed to fetch inbound trade count: ${error.message}`,
                    cause: error
                })
            }
        }),

    // Check if user can trade with another user
    canTradeWith: protectedProcedure
        .input(
            z.object({
                userId: z.number().or(z.string())
            })
        )
        .output(
            z.object({
                success: z.boolean(),
                canTrade: z.boolean().optional(),
                status: z.number().optional(),
                message: z.string().optional()
            })
        )
        .query(async ({ input, ctx }) => {
            const targetUserId = input.userId
            const userId = ctx.user.id

            try {
                // Get user's Roblosecurity cookie
                const roblosecurityCookie = await getRoblosecurityTokenForUser(userId, db)

                // Prepare request headers
                const headers = await getRobloxHeaders(roblosecurityCookie)

                // Make the request to Roblox API
                const response = await fetch(
                    `https://trades.roblox.com/v1/users/${targetUserId}/can-trade-with`,
                    {
                        method: "GET",
                        headers
                    }
                )

                if (!response.ok) {
                    const errorData = await response.text()
                    throw new Error(`Roblox API Error (${response.status}): ${errorData}`)
                }

                const tradeEligibility = await response.json()

                return {
                    success: true,
                    canTrade: tradeEligibility.canTrade,
                    status: tradeEligibility.status
                }
            } catch (error: any) {
                console.error(`Error checking trade eligibility with user ${targetUserId}:`, error)

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: `Failed to check trade eligibility: ${error.message}`,
                    cause: error
                })
            }
        })
})

// Helper function to store trades in the database
async function storeTrades(userId: string, tradeList: any[], tradeType: string) {
    if (!tradeList || tradeList.length === 0) {
        console.log("[storeTrades] No trades to store.")
        return
    }

    console.log(
        `[storeTrades] Storing ${tradeList.length} trades of type '${tradeType}' for user ${userId}`
    )

    await db.transaction(async (trx) => {
        console.log(`[storeTrades] Starting transaction for user ${userId}, type '${tradeType}'`)
        for (const trade of tradeList) {
            const mappedStatus = mapTradeStatus(trade.status)
            const dbTradePayload = {
                originalId: String(trade.id),
                userId: userId,
                tradePartnerId: String(trade.user.id),
                tradePartnerName: trade.user.name,
                created: new Date(trade.created),
                expiration: trade.expiration ? new Date(trade.expiration) : null, // Already handled nullability
                isActive: trade.isActive,
                status: mappedStatus, // Use the mapped status
                tradeType: tradeType // 'Inbound', 'Outbound', etc.
                // rawData can be added here if needed for simple list items, but usually for detailedTrade
            }

            try {
                // Use trx for operations within the transaction
                await trx
                    .insert(trades)
                    .values(dbTradePayload)
                    .onConflictDoUpdate({
                        target: [trades.originalId, trades.userId],
                        set: {
                            // Ensure all relevant fields are updated on conflict
                            tradePartnerId: dbTradePayload.tradePartnerId,
                            tradePartnerName: dbTradePayload.tradePartnerName,
                            created: dbTradePayload.created,
                            expiration: dbTradePayload.expiration,
                            isActive: dbTradePayload.isActive,
                            status: dbTradePayload.status,
                            tradeType: dbTradePayload.tradeType,
                            // rawData update if applicable
                            updatedAt: new Date() // Explicitly set updatedAt
                        }
                    })
                // console.log(`[storeTrades] Successfully upserted trade ID ${trade.id} for user ${userId}`);
            } catch (error) {
                console.error(
                    `[storeTrades] Error upserting trade ID ${trade.id} for user ${userId} within transaction:`,
                    error
                )
                // If an error occurs, the transaction will be rolled back automatically by Drizzle/db driver
                throw error // Re-throw to ensure transaction rollback
            }
        }
        console.log(`[storeTrades] Transaction committed for user ${userId}, type '${tradeType}'`)
    })
}

// Helper function to store detailed trade data
async function storeDetailedTrade(userId: string, tradeData: z.infer<typeof detailedTradeSchema>) {
    console.log(`[storeDetailedTrade] Storing detailed trade ID ${tradeData.id} for user ${userId}`)

    // Determine tradeType (can be complex, this is a simplified example)
    let finalTradeType: string
    const apiStatus = mapTradeStatus(tradeData.status)
    if (apiStatus === "Completed") finalTradeType = "completed"
    else if (["Expired", "Declined", "Inactive", "Cancelled"].includes(apiStatus))
        finalTradeType = "inactive"
    else
        finalTradeType =
            tradeData.offers &&
            tradeData.offers.length > 0 &&
            String(tradeData.offers[0].user.id) === userId
                ? "outbound"
                : "inbound"

    const expirationDate = tradeData.expiration
        ? new Date(tradeData.expiration)
        : tradeData.status === "Expired"
          ? new Date(tradeData.created)
          : null // Handle expiration properly

    await db.transaction(async (trx) => {
        console.log(
            `[storeDetailedTrade] Starting transaction for detailed trade ID ${tradeData.id}, user ${userId}`
        )

        // 1. Upsert the main trade data and get its internal DB ID
        const dbTradePayload = {
            userId: userId,
            originalId: String(tradeData.id),
            tradePartnerId: String(tradeData.user.id), // This is the partner in detailed view's root user object
            tradePartnerName: tradeData.user.name || "Unknown Partner",
            tradePartnerDisplayName: tradeData.user.displayName,
            status: apiStatus,
            tradeType: finalTradeType,
            created: new Date(tradeData.created),
            expiration: expirationDate,
            isActive: tradeData.isActive,
            rawData: JSON.stringify(tradeData),
            updatedAt: new Date()
        }

        let internalTradeDbId: string

        try {
            const existingTrade = await trx
                .select({ id: trades.id })
                .from(trades)
                .where(and(eq(trades.originalId, String(tradeData.id)), eq(trades.userId, userId)))
                .limit(1)

            if (existingTrade.length > 0) {
                internalTradeDbId = existingTrade[0].id
                await trx.update(trades).set(dbTradePayload).where(eq(trades.id, internalTradeDbId))
                console.log(
                    `[storeDetailedTrade] Successfully updated main trade data for original ID ${tradeData.id}, DB ID ${internalTradeDbId}`
                )
            } else {
                const [insertedTrade] = await trx
                    .insert(trades)
                    .values(dbTradePayload)
                    .returning({ id: trades.id })
                if (!insertedTrade || !insertedTrade.id)
                    throw new Error("Failed to insert trade or retrieve its ID.")
                internalTradeDbId = insertedTrade.id
                console.log(
                    `[storeDetailedTrade] Successfully inserted main trade data for original ID ${tradeData.id}, new DB ID ${internalTradeDbId}`
                )
            }
        } catch (error) {
            console.error(
                `[storeDetailedTrade] Error upserting main trade data for ID ${tradeData.id} within transaction:`,
                error
            )
            throw error
        }

        // 2. Delete existing items for this trade (using internalTradeDbId)
        try {
            console.log(
                `[storeDetailedTrade] Deleting existing items for trade DB ID ${internalTradeDbId}`
            )
            await trx.delete(tradeItems).where(eq(tradeItems.tradeId, internalTradeDbId))
            console.log(
                `[storeDetailedTrade] Successfully deleted existing items for trade DB ID ${internalTradeDbId}`
            )
        } catch (error) {
            console.error(
                `[storeDetailedTrade] Error deleting existing items for trade DB ID ${internalTradeDbId} within transaction:`,
                error
            )
            throw error
        }

        // 3. Prepare and Insert new trade items
        const newTradeItemsToInsert: Array<
            Omit<typeof tradeItems.$inferInsert, "id" | "createdAt" | "updatedAt">
        > = []
        tradeData.offers?.forEach((offer) => {
            // Determine offerType: if the offer's user is the authenticated user (userId), it's their offer.
            let offerTypeForDb: "user_offer" | "partner_offer"
            if (String(offer.user.id) === userId) {
                offerTypeForDb = "user_offer"
            } else {
                offerTypeForDb = "partner_offer"
            }

            offer.userAssets?.forEach((asset) => {
                newTradeItemsToInsert.push({
                    tradeId: internalTradeDbId,
                    assetId: String(asset.assetId),
                    assetName: asset.name,
                    serialNumber: asset.serialNumber,
                    recentAveragePrice: asset.recentAveragePrice,
                    offerType: offerTypeForDb,
                    robuxAmount: 0 // Default for assets
                })
            })
            if (offer.robux && offer.robux > 0) {
                newTradeItemsToInsert.push({
                    tradeId: internalTradeDbId,
                    assetId: "ROBUX", // Special ID for robux
                    assetName: "Robux",
                    serialNumber: null,
                    recentAveragePrice: null,
                    offerType: offerTypeForDb,
                    robuxAmount: offer.robux
                })
            }
        })

        if (newTradeItemsToInsert.length > 0) {
            try {
                console.log(
                    `[storeDetailedTrade] Inserting ${newTradeItemsToInsert.length} new items for trade DB ID ${internalTradeDbId}`
                )
                await trx.insert(tradeItems).values(newTradeItemsToInsert)
                console.log(
                    `[storeDetailedTrade] Successfully inserted new items for trade DB ID ${internalTradeDbId}`
                )
            } catch (error) {
                console.error(
                    `[storeDetailedTrade] Error inserting new items for trade DB ID ${internalTradeDbId} within transaction:`,
                    error
                )
                throw error
            }
        } else {
            console.log(
                `[storeDetailedTrade] No new items to insert for trade DB ID ${internalTradeDbId}`
            )
        }
        console.log(
            `[storeDetailedTrade] Transaction committed for detailed trade ID ${tradeData.id}, user ${userId}`
        )
    })
}
