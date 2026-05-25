import { Globe2, Package, Plane, ShieldCheck, Truck, Warehouse } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Tr, useLang } from "@/i18n/LanguageContext";

const T = {
  eyebrow: ["ABIS Import", "ABIS Import", "ABIS Import"] as Tr,
  title: [
    "Импорт света, красок и декоративных материалов",
    "Жарық, бояу және декоративтік материалдар импорты",
    "Import of lighting, paints and decorative materials",
  ] as Tr,
  lead: [
    "Прямые поставки от ведущих мировых производителей. С 2010 года ABIS Group формирует ассортимент, который определяет рынок Казахстана.",
    "Әлемнің жетекші өндірушілерінен тікелей жеткізілім. 2010 жылдан бері ABIS Group Қазақстан нарығын қалыптастыратын ассортимент жинайды.",
    "Direct supply from the world's leading manufacturers. Since 2010, ABIS Group has been shaping the assortment that defines Kazakhstan's market.",
  ] as Tr,
  geoTitle: ["География поставок", "Жеткізілім географиясы", "Supply geography"] as Tr,
  stats: [
    [["15 лет", "15 жыл", "15 years"], ["опыта импорта", "импорт тәжірибесі", "of import expertise"]],
    [["500+", "500+", "500+"], ["брендов в портфеле", "портфельдегі брендтер", "brands in portfolio"]],
    [["2 365 м²", "2 365 м²", "2,365 m²"], ["складская инфраструктура", "қойма инфрақұрылымы", "warehouse infrastructure"]],
  ] as Array<[Tr, Tr]>,
};

const services: Array<{ icon: typeof Globe2; title: Tr; text: Tr }> = [
  {
    icon: Globe2,
    title: ["Прямые контракты", "Тікелей келісімшарттар", "Direct contracts"],
    text: [
      "Эксклюзивные договоры с производителями света и ЛКМ из Европы, Турции и Азии.",
      "Еуропа, Түркия және Азиядан жарық пен бояу өндірушілерімен эксклюзивті келісімдер.",
      "Exclusive deals with light and paint manufacturers from Europe, Turkey and Asia.",
    ],
  },
  {
    icon: Plane,
    title: ["Международная логистика", "Халықаралық логистика", "International logistics"],
    text: [
      "Авиа, авто и морские перевозки под ключ — от завода до склада в Алматы.",
      "Әуе, авто және теңіз тасымалдары кілттік — зауыттан Алматыдағы қоймаға дейін.",
      "Turnkey air, road and sea shipping — from factory to our Almaty warehouse.",
    ],
  },
  {
    icon: ShieldCheck,
    title: ["Сертификация", "Сертификаттау", "Certification"],
    text: [
      "Полное сопровождение таможенного оформления и сертификации СТ-РК / ЕАЭС.",
      "Кедендік ресімдеу мен СТ-РК / ЕАЭО сертификаттауын толық сүйемелдеу.",
      "Full support for customs clearance and ST-RK / EAEU certification.",
    ],
  },
  {
    icon: Warehouse,
    title: ["Складская обработка", "Қойма өңдеу", "Warehousing"],
    text: [
      "Собственные складские мощности 2 365 м² с учётом, упаковкой и распределением.",
      "Меншікті қойма қуаттары 2 365 м² — есеп, орау және тарату.",
      "Our own 2,365 m² warehouse with tracking, packaging and distribution.",
    ],
  },
  {
    icon: Truck,
    title: ["Доставка по РК", "ҚР бойынша жеткізу", "Delivery across Kazakhstan"],
    text: [
      "Логистическая сеть по всему Казахстану — Астана, Караганда, Шымкент и регионы.",
      "Қазақстан бойынша логистикалық желі — Астана, Қарағанды, Шымкент және өңірлер.",
      "Logistics network across Kazakhstan — Astana, Karaganda, Shymkent and regions.",
    ],
  },
  {
    icon: Package,
    title: ["Дистрибуция", "Дистрибуция", "Distribution"],
    text: [
      "Развитая партнерская сеть: 500+ дилеров, дизайнеров и проектных бюро.",
      "Дамыған серіктестік желі: 500+ дилер, дизайнер және жобалау бюросы.",
      "Strong partner network: 500+ dealers, designers and design studios.",
    ],
  },
];

const countries: Tr[] = [
  ["Италия", "Италия", "Italy"],
  ["Германия", "Германия", "Germany"],
  ["Испания", "Испания", "Spain"],
  ["Турция", "Түркия", "Türkiye"],
  ["Польша", "Польша", "Poland"],
  ["Китай", "Қытай", "China"],
  ["ОАЭ", "БАӘ", "UAE"],
  ["Россия", "Ресей", "Russia"],
];

const Import = () => {
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

      <section className="mt-20 rounded-3xl border border-border/60 bg-secondary/40 p-10">
        <h2 className="mb-6 font-display text-3xl font-extrabold text-primary md:text-4xl">{t(T.geoTitle)}</h2>
        <div className="flex flex-wrap gap-3">
          {countries.map((c) => (
            <span
              key={t(c)}
              className="rounded-full border border-primary/30 bg-card px-5 py-2 text-sm font-bold text-primary"
            >
              {t(c)}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 rounded-3xl bg-brand-deep p-10 text-hero-foreground md:grid-cols-3 md:p-14">
        {T.stats.map(([n, label]) => (
          <div key={t(label)}>
            <div className="font-display text-5xl font-extrabold text-brand-gold">{t(n)}</div>
            <div className="mt-2 text-sm uppercase tracking-wider text-hero-foreground/70">{t(label)}</div>
          </div>
        ))}
      </section>
    </PageShell>
  );
};

export default Import;
