import { Redis } from "@upstash/redis"

// Get Redis configuration from environment variables
const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

// Create a Redis client using Upstash Redis if configuration is available
let redisClient: Redis | null = null

try {
  if (redisUrl && redisToken) {
    redisClient = new Redis({
      url: redisUrl,
      token: redisToken
    })
  } else {
    console.warn("Redis configuration is missing. Some features may not work correctly.")
  }
} catch (error) {
  console.error("Failed to initialize Redis client:", error)
}

// Export the Redis client (possibly null if configuration is missing)
export const redis = redisClient
