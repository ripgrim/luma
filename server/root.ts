import { chartRouter } from "./routers/chart"
import { earlyAccessRouter } from "./routers/earlyAccess"
import { githubRouter } from "./routers/github"
import { robloxAuthRouter } from "./routers/robloxAuth"
import { robloxAvatarsRouter } from "./routers/robloxAvatars"
import { robloxItemsRouter } from "./routers/robloxItems"
import { robloxTradesRouter } from "./routers/robloxTrades"
import { router } from "./trpc"

export const appRouter = router({
    chart: chartRouter,
    robloxAuth: robloxAuthRouter,
    robloxTrades: robloxTradesRouter,
    robloxAvatars: robloxAvatarsRouter,
    robloxItems: robloxItemsRouter,
    github: githubRouter,
    earlyAccess: earlyAccessRouter
})

export type AppRouter = typeof appRouter
