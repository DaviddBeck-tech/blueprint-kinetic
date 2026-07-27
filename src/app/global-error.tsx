"use client";

import { useEffect } from "react";

/**
 * Bắt lỗi xảy ra ngay trong root layout — khi đó layout (kể cả <html>/<body>) không render được,
 * nên component này phải tự dựng lại khung tài liệu.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#fff",
          color: "#100F10",
        }}
      >
        <div style={{ maxWidth: "28rem", padding: "1rem", textAlign: "center" }}>
          <div
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#EC1E24",
            }}
          >
            System · Error
          </div>
          <h1 style={{ marginTop: "1rem", fontSize: "1.875rem", fontWeight: 700 }}>
            Trang không tải được
          </h1>
          <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", color: "#6B7280" }}>
            Đã có sự cố nghiêm trọng. Vui lòng tải lại trang.
          </p>
          {/* Dùng <a> thay vì next/link: root layout đã hỏng nên cần tải lại trang hoàn toàn,
              client router lúc này không đáng tin. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              padding: "0.75rem 1.25rem",
              background: "#EC1E24",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Về trang chủ
          </a>
        </div>
      </body>
    </html>
  );
}
