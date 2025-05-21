import { z } from "zod"

// Enum for the trade status types used by Roblox API
export enum TradeStatusType {
    Inbound = 1,
    Outbound = 2,
    Completed = 3,
    Inactive = 4
}

// Zod schema for a basic user
export const userSchema = z.object({
    id: z.number().or(z.string()),
    name: z.string(),
    displayName: z.string().nullable().optional()
})

// Zod schema for a trade item (user asset)
export const userAssetSchema = z.object({
    id: z.number().or(z.string()),
    serialNumber: z.number().nullable().optional(),
    assetId: z.number().or(z.string()),
    name: z.string(),
    recentAveragePrice: z.number().nullable().optional(),
    originalPrice: z.number().nullable().optional(),
    assetStock: z.number().nullable().optional(),
    membershipType: z.number().or(z.string()).nullable().optional()
})

// Zod schema for a trade offer (one side of the trade)
export const offerSchema = z.object({
    user: userSchema,
    userAssets: z.array(userAssetSchema).optional(),
    robux: z.number().default(0)
})

// Zod schema for a single trade in the list
export const tradeListItemSchema = z.object({
    id: z.number().or(z.string()),
    user: userSchema,
    created: z.string(),
    expiration: z.string().optional(),
    isActive: z.boolean(),
    status: z.string().or(z.number())
})

// Schema for trade list response
export const tradeListResponseSchema = z.object({
    previousPageCursor: z.string().nullable(),
    nextPageCursor: z.string().nullable(),
    data: z.array(tradeListItemSchema)
})

// Schema for detailed trade
export const detailedTradeSchema = z.object({
    offers: z.array(offerSchema),
    id: z.number().or(z.string()),
    user: userSchema,
    created: z.string(),
    expiration: z.string().optional(),
    isActive: z.boolean(),
    status: z.number().or(z.string())
})

// Map status number to string
export function mapTradeStatus(status: number | string): string {
    if (typeof status === "string") return status

    const statusMap: Record<number, string> = {
        0: "Open",
        1: "Pending",
        2: "Completed",
        3: "Inactive",
        4: "Expired",
        5: "Declined",
        6: "Cancelled"
    }

    return statusMap[status] || "Unknown"
}

// Map trade type to string
export function mapTradeType(statusType: TradeStatusType): string {
    const typeMap: Record<number, string> = {
        [TradeStatusType.Inbound]: "inbound",
        [TradeStatusType.Outbound]: "outbound",
        [TradeStatusType.Completed]: "completed",
        [TradeStatusType.Inactive]: "inactive"
    }

    return typeMap[statusType] || "unknown"
}
