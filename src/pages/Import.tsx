import { Globe2, Package, Plane, ShieldCheck, Truck, Warehouse } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const services = [
  { icon: Globe2, title: "Прямые контракты", text: "Эксклюзивные договоры с производителями света и ЛКМ из Европы, Турции и Азии." },
  { icon: Plane, title: "Международная логистика", text: "Авиа, авто и морские перевозки под ключ — от завода до склада в Алматы." },
  { icon: ShieldCheck, title: "Сертификация", text: "Полное сопровождение таможенного оформления и сертификации СТ-РК / ЕАЭС." },
  { icon: Warehouse, title: "Складская обработка", text: "Собственные складские мощности 2 365 м² с учётом, упаковкой и распределением." },
  { icon: Truck, title: "Доставка по РК", text: "Логистическая сеть по всему Казахстану — Астана, Караганда, Шымкент и регионы." },
  { icon: Package, title: "Дистрибуция", text: "Развитая партнерская сеть: 500+ дилеров, дизайнеров и проектных бюро." },
];

const partners = ["Италия", "Германия", "Испания", "Турция", "Польша", "Китай", "ОАЭ", "Россия"];

const Import = () => (
  <PageShell
    eyebrow="ABIS Import"
    title="Импорт света, красок и декоративных материалов"
    lead="Прямые поставки от ведущих мировых производителей. С 2010 года ABIS Group формирует ассортимент, который определяет рынок Казахстана."
  >
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <article
          key={s.title}
          className="group rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-luxe"
        >
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-gradient text-accent-foreground">
            <s.icon className="h-6 w-6" />
          </div>
          <h3 className="mb-2 font-display text-2xl font-bold text-primary">{s.title}</h3>
          <p className="text-muted-foreground">{s.text}</p>
        </article>
      ))}
    </div>

    <section className="mt-20 rounded-3xl border border-border/60 bg-secondary/40 p-10">
      <h2 className="mb-6 font-display text-3xl font-extrabold text-primary md:text-4xl">География поставок</h2>
      <div className="flex flex-wrap gap-3">
        {partners.map((p) => (
          <span
            key={p}
            className="rounded-full border border-primary/30 bg-card px-5 py-2 text-sm font-bold text-primary"
          >
            {p}
          </span>
        ))}
      </div>
    </section>

    <section className="mt-20 grid gap-6 rounded-3xl bg-brand-deep p-10 text-hero-foreground md:grid-cols-3 md:p-14">
      {[
        ["15 лет", "опыта импорта"],
        ["500+", "брендов в портфеле"],
        ["2 365 м²", "складская инфраструктура"],
      ].map(([n, t]) => (
        <div key={t}>
          <div className="font-display text-5xl font-extrabold text-brand-gold">{n}</div>
          <div className="mt-2 text-sm uppercase tracking-wider text-hero-foreground/70">{t}</div>
        </div>
      ))}
    </section>
  </PageShell>
);

export default Import;
