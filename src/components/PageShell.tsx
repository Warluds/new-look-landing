import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/import", label: "Импорт" },
  { href: "/marketing", label: "Маркетинг" },
  { href: "/cooperation", label: "Сотрудничество" },
  { href: "/education", label: "Обучение" },
  { href: "/news", label: "Новости" },
  { href: "/career", label: "Карьера" },
  { href: "/contacts", label: "Контакты" },
];

interface PageShellProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  children: ReactNode;
}

export const PageShell = ({ eyebrow, title, lead, children }: PageShellProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <a href="/" className="flex items-center gap-2 font-display text-xl font-extrabold text-primary">
            <ArrowLeft className="h-4 w-4" /> ABIS Group
          </a>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-wider text-muted-foreground md:text-sm">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-primary">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-brand-deep via-brand-wine to-primary py-20 text-hero-foreground">
        <div className="absolute inset-0 history-grid opacity-30" />
        <div className="relative mx-auto max-w-5xl px-6">
          {eyebrow && (
            <p className="mb-4 inline-flex rounded-full border border-hero-foreground/25 bg-hero-foreground/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.3em] text-brand-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-balance md:text-7xl">{title}</h1>
          {lead && <p className="mt-6 max-w-2xl text-lg text-hero-foreground/85 md:text-xl">{lead}</p>}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-20">{children}</main>

      <footer className="border-t border-border/60 bg-brand-deep py-10 text-center text-sm text-hero-foreground/70">
        © {new Date().getFullYear()} ABIS Group · Алматы, ТК ARMADA ·{" "}
        <a href="tel:+77272275018" className="text-brand-gold hover:underline">
          +7 727 227 50 18
        </a>
      </footer>
    </div>
  );
};
