import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    roblosecurity_cookie: text("roblosecurity_cookie"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull()
})

export const sessions = pgTable("sessions", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" })
})

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull()
})

export const verifications = pgTable("verifications", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at")
})

export const trades = pgTable("trades", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    tradePartnerId: text("trade_partner_id").notNull(),
    tradePartnerName: text("trade_partner_name").notNull(),
    tradePartnerDisplayName: text("trade_partner_display_name"),
    created: timestamp("created").notNull(),
    expiration: timestamp("expiration"),
    isActive: boolean("is_active").notNull(),
    status: text("status").notNull(),
    tradeType: text("trade_type").notNull(), // inbound, outbound, completed, inactive
    rawData: text("raw_data"), // Store the full JSON for future reference
    originalId: text("original_id").notNull(), // Original Roblox trade ID
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const tradeItems = pgTable("trade_items", {
    id: uuid("id").primaryKey().defaultRandom(),
    tradeId: uuid("trade_id")
        .notNull()
        .references(() => trades.id, { onDelete: "cascade" }),
    assetId: text("asset_id").notNull(),
    assetName: text("asset_name").notNull(),
    serialNumber: integer("serial_number"),
    recentAveragePrice: integer("recent_average_price"),
    offerType: text("offer_type").notNull(), // user_offer or partner_offer
    robuxAmount: integer("robux_amount").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const earlyAccess = pgTable("early_access", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    isEarlyAccess: boolean("is_early_access").notNull().default(false),
    emailVerified: boolean("email_verified").notNull().default(false),
    hasUsedTicket: text("has_used_ticket").default("")
})
