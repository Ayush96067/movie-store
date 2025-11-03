/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/M/**",
      },
    ],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Performance optimizations
  experimental: {
    // Enable optimizations
    optimizeCss: true, // Minimize CSS
    optimizePackageImports: [
      "@mui/icons-material",
      "@mui/material",
      "react-icons",
    ],
    turbo: {
      rules: {
        // Add custom rules for Turbopack
        "*.svg": ["@svgr/webpack"],
      },
    },
  },
  // Webpack optimizations for production
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }
    return config;
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Minimize JavaScript in production
  swcMinify: true,
  // Cache build output
  outputFileTracing: true,
  // Compress assets
  compress: true,
};

export default nextConfig;
