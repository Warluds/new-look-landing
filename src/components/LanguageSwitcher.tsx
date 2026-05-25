import { LANGS, useLang } from "@/i18n/LanguageContext";

interface Props {
  variant?: "light" | "dark";
  className?: string;
}

export const LanguageSwitcher = ({ variant = "dark", className = "" }: Props) => {
  const { lang, setLang } = useLang();
  const isLight = variant === "light";
  return (
    <div
      className={`flex items-center gap-1 rounded-full p-1 text-xs font-extrabold backdrop-blur-md ${
        isLight
          ? "border border-hero-foreground/25 bg-hero-foreground/10"
          : "border border-border bg-card"
      } ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {LANGS.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              active
                ? "bg-brand-gold text-accent-foreground"
                : isLight
                  ? "text-hero-foreground/80 hover:text-brand-gold"
                  : "text-muted-foreground hover:text-primary"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
};
