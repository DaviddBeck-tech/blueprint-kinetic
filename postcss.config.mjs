/** Tailwind v4 chạy qua PostCSS plugin — không còn tailwind.config.ts, token khai báo trong src/styles.css. */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
