import { router } from './trpc';
import { chartRouter } from './routers/chart';
import { robloxAuthRouter } from './routers/robloxAuth';
import { robloxTradesRouter } from './routers/robloxTrades';
import { robloxAvatarsRouter } from './routers/robloxAvatars';
import { robloxItemsRouter } from './routers/robloxItems';
import { githubRouter } from './routers/github';
import { earlyAccessRouter } from './routers/earlyAccess';

export const appRouter = router({
  chart: chartRouter,
  robloxAuth: robloxAuthRouter,
  robloxTrades: robloxTradesRouter,
  robloxAvatars: robloxAvatarsRouter,
  robloxItems: robloxItemsRouter,
  github: githubRouter,
  earlyAccess: earlyAccessRouter,
});

export type AppRouter = typeof appRouter; 