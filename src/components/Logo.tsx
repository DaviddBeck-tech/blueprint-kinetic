/** Logo HBH (file: public/logo.png — PNG nền trong suốt, 1024×580).
 *  Nền sáng dùng trực tiếp; nền tối bọc trong chip `bg-background` để chữ đen không chìm. */
export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="HBH Vietnam — Vì chất lượng cuộc sống"
      width={1024}
      height={580}
      className={className}
    />
  );
}
