import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'upload.wikimedia.org',
      'drive.google.com'
    ],
  }
};

export default nextConfig;
