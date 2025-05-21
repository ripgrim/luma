import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'auth.roblox.com',
                protocol: 'https',
            },
            {
                hostname: 'apis.roblox.com',
                protocol: 'https',
            },
            {
                hostname: 'www.roblox.com',
                protocol: 'https',
            },
            {
                hostname: 'thumbnails.roblox.com',
                protocol: 'https',
            },
            {
                hostname: '0.email',
                protocol: 'https',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/ingest/static/:path*',
                destination: 'https://us-assets.i.posthog.com/static/:path*',
            },
            {
                source: '/ingest/:path*',
                destination: 'https://us.i.posthog.com/:path*',
            },
            {
                source: '/ingest/decide',
                destination: 'https://us.i.posthog.com/decide',
            },
        ]
    },
    skipTrailingSlashRedirect: true,
}

export default nextConfig