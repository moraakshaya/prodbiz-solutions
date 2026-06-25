import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/solutions/:slug*',
        destination: '/services/:slug*',
      },
    ];
  },
};

export default nextConfig;

