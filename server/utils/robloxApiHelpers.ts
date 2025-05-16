import { TRPCError } from '@trpc/server';
import { db } from '@/database/db'; // Assuming db is accessible here for the helper
import { users } from '@/auth-schema'; // Assuming users schema is accessible
import { eq } from 'drizzle-orm';

// Utility function to get Roblox authentication headers with CSRF token
export async function getRobloxHeaders(roblosecurityCookie: string) {
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
    'Origin': 'https://www.roblox.com',
    'Referer': 'https://www.roblox.com/trades'
  };
}

// Helper function to get Roblosecurity token for a user
// Pass db as an argument to make it more testable and less reliant on a global import
export async function getRoblosecurityTokenForUser(userId: string, dbInstance: typeof db): Promise<string> {
  const userRecord = await dbInstance
    .select({ roblosecurity_cookie: users.roblosecurity_cookie })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!userRecord || userRecord.length === 0 || !userRecord[0]?.roblosecurity_cookie) {
    console.error('[getRoblosecurityTokenForUser] Roblosecurity cookie not found for user:', userId);
    throw new TRPCError({
      code: 'UNAUTHORIZED', 
      message: 'Roblosecurity cookie not found for the user. Please ensure it is set in your profile.',
    });
  }
  return userRecord[0].roblosecurity_cookie;
} 