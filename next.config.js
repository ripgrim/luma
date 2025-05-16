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
}

module.exports = nextConfig 