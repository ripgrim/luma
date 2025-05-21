/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: 'tr.rbxcdn.com',
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
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
