import { NextResponse } from 'next/server';
import { db } from '@/database/db';
import { users } from '@/auth-schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        // Get the current user's session
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get the cookie from the request body
        const { roblosecurityCookie } = await req.json();
        
        if (!roblosecurityCookie) {
            return NextResponse.json(
                { error: 'Missing .ROBLOSECURITY cookie' },
                { status: 400 }
            );
        }

        // Basic validation of the cookie format
        if (!roblosecurityCookie.startsWith('_|WARNING:-DO-NOT-SHARE-THIS')) {
            return NextResponse.json(
                { error: 'Invalid .ROBLOSECURITY cookie format' },
                { status: 400 }
            );
        }

        // Store the cookie in the database
        await db
            .update(users)
            .set({
                roblosecurity_cookie: roblosecurityCookie,
                updatedAt: new Date(),
            })
            .where(eq(users.id, session.user.id));

        return NextResponse.json({
            success: true,
            message: 'Roblox account linked successfully'
        });
    } catch (error) {
        console.error('Error storing Roblox cookie:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 