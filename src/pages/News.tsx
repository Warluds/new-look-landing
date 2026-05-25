import { ArrowUpRight, CalendarDays } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const news = [
  {
    date: "2025 · Май",
    tag: "Розница",
    title: "Открытие обновлённого флагмана SVET.KZ в ТК ARMADA",
    excerpt: "Расширили шоурум, добавили зону декоративных штукатурок и обновили коллекцию архитектурного света.",
  },
  {
    date: "2025 · Март",
    tag: "Партнерство",
    title: "ABIS Import подписал контракт с европейским производителем светильников",
    excerpt: "Эксклюзивные права на дистрибуцию в Казахстане. Первые поставки уже на складе в Алматы.",
  },
  {
    date: "2024 · Декабрь",
    tag: "Награды",
    title: "Лидер отрасли — 10-й год подряд",
    excerpt: "ABIS Group снова получил статус «Лидер отрасли» в сфере осветительного оборудования.",
  },
  {
    date: "2024 · Сентябрь",
    tag: "Обучение",
    title: "Запуск Школы декоративных покрытий",
    excerpt: "Бесплатные мастер-классы для дизайнеров и мастеров — по новой программе с практикой в студии.",
  },
  {
    date: "2024 · Июнь",
    tag: "Караганда",
    title: "Открыт филиал Центра Красок №1 в Караганде",
    excerpt: "Третий розничный город холдинга. Полный ассортимент колеровочных систем и ЛКМ.",
  },
];

const News = () => (
  <PageShell
    eyebrow="Новости"
    title="Что происходит в ABIS Group"
    lead="Открытия, партнёрства, обучение, награды — следите за жизнью холдинга и его брендов."
  >
    <div className="grid gap-6 md:grid-cols-2">
      {news.map((n) => (
        <article
          key={n.title}
          className="group flex flex-col rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-luxe"
        >
          <div className="mb-4 flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.25em]">
            <span className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" /> {n.date}
            </span>
            <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{n.tag}</span>
          </div>
          <h3 className="mb-3 font-display text-2xl font-bold leading-tight text-primary">{n.title}</h3>
          <p className="flex-1 text-muted-foreground">{n.excerpt}</p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-gold opacity-0 transition-opacity group-hover:opacity-100">
            Подробнее <ArrowUpRight className="h-4 w-4" />
          </div>
        </article>
      ))}
    </div>
  </PageShell>
);

export default News;
