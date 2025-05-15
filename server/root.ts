import { router } from './trpc';
import { chartRouter } from './routers/chart';

export const appRouter = router({
  chart: chartRouter,
});

export type AppRouter = typeof appRouter; 