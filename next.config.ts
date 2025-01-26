import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "./src/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig: NextConfig = withSerwist({});

export default nextConfig;
