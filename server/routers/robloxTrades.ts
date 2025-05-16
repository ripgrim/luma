import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/database/db';
import { users, trades, tradeItems } from '@/auth-schema';
import { eq, and, or, inArray } from 'drizzle-orm';

// Enum for the trade status types used by Roblox API
enum TradeStatusType {
  Inbound = 1,
  Outbound = 2,
  Completed = 3,
  Inactive = 4
}

// Zod schema for a basic user
const userSchema = z.object({
  id: z.number().or(z.string()),
  name: z.string(),
  displayName: z.string().nullable().optional()
});

// Zod schema for a trade item (user asset)
const userAssetSchema = z.object({
  id: z.number().or(z.string()),
  serialNumber: z.number().nullable().optional(),
  assetId: z.number().or(z.string()),
  name: z.string(),
  recentAveragePrice: z.number().nullable().optional(),
  originalPrice: z.number().nullable().optional(),
  assetStock: z.number().nullable().optional(),
  membershipType: z.number().nullable().optional()
});

// Zod schema for a trade offer (one side of the trade)
const offerSchema = z.object({
  user: userSchema,
  userAssets: z.array(userAssetSchema).optional(),
  robux: z.number().default(0)
});

// Zod schema for a single trade in the list
const tradeListItemSchema = z.object({
  id: z.number().or(z.string()),
  user: userSchema,
  created: z.string(),
  expiration: z.string(),
  isActive: z.boolean(),
  status: z.string().or(z.number())
});

// Schema for trade list response
const tradeListResponseSchema = z.object({
  previousPageCursor: z.string().nullable(),
  nextPageCursor: z.string().nullable(),
  data: z.array(tradeListItemSchema)
});

// Schema for detailed trade
const detailedTradeSchema = z.object({
  offers: z.array(offerSchema),
  id: z.number().or(z.string()),
  user: userSchema,
  created: z.string(),
  expiration: z.string(),
  isActive: z.boolean(),
  status: z.number().or(z.string())
});

// Utility function to get Roblox authentication headers with CSRF token
async function getRobloxHeaders(roblosecurityCookie: string) {
  const cookies = `.ROBLOSECURITY=${roblosecurityCookie}`;
  
  // Get CSRF token
  const response = await fetch('https://auth.roblox.com/v2/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies
    }
  });
  
  const csrfToken = response.headers.get('x-csrf-token');
  if (!csrfToken) {
    throw new Error('Failed to get CSRF token from Roblox');
  }
  
  return {
    'Content-Type': 'application/json',
    'Cookie': cookies,
    'x-csrf-token': csrfToken,
    'Origin': 'https://www.roblox.com', // Added Origin header
    'Referer': 'https://www.roblox.com/trades' // Added Referer header
  };
}

// Map status number to string
function mapTradeStatus(status: number | string): string {
  if (typeof status === 'string') return status;
  
  const statusMap: Record<number, string> = {
    0: 'Open',
    1: 'Pending',
    2: 'Completed',
    3: 'Inactive',
    4: 'Expired',
    5: 'Declined',
    6: 'Cancelled'
  };
  
  return statusMap[status] || 'Unknown';
}

// Map trade type to string
function mapTradeType(statusType: TradeStatusType): string {
  const typeMap: Record<number, string> = {
    [TradeStatusType.Inbound]: 'inbound',
    [TradeStatusType.Outbound]: 'outbound',
    [TradeStatusType.Completed]: 'completed',
    [TradeStatusType.Inactive]: 'inactive'
  };
  
  return typeMap[statusType] || 'unknown';
}

export const robloxTradesRouter = router({
  fetchTrades: protectedProcedure
    .input(z.object({
      tradeStatusType: z.nativeEnum(TradeStatusType),
      limit: z.number().min(10).max(100).default(10),
      cursor: z.string().optional(),
      sortOrder: z.enum(['Asc', 'Desc']).default('Desc')
    }))
    .output(z.object({
      success: z.boolean(),
      trades: tradeListResponseSchema.optional(),
      message: z.string().optional(),
      count: z.number().optional()
    }))
    .query(async ({ input, ctx }) => {
      // Log request information
      console.log('[robloxTrades.fetchTrades] Request:', {
        input,
        user: ctx.user,
        // headers: ctx.req?.headers // ctx.req might still be useful
      });
      
      const { tradeStatusType, limit, cursor, sortOrder } = input;
      const userId = ctx.user.id;
      
      try {
        // Get user's Roblosecurity cookie
        const userRecord = await db
          .select({ roblosecurity_cookie: users.roblosecurity_cookie })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);
          
        if (!userRecord || userRecord.length === 0 || !userRecord[0]?.roblosecurity_cookie) {
          console.error('[robloxTrades.fetchTrades] Roblosecurity cookie not found for user:', userId);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Roblosecurity cookie not found for user.',
          });
        }

        const roblosecurityToken = userRecord[0].roblosecurity_cookie;
        console.log(`[robloxTrades.fetchTrades] Using Roblosecurity Token (first 20 chars): ${roblosecurityToken.substring(0, 20)}... for user: ${userId}`);

        const tradeStatusPathPart = mapTradeType(tradeStatusType);
        const url = `https://trades.roblox.com/v1/trades/${tradeStatusPathPart}?limit=${limit}&sortOrder=${sortOrder}${cursor ? `&cursor=${cursor}` : ''}`;

        console.log(`[robloxTrades.fetchTrades] Fetching URL: ${url} for user: ${userId}`);

        const headers = await getRobloxHeaders(roblosecurityToken);

        const response = await fetch(url, {
          method: 'GET',
          headers,
        });

        console.log(`[robloxTrades.fetchTrades] Roblox API Response Status: ${response.status} for user: ${userId}`);
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Roblox API Error (${response.status}): ${errorData}`);
        }
        
        const tradeData = await response.json();
        const validatedData = tradeListResponseSchema.parse(tradeData);
        
        // Store the trades in the database
        const tradeType = mapTradeType(tradeStatusType);
        await storeTrades(userId, validatedData.data, tradeType);
        
        return {
          success: true,
          trades: validatedData,
          count: validatedData.data.length
        };
      } catch (error: any) {
        console.error('Error fetching trades:', error);
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch trades: ${error.message}`,
          cause: error
        });
      }
    }),

  // Fetch detailed information about a specific trade
  getTradeDetails: protectedProcedure
    .input(z.object({
      tradeId: z.string().or(z.number())
    }))
    .output(z.object({
      success: z.boolean(),
      trade: detailedTradeSchema.optional(),
      message: z.string().optional()
    }))
    .query(async ({ input, ctx }) => {
      const { tradeId } = input;
      const userId = ctx.user.id;
      
      try {
        // First check if we have this trade in the database with detailed data
        const existingTrade = await db
          .select()
          .from(trades)
          .where(and(
            eq(trades.originalId, String(tradeId)),
            eq(trades.userId, userId)
          ))
          .limit(1);
        
        // If we have the full data stored (rawData would have it)
        if (existingTrade.length > 0 && existingTrade[0].rawData) {
          try {
            const parsedData = JSON.parse(existingTrade[0].rawData);
            const validatedData = detailedTradeSchema.parse(parsedData);
            
            return {
              success: true,
              trade: validatedData
            };
          } catch (parseError) {
            // If we can't parse the stored data, fetch from Roblox API
            console.error('Error parsing stored trade data:', parseError);
          }
        }
        
        // Get user's Roblosecurity cookie
        const userRecord = await db
          .select({ roblosecurity_cookie: users.roblosecurity_cookie })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);
          
        if (!userRecord || userRecord.length === 0 || !userRecord[0].roblosecurity_cookie) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'No Roblox authentication found for this user',
          });
        }
        
        const roblosecurityCookie = userRecord[0].roblosecurity_cookie;
        
        // Prepare request headers
        const headers = await getRobloxHeaders(roblosecurityCookie);
        
        // Make the request to Roblox API
        const response = await fetch(`https://trades.roblox.com/v1/trades/${tradeId}`, {
          method: 'GET',
          headers
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Roblox API Error (${response.status}): ${errorData}`);
        }
        
        const tradeData = await response.json();
        const validatedData = detailedTradeSchema.parse(tradeData);
        
        // Store the detailed trade data
        await storeDetailedTrade(userId, validatedData);
        
        return {
          success: true,
          trade: validatedData
        };
      } catch (error: any) {
        console.error(`Error fetching trade details for ${tradeId}:`, error);
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch trade details: ${error.message}`,
          cause: error
        });
      }
    }),
    
  // Get trade data from database
  getStoredTrades: protectedProcedure
    .input(z.object({
      tradeType: z.enum(['inbound', 'outbound', 'completed', 'inactive', 'all']).default('all'),
      limit: z.number().min(10).max(100).default(50),
      cursor: z.string().optional()
    }))
    .output(z.object({
      success: z.boolean(),
      trades: z.array(z.any()),
      nextCursor: z.string().nullable(),
      count: z.number()
    }))
    .query(async ({ input, ctx }) => {
      // Log request information including headers and auth context
      console.log('[robloxTrades.getStoredTrades] Request:', {
        input,
        user: ctx.user,
        // headers: ctx.req?.headers,
        hasAuth: Boolean(ctx.user.id)
      });
      
      const { tradeType, limit, cursor } = input;
      const userId = ctx.user.id;
      
      try {
        // Create an array of conditions to apply
        const conditions = [eq(trades.userId, userId)];
        
        // Add trade type filter if not 'all'
        if (tradeType !== 'all') {
          conditions.push(eq(trades.tradeType, tradeType));
        }
        
        // Add cursor-based pagination
        if (cursor) {
          try {
            const decodedCursor = JSON.parse(atob(cursor));
            if (decodedCursor.lastId) {
              conditions.push(eq(trades.originalId, decodedCursor.lastId));
            }
          } catch (e) {
            console.error('Error parsing cursor:', e);
            // Continue without applying cursor condition
          }
        }
        
        // Apply all conditions together
        const results = await db
          .select()
          .from(trades)
          .where(and(...conditions))
          .limit(limit + 1);
        
        console.log(`[robloxTrades.getStoredTrades] Found ${results.length} trades for user ${userId}, type: ${tradeType}`);
        
        // Check if there's a next page
        let nextCursor = null;
        if (results.length > limit) {
          const lastItem = results[limit - 1];
          nextCursor = btoa(JSON.stringify({ lastId: lastItem.originalId }));
          results.pop(); // Remove the extra item
        }
        
        return {
          success: true,
          trades: results,
          nextCursor,
          count: results.length
        };
      } catch (error: any) {
        console.error('Error fetching stored trades:', error);
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch stored trades: ${error.message}`,
          cause: error
        });
      }
    }),

  // Get trade metadata
  getTradeMetadata: protectedProcedure
    .output(z.object({
      success: z.boolean(),
      metadata: z.object({
        maxItemsPerSide: z.number(),
        minValueRatio: z.number(),
        tradeSystemMaxRobuxPercent: z.number(),
        tradeSystemRobuxFee: z.number()
      }).optional(),
      message: z.string().optional()
    }))
    .query(async ({ ctx }) => {
      const userId = ctx.user.id;
      
      try {
        // Get user's Roblosecurity cookie
        const userRecord = await db
          .select({ roblosecurity_cookie: users.roblosecurity_cookie })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);
          
        if (!userRecord || userRecord.length === 0 || !userRecord[0].roblosecurity_cookie) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'No Roblox authentication found for this user',
          });
        }
        
        const roblosecurityCookie = userRecord[0].roblosecurity_cookie;
        
        // Prepare request headers
        const headers = await getRobloxHeaders(roblosecurityCookie);
        
        // Make the request to Roblox API
        const response = await fetch('https://trades.roblox.com/v1/trades/metadata', {
          method: 'GET',
          headers
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Roblox API Error (${response.status}): ${errorData}`);
        }
        
        const metadata = await response.json();
        
        return {
          success: true,
          metadata
        };
      } catch (error: any) {
        console.error('Error fetching trade metadata:', error);
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch trade metadata: ${error.message}`,
          cause: error
        });
      }
    }),
    
  // Get inbound trade count
  getInboundTradeCount: protectedProcedure
    .output(z.object({
      success: z.boolean(),
      count: z.number().optional(),
      message: z.string().optional()
    }))
    .query(async ({ ctx }) => {
      const userId = ctx.user.id;
      
      try {
        // Get user's Roblosecurity cookie
        const userRecord = await db
          .select({ roblosecurity_cookie: users.roblosecurity_cookie })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);
          
        if (!userRecord || userRecord.length === 0 || !userRecord[0].roblosecurity_cookie) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'No Roblox authentication found for this user',
          });
        }
        
        const roblosecurityCookie = userRecord[0].roblosecurity_cookie;
        
        // Prepare request headers
        const headers = await getRobloxHeaders(roblosecurityCookie);
        
        // Make the request to Roblox API
        const response = await fetch('https://trades.roblox.com/v1/trades/1/count', {
          method: 'GET',
          headers
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Roblox API Error (${response.status}): ${errorData}`);
        }
        
        const countData = await response.json();
        
        return {
          success: true,
          count: countData.count
        };
      } catch (error: any) {
        console.error('Error fetching inbound trade count:', error);
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch inbound trade count: ${error.message}`,
          cause: error
        });
      }
    }),

  // Check if user can trade with another user
  canTradeWith: protectedProcedure
    .input(z.object({
      userId: z.number().or(z.string())
    }))
    .output(z.object({
      success: z.boolean(),
      canTrade: z.boolean().optional(),
      status: z.number().optional(),
      message: z.string().optional()
    }))
    .query(async ({ input, ctx }) => {
      const targetUserId = input.userId;
      const userId = ctx.user.id;
      
      try {
        // Get user's Roblosecurity cookie
        const userRecord = await db
          .select({ roblosecurity_cookie: users.roblosecurity_cookie })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);
          
        if (!userRecord || userRecord.length === 0 || !userRecord[0].roblosecurity_cookie) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'No Roblox authentication found for this user',
          });
        }
        
        const roblosecurityCookie = userRecord[0].roblosecurity_cookie;
        
        // Prepare request headers
        const headers = await getRobloxHeaders(roblosecurityCookie);
        
        // Make the request to Roblox API
        const response = await fetch(`https://trades.roblox.com/v1/users/${targetUserId}/can-trade-with`, {
          method: 'GET',
          headers
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Roblox API Error (${response.status}): ${errorData}`);
        }
        
        const tradeEligibility = await response.json();
        
        return {
          success: true,
          canTrade: tradeEligibility.canTrade,
          status: tradeEligibility.status
        };
      } catch (error: any) {
        console.error(`Error checking trade eligibility with user ${targetUserId}:`, error);
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to check trade eligibility: ${error.message}`,
          cause: error
        });
      }
    }),
});

// Helper function to store trades in the database
async function storeTrades(userId: string, tradeList: any[], tradeType: string) {
  try {
    // For each trade, insert if not exists, update if exists
    for (const tradeData of tradeList) {
      const originalId = String(tradeData.id);
      const partnerUser = tradeData.user;
      
      // Check if trade already exists
      const existingTrade = await db
        .select()
        .from(trades)
        .where(and(
          eq(trades.originalId, originalId),
          eq(trades.userId, userId)
        ))
        .limit(1);
      
      const status = typeof tradeData.status === 'number' 
        ? mapTradeStatus(tradeData.status) 
        : tradeData.status;
      
      const tradeValues = {
        userId,
        tradePartnerId: String(partnerUser.id),
        tradePartnerName: partnerUser.name,
        tradePartnerDisplayName: partnerUser.displayName || null,
        created: new Date(tradeData.created),
        expiration: new Date(tradeData.expiration),
        isActive: tradeData.isActive,
        status,
        tradeType,
        rawData: JSON.stringify(tradeData),
        originalId,
        updatedAt: new Date()
      };
      
      if (existingTrade.length === 0) {
        // Insert new trade
        await db.insert(trades).values({
          ...tradeValues,
          createdAt: new Date()
        });
      } else {
        // Update existing trade
        await db
          .update(trades)
          .set(tradeValues)
          .where(eq(trades.id, existingTrade[0].id));
      }
    }
  } catch (error) {
    console.error('Error storing trades in database:', error);
    throw error;
  }
}

// Helper function to store detailed trade data
async function storeDetailedTrade(userId: string, tradeData: any) {
  try {
    const originalId = String(tradeData.id);
    const partnerUser = tradeData.user;
    
    // Determine trade type based on status
    let tradeType = 'unknown';
    if (typeof tradeData.status === 'number') {
      if (tradeData.status === 0 || tradeData.status === 1) {
        tradeType = 'inbound'; // Assuming inbound for now, might need to check offers
      } else if (tradeData.status === 2) {
        tradeType = 'completed';
      } else if (tradeData.status >= 3) {
        tradeType = 'inactive';
      }
    } else if (typeof tradeData.status === 'string') {
      if (tradeData.status === 'Open' || tradeData.status === 'Pending') {
        tradeType = 'inbound'; // Assuming inbound for now
      } else if (tradeData.status === 'Completed') {
        tradeType = 'completed';
      } else {
        tradeType = 'inactive';
      }
    }
    
    const status = typeof tradeData.status === 'number' 
      ? mapTradeStatus(tradeData.status) 
      : tradeData.status;
    
    // Check if trade exists
    const existingTrade = await db
      .select()
      .from(trades)
      .where(and(
        eq(trades.originalId, originalId),
        eq(trades.userId, userId)
      ))
      .limit(1);
    
    // Common trade values
    const tradeValues = {
      userId,
      tradePartnerId: String(partnerUser.id),
      tradePartnerName: partnerUser.name,
      tradePartnerDisplayName: partnerUser.displayName || null,
      created: new Date(tradeData.created),
      expiration: new Date(tradeData.expiration),
      isActive: tradeData.isActive,
      status,
      tradeType,
      rawData: JSON.stringify(tradeData),
      originalId,
      updatedAt: new Date()
    };
    
    let tradeId: string;
    
    if (existingTrade.length === 0) {
      // Insert new trade and get the ID
      const [insertResult] = await db.insert(trades).values({
        ...tradeValues,
        createdAt: new Date()
      }).returning({ id: trades.id });
      
      tradeId = insertResult.id;
    } else {
      // Update existing trade
      tradeId = existingTrade[0].id;
      await db
        .update(trades)
        .set(tradeValues)
        .where(eq(trades.id, tradeId));
    }
    
    // Now handle the trade items
    if (tradeData.offers && Array.isArray(tradeData.offers)) {
      // Clear existing items for this trade to avoid duplicates
      await db
        .delete(tradeItems)
        .where(eq(tradeItems.tradeId, tradeId));
      
      for (let i = 0; i < tradeData.offers.length; i++) {
        const offer = tradeData.offers[i];
        const offerType = i === 0 ? 'user_offer' : 'partner_offer';
        
        // Save Robux amount if present
        if (offer.robux && offer.robux > 0) {
          await db.insert(tradeItems).values({
            tradeId,
            assetId: 'robux', // Special case for Robux
            assetName: 'Robux',
            offerType,
            robuxAmount: offer.robux,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
        
        // Save each asset in the offer
        if (offer.userAssets && Array.isArray(offer.userAssets)) {
          for (const asset of offer.userAssets) {
            await db.insert(tradeItems).values({
              tradeId,
              assetId: String(asset.assetId),
              assetName: asset.name,
              serialNumber: asset.serialNumber || null,
              recentAveragePrice: asset.recentAveragePrice || null,
              offerType,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Error storing detailed trade data:', error);
    throw error;
  }
} 