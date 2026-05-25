import { BarChart3, Camera, Megaphone, Palette, Smartphone, Video } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const services = [
  { icon: Smartphone, title: "SMM-стратегия", text: "Ведение Instagram, TikTok, YouTube — от концепции до отчётности и роста охватов." },
  { icon: Camera, title: "Фотопродакшн", text: "Предметная и интерьерная съёмка в собственной студии в ТК ARMADA." },
  { icon: Video, title: "Видеопродакшн", text: "Reels, обзоры товара, имиджевые ролики и таргетированный видеоконтент." },
  { icon: Megaphone, title: "Таргет и контекст", text: "Запуск и оптимизация рекламы в Meta, Google Ads, Яндекс.Директ, 2GIS." },
  { icon: Palette, title: "Брендинг", text: "Айдентика, упаковка, гайдлайны, дизайн витрин и POS-материалов." },
  { icon: BarChart3, title: "Аналитика", text: "Сквозная аналитика, дашборды, A/B-тестирование посадочных и креативов." },
];

const Marketing = () => (
  <PageShell
    eyebrow="Impulse Media"
    title="Маркетинговое агентство внутри холдинга"
    lead="Impulse Media — собственное агентство ABIS Group. Помогаем брендам света и интерьера расти в digital, делая контент, который продаёт."
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

    <section className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-wine via-brand-deep to-primary p-10 text-hero-foreground md:p-14">
      <h2 className="font-display text-3xl font-extrabold md:text-5xl">Хотите запустить проект с Impulse Media?</h2>
      <p className="mt-4 max-w-2xl text-lg text-hero-foreground/85">
        Расскажите о задаче — пришлём кейсы, обсудим стратегию и предложим план.
      </p>
      <a
        href="/contacts"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1"
      >
        Связаться с командой
      </a>
    </section>
  </PageShell>
);

export default Marketing;
