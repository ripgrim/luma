import { useHotkeys, Options } from 'react-hotkeys-hook';
import type { Shortcut } from '@/config/shortcuts';

// Extend the Options type to include our custom stopPropagation if we want to make it a formal option
// However, react-hotkeys-hook doesn't natively support it in its options object for automatic handling.
// So, we'll handle it manually in the callback.
interface CustomHotkeyOptions extends Options {
  stopPropagation?: boolean;
}

interface ShortcutHandlerMap {
  [id: string]: (event: KeyboardEvent) => void;
}

const defaultHotkeyOptions: Options = {
  enableOnFormTags: true, 
  preventDefault: true,
};

export function useShortcuts(
  shortcuts: ReadonlyArray<Shortcut>,
  handlers: ShortcutHandlerMap,
  hookOptions?: CustomHotkeyOptions
) {
  const effectiveReactHotkeyOptions: Options = {
    ...defaultHotkeyOptions,
    ...(hookOptions ? { 
        enableOnFormTags: hookOptions.enableOnFormTags === undefined ? defaultHotkeyOptions.enableOnFormTags : hookOptions.enableOnFormTags,
        preventDefault: hookOptions.preventDefault === undefined ? defaultHotkeyOptions.preventDefault : hookOptions.preventDefault,
        scopes: hookOptions.scopes,
        enabled: hookOptions.enabled,
        ignoreModifiers: hookOptions.ignoreModifiers,
        // Only include keys that are actual Options from react-hotkeys-hook
        // stopPropagation is handled manually
    } : {}),
  };
  // Clean up undefined optional fields from effectiveReactHotkeyOptions to avoid passing them if not set in hookOptions
  if (hookOptions) {
    for (const key in effectiveReactHotkeyOptions) {
      if (effectiveReactHotkeyOptions[key as keyof Options] === undefined && defaultHotkeyOptions[key as keyof Options] === undefined) {
        delete effectiveReactHotkeyOptions[key as keyof Options];
      }
    }
  }

  // console.log('[useShortcuts] Hook called. Registering shortcuts with react-hotkeys-hook options:', effectiveReactHotkeyOptions);
  if (hookOptions?.stopPropagation) {
    // console.log('[useShortcuts] Manual event.stopPropagation() will be called for these shortcuts.');
  }

  shortcuts.forEach((shortcut) => {
    const handler = handlers[shortcut.id];
    if (handler) {
      const hotkeyString = shortcut.keys.join('+').toLowerCase();
      // console.log(`[useShortcuts] Attempting to register: "${hotkeyString}" for shortcut ID: "${shortcut.id}" with scope: "${effectiveReactHotkeyOptions?.scopes}"`);

      useHotkeys(
        hotkeyString,
        (event: KeyboardEvent) => { 
          // console.log(`[useShortcuts] Hotkey fired: "${hotkeyString}" (ID: "${shortcut.id}")`);
          // console.log(`[useShortcuts] Event details - metaKey: ${event.metaKey}, ctrlKey: ${event.ctrlKey}, shiftKey: ${event.shiftKey}, altKey: ${event.altKey}, key: ${event.key}`);
          if (hookOptions?.stopPropagation) {
            // console.log('[useShortcuts] Calling event.stopPropagation()');
            event.stopPropagation();
          }
          handler(event); 
        },
        effectiveReactHotkeyOptions 
      );
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[useShortcuts] No handler defined for shortcut: "${shortcut.id}" in scope: "${effectiveReactHotkeyOptions?.scopes || 'unknown'}"`);
      }
    }
  });
} 