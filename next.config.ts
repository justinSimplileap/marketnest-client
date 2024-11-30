import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.pexels.com',
      'in-exstatic-vivofs.vivo.com',
      'photos.fife.usercontent.google.com',
      'i03.appmifile.com',
      'i02.appmifile.com',
      'res.cloudinary.com',
    ],
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**', // Wildcard for all domains
    },
  ],
};

export default nextConfig;
