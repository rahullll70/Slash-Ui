import type { NextConfig } from 'next';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  devIndicators: false,
  serverExternalPackages: ['nodemailer'],
  experimental: {
    optimizeCss: true,
  },
};

export default withBundleAnalyzer(nextConfig);
