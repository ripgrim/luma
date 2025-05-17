interface QuickLoginResponse {
    code: string;
    privateKey: string;
    status: string;
    expirationTime: string;
    directQrUrl: string;
}

interface QuickLoginStatus {
    success: boolean;
    status: string;
    accountName?: string;
    message?: string;
}

export class RobloxAuthService {
    private static instance: RobloxAuthService;
    private currentSession: {
        code: string;
        privateKey: string;
        status: string;
        expirationTime: string;
        csrfToken: string;
    } | null = null;

    private constructor() {}

    public static getInstance(): RobloxAuthService {
        if (!RobloxAuthService.instance) {
            RobloxAuthService.instance = new RobloxAuthService();
        }
        return RobloxAuthService.instance;
    }

    private async getCsrfToken(): Promise<string> {
        const response = await fetch('/api/roblox/auth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get CSRF token');
        }

        const data = await response.json();
        if (!data.csrfToken) {
            throw new Error('No CSRF token in response');
        }

        return data.csrfToken;
    }

    public async createQuickLoginSession(): Promise<QuickLoginResponse> {
        try {
            const response = await fetch('/api/roblox/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'createSession',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create quick login session');
            }

            const data = await response.json();
            
            // Get CSRF token after creating session
            const csrfToken = await this.getCsrfToken();
            
            this.currentSession = {
                code: data.code,
                privateKey: data.privateKey,
                status: 'Pending',
                expirationTime: data.expirationTime,
                csrfToken,
            };

            return {
                ...data,
                status: 'Pending',
            };
        } catch (error) {
            console.error('Error creating quick login session:', error);
            throw error;
        }
    }

    public async checkQuickLoginStatus(): Promise<QuickLoginStatus> {
        if (!this.currentSession) {
            return {
                success: false,
                status: 'NoSession',
                message: 'No active session found',
            };
        }

        try {
            const response = await fetch('/api/roblox/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'checkStatus',
                    code: this.currentSession.code,
                    privateKey: this.currentSession.privateKey,
                    csrfToken: this.currentSession.csrfToken,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to check quick login status');
            }

            const data = await response.json();
            
            // Update session status
            this.currentSession.status = data.status;
            
            // If the session is validated, we can proceed with completion
            if (data.status === 'Validated') {
                try {
                    await this.completeQuickLogin();
                    return {
                        success: true,
                        status: 'Completed',
                        accountName: data.accountName,
                    };
                } catch (error) {
                    console.error('Error completing login:', error);
                    return {
                        success: false,
                        status: 'Error',
                        message: 'Failed to complete login',
                    };
                }
            }

            return {
                success: data.success,
                status: data.status,
                accountName: data.accountName,
                message: data.message,
            };
        } catch (error) {
            console.error('Error checking quick login status:', error);
            return {
                success: false,
                status: 'Error',
                message: 'Failed to check quick login status',
            };
        }
    }

    public async completeQuickLogin(): Promise<string> {
        if (!this.currentSession) {
            throw new Error('No active session found');
        }

        if (this.currentSession.status !== 'Validated') {
            throw new Error('Session is not validated');
        }

        try {
            const response = await fetch('/api/roblox/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'completeLogin',
                    code: this.currentSession.code,
                    privateKey: this.currentSession.privateKey,
                    csrfToken: this.currentSession.csrfToken,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to complete quick login');
            }

            // Clear the current session
            this.currentSession = null;

            return 'success';
        } catch (error) {
            console.error('Error completing quick login:', error);
            throw error;
        }
    }

    public cancelSession(): void {
        this.currentSession = null;
    }

    public getCurrentSession() {
        return this.currentSession;
    }
} 