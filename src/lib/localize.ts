import { useTranslation } from "react-i18next";

/**
 * Hook chọn chuỗi theo ngôn ngữ hiện tại cho dữ liệu song ngữ trong `data.ts`.
 * Dùng: `const L = useLocalize();  L(project.name, project.nameEn)`
 * Nếu chưa có bản EN (undefined) → tự fallback về VI.
 */
export function useLocalize() {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith("en");
  return function L<T>(vi: T, en?: T): T {
    return isEn && en != null ? en : vi;
  };
}
