/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  typescript: {
    strict: true,
  },
  eslint: {
    dirs: ['src'],
  },
};

module.exports = nextConfig;
