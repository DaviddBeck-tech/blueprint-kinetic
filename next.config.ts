import type { NextConfig } from "next";

/**
 * Ảnh từ WordPress nằm trên domain khác (vd `cms.hbhvietnam.vn/wp-content/uploads/...`),
 * mà Next chặn mọi host lạ theo mặc định. Lấy hostname trực tiếp từ `WP_GRAPHQL_URL`
 * để không phải khai báo domain ở hai chỗ rồi quên đồng bộ.
 *
 * Chưa cắm CMS → mảng rỗng, ảnh vẫn phục vụ từ `public/` như hiện tại.
 */
function wpImagePatterns() {
  const url = process.env.WP_GRAPHQL_URL?.trim();
  if (!url) return [];

  try {
    const { protocol, hostname } = new URL(url);
    return [
      {
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
        pathname: "/wp-content/uploads/**",
      },
    ];
  } catch {
    console.warn("[next.config] WP_GRAPHQL_URL không phải URL hợp lệ — bỏ qua remotePatterns.");
    return [];
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ảnh dự án mặc định nằm trong public/ và render bằng <img> thường (giữ nguyên layout gốc).
  // remotePatterns chỉ có tác dụng khi chuyển sang next/image cho ảnh đến từ CMS.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: wpImagePatterns(),
  },
};

export default nextConfig;
