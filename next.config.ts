import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents MIME-type sniffing — stops browsers executing unexpected file types
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Prevents clickjacking by blocking iframes from other origins
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stops the browser sending the full URL as a referrer to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Reduces browser fingerprinting surface by disabling unused device APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Enforces HTTPS for 2 years and includes subdomains
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Enables XSS filter in older browsers (belt-and-suspenders)
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  // Enable gzip/brotli compression for all responses
  compress: true,

  // Apply security headers to every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    // Use WebP/AVIF for automatic modern-format delivery
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
