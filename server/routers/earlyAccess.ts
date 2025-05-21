import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '@/lib/redis';
import { router, publicProcedure } from '../trpc';
import { earlyAccess } from '@/auth-schema';
import { db } from '@/database/db';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { generateVerificationCode, sendVerificationEmail } from '@/lib/email';

// Email validation regex
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Set up rate limiting - 2 requests per 30 minutes
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, '30m'),
  analytics: true,
  prefix: 'ratelimit:early-access',
});

// Safe function to get IP from request
function getClientIp(req: any): string {
  let ip = 'unknown-ip';
  
  try {
    // Try Next.js Request format first
    if (typeof req.headers.get === 'function') {
      ip = req.headers.get('x-forwarded-for') || 
           req.headers.get('cf-connecting-ip') || 
           'unknown-ip';
    } 
    // Then try standard Node.js format
    else if (req.headers) {
      const forwardedFor = req.headers['x-forwarded-for'];
      const cfIp = req.headers['cf-connecting-ip'];
      
      ip = forwardedFor || cfIp || 'unknown-ip';
    }
    
    // Handle array case
    if (Array.isArray(ip)) {
      ip = ip[0];
    }
    
  } catch (error) {
    console.error('Error getting client IP:', error);
  }
  
  return typeof ip === 'string' ? ip : 'unknown-ip';
}

// Store verification codes temporarily (in production this would use Redis)
const verificationCodes: Record<string, { code: string, expires: number }> = {};

export const earlyAccessRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email('Invalid email format'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Get IP address for rate limiting
        const ipAddress = getClientIp(ctx.req);

        // Apply rate limiting
        const { success, limit, reset, remaining } = await ratelimit.limit(ipAddress);

        // if (!success) {
        //   throw new TRPCError({
        //     code: 'TOO_MANY_REQUESTS',
        //     message: 'Too many requests. Please try again later.',
        //   });
        // }

        // Validate email
        const { email } = input;
        if (!EMAIL_REGEX.test(email)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Invalid email format',
          });
        }

        // Check if email already exists
        const existingUser = await db.select().from(earlyAccess).where(eq(earlyAccess.email, email)).limit(1);
        const userExists = existingUser.length > 0;
        
        // Create timestamp
        const now = new Date();
        
        try {
          // If user doesn't exist, create a new entry
          if (!userExists) {
            await db.insert(earlyAccess).values({
              id: crypto.randomUUID(),
              email: email,
              createdAt: now,
              updatedAt: now,
              isEarlyAccess: false,
              emailVerified: false,
              hasUsedTicket: '',
            });
          }

          // Generate and send verification code
          const verificationCode = generateVerificationCode();
          
          // Store the code (with 10 minute expiration)
          verificationCodes[email] = {
            code: verificationCode,
            expires: Date.now() + 10 * 60 * 1000, // 10 minutes
          };
          
          // Send verification email
          const emailSent = await sendVerificationEmail(email, verificationCode);
          
          return {
            success: true,
            message: userExists ? 'Email already registered, verification code sent' : 'Successfully joined early access waiting list',
            emailSent,
            userExists,
            rateLimit: {
              limit,
              remaining, 
              reset
            }
          };
        } catch (err: any) {
          // Re-throw other database errors
          throw err;
        }
      } catch (error: any) {
        // Log detailed error internally
        console.error('Early access registration error:', error);
        
        // Only expose error message in development
        if (process.env.NODE_ENV === 'development') {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error instanceof Error ? error.message : String(error),
            cause: error
          });
        }
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error'
        });
      }
    }),

  verifyEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        code: z.string().length(6)
      })
    )
    .mutation(async ({ input }) => {
      const { email, code } = input;
      
      // Check if the verification code exists and is valid
      const storedVerification = verificationCodes[email];
      
      if (!storedVerification) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Verification code not found. Please request a new code.'
        });
      }
      
      // Check if code has expired
      if (storedVerification.expires < Date.now()) {
        // Remove expired code
        delete verificationCodes[email];
        
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Verification code has expired. Please request a new code.'
        });
      }
      
      // Check if code matches
      if (storedVerification.code !== code) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid verification code'
        });
      }
      
      // Code is valid, remove it from storage
      delete verificationCodes[email];
      
      // Update the database to mark the email as verified
      try {
        await db.update(earlyAccess)
          .set({ emailVerified: true })
          .where(eq(earlyAccess.email, email));
          
        return {
          success: true,
          message: 'Email verified successfully'
        };
      } catch (error) {
        console.error('Error updating verification status:', error);
        
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update verification status'
        });
      }
    }),
    
  resendCode: publicProcedure
    .input(
      z.object({
        email: z.string().email()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = input;
      
      // Apply rate limiting for resending codes (more strict)
      const ipAddress = getClientIp(ctx.req);
      const resendLimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '30m'), // 3 requests per 30 min
        analytics: true,
        prefix: 'ratelimit:resend-code',
      });
      
      const { success } = await resendLimit.limit(ipAddress);
      
      if (!success) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: 'Too many code requests. Please try again later.'
        });
      }
      
      // Generate a new verification code
      const verificationCode = generateVerificationCode();
      
      // Store the code (with 10 minute expiration)
      verificationCodes[email] = {
        code: verificationCode,
        expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      };
      
      // Send verification email
      const emailSent = await sendVerificationEmail(email, verificationCode);
      
      if (!emailSent) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send verification email'
        });
      }
      
      return {
        success: true,
        message: 'Verification code sent'
      };
    })
}); 