import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

// Define Zod schema for item thumbnails response
const ItemThumbnailsResponseSchema = z.object({
  thumbnails: z.record(z.string(), z.string())
});

// Define Zod schema for the Roblox Item Thumbnails API response
const RobloxItemThumbnailsResponseSchema = z.object({
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
const itemThumbnailCache = new Map<string, CacheEntry>();

// Clean expired cache entries
const cleanCache = () => {
  const now = Date.now();
  for (const [assetId, entry] of itemThumbnailCache.entries()) {
    if (now - entry.timestamp > CACHE_DURATION) {
      itemThumbnailCache.delete(assetId);
    }
  }
};

export const robloxItemsRouter = router({
  getItemThumbnails: publicProcedure
    .input(z.object({
      assetIds: z.array(z.union([z.string(), z.number()]))
    }))
    .output(ItemThumbnailsResponseSchema)
    .query(async ({ input }) => {
      try {
        // Clean cache periodically
        cleanCache();
        
        const { assetIds } = input;
        
        // Check which assets need to be fetched from Roblox API
        const cachedUrls: Record<string, string> = {};
        const idsToFetch: string[] = [];
        
        assetIds.forEach(assetId => {
          if (!assetId) return;
          
          const assetIdStr = assetId.toString();
          const cached = itemThumbnailCache.get(assetIdStr);
          
          if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            cachedUrls[assetIdStr] = cached.url;
          } else {
            idsToFetch.push(assetIdStr);
          }
        });
        
        // Fetch new item thumbnails if needed
        if (idsToFetch.length > 0) {
          console.log(`[robloxItems.getItemThumbnails] Fetching thumbnails for ${idsToFetch.length} items`);
          
          const response = await fetch(
            `https://thumbnails.roblox.com/v1/assets?assetIds=${idsToFetch.join(',')}&size=420x420&format=Png`, 
            { next: { revalidate: 3600 } } // Revalidate cache every hour
          );
          
          if (!response.ok) {
            console.error(`[robloxItems.getItemThumbnails] Error fetching item thumbnails: ${response.status} ${response.statusText}`);
            // Return cached results if the request fails
            return { thumbnails: cachedUrls };
          }
          
          const data = await response.json();
          console.log(`[robloxItems.getItemThumbnails] Response data:`, data);
          
          // Validate the response
          const validatedData = RobloxItemThumbnailsResponseSchema.parse(data);
          
          // Process the validated data
          validatedData.data.forEach((item) => {
            if (item.state === "Completed" && item.imageUrl) {
              const assetId = item.targetId.toString();
              cachedUrls[assetId] = item.imageUrl;
              
              // Update cache
              itemThumbnailCache.set(assetId, {
                url: item.imageUrl,
                timestamp: Date.now()
              });
            }
          });
        }
        
        return { thumbnails: cachedUrls };
      } catch (error: any) {
        console.error('[robloxItems.getItemThumbnails] Error:', error);
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch item thumbnails: ${error.message}`,
          cause: error
        });
      }
    })
}); 