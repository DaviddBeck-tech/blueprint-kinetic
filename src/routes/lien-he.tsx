import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/PageHero";
import { MapPin, Phone, Mail, Clock, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import i18n from "@/lib/i18n";

export const Route = createFileRoute("/lien-he")({
  head: () => ({
    meta: [
      { title: i18n.t("contact.meta.title") },
      { name: "description", content: i18n.t("contact.meta.description") },
      { property: "og:title", content: i18n.t("contact.meta.title") },
      { property: "og:description", content: i18n.t("contact.meta.ogDescription") },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "contact.errors.name").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s-]{9,15}$/, "contact.errors.phone"),
  email: z.string().trim().email("contact.errors.email").max(255),
  project: z.string().trim().min(2, "contact.errors.project").max(200),
  system: z.string().min(1, "contact.errors.system"),
  message: z.string().trim().min(10, "contact.errors.message").max(1000),
});

const SYSTEMS = ["vrf", "chiller", "hotWater", "bms", "lighting", "other"];

// Google reCAPTCHA v2. Thay bằng site key thật của HBH qua biến môi trường VITE_RECAPTCHA_SITE_KEY.
// Mặc định dùng test key công khai của Google (luôn pass) để dev/preview không bị chặn.
const RECAPTCHA_SITE_KEY =
  (import.meta as { env?: Record<string, string | undefined> }).env?.VITE_RECAPTCHA_SITE_KEY ||
  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

function Contact() {
  const { t } = useTranslation();
  const FAQ = t("contact.faq.items", { returnObjects: true }) as { q: string; a: string }[];
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    system: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");

  useEffect(() => {
    const renderWidget = () => {
      const grecaptcha = (window as unknown as { grecaptcha?: any }).grecaptcha;
      if (!captchaRef.current || widgetId.current !== null || !grecaptcha?.render) return;
      widgetId.current = grecaptcha.render(captchaRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (token: string) => {
          setCaptchaToken(token);
          setErrors((prev) => {
            const next = { ...prev };
            delete next.captcha;
            return next;
          });
        },
        "expired-callback": () => setCaptchaToken(""),
      });
    };
    if (document.getElementById("recaptcha-api")) {
      if ((window as unknown as { grecaptcha?: any }).grecaptcha?.render) renderWidget();
      else (window as unknown as { onRecaptchaLoad?: () => void }).onRecaptchaLoad = renderWidget;
      return;
    }
    (window as unknown as { onRecaptchaLoad?: () => void }).onRecaptchaLoad = renderWidget;
    const script = document.createElement("script");
    script.id = "recaptcha-api";
    script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    // Chỉ bắt buộc reCAPTCHA khi widget đã render được (tránh chặn form nếu script Google bị chặn khi dev offline).
    if (widgetId.current !== null && !captchaToken) {
      setErrors({ captcha: "contact.errors.captcha" });
      return;
    }
    setErrors({});
    toast.success(t("contact.form.success"));
    setValues({ name: "", phone: "", email: "", project: "", system: "", message: "" });
    const grecaptcha = (window as unknown as { grecaptcha?: any }).grecaptcha;
    if (grecaptcha && widgetId.current !== null) grecaptcha.reset(widgetId.current);
    setCaptchaToken("");
  };

  const set =
    (k: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  return (
    <>
      <PageHero
        eyebrow={t("contact.hero.eyebrow")}
        index="INFO@HBHVIETNAM.VN"
        title={
          <>
            {t("contact.hero.titleStart")}{" "}
            <span className="italic text-primary">{t("contact.hero.titleAccent")}</span>{" "}
            {t("contact.hero.titleEnd")}
          </>
        }
        subtitle={t("contact.hero.subtitle")}
      />

      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-12 lg:gap-16">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5 lg:col-span-7"
        >
          <div className="mono-label text-primary">{t("contact.form.label")}</div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t("contact.formFields.name")} error={errors.name && t(errors.name)}>
              <input value={values.name} onChange={set("name")} className={inp(errors.name)} />
            </Field>
            <Field label={t("contact.formFields.phone")} error={errors.phone && t(errors.phone)}>
              <input value={values.phone} onChange={set("phone")} className={inp(errors.phone)} />
            </Field>
            <Field label={t("contact.formFields.email")} error={errors.email && t(errors.email)}>
              <input
                type="email"
                value={values.email}
                onChange={set("email")}
                className={inp(errors.email)}
              />
            </Field>
            <Field
              label={t("contact.formFields.project")}
              error={errors.project && t(errors.project)}
            >
              <input
                value={values.project}
                onChange={set("project")}
                className={inp(errors.project)}
              />
            </Field>
          </div>
          <Field label={t("contact.formFields.system")} error={errors.system && t(errors.system)}>
            <select value={values.system} onChange={set("system")} className={inp(errors.system)}>
              <option value="">{t("contact.form.systemPlaceholder")}</option>
              {SYSTEMS.map((s) => (
                <option key={s} value={s}>
                  {t(`contact.systems.${s}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label={t("contact.formFields.message")}
            error={errors.message && t(errors.message)}
          >
            <textarea
              rows={5}
              value={values.message}
              onChange={set("message")}
              className={inp(errors.message)}
            />
          </Field>
          <div>
            <span className="mono-label text-muted-foreground">{t("contact.form.verify")}</span>
            <div ref={captchaRef} className="mt-2 min-h-[78px]" />
            {errors.captcha && (
              <span className="mt-1 block text-xs text-primary">{t(errors.captcha)}</span>
            )}
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex items-center gap-2 bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {t("contact.form.submit")}
          </button>
          <p className="text-xs text-muted-foreground">{t("contact.form.consent")}</p>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="space-y-6 lg:col-span-5"
        >
          <div className="border border-border bg-secondary p-8 text-secondary-foreground">
            <div className="mono-label text-primary">{t("contact.info.heading")}</div>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{t("contact.info.address")}</span>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <a href="tel:+84931190001" className="hover:text-primary">
                  +84 931 190 001
                </a>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <a href="mailto:info@hbhvietnam.vn" className="hover:text-primary">
                  info@hbhvietnam.vn
                </a>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{t("contact.info.hours")}</span>
              </div>
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
        </motion.aside>
      </section>

      <section className="border-t border-border bg-muted/40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl px-5 py-20 md:px-10 md:py-24"
        >
          <div className="mono-label text-primary">— FAQ</div>
          <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">
            {t("contact.faq.heading")}
          </h2>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {FAQ.map((f, i) => (
              <li key={f.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-display text-lg font-bold md:text-xl">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-primary" : ""}`}
                  />
                </button>
                {openFaq === i && <p className="pb-6 pr-8 text-muted-foreground">{f.a}</p>}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
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
