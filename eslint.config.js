import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

// `eslint-config-next/core-web-vitals` đã đăng ký sẵn plugin react-hooks, react và @next/next
// kèm bộ rule khuyến nghị — không khai báo lại ở đây (ESLint cấm định nghĩa trùng plugin).
export default tseslint.config(
  { ignores: [".next", "out", "next-env.d.ts", "node_modules"] },
  ...nextCoreWebVitals,
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      // Ảnh dự án dùng <img> thường để giữ nguyên layout/aspect-ratio gốc sau khi migrate từ Vite.
      // Chuyển sang next/image là việc tối ưu riêng, làm sau khi đã xác nhận giao diện khớp 100%.
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    // Code sinh bởi shadcn CLI — sẽ bị ghi đè mỗi lần `shadcn add`, nên không sửa tay.
    // Bộ rule React Compiler mới trong eslint-config-next v16 bắt các pattern có sẵn ở đây
    // (setState trong effect, Math.random khi render). Hạ xuống warning để lint của code mình vẫn sạch.
    files: ["src/components/ui/**/*.{ts,tsx}", "src/hooks/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
  eslintPluginPrettier,
);
