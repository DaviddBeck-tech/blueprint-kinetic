import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ảnh dự án nằm trong public/ và được render bằng <img> thường (giữ nguyên layout gốc),
  // nên chưa cần cấu hình remotePatterns cho next/image.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
