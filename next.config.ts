import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/satwika-organics",
  assetPrefix: "/satwika-organics/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
