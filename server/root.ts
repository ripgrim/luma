import { router } from './trpc';
import { chartRouter } from './routers/chart';
import { robloxAuthRouter } from './routers/robloxAuth';
import { robloxTradesRouter } from './routers/robloxTrades';

export const appRouter = router({
  chart: chartRouter,
  robloxAuth: robloxAuthRouter,
  robloxTrades: robloxTradesRouter,
});

export type AppRouter = typeof appRouter; 