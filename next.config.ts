import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/official",
        destination: "/",
        permanent: false,
      },
      {
        source: "/leaderboard",
        destination: "/",
        permanent: false,
      },
      {
        source: "/pretext",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
