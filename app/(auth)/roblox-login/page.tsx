'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/auth-hooks';
import { trpc } from '@/utils/trpc';
import Image from 'next/image';
import { TRPCClientError } from '@trpc/client';
import { type AppRouter } from '@/server/root';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Countdown component that prevents hydration errors
const Countdown = ({ expirationTime }: { expirationTime: string }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const expiration = new Date(expirationTime);
      const difference = expiration.getTime() - now.getTime();
      
      if (difference <= 0) {
        setSecondsLeft(0);
        setIsExpired(true);
        return 'Expired';
      }
      
      const minutes = Math.floor(difference / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setSecondsLeft(minutes * 60 + seconds);
      
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [expirationTime]);
  
  if (!mounted) return null;
  
  // Calculate progress (from 0 to 100%)
  const progress = Math.max(0, Math.min(100, secondsLeft / 300 * 100)); // Assuming 5 minutes is the default expiration time
  
  return (
    <div className="w-full mt-3 mb-0">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-muted-foreground">
          {isExpired ? 'Session expired' : 'Session expires in'}
        </span>
        <span className={`text-sm font-mono font-bold ${isExpired ? 'text-destructive' : 'text-primary'}`}>
          {timeLeft}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${isExpired ? 'bg-destructive' : 'bg-primary'}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Create a Roblox Icon component
const RobloxIcon = ({ className }: { className?: string }) => (
    <svg width="100" height="auto" viewBox="0 0 800 148" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} >
        <path d="M96.449 96.0107L119.477 138.156H76.7498L57.3066 102.139H38.8866V138.156H0V10.4827H71.1215C100.542 10.4827 119.221 26.8115 119.221 56.1765C119.221 75.0722 110.522 88.6083 96.449 96.0107ZM38.8866 43.6644V68.9438H66.5165C74.7032 68.9438 79.8198 64.0922 79.8198 56.1765C79.8198 48.2607 74.7032 43.6644 66.5165 43.6644H38.8866ZM243.044 147.594L126.64 116.186L157.852 0L216.053 15.7039L274.255 31.4077L243.044 147.594ZM221.042 62.0494L188.551 53.1123L179.853 85.5414L212.344 94.4813L221.042 62.0494ZM407.547 102.139C407.547 126.652 391.941 138.156 367.637 138.156H291.399V10.4827H365.079C389.383 10.4827 404.989 22.9947 404.989 44.9546C404.989 58.7434 399.872 67.9386 390.15 74.3223C401.151 79.1577 407.547 88.8636 407.547 102.139ZM329.262 41.1244V60.0201H354.576C361.484 60.0201 365.577 56.9559 365.577 50.3169C365.577 44.1886 361.484 41.1244 354.576 41.1244H329.262ZM329.262 107.515H357.66C364.311 107.515 368.162 103.94 368.162 97.8089C368.162 91.1725 364.325 88.1083 357.66 88.1083H329.262V107.515ZM426.735 10.4827H465.616V100.354H521.387V138.156H426.729L426.735 10.4827ZM664.406 74.3223C664.406 87.453 660.505 100.289 653.196 111.207C645.887 122.125 635.498 130.634 623.344 135.659C611.19 140.684 597.816 141.999 584.913 139.437C572.01 136.875 560.158 130.552 550.855 121.267C541.553 111.982 535.217 100.153 532.651 87.2744C530.084 74.3959 531.402 61.047 536.436 48.9158C541.471 36.7845 549.996 26.4158 560.935 19.1207C571.873 11.8256 584.734 7.9319 597.889 7.9319C606.628 7.91455 615.284 9.6195 623.362 12.9489C631.439 16.2784 638.778 21.1668 644.958 27.3337C651.138 33.5007 656.037 40.8248 659.374 48.8859C662.712 56.9471 664.422 65.5866 664.406 74.3088V74.3223ZM625.519 74.3223C625.519 58.488 612.983 45.976 597.889 45.976C582.795 45.976 570.257 58.488 570.257 74.3223C570.257 90.1565 582.795 102.666 597.889 102.666C612.983 102.666 625.519 90.1377 625.519 74.3088V74.3223ZM758.041 72.2768L800 138.156H753.681L730.667 100.607L706.874 138.156H659.801L703.548 73.8062L663.383 10.4827H709.688L730.922 44.9546L751.389 10.4827H797.439L758.041 72.2768Z" fill="white" />
    </svg>
);

export default function RobloxLoginPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [expirationTime, setExpirationTime] = useState<string | null>(null);
    const [loginStatus, setLoginStatus] = useState<string>('waiting');
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [accountName, setAccountName] = useState<string | null>(null);
    // Add a ref to prevent multiple requests
    const isInitiatingRef = useRef(false);

    const createSession = trpc.robloxAuth.createQuickLoginSession.useMutation({
        onSuccess: (data) => {
            setSessionId(data.sessionId);
            setQrCode(data.directQrUrl);
            setExpirationTime(data.expirationTime);
            setLoginStatus('pending');
            isInitiatingRef.current = false;
        },
        onError: (error) => {
            setStatusMessage(`Error creating session: ${error.message}`);
            setLoginStatus('error');
            isInitiatingRef.current = false;
        }
    });

    // Call checkStatus only when we have a sessionId and are pending
    const { data: statusData, error: statusError } = trpc.robloxAuth.checkQuickLoginStatus.useQuery(
        { sessionId: sessionId || '' },
        {
            enabled: !!sessionId && loginStatus === 'pending',
            refetchInterval: 3000,
        }
    );

    // Process the status data in a useEffect
    useEffect(() => {
        if (statusData) {
            console.log('Received status data:', statusData);
            
            // If already validated or completing, don't process further status updates
            if (loginStatus === 'validated' || loginStatus === 'completing') {
                return;
            }
            
            // If we got an error message but the status check wasn't successful, show it
            if (!statusData.success && statusData.message) {
                // Don't set error status, just show the message temporarily
                setStatusMessage(statusData.message);
                console.log('Status check issue:', statusData.message);
                // Clear the message after a bit
                setTimeout(() => {
                    if (loginStatus === 'pending') {
                        setStatusMessage('');
                    }
                }, 3000);
                return;
            }
            
            // Process normal status updates
            if (statusData.status === 'Validated') {
                setLoginStatus('validated');
                // Ensure we're getting the raw account name without asterisks
                const rawAccountName = statusData.accountName || null;
                console.log('Original account name:', rawAccountName);
                setAccountName(rawAccountName);
            } else if (statusData.status === 'Cancelled' || statusData.status === 'Expired') {
                setLoginStatus('cancelled');
                setStatusMessage(`Session ${statusData.status.toLowerCase()}`);
            }
        }
    }, [statusData, loginStatus]);

    // Handle status errors
    useEffect(() => {
        if (statusError) {
            const clientError = statusError as TRPCClientError<AppRouter>;
            if (clientError.data?.code === 'NOT_FOUND') {
                setLoginStatus('expired');
                setStatusMessage('Session expired or not found');
            } else {
                setLoginStatus('error');
                setStatusMessage(`Error checking status: ${statusError.message}`);
            }
        }
    }, [statusError]);

    // Add a flag to prevent multiple completion attempts
    const [isCompleting, setIsCompleting] = useState(false);

    const completeLogin = trpc.robloxAuth.completeQuickLoginAndStoreCookie.useMutation({
        onSuccess: (data) => {
            setLoginStatus('completed');
            setStatusMessage('Roblox login completed successfully!');
            // Redirect to profile or dashboard after a short delay
            setTimeout(() => {
                router.push('/user/settings?roblox=success');
            }, 2000);
        },
        onError: (error) => {
            console.error('Error completing login:', error);

            // Check if the cookie might have been stored despite the error
            // In this case, we still want to redirect to success
            if (error.message?.includes('already authenticated') ||
                error.message?.includes('cookie stored') ||
                error.message?.includes('session not found')) {

                setLoginStatus('completed');
                setStatusMessage('Roblox login completed successfully!');
                setTimeout(() => {
                    router.push('/user/settings?roblox=success');
                }, 2000);
            } else {
                setLoginStatus('error');
                setStatusMessage(`Error completing login: ${error.message}`);
            }
        }
    });

    const cancelSession = trpc.robloxAuth.cancelQuickLoginSession.useMutation({
        onSuccess: () => {
            setLoginStatus('cancelled');
            setStatusMessage('Login cancelled');
            setSessionId(null);
        }
    });

    // Only initiate session creation once when component mounts
    useEffect(() => {
        if (session?.user?.id && loginStatus === 'waiting' && !isInitiatingRef.current && !sessionId) {
            console.log('Initiating Roblox login session');
            isInitiatingRef.current = true;

            // Add a small delay before making the request to avoid rapid retries
            setTimeout(() => {
                createSession.mutate({ userId: session.user.id });
            }, 500);
        }
    }, [session?.user?.id, loginStatus, sessionId, createSession]);

    // Process completion when validated
    useEffect(() => {
        if (loginStatus === 'validated' && sessionId && session?.user?.id && !isCompleting) {
            console.log('Session validated, completing login');
            setIsCompleting(true);
            setLoginStatus('completing');

            // Add a small delay before completion to ensure validation is processed
            setTimeout(() => {
                completeLogin.mutate({
                    sessionId,
                    userId: session.user.id
                });
            }, 1000);
        }
    }, [loginStatus, sessionId, session?.user?.id, completeLogin, isCompleting]);

    const handleCancel = () => {
        if (sessionId) {
            cancelSession.mutate({ sessionId });
        } else {
            setLoginStatus('cancelled');
            setStatusMessage('Login cancelled');
        }
    };

    const handleRetry = () => {
        setLoginStatus('waiting');
        setSessionId(null);
        setQrCode(null);
        setExpirationTime(null);
        setStatusMessage('');
        isInitiatingRef.current = false;
    };

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
                <Card className="w-full max-w-md roblox-auth-card">
                    <CardHeader>
                        <div className="flex flex-col items-center gap-2 p-4">
                            <RobloxIcon className="w-20 h-20" />
                            <CardTitle className="text-xl">
                                Roblox Login
                            </CardTitle>
                        </div>
                        <CardDescription className="text-center">
                            You must be logged in to link your Roblox account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4 text-center">
                            Please log in to your account first to connect with Roblox.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => router.push('/auth/login')} className="w-full">
                            Go to Login
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
            <Card className="w-full max-w-md roblox-auth-card">
                <CardHeader>
                    <div className="flex flex-col items-center gap-2">
                        <RobloxIcon />
                        {/* <CardTitle className="text-xl">
                            Link Your Roblox Account
                        </CardTitle> */}
                    </div>
                    {statusMessage && (
                        <CardDescription className={`text-center ${loginStatus === 'error' ? 'text-destructive' : ''}`}>
                            {statusMessage}
                        </CardDescription>
                    )}
                </CardHeader>

                <CardContent>
                    {loginStatus === 'waiting' && (
                        <div className="flex flex-col items-center py-8">
                            <p className="mb-4 text-muted-foreground">Preparing Roblox login...</p>
                            <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {loginStatus === 'pending' && qrCode && (
                        <div className="flex flex-col items-center">
                            <p className="mb-4 text-center text-muted-foreground">Scan this QR code with the Roblox mobile app</p>
                            <div className="border border-border rounded-lg p-4 mb-4 bg-white">
                                <Image src={qrCode} alt="Roblox login QR code" width={200} height={200} />
                            </div>
                            
                            <div className="bg-muted rounded-lg p-3 mb-4 text-center w-full">
                                <p className="text-sm text-muted-foreground mb-1">Or enter this code in the Roblox app:</p>
                                <p className="font-mono text-lg font-bold tracking-wider">
                                    {qrCode.includes('code=') ? new URL(qrCode).searchParams.get('code') : 'Loading...'}
                                </p>
                            </div>
                            
                            {expirationTime && (
                                <div className="w-full px-1">
                                    <Countdown expirationTime={expirationTime} />
                                </div>
                            )}
                        </div>
                    )}

                    {loginStatus === 'validated' && (
                        <div className="flex flex-col items-center py-8 w-full">
                            <p className="mb-4 text-muted-foreground text-center w-full break-words px-2">
                               Finishing up...
                            </p>
                            <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {loginStatus === 'completed' && (
                        <div className="flex flex-col items-center py-8">
                            <div className="mb-4 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-center font-medium">Roblox account connected successfully!</p>
                            <p className="text-center text-muted-foreground">Redirecting to your settings page...</p>
                        </div>
                    )}

                    {(loginStatus === 'cancelled' || loginStatus === 'expired' || loginStatus === 'error') && (
                        <div className="flex flex-col items-center py-8">
                            {loginStatus === 'error' ? (
                                <div className="mb-4 text-destructive">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="mb-4 text-muted-foreground">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            )}
                            <p className="text-center text-lg font-medium">
                                {loginStatus === 'cancelled' ? 'Login Cancelled' :
                                    loginStatus === 'expired' ? 'Session Expired' : 'Error Occurred'}
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-center gap-4">
                    {loginStatus === 'pending' && (
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    )}

                    {(loginStatus === 'cancelled' || loginStatus === 'expired' || loginStatus === 'error') && (
                        <Button onClick={handleRetry}>
                            Try Again
                        </Button>
                    )}

                    {(loginStatus === 'cancelled' || loginStatus === 'expired' || loginStatus === 'error' || loginStatus === 'completed') && (
                        <Button variant="outline" onClick={() => router.push('/user/settings')}>
                            Back to Settings
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
} 