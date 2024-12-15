import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
};

export default nextConfig;
