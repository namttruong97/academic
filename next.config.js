/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['covers.openlibrary.org'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
