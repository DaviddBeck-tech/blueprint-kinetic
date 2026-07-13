import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHero } from "@/components/PageHero";
import { MapPin, Phone, Mail, Clock, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/lien-he")({
  head: () => ({
    meta: [
      { title: "Liên hệ — HBH Vietnam" },
      { name: "description", content: "Nhận tư vấn miễn phí — HBH Vietnam sẽ liên hệ trong vòng 24 giờ. 234 Hồ Tùng Mậu, Bắc Từ Liêm, Hà Nội." },
      { property: "og:title", content: "Liên hệ — HBH Vietnam" },
      { property: "og:description", content: "Nhận tư vấn miễn phí — HBH Vietnam sẽ liên hệ trong vòng 24 giờ." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(100),
  phone: z.string().trim().regex(/^[+\d\s-]{9,15}$/, "Số điện thoại không hợp lệ"),
  email: z.string().trim().email("Email không hợp lệ").max(255),
  project: z.string().trim().min(2, "Vui lòng nhập tên công trình").max(200),
  system: z.string().min(1, "Chọn hệ thống"),
  message: z.string().trim().min(10, "Nội dung tối thiểu 10 ký tự").max(1000),
});

const SYSTEMS = ["VRF trung tâm", "Chiller", "Nước nóng trung tâm", "BMS/ACS/EMS", "Chiếu sáng thông minh", "Khác"];

const FAQ = [
  { q: "HBH có nhận thi công ngoài Hà Nội không?", a: "Có. Chúng tôi đã triển khai dự án tại Thanh Hoá, Quảng Ninh, Đà Nẵng, Bắc Ninh, Hải Phòng và nhiều tỉnh thành khác." },
  { q: "Thời gian bảo hành thiết bị là bao lâu?", a: "Bảo hành chính hãng tối thiểu 24 tháng. Riêng chiller và VRF có gói bảo hành mở rộng đến 60 tháng." },
  { q: "HBH có ký hợp đồng bảo trì dài hạn không?", a: "Có. Chúng tôi có gói bảo trì định kỳ 6-12 tháng và hợp đồng vận hành 3-10 năm cho công trình lớn." },
  { q: "Thời gian phản hồi báo giá?", a: "Trong vòng 48 giờ làm việc kể từ khi nhận đủ hồ sơ khảo sát ban đầu." },
];

function Contact() {
  const [values, setValues] = useState({ name: "", phone: "", email: "", project: "", system: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    toast.success("Đã gửi yêu cầu — HBH sẽ liên hệ trong vòng 24h");
    setValues({ name: "", phone: "", email: "", project: "", system: "", message: "" });
  };

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues(v => ({ ...v, [k]: e.target.value }));

  return (
    <>
      <PageHero eyebrow="LIÊN HỆ · 24H" index="INFO@HBHVIETNAM.VN" title={<>Bắt đầu <span className="italic text-primary">dự án</span> của bạn.</>} subtitle="Đội kỹ sư HBH sẽ liên hệ trong vòng 24 giờ với phương án khảo sát miễn phí." />

      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12 lg:gap-16">
        <form onSubmit={onSubmit} className="space-y-5 lg:col-span-7">
          <div className="mono-label text-primary">— FORM · TƯ VẤN</div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Họ và tên *" error={errors.name}><input value={values.name} onChange={set("name")} className={inp(errors.name)} /></Field>
            <Field label="Số điện thoại *" error={errors.phone}><input value={values.phone} onChange={set("phone")} className={inp(errors.phone)} /></Field>
            <Field label="Email *" error={errors.email}><input type="email" value={values.email} onChange={set("email")} className={inp(errors.email)} /></Field>
            <Field label="Tên / loại công trình *" error={errors.project}><input value={values.project} onChange={set("project")} className={inp(errors.project)} /></Field>
          </div>
          <Field label="Hệ thống quan tâm *" error={errors.system}>
            <select value={values.system} onChange={set("system")} className={inp(errors.system)}>
              <option value="">-- Chọn hệ thống --</option>
              {SYSTEMS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Nội dung *" error={errors.message}>
            <textarea rows={5} value={values.message} onChange={set("message")} className={inp(errors.message)} />
          </Field>
          <button type="submit" className="mt-2 inline-flex items-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Gửi yêu cầu tư vấn
          </button>
          <p className="text-xs text-muted-foreground">Bằng việc gửi, bạn đồng ý HBH sử dụng thông tin để phản hồi yêu cầu.</p>
        </form>

        <aside className="space-y-6 lg:col-span-5">
          <div className="border border-border bg-secondary p-8 text-secondary-foreground">
            <div className="mono-label text-primary">— TRỤ SỞ HÀ NỘI</div>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>234 Hồ Tùng Mậu, Bắc Từ Liêm, Hà Nội, Vietnam</span></div>
              <div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><a href="tel:+84931190001" className="hover:text-primary">+84 931 190 001</a></div>
              <div className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><a href="mailto:info@hbhvietnam.vn" className="hover:text-primary">info@hbhvietnam.vn</a></div>
              <div className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>T2 – T7 · 08:00 – 17:30</span></div>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden border border-border">
            <iframe
              title="HBH Vietnam location"
              src="https://www.google.com/maps?q=234+Ho+Tung+Mau,+Bac+Tu+Liem,+Hanoi&output=embed"
              className="h-full w-full grayscale"
              loading="lazy"
            />
          </div>
        </aside>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-10 md:py-24">
          <div className="mono-label text-primary">— FAQ</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Câu hỏi thường gặp.</h2>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {FAQ.map((f, i) => (
              <li key={f.q}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-6 text-left">
                  <span className="font-display text-lg font-bold md:text-xl">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-primary" : ""}`} />
                </button>
                {openFaq === i && <p className="pb-6 pr-8 text-muted-foreground">{f.a}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mono-label text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs text-primary">{error}</span>}
    </label>
  );
}
function inp(err?: string) {
  return `w-full border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary ${err ? "border-primary" : "border-border"}`;
}
