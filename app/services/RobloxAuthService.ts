import { trpc } from '@/utils/trpc';
import { useState } from 'react';

interface QuickLoginResponse {
    code: string;
    privateKey: string;
    status: string;
    expirationTime: string;
    directQrUrl: string;
}

interface CurrentSession {
    code: string;
    privateKey: string;
    status: string;
    expirationTime: string;
    csrfToken: string;
}

export function useRobloxAuth() {
    const [currentSession, setCurrentSession] = useState<CurrentSession | null>(null);

    const getCsrfToken = trpc.robloxAuth.getCsrfToken.useMutation();
    const createSession = trpc.robloxAuth.createSession.useMutation();
    const checkStatus = trpc.robloxAuth.checkStatus.useMutation();
    const completeLogin = trpc.robloxAuth.completeLogin.useMutation();

    const createQuickLoginSession = async (): Promise<QuickLoginResponse> => {
        try {
            const result = await createSession.mutateAsync();
            const csrfToken = await getCsrfToken.mutateAsync();
            
            setCurrentSession({
                code: result.code,
                privateKey: result.privateKey,
                status: result.status,
                expirationTime: result.expirationTime,
                csrfToken: csrfToken.csrfToken,
            });

            return {
                ...result,
                directQrUrl: result.directQrUrl,
            };
        } catch (error) {
            console.error('Failed to create quick login session:', error);
            throw error;
        }
    };

    const checkQuickLoginStatus = async (): Promise<{
        success: boolean;
        status: string;
        accountName?: string;
        message?: string;
    }> => {
        if (!currentSession) {
            throw new Error('No active session');
        }

        try {
            const result = await checkStatus.mutateAsync({
                code: currentSession.code,
                privateKey: currentSession.privateKey,
                csrfToken: currentSession.csrfToken,
            });

            if (result.success && result.status === 'Validated') {
                await completeQuickLogin();
            }

            return result;
        } catch (error) {
            console.error('Failed to check quick login status:', error);
            throw error;
        }
    };

    const completeQuickLogin = async (): Promise<void> => {
        if (!currentSession) {
            throw new Error('No active session');
        }

        try {
            await completeLogin.mutateAsync({
                code: currentSession.code,
                privateKey: currentSession.privateKey,
                csrfToken: currentSession.csrfToken,
            });
        } catch (error) {
            console.error('Failed to complete quick login:', error);
            throw error;
        }
    };

    return {
        currentSession,
        createQuickLoginSession,
        checkQuickLoginStatus,
        completeQuickLogin,
    };
} 