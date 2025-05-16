"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRoblosecurity } from '@/providers/RoblosecurityProvider';
import { KeyIcon } from 'lucide-react';
import { Button } from './ui/button';

interface RoblosecurityGuardProps {
  children: ReactNode;
  blurAmount?: string; // e.g., '4px'
}

export const RoblosecurityGuard: React.FC<RoblosecurityGuardProps> = ({ children, blurAmount = '4px' }) => {
  const { isRobloCookieVerified, isLoadingCookieStatus } = useRoblosecurity();
  const router = useRouter();

  return (
    <div className="relative w-full h-full">
      <div
        className="w-full h-full"
        style={{
          filter: isLoadingCookieStatus || !isRobloCookieVerified ? "blur(4px)" : "none",
          transition: 'filter 0.3s ease-out'
        }}
      >
        {children}
      </div>

      {(isLoadingCookieStatus || !isRobloCookieVerified) && (
        <>
          <div 
            className="absolute inset-0 z-10" 
            style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
            <div className="flex flex-col items-center justify-center text-center max-w-md">
              <div className="text-gray-400 mb-4"><KeyIcon size={48} /></div>
              <h3 className="text-white text-2xl font-bold mb-2 mt-0">Authentication Required</h3>
              <p className="text-gray-400 text-sm mb-4">Complete step 2 of authentication to view this dashboard.</p>
              <Button 
                variant="outline" 
                className="bg-background text-white px-4 py-2 rounded-md"
                onClick={() => {
                  router.push("/user/settings")
                }}
              >Complete Step 2</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}; 