import { router } from './trpc';
import { chartRouter } from './routers/chart';
import { robloxAuthRouter } from './routers/robloxAuth';
import { robloxTradesRouter } from './routers/robloxTrades';
import { robloxAvatarsRouter } from './routers/robloxAvatars';
import { robloxItemsRouter } from './routers/robloxItems';
import { githubRouter } from './routers/github';

export const appRouter = router({
  chart: chartRouter,
  robloxAuth: robloxAuthRouter,
  robloxTrades: robloxTradesRouter,
  robloxAvatars: robloxAvatarsRouter,
  robloxItems: robloxItemsRouter,
  github: githubRouter,
});

export type AppRouter = typeof appRouter; 