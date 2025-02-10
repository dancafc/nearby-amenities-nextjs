import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true, // Optional: if using static images without `next/image`
    },
};

export default nextConfig;
