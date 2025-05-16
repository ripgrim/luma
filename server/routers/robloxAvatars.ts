import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

// Define Zod schema for avatar response
const AvatarResponseSchema = z.object({
  avatars: z.record(z.string(), z.string())
});

// Define Zod schema for the Roblox API response
const RobloxAvatarResponseSchema = z.object({
  data: z.array(z.object({
    targetId: z.number(),
    state: z.string(),
    imageUrl: z.string(),
    version: z.string()
  }))
});

// Simple in-memory cache with expiration
type CacheEntry = {
  url: string;
  timestamp: number;
};

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const avatarCache = new Map<string, CacheEntry>();

// Clean expired cache entries
const cleanCache = () => {
  const now = Date.now();
  for (const [userId, entry] of avatarCache.entries()) {
    if (now - entry.timestamp > CACHE_DURATION) {
      avatarCache.delete(userId);
    }
  }
};

export const robloxAvatarsRouter = router({
  getUserAvatars: publicProcedure
    .input(z.object({
      userIds: z.array(z.string().min(1))
    }))
    .output(AvatarResponseSchema)
    .query(async ({ input }) => {
      try {
        // Clean cache periodically
        cleanCache();
        
        const { userIds } = input;
        
        // Check which IDs need to be fetched from Roblox API
        const cachedUrls: Record<string, string> = {};
        const idsToFetch: string[] = [];
        
        userIds.forEach(userId => {
          if (!userId) return;
          
          const cached = avatarCache.get(userId);
          if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            cachedUrls[userId] = cached.url;
          } else {
            idsToFetch.push(userId);
          }
        });
        
        // Fetch new avatars if needed
        if (idsToFetch.length > 0) {
          // Add logging for debugging
          console.log(`[robloxAvatars.getUserAvatars] Fetching avatars for ${idsToFetch.length} users`);
          
          const response = await fetch(
            `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${idsToFetch.join(',')}&size=150x150&format=Png`, 
            { next: { revalidate: 3600 } } // Revalidate cache every hour
          );
          
          if (!response.ok) {
            console.error(`[robloxAvatars.getUserAvatars] Error fetching Roblox avatars: ${response.status} ${response.statusText}`);
            // Return cached results if the request fails
            return { avatars: cachedUrls };
          }
          
          const data = await response.json();
          
          // Validate the response
          const validatedData = RobloxAvatarResponseSchema.parse(data);
          
          // Process the validated data
          validatedData.data.forEach((item) => {
            if (item.state === "Completed" && item.imageUrl) {
              const userId = item.targetId.toString();
              cachedUrls[userId] = item.imageUrl;
              
              // Update cache
              avatarCache.set(userId, {
                url: item.imageUrl,
                timestamp: Date.now()
              });
            }
          });
        }
        
        return { avatars: cachedUrls };
      } catch (error: any) {
        console.error('[robloxAvatars.getUserAvatars] Error:', error);
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch avatar images: ${error.message}`,
          cause: error
        });
      }
    })
}); 