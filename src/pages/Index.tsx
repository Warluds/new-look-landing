import { ArrowRight, Award, Building2, CheckCircle2, Lightbulb, Paintbrush, Phone } from "lucide-react";
import heroImage from "@/assets/abis-showroom-hero.jpg";
import history2010 from "@/assets/about/abis-history-2010.png";
import history2023 from "@/assets/about/abis-history-2023.jpg";
import history2024 from "@/assets/about/abis-history-2024.jpg";

const brands = ["PRO DECOR", "svet.kz", "Центр красок №1", "ULTRA PREMIUM", "ABIS Import", "impulse media"];
const partners = ["Kazakhmys", "RAMS Kazakhstan", "Halyk Bank", "Meloman", "Dastarkhan", "Nomad"];

const directions = [
  {
    icon: Lightbulb,
    title: "Профессиональное освещение",
    text: "Подбор, поставка и сопровождение световых решений для магазинов, офисов, HoReCa и частных интерьеров.",
  },
  {
    icon: Paintbrush,
    title: "Краски и декоративные покрытия",
    text: "Материалы, колеровка и консультации для отделки, ремонта и комплексных коммерческих объектов.",
  },
  {
    icon: Building2,
    title: "Импорт и розничная сеть",
    text: "Единая экосистема брендов ABIS Group: от закупок и логистики до продаж и маркетинга.",
  },
];

const stats = [
  ["15 лет", "присутствия на рынке"],
  ["500+", "партнеров"],
  ["2 365 м²", "торговая площадь"],
];

const history = [
  {
    year: "2010",
    title: "Первый фирменный магазин EGLO",
    text: "ABIS стартовала в Алматы с 35 м² в ТК «ARMADA», двух сотрудников и дилерства австрийского света EGLO.",
    image: history2010,
    metric: "128 м² торговой площади",
  },
  {
    year: "2015",
    title: "Свет и краски в одной экосистеме",
    text: "Запущен шоу-рум EGLO и новое направление лакокрасочных материалов AkzoNobel: Dulux, Marshall, Pinotex и Hammerite.",
    image: history2010,
    metric: "825 м² торговой площади",
  },
  {
    year: "2021",
    title: "SVET.KZ и новый этап брендов",
    text: "Компания запустила интернет-магазин SVET.KZ, провела ребрендинг салонов света и переименовала направление красок в «Центр Красок #1».",
    image: history2023,
    metric: "95 человек в команде",
  },
  {
    year: "2023",
    title: "Шоурумы премиальных покрытий",
    text: "В Центре Красок #1 открылись шоурумы OIKOS, MAITRE DECO и ORAC DECOR, а команда прошла обучение «Высшая лига продаж».",
    image: history2023,
    metric: "2 000 м² торговой площади",
  },
  {
    year: "2024",
    title: "Астана, новые салоны и Лаборатория света",
    text: "Открыт новый Центр Красок #1 в Астане, салоны DISCOUNT и CLASSIC, а также Лаборатория света для наглядной демонстрации решений.",
    image: history2024,
    metric: "192 человека в команде",
  },
  {
    year: "2025",
    title: "Рост через выставки и партнерства",
    text: "ABIS представила тренды освещения на HomeDeco Kazakhstan, KDD и Слёте Homestagers, усилив сотрудничество с дизайнерами, HoReCa и девелоперами.",
    image: history2024,
    metric: "2 365 м² торговой площади",
  },
];

const shopPhotos = [
  { src: history2010, alt: "Первый магазин освещения EGLO в ТК ARMADA" },
  { src: history2023, alt: "Шоурум декоративных покрытий Центр Красок номер один" },
  { src: history2024, alt: "Новый салон Центр Красок номер один в Астане" },
];

const Index = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative min-h-[92vh] text-hero-foreground">
        <img
          src={heroImage}
          alt="Современный шоурум освещения и декоративных покрытий ABIS Group"
          className="absolute inset-0 h-full w-full object-cover motion-safe:animate-slow-pan"
          width={1600}
          height={1000}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="spotlight-mask pointer-events-none absolute inset-0 opacity-90" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-gold">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-hero-foreground/35 bg-hero-foreground/10 font-display text-xl font-bold backdrop-blur-md transition-transform group-hover:scale-105">
              A
            </div>
            <div className="leading-none">
              <p className="font-display text-2xl font-bold">ABIS</p>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-hero-foreground/72">Group</p>
            </div>
          </a>
          <nav className="hidden items-center gap-5 rounded-full border border-hero-foreground/18 bg-hero-foreground/10 px-5 py-3 text-sm font-semibold backdrop-blur-md md:flex">
            <a className="transition-colors hover:text-brand-gold" href="#directions">Направления</a>
            <a className="transition-colors hover:text-brand-gold" href="#partners">Партнеры</a>
            <a className="transition-colors hover:text-brand-gold" href="#contacts">Контакты</a>
          </nav>
        </header>

        <div id="top" className="relative z-10 mx-auto grid min-h-[72vh] max-w-7xl content-center px-6 pb-16 pt-10 lg:px-8">
          <div className="max-w-4xl animate-fade-up">
            <p className="mb-5 inline-flex items-center rounded-full border border-hero-foreground/25 bg-hero-foreground/12 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] backdrop-blur-md">
              освещение · краски · импорт · маркетинг
            </p>
            <h1 className="max-w-5xl text-balance font-display text-6xl font-extrabold leading-[0.92] md:text-8xl lg:text-9xl">
              ABIS Group
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-hero-foreground/86 md:text-xl">
              Группа компаний для тех, кто создает красивые и технологичные пространства: профессиональный свет, краски, декоративные покрытия и партнерская инфраструктура.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#contacts" className="inline-flex items-center justify-center gap-3 rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-deep">
                Стать партнером <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#directions" className="inline-flex items-center justify-center rounded-full border border-hero-foreground/35 bg-hero-foreground/10 px-7 py-4 font-extrabold backdrop-blur-md transition-colors hover:bg-hero-foreground/18 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                Смотреть направления
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-14 z-20 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-luxe md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div key={label} className="border-border p-7 md:border-r md:last:border-r-0">
              <p className="font-display text-5xl font-extrabold text-primary">{value}</p>
              <p className="mt-2 font-semibold text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="directions" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">что делает группа</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold md:text-6xl">Поставляем решения, которые видны в каждом интерьере.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {directions.map((item) => (
            <article key={item.title} className="group rounded-2xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe">
              <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary transition-transform group-hover:rotate-3 group-hover:scale-105">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-extrabold">{item.title}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-deep py-20 text-hero-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-brand-gold">как начать сотрудничество</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Два понятных сценария для партнеров.</h2>
              <p className="mt-5 leading-8 text-hero-foreground/74">Выберите направление — освещение или краски — и получите условия по ассортименту, логистике, маркетинговой поддержке и обучению команды.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Ассортимент для розницы и объектов", "Консультации экспертов", "Маркетинговая поддержка", "Стабильная поставка"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-hero-foreground/14 bg-hero-foreground/8 p-5 backdrop-blur-md">
                  <CheckCircle2 className="h-5 w-5 flex-none text-brand-gold" />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">с нами уже работают</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Бренды, сети и проекты по всему Казахстану.</h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-secondary px-5 py-4 font-bold text-secondary-foreground">
            <Award className="h-5 w-5 text-primary" /> 5-звездочный сервис
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div key={partner} className="grid min-h-28 place-items-center rounded-2xl border border-border bg-card p-5 text-center font-extrabold text-muted-foreground shadow-soft transition-colors hover:text-primary">
              {partner}
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {brands.map((brand) => (
            <span key={brand} className="rounded-full border border-border bg-brand-surface px-4 py-2 text-sm font-extrabold text-primary">{brand}</span>
          ))}
        </div>
      </section>

      <section id="contacts" className="px-6 pb-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl bg-card p-8 shadow-luxe md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">Обсудим сотрудничество?</h2>
            <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">Оставьте заявку команде ABIS Group — подберем направление, формат работы и условия для вашего проекта.</p>
          </div>
          <a href="tel:+77000000000" className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 font-extrabold text-primary-foreground transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <Phone className="h-5 w-5" /> Связаться
          </a>
        </div>
      </section>
    </main>
  );
};

export default Index;