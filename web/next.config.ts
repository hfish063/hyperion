import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["covers.openlibrary.org", "assets.hardcover.app"],
  },
};

export default nextConfig;
