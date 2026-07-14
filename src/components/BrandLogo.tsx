import { useState } from "react";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  name: string;
  src: string;
  /** Class cho khung chip bọc ngoài (kích thước, padding). */
  className?: string;
  /** Class riêng cho thẻ img (chiều cao logo). */
  imgClassName?: string;
};

/**
 * Hiển thị logo thương hiệu/đối tác.
 * - Luôn hiện đầy đủ màu (full color) ngay từ đầu; hover chỉ phóng to nhẹ.
 * - Đặt trên chip nền sáng nên đọc được ở cả light lẫn dark mode.
 * - Nếu chưa có file ảnh (hoặc lỗi tải) sẽ tự fallback về tên chữ → không vỡ layout.
 */
export function BrandLogo({ name, src, className, imgClassName }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="font-display text-lg font-bold tracking-tight text-foreground md:text-xl">
        {name}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-white px-4 py-3",
        className,
      )}
    >
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn(
          "w-auto max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
          imgClassName,
        )}
      />
    </div>
  );
}
