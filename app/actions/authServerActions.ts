"use server";

import { db } from "@/database/db";
import { users } from "@/auth-schema";
import { eq } from "drizzle-orm";

/**
 * Server Action to check if a user has a Roblosecurity cookie stored in the database.
 * @param userId - The ID of the user.
 * @returns True if the cookie is present and non-empty, false otherwise.
 */
export async function checkUserRobloCookieStatus(userId: string | undefined): Promise<boolean> {
  if (!userId) {
    return false;
  }

  try {
    const dbUser = await db
      .select({
        roblosecurity_cookie: users.roblosecurity_cookie,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (dbUser.length > 0 && dbUser[0].roblosecurity_cookie && dbUser[0].roblosecurity_cookie.trim() !== "") {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking Roblosecurity cookie status:", error);
    return false; // Or throw the error, depending on how you want to handle DB errors
  }
} 