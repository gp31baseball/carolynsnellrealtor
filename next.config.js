/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Disable Turbopack explicitly for Vercel build
  experimental: {
    turbo: false,
  },

  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },
};

module.exports = nextConfig;
