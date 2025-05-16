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
        ],
    },
}

export default nextConfig
