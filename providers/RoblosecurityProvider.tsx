"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from '@/hooks/auth-hooks'; // Assuming this is your session hook
import { checkUserRobloCookieStatus } from '@/app/actions/authServerActions';

interface RoblosecurityContextType {
  isRobloCookieVerified: boolean;
  isLoadingCookieStatus: boolean;
  triggerCookieCheck: () => void; // Function to manually re-trigger the check
}

const RoblosecurityContext = createContext<RoblosecurityContextType | undefined>(undefined);

export const useRoblosecurity = (): RoblosecurityContextType => {
  const context = useContext(RoblosecurityContext);
  if (!context) {
    throw new Error('useRoblosecurity must be used within a RoblosecurityProvider');
  }
  return context;
};

interface RoblosecurityProviderProps {
  children: ReactNode;
}

export const RoblosecurityProvider: React.FC<RoblosecurityProviderProps> = ({ children }) => {
  const { user, status: sessionStatus } = useSession();
  const [isRobloCookieVerified, setIsRobloCookieVerified] = useState<boolean>(false);
  const [isLoadingCookieStatus, setIsLoadingCookieStatus] = useState<boolean>(true);

  const performCookieCheck = async () => {
    if (user?.id) {
      setIsLoadingCookieStatus(true);
      try {
        const hasCookie = await checkUserRobloCookieStatus(user.id);
        setIsRobloCookieVerified(hasCookie);
      } catch (error) {
        console.error("Failed to check Roblo cookie status:", error);
        setIsRobloCookieVerified(false); // Assume not verified on error
      } finally {
        setIsLoadingCookieStatus(false);
      }
    } else if (sessionStatus !== 'pending') {
      // No user or session is not pending, so not verified and not loading new status
      setIsRobloCookieVerified(false);
      setIsLoadingCookieStatus(false);
    }
  };

  useEffect(() => {
    performCookieCheck();
  }, [user, sessionStatus]);

  const triggerCookieCheck = () => {
    performCookieCheck(); 
  };

  return (
    <RoblosecurityContext.Provider value={{ isRobloCookieVerified, isLoadingCookieStatus, triggerCookieCheck }}>
      {children}
    </RoblosecurityContext.Provider>
  );
}; 