# [Project Name]

This web application is designed for managing Roblox trades, allowing users to connect their Roblox account and track their trading activity. It utilizes Next.js with the App Router and integrates Better Auth for user authentication.

## Installation

1.  **Database Setup**: Create a PostgreSQL database.
2.  **Environment Variables**: Configure your environment variables. Create a `.env.local` file in the root of your project with the following:

    ```bash
    # Secret for Better Auth session encryption. Generate one at https://www.better-auth.com/docs/installation#set-environment-variables
    BETTER_AUTH_SECRET=""

    # Standard PostgreSQL connection string
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # Optional: Redis connection URL if using Redis for caching or other features
    # REDIS_URL="redis://HOST:PORT"
    ```
3.  **Schema and Migrations**: Generate your database schema and apply migrations using Drizzle Kit and Better Auth CLI.

    ```bash
    # Installs Better Auth's user, session, and account tables
    npx @better-auth/cli generate

    # Generates SQL migration files based on your Drizzle schema (including trade tables)
    npx drizzle-kit generate

    # Applies the generated migrations to your database
    npx drizzle-kit migrate
    ```

## Core Technologies & Features

This application leverages a modern full-stack TypeScript setup:

*   **Authentication**: [Better Auth](https://better-auth.com) for comprehensive authentication logic.
    *   UI components from [Better Auth UI](https://better-auth-ui.com).
*   **Framework**: [Next.js](https://nextjs.org) (App Router).
*   **API Layer**: [tRPC](https://trpc.io/) for end-to-end typesafe APIs.
*   **Database ORM**: [Drizzle ORM](https://orm.drizzle.team) for SQL query building and schema management.
*   **Database**: [PostgreSQL](https://postgresql.org).
*   **Roblox Integration**:
    *   Management of Roblox trades (inbound, outbound, completed, inactive).
    *   Interaction with Roblox trade APIs.
    *   Secure handling of user-specific Roblosecurity tokens for API access.
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com).
*   **Styling**: [TailwindCSS](https://tailwindcss.com).
*   **Client State Management**: [TanStack Query (React Query)](https://tanstack.com/query) for data fetching and caching.
*   **Linting/Formatting**: [Biome](https://biomejs.dev).
*   **Monorepo Management**: [Turborepo](https://turbo.build) (if applicable to your setup).
*   **Optional Caching**: [Redis](https://redis.io) (example usage for trade API call rate-limiting).

## Getting Started

Ensure you have completed the Installation steps.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the main page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a font family from Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
