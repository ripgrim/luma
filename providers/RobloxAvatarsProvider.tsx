"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useRobloxAvatars } from '@/hooks/use-roblox-avatars';

// Define context type
type RobloxAvatarsContextType = ReturnType<typeof useRobloxAvatars>;

// Create context with sensible defaults
const RobloxAvatarsContext = createContext<RobloxAvatarsContextType>({
  avatarMap: {},
  queueAvatarLoading: () => {},
  getAvatarUrl: () => null,
  isLoading: false
});

// Provider component
export function RobloxAvatarsProvider({ children }: { children: ReactNode }) {
  const avatarsManager = useRobloxAvatars();
  
  return (
    <RobloxAvatarsContext.Provider value={avatarsManager}>
      {children}
    </RobloxAvatarsContext.Provider>
  );
}

// Custom hook for using the context
export function useRobloxAvatarsContext() {
  const context = useContext(RobloxAvatarsContext);
  
  if (context === undefined) {
    throw new Error('useRobloxAvatarsContext must be used within a RobloxAvatarsProvider');
  }
  
  return context;
} 