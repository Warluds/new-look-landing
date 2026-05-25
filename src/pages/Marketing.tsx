import { BarChart3, Camera, Megaphone, Palette, Smartphone, Video } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Tr, useLang } from "@/i18n/LanguageContext";

const T = {
  eyebrow: ["Impulse Media", "Impulse Media", "Impulse Media"] as Tr,
  title: [
    "Маркетинговое агентство внутри холдинга",
    "Холдинг ішіндегі маркетинг агенттігі",
    "An in-house marketing agency",
  ] as Tr,
  lead: [
    "Impulse Media — собственное агентство ABIS Group. Помогаем брендам света и интерьера расти в digital, делая контент, который продаёт.",
    "Impulse Media — ABIS Group-тың меншікті агенттігі. Жарық және интерьер брендтеріне сататын контент жасап, digital-да өсуге көмектесеміз.",
    "Impulse Media is ABIS Group's own agency. We help lighting and interior brands grow online with content that sells.",
  ] as Tr,
  ctaTitle: [
    "Хотите запустить проект с Impulse Media?",
    "Impulse Media-мен жоба бастағыңыз келе ме?",
    "Want to launch a project with Impulse Media?",
  ] as Tr,
  ctaLead: [
    "Расскажите о задаче — пришлём кейсы, обсудим стратегию и предложим план.",
    "Тапсырмаңыз туралы айтыңыз — кейстерді жібереміз, стратегияны талқылап, жоспар ұсынамыз.",
    "Tell us about your task — we'll send cases, discuss the strategy and propose a plan.",
  ] as Tr,
  ctaBtn: ["Связаться с командой", "Командамен байланысу", "Contact the team"] as Tr,
};

const services: Array<{ icon: typeof Smartphone; title: Tr; text: Tr }> = [
  {
    icon: Smartphone,
    title: ["SMM-стратегия", "SMM-стратегия", "SMM strategy"],
    text: [
      "Ведение Instagram, TikTok, YouTube — от концепции до отчётности и роста охватов.",
      "Instagram, TikTok, YouTube жүргізу — концепциядан есеп беруге және қамтудың өсуіне дейін.",
      "Instagram, TikTok and YouTube — from concept to reporting and reach growth.",
    ],
  },
  {
    icon: Camera,
    title: ["Фотопродакшн", "Фотопродакшн", "Photo production"],
    text: [
      "Предметная и интерьерная съёмка в собственной студии в ТК ARMADA.",
      "ARMADA СО-дағы меншікті студияда заттық және интерьерлік түсірілім.",
      "Product and interior shoots in our own studio at ARMADA Mall.",
    ],
  },
  {
    icon: Video,
    title: ["Видеопродакшн", "Видеопродакшн", "Video production"],
    text: [
      "Reels, обзоры товара, имиджевые ролики и таргетированный видеоконтент.",
      "Reels, тауар шолулары, имидждік роликтер және таргетингтік бейне контент.",
      "Reels, product reviews, image videos and targeted video content.",
    ],
  },
  {
    icon: Megaphone,
    title: ["Таргет и контекст", "Таргет және контекст", "Targeted & contextual ads"],
    text: [
      "Запуск и оптимизация рекламы в Meta, Google Ads, Яндекс.Директ, 2GIS.",
      "Meta, Google Ads, Яндекс.Директ, 2GIS жарнамаларын іске қосу және оңтайландыру.",
      "Launching and optimizing ads on Meta, Google Ads, Yandex.Direct and 2GIS.",
    ],
  },
  {
    icon: Palette,
    title: ["Брендинг", "Брендинг", "Branding"],
    text: [
      "Айдентика, упаковка, гайдлайны, дизайн витрин и POS-материалов.",
      "Айдентика, орау, гайдлайндар, витрина және POS-материалдар дизайны.",
      "Identity, packaging, guidelines, storefront and POS design.",
    ],
  },
  {
    icon: BarChart3,
    title: ["Аналитика", "Аналитика", "Analytics"],
    text: [
      "Сквозная аналитика, дашборды, A/B-тестирование посадочных и креативов.",
      "Толық аналитика, дашбордтар, лендингтер мен креативтердің A/B сынағы.",
      "End-to-end analytics, dashboards, A/B testing of landings and creatives.",
    ],
  },
];

const Marketing = () => {
  const { t } = useLang();
  return (
    <PageShell eyebrow={T.eyebrow} title={T.title} lead={T.lead}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article
            key={t(s.title)}
            className="group rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-luxe"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-gradient text-accent-foreground">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-2xl font-bold text-primary">{t(s.title)}</h3>
            <p className="text-muted-foreground">{t(s.text)}</p>
          </article>
        ))}
      </div>

      <section className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-wine via-brand-deep to-primary p-10 text-hero-foreground md:p-14">
        <h2 className="font-display text-3xl font-extrabold md:text-5xl">{t(T.ctaTitle)}</h2>
        <p className="mt-4 max-w-2xl text-lg text-hero-foreground/85">{t(T.ctaLead)}</p>
        <a
          href="/contacts"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1"
        >
          {t(T.ctaBtn)}
        </a>
      </section>
    </PageShell>
  );
};

export default Marketing;
