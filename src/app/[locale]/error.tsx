"use client";

import { LocaleLink as Link } from "@/components/LocaleLink";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mono-label text-primary">SYSTEM · ERROR</div>
        <h1 className="mt-4 font-display text-3xl font-bold">Trang không tải được</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Đã có sự cố. Vui lòng thử lại hoặc quay về trang chủ.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={reset}
            className="bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="border border-border px-4 py-2.5 text-sm font-semibold hover:bg-accent"
          >
            Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
