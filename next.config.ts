import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const allowedOrigin = isDevelopment ? "http://localhost:3000" : "https://flags.games";

const securityHeadersConfig = () => {
  const upgradeInsecure = !isDevelopment ? "upgrade-insecure-requests;" : "";

  const defaultCSPDirectives = `
    default-src 'none';
    script-src 'self' 'unsafe-inline';
    connect-src 'self' https://vitals.vercel-insights.com;
    img-src 'self' data:;
    font-src 'self' data:;
    style-src 'self' 'unsafe-inline';
    frame-ancestors 'self';
    ${upgradeInsecure}
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  const headers = [
    {
      key: "Content-Security-Policy",
      value: defaultCSPDirectives,
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "X-Frame-Options",
      value: "SAMEORIGIN",
    },
    {
      key: "X-XSS-Protection",
      value: "1; mode=block",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=()",
    },
  ];

  if (!isDevelopment) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=31536000; includeSubDomains; preload",
    });
  }

  return headers;
};

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: "/:id([a-zA-Z0-9_-]{1,128}).svg",
      destination: "/api/avatar/:id",
    },
    // TODO: Implement SVG to PNG conversion
    {
      source: "/:id([a-zA-Z0-9_-]{1,128}).png",
      destination: "/api/avatar/:id?format=png",
    },
  ],
  headers: async () => {
    const securityHeaders = securityHeadersConfig();

    return [
      {
        source: "/api/avatar/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: allowedOrigin },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          ...securityHeaders,
        ],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
