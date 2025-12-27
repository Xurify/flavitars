import type { NextConfig } from "next";

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
};

export default nextConfig;
