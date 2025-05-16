import { router } from './trpc';
import { chartRouter } from './routers/chart';
import { robloxAuthRouter } from './routers/robloxAuth';

export const appRouter = router({
  chart: chartRouter,
  robloxAuth: robloxAuthRouter,
});

export type AppRouter = typeof appRouter; 