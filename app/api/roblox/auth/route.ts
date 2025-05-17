import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

const ROBOX_API_BASE = 'https://apis.roblox.com/auth-token-service/v1';

// Add GET handler for CSRF token
export async function GET(req: Request) {
    try {
        // Get the current user's session
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Forward the original request headers
        const headers = new Headers({
            'Content-Type': 'application/json',
            'User-Agent': req.headers.get('user-agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': req.headers.get('accept-language') || 'en-US,en;q=0.9',
            'Origin': 'https://www.roblox.com',
            'Referer': 'https://www.roblox.com/',
            'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
        });

        console.log('Making CSRF token request with headers:', Object.fromEntries(headers.entries()));

        // Use POST instead of GET and include an empty body
        const response = await fetch('https://auth.roblox.com/v2/login', {
            method: 'POST',
            headers,
            body: JSON.stringify({}), // Empty body for initial request
            credentials: 'include', // Include cookies in the request
        });

        console.log('CSRF token response status:', response.status);
        console.log('CSRF token response headers:', Object.fromEntries(response.headers.entries()));

        // Extract CSRF token regardless of response status
        const csrfToken = response.headers.get('x-csrf-token');
        if (!csrfToken) {
            console.error('No CSRF token in response headers:', Object.fromEntries(response.headers.entries()));
            throw new Error('No CSRF token in response');
        }

        // Even if the request failed, we got the token we needed
        return NextResponse.json({ csrfToken });
    } catch (error) {
        console.error('Error getting CSRF token:', error);
        return NextResponse.json(
            { 
                error: error instanceof Error ? error.message : 'Internal server error',
                details: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}

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

        // Read the request body once
        const body = await req.json();
        const { action, code, privateKey, csrfToken } = body;

        // Validate CSRF token for all actions except createSession
        if (action !== 'createSession' && !csrfToken) {
            return NextResponse.json(
                { error: 'Missing CSRF token' },
                { status: 400 }
            );
        }

        // Common headers for all Roblox requests
        const getRobloxHeaders = (csrfToken?: string) => {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                'User-Agent': req.headers.get('user-agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': req.headers.get('accept-language') || 'en-US,en;q=0.9',
                'Origin': 'https://www.roblox.com',
                'Referer': 'https://www.roblox.com/',
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
            };

            if (csrfToken) {
                headers['x-csrf-token'] = csrfToken;
            }

            return headers;
        };

        switch (action) {
            case 'createSession': {
                const response = await fetch(`${ROBOX_API_BASE}/login/create`, {
                    method: 'POST',
                    headers: getRobloxHeaders(),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Roblox create session error:', {
                        status: response.status,
                        statusText: response.statusText,
                        error: errorText,
                        headers: Object.fromEntries(response.headers.entries())
                    });
                    throw new Error(`Failed to create quick login session: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                
                // Construct the QR code URL
                const qrCodeUrl = `https://apis.roblox.com/auth-token-service/v1/login/qr-code-image?key=${data.privateKey}&code=${data.code}`;
                
                return NextResponse.json({
                    ...data,
                    directQrUrl: qrCodeUrl
                });
            }

            case 'checkStatus': {
                if (!code || !privateKey) {
                    return NextResponse.json(
                        { error: 'Missing code or privateKey' },
                        { status: 400 }
                    );
                }
                
                console.log('Checking Roblox login status with:', { code, privateKey, csrfToken });
                
                const response = await fetch(`${ROBOX_API_BASE}/login/status`, {
                    method: 'POST',
                    headers: getRobloxHeaders(csrfToken),
                    body: JSON.stringify({
                        code,
                        privateKey,
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Roblox check status error:', {
                        status: response.status,
                        statusText: response.statusText,
                        error: errorText,
                        code,
                        privateKey,
                        csrfToken,
                        headers: Object.fromEntries(response.headers.entries())
                    });
                    throw new Error(`Failed to check quick login status: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Roblox check status response:', data);

                // Handle different session states
                if (data.status === 'Created') {
                    // If the session is still in Created state, we need to wait for the user to scan the QR code
                    return NextResponse.json({
                        success: true,
                        status: 'Pending',
                        message: 'Waiting for QR code scan'
                    });
                } else if (data.status === 'Validated') {
                    // Session is validated, ready for completion
                    return NextResponse.json({
                        success: true,
                        status: 'Validated',
                        accountName: data.accountName
                    });
                } else if (data.status === 'Expired' || data.status === 'Cancelled') {
                    // Session is no longer valid
                    return NextResponse.json({
                        success: false,
                        status: data.status,
                        message: `Session ${data.status.toLowerCase()}`
                    });
                }

                // For any other status, return as is
                return NextResponse.json({
                    success: true,
                    ...data
                });
            }

            case 'completeLogin': {
                if (!code || !privateKey) {
                    return NextResponse.json(
                        { error: 'Missing code or privateKey' },
                        { status: 400 }
                    );
                }
                
                console.log('Completing Roblox login with:', { code, privateKey, csrfToken });
                
                const response = await fetch('https://auth.roblox.com/v2/login', {
                    method: 'POST',
                    headers: getRobloxHeaders(csrfToken),
                    body: JSON.stringify({
                        ctype: 'AuthToken',
                        cvalue: code,
                        password: privateKey,
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Roblox complete login error:', {
                        status: response.status,
                        statusText: response.statusText,
                        error: errorText,
                        code,
                        privateKey,
                        csrfToken,
                        headers: Object.fromEntries(response.headers.entries())
                    });
                    throw new Error(`Failed to complete quick login: ${response.status} ${response.statusText}`);
                }

                // Extract .ROBLOSECURITY cookie
                const cookies = response.headers.get('set-cookie');
                const roblosecurityMatch = cookies?.match(/\.ROBLOSECURITY=([^;]+)/);
                
                if (!roblosecurityMatch) {
                    console.error('No .ROBLOSECURITY cookie found in response:', {
                        cookies,
                        headers: Object.fromEntries(response.headers.entries())
                    });
                    throw new Error('Failed to extract .ROBLOSECURITY cookie');
                }

                const roblosecurityCookie = roblosecurityMatch[1];

                // Get the base URL from the request
                const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
                const host = req.headers.get('host') || 'localhost:3000';
                const baseUrl = `${protocol}://${host}`;

                // Forward the original request's cookies and authorization headers
                const storeResponse = await fetch(`${baseUrl}/api/roblox/complete-authentication`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': req.headers.get('cookie') || '',
                        'Authorization': req.headers.get('authorization') || '',
                    },
                    body: JSON.stringify({
                        roblosecurityCookie,
                    }),
                });

                if (!storeResponse.ok) {
                    const errorText = await storeResponse.text();
                    console.error('Failed to store cookie:', {
                        status: storeResponse.status,
                        statusText: storeResponse.statusText,
                        error: errorText,
                        headers: Object.fromEntries(storeResponse.headers.entries())
                    });
                    throw new Error('Failed to store cookie on server');
                }

                return NextResponse.json({ success: true });
            }

            default:
                return NextResponse.json(
                    { error: 'Invalid action' },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error('Error in Roblox auth proxy:', error);
        return NextResponse.json(
            { 
                error: error instanceof Error ? error.message : 'Internal server error',
                details: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        );
    }
} 