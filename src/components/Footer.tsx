import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Linkedin, Youtube } from "lucide-react";
import { fields } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative mt-24 bg-secondary text-secondary-foreground">
      <div className="h-px w-full bg-primary" />
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center bg-primary text-primary-foreground font-display text-xl font-black">H</span>
              <span className="font-display text-2xl font-extrabold">HBH</span>
            </div>
            <p className="mt-4 text-sm text-secondary-foreground/70 text-balance">
              Giải pháp M&E toàn diện — Building Comfort, Delivering Trust.
              Hơn 10 năm đồng hành cùng các công trình y tế, quốc phòng, khách sạn – resort hàng đầu Việt Nam.
            </p>
            <div className="mt-6 flex gap-2">
              {[Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center border border-secondary-foreground/20 hover:bg-primary hover:border-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mono-label text-secondary-foreground/50">Điều hướng</div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/gioi-thieu", "Giới thiệu"],
                ["/linh-vuc-kinh-doanh", "Lĩnh vực"],
                ["/dich-vu", "Dịch vụ"],
                ["/du-an", "Dự án"],
                ["/doi-tac", "Đối tác"],
                ["/tin-tuc", "Tin tức"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-secondary-foreground/70 hover:text-primary">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono-label text-secondary-foreground/50">6 Lĩnh vực</div>
            <ul className="mt-4 space-y-2 text-sm">
              {fields.map((f) => (
                <li key={f.id} className="flex gap-2 text-secondary-foreground/70">
                  <span className="mono-label text-primary">{f.id}</span>
                  <span>{f.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono-label text-secondary-foreground/50">Liên hệ</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span className="text-secondary-foreground/80">234 Hồ Tùng Mậu, Bắc Từ Liêm, Hà Nội</span></li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href="tel:+84931190001" className="hover:text-primary">+84 931 190 001</a></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><a href="mailto:info@hbhvietnam.vn" className="hover:text-primary">info@hbhvietnam.vn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-secondary-foreground/10 pt-6 text-xs text-secondary-foreground/50 md:flex-row md:items-center">
          <div className="mono-label">© 2026 HBH VIETNAM INVESTMENT JSC · ALL RIGHTS RESERVED</div>
          <div className="mono-label">MST · 0106842512 · HÀ NỘI · VIETNAM</div>
        </div>
      </div>
    </footer>
  );
}
