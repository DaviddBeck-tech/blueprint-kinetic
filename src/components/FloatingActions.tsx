import { useEffect, useState } from "react";
import { ArrowUp, Phone, MessageCircle } from "lucide-react";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
      <a href="tel:+84931190001" aria-label="Gọi HBH" className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-110">
        <Phone className="h-5 w-5" />
      </a>
      <a href="https://zalo.me/84931190001" target="_blank" rel="noreferrer" aria-label="Zalo HBH" className="grid h-12 w-12 place-items-center rounded-full bg-[hsl(210_100%_50%)] text-white shadow-lg transition-transform hover:scale-110">
        <MessageCircle className="h-5 w-5" />
      </a>
      {show && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Lên đầu trang" className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background text-foreground shadow-lg hover:bg-accent">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
