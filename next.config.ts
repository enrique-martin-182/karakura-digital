import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Gzip response compression
  compress: true,
  poweredByHeader: false,

  // Fix Turbopack workspace-root warning from nested package-lock.json
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Tree-shake heavy packages — biggest bundle-size win
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@splinetool/react-spline",
      "@splinetool/runtime",
      "lenis",
    ],
  },

  // Modern image formats + aggressive cache
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};

export default nextConfig;
