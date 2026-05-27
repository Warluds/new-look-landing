import { ReactNode, useState } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Tr, useLang } from "@/i18n/LanguageContext";

const NAV: Array<{ href: string; label: Tr }> = [
  { href: "/", label: ["Главная", "Басты бет", "Home"] },
  { href: "/about", label: ["О нас", "Біз туралы", "About"] },
  { href: "/import", label: ["Импорт", "Импорт", "Import"] },
  { href: "/marketing", label: ["Маркетинг", "Маркетинг", "Marketing"] },
  { href: "/cooperation", label: ["Сотрудничество", "Серіктестік", "Partnership"] },
  { href: "/education", label: ["Обучение", "Оқыту", "Education"] },
  { href: "/news", label: ["Новости", "Жаңалықтар", "News"] },
  { href: "/career", label: ["Карьера", "Мансап", "Career"] },
  { href: "/contacts", label: ["Контакты", "Байланыс", "Contacts"] },
];

const BACK: Tr = ["ABIS Group", "ABIS Group", "ABIS Group"];

type StringOrTr = string | Tr;

interface PageShellProps {
  eyebrow?: StringOrTr;
  title: StringOrTr;
  lead?: StringOrTr;
  children: ReactNode;
}

const resolve = (t: (tr: Tr) => string, v?: StringOrTr) =>
  v === undefined ? undefined : Array.isArray(v) ? t(v as Tr) : (v as string);

export const PageShell = ({ eyebrow, title, lead, children }: PageShellProps) => {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <a href="/" className="flex items-center gap-2 font-display text-xl font-extrabold text-primary">
            <ArrowLeft className="h-4 w-4" /> {t(BACK)}
          </a>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-wider text-muted-foreground md:text-sm">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-primary">
                {t(n.label)}
              </a>
            ))}
          </nav>
          <LanguageSwitcher variant="dark" />
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-brand-deep via-brand-wine to-primary py-20 text-hero-foreground">
        <div className="absolute inset-0 history-grid opacity-30" />
        <div className="relative mx-auto max-w-5xl px-6">
          {eyebrow && (
            <p className="mb-4 inline-flex rounded-full border border-hero-foreground/25 bg-hero-foreground/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.3em] text-brand-gold">
              {resolve(t, eyebrow)}
            </p>
          )}
          <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-balance md:text-7xl">
            {resolve(t, title)}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-lg text-hero-foreground/85 md:text-xl">{resolve(t, lead)}</p>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-20">{children}</main>

      <footer className="border-t border-border/60 bg-brand-deep py-10 text-center text-sm text-hero-foreground/70">
        © {year} ABIS Group · {t(["Алматы, ТК ARMADA", "Алматы, ARMADA СО", "Almaty, ARMADA Mall"])} ·{" "}
        <a href="tel:+77272275018" className="text-brand-gold hover:underline">
          +7 727 227 50 18
        </a>
      </footer>
    </div>
  );
};
