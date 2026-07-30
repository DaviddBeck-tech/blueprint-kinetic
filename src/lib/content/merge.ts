/**
 * Deep merge cho copy override: giá trị từ CMS đè lên default trong repo.
 *
 * Quy tắc — cố ý bảo thủ, vì đây là thứ quyết định "client sửa được gì":
 *
 *   - `undefined` / `null`  → BỎ QUA, giữ default. CMS để trống một field không
 *                             được phép xoá chữ đang hiển thị trên site.
 *   - chuỗi rỗng `""`        → cũng bỏ qua, cùng lý do. Muốn xoá hẳn thì phải sửa
 *                             default trong repo (đây là chủ đích, không phải thiếu sót).
 *   - mảng                   → THAY nguyên mảng, không merge từng phần tử. Merge theo
 *                             index sẽ tạo ra mảng lai nửa CMS nửa default, gần như
 *                             luôn là sai với danh sách có thứ tự.
 *   - object                 → đệ quy xuống.
 */

type Plain = Record<string, unknown>;

function isPlainObject(value: unknown): value is Plain {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEmpty(value: unknown): boolean {
  return value === undefined || value === null || value === "";
}

export function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(override)) return base;
  if (!isPlainObject(base)) return (isEmpty(override) ? base : (override as T)) ?? base;

  const result: Plain = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (isEmpty(value)) continue;

    const current = result[key];
    if (isPlainObject(value) && isPlainObject(current)) {
      result[key] = deepMerge(current, value);
    } else if (Array.isArray(value)) {
      result[key] = value.length > 0 ? value : current;
    } else {
      result[key] = value;
    }
  }

  return result as T;
}
