'use client';

import { keyboardShortcuts } from '@/config/shortcuts';
import { useShortcuts } from './use-hotkey-utils';
// Import useHotkeysContext if you need to manage scope activation from here
// import { useHotkeysContext } from 'react-hotkeys-hook';
// import React from 'react';

// Example: If you use a toast library for notifications
// import { toast } from 'sonner'; 

export function TradesPageHotkeys() {
  const scope = 'trades';

  // If this component is only rendered on the Trades page, direct scope management here might not be needed.
  // Otherwise, you'd enable/disable the scope using useHotkeysContext:
  /*
  const { enableScope, disableScope } = useHotkeysContext();
  React.useEffect(() => {
    enableScope(scope);
    return () => disableScope(scope);
  }, [enableScope, disableScope, scope]);
  */

  const handlers = {
    acceptTrade: () => {
      console.log('Hotkey: Accept Trade. User confirmation required.');
      // Example: toast.info('Accept Trade: Press Enter to confirm or Esc to cancel.');
      // Or trigger a confirmation modal.
    },
    declineTrade: () => {
      console.log('Hotkey: Decline Trade. User confirmation required.');
      // Example: toast.info('Decline Trade: Press Enter to confirm or Esc to cancel.');
    },
    counterTrade: () => {
      console.log('Hotkey: Counter Trade. User confirmation required.');
      // Example: toast.info('Counter Trade: Press Enter to confirm or Esc to cancel.');
    },
  };

  const activeShortcuts = keyboardShortcuts.filter(
    (shortcut) => shortcut.scope === scope && handlers.hasOwnProperty(shortcut.id)
  );

  // These shortcuts will only be active if the 'trades' scope is enabled.
  // Typically, the page component itself (e.g., your main Trades page component)
  // would enable the 'trades' scope on mount and disable on unmount.
  useShortcuts(activeShortcuts, handlers, { 
    scopes: scope, 
    // For trades page actions, you might want to disable them if user is in a form field
    enableOnFormTags: false, 
  });

  return null; // This component does not render anything visible
} 