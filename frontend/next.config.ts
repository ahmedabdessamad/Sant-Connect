import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // Requis pour le Dockerfile multi-stage

  // ─── Variables d'environnement publiques ──────────────
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  },

  // ─── Sécurité — Headers HTTP ──────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // ─── Optimisation images ──────────────────────────────
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },

  // ─── Redirections ─────────────────────────────────────
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
