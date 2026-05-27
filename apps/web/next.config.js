/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@signal-assistant/shared'],
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
