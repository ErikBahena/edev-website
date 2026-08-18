import type { NextConfig } from "next";

/**
 * Security headers. Vercel already sends HSTS; the rest were missing.
 * No Content-Security-Policy yet — GSAP + inline JSON-LD + Stripe-hosted
 * pages make a strict CSP a project of its own; frame-ancestors covers the
 * clickjacking case CSP would otherwise handle.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
