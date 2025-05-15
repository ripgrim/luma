'use client';

import { HotkeysProvider } from 'react-hotkeys-hook';
import React from 'react';

import { GlobalHotkeys } from './global-hotkeys';
import { TradesPageHotkeys } from './trades-page-hotkeys';
// Remove or comment out unused mail-specific hotkey components if not needed
// import { MailListHotkeys } from './mail-list-hotkeys'; 
// import { ThreadDisplayHotkeys } from './thread-display-hotkeys';
// import { ComposeHotkeys } from './compose-hotkeys';

interface HotkeyProviderWrapperProps {
  children: React.ReactNode;
}

export function HotkeyProviderWrapper({ children }: HotkeyProviderWrapperProps) {
  console.log('[HotkeyProviderWrapper] Rendering. GlobalHotkeys and TradesPageHotkeys will be included.');
  return (
    <HotkeysProvider initiallyActiveScopes={['global']}>
      <GlobalHotkeys />
      <TradesPageHotkeys />
      
      {/* Include other hotkey components as needed */}
      {/* <MailListHotkeys /> */}
      {/* <ThreadDisplayHotkeys /> */}
      {/* <ComposeHotkeys /> */}
      
      {children}
    </HotkeysProvider>
  );
} 