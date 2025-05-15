export interface Shortcut {
  id: string; // Corresponds to handler keys in your component
  label: string; // User-friendly label for display (e.g., in settings UI)
  keys: string[]; // e.g., ['Meta', 'K'], ['Meta', 'Shift', 'T']
  scope: 'global' | 'trades'; // Define scopes for your application
  description?: string; // Optional detailed description
}

export const keyboardShortcuts: ReadonlyArray<Shortcut> = [
  // Global Scope
  {
    id: 'search',
    label: 'Search',
    keys: ['shift', 'k'],
    scope: 'global',
    description: 'Open and focus search bar',
  },
  {
    id: 'goToTrades',
    label: 'Go to Trades',
    keys: ['shift', 'alt', 't'],
    scope: 'global',
    description: 'Navigate to the Trades page',
  },
  {
    id: 'goToAnalytics',
    label: 'Go to Analytics',
    keys: ['shift', 'alt', 'a'],
    scope: 'global',
    description: 'Navigate to the Analytics page',
  },
  {
    id: 'collapseSidebar',
    label: 'Collapse Sidebar',
    keys: ['shift', 'alt', 'b'],
    scope: 'global',
    description: 'Collapse the sidebar',
  },

  // Trades Page Scope
  {
    id: 'acceptTrade',
    label: 'Accept Trade',
    keys: ['shift', 'alt', 'a'],
    scope: 'trades',
    description: 'Initiate accept trade confirmation',
  },
  {
    id: 'declineTrade',
    label: 'Decline Trade',
    keys: ['shift', 'alt', 'd'],
    scope: 'trades',
    description: 'Initiate decline trade confirmation',
  },
  {
    id: 'counterTrade',
    label: 'Counter Trade',
    keys: ['shift', 'alt', 'c'],
    scope: 'trades',
    description: 'Initiate counter trade confirmation',
  },
]; 