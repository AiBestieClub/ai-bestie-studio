/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Required for Next.js 15 + React 19 compatibility
  experimental: {
    reactCompiler: false,
  },
};

module.exports = nextConfig;
