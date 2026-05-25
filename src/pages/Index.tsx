import { useState } from "react";
import { ArrowRight, Award, Building2, CheckCircle2, Facebook, Instagram, Lightbulb, Mail, MapPin, Paintbrush, Phone, Send, Star, Trophy, Youtube } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import heroImage from "@/assets/abis-showroom-hero.jpg";
import karagandaStore from "@/assets/retail/karaganda-storefront.jpg";

const childBrands = [
  { name: "SVET.KZ", desc: "Салоны света", href: "https://svet.kz" },
  { name: "Центр Красок №1", desc: "Розничная сеть ЛКМ", href: "https://centr-krasok.kz" },
  { name: "DecorPlus", desc: "Декоративные решения", href: "https://decor-plus.kz" },
  { name: "PRO DECOR", desc: "Студия декора", href: "https://pro-decor.kz" },
  { name: "Impulse Media", desc: "SMM и реклама", href: "https://impulse-media.kz" },
  { name: "And Asia", desc: "Дизайнерские решения", href: "https://an-d.asia" },
];

const partners = [
  "Apple City", "Meloman", "Halyk Bank", "Dastarkhan", "Детский мир", "Nazik",
  "EuroMebel", "Kazakhmys", "Sunkar", "Казах Ювелир", "RAMS Kazakhstan", "Город мастеров", "Nomad",
];

const reviews = [
  {
    name: "Тимур Остемиров",
    text: "Отличный сервис, консультанты молодцы. Помогли с подбором цвета и доставили в срок — рекомендую.",
    source: "svet.kz",
    href: "https://2gis.kz/almaty/firm/70000001023456789",
  },
  {
    name: "Дуйсен Оразалиев",
    text: "Разнообразный выбор, высокий уровень сервиса. Всегда есть из чего выбрать и кому задать вопрос.",
    source: "Центр Красок №1",
    href: "https://2gis.kz/almaty/firm/70000001023456790",
  },
  {
    name: "Айдана Махмутова",
    text: "Отличное обслуживание. Позвонили, всё объяснили, подобрали освещение для всей квартиры.",
    source: "svet.kz",
    href: "https://2gis.kz/almaty/firm/70000001023456789",
  },
  {
    name: "Анна Казанцева",
    text: "Услугами магазина осталась очень довольна. Краски качественные, цвет подобрали идеально.",
    source: "Центр Красок №1",
    href: "https://2gis.kz/almaty/firm/70000001023456790",
  },
];

const awards = [
  { year: "2014", title: "Национальный золотой орден", desc: "Сертификат «Лидер отрасли»" },
  { year: "2014–2015", title: "Золото Национального бизнес-рейтинга РК", desc: "Два года подряд" },
  { year: "2014–2024", title: "Лидер отрасли", desc: "Номинант премии в сфере осветительного оборудования" },
  { year: "—", title: "Samruk Trade", desc: "Диплом признания качества" },
];

const retailLocations = [
  { city: "Караганда", name: "Центр Красок №1", address: "Фирменный салон сети — всё для любителей и профессионалов", image: karagandaStore, tag: "EST. 2015" },
  { city: "Алматы", name: "Флагман ABIS Group", address: "ТК ARMADA, ул. Кабдолова 1/8, 1 блок, 1G линия", image: heroImage, tag: "Флагман" },
  { city: "Астана", name: "SVET.KZ · Центр Красок №1", address: "Розничная сеть света и красок премиум-сегмента", image: heroImage, tag: "Сеть" },
];

const directions = [
  { icon: Lightbulb, title: "Профессиональное освещение", text: "Подбор, поставка и сопровождение световых решений для магазинов, офисов, HoReCa и частных интерьеров." },
  { icon: Paintbrush, title: "Краски и декоративные покрытия", text: "Материалы, колеровка и консультации для отделки, ремонта и комплексных коммерческих объектов." },
  { icon: Building2, title: "Импорт и розничная сеть", text: "Единая экосистема брендов ABIS Group: от закупок и логистики до продаж и маркетинга." },
];

const stats = [
  ["15 лет", "присутствия на рынке"],
  ["500+", "партнеров"],
  ["2 365 м²", "торговая площадь"],
];

const languages = ["RU", "KZ", "EN"] as const;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Введите имя").max(100, "Слишком длинное имя"),
  phone: z.string().trim().min(6, "Введите телефон").max(40, "Слишком длинный номер"),
  message: z.string().trim().min(5, "Сообщение слишком короткое").max(1000, "Слишком длинное сообщение"),
});

const INSTAGRAM_URL = "https://instagram.com/abis.group";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(INSTAGRAM_URL)}`;

const Index = () => {
  const [lang, setLang] = useState<(typeof languages)[number]>("RU");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Проверьте поля формы");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Заявка отправлена — мы свяжемся с вами в ближайшее время.");
    }, 600);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative min-h-[92vh] text-hero-foreground">
        <img
          src={heroImage}
          alt="Шоурум ABIS Group — освещение и декоративные покрытия в Алматы"
          className="absolute inset-0 h-full w-full object-cover motion-safe:animate-slow-pan"
          width={1600}
          height={1000}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="spotlight-mask pointer-events-none absolute inset-0 opacity-90" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-gold">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-hero-foreground/35 bg-hero-foreground/10 font-display text-xl font-bold backdrop-blur-md transition-transform group-hover:scale-105">A</div>
            <div className="leading-none">
              <p className="font-display text-2xl font-bold">ABIS</p>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-hero-foreground/72">Group</p>
            </div>
          </a>
          <nav className="hidden items-center gap-4 rounded-full border border-hero-foreground/18 bg-hero-foreground/10 px-5 py-3 text-xs font-semibold backdrop-blur-md lg:flex">
            <a className="transition-colors hover:text-brand-gold" href="/about">О нас</a>
            <a className="transition-colors hover:text-brand-gold" href="/import">Импорт</a>
            <a className="transition-colors hover:text-brand-gold" href="/marketing">Маркетинг</a>
            <a className="transition-colors hover:text-brand-gold" href="/cooperation">Сотрудничество</a>
            <a className="transition-colors hover:text-brand-gold" href="/education">Обучение</a>
            <a className="transition-colors hover:text-brand-gold" href="/news">Новости</a>
            <a className="transition-colors hover:text-brand-gold" href="/career">Карьера</a>
            <a className="transition-colors hover:text-brand-gold" href="/contacts">Контакты</a>
          </nav>
          <div className="flex items-center gap-1 rounded-full border border-hero-foreground/25 bg-hero-foreground/10 p-1 text-xs font-extrabold backdrop-blur-md">
            {languages.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-3 py-1.5 transition-colors ${lang === l ? "bg-brand-gold text-accent-foreground" : "text-hero-foreground/80 hover:text-brand-gold"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </header>

        <div id="top" className="relative z-10 mx-auto grid min-h-[72vh] max-w-7xl content-center px-6 pb-16 pt-10 lg:px-8">
          <div className="max-w-4xl animate-fade-up">
            <p className="mb-5 inline-flex items-center rounded-full border border-hero-foreground/25 bg-hero-foreground/12 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] backdrop-blur-md">
              освещение · краски · импорт · маркетинг
            </p>
            <h1 className="max-w-5xl text-balance font-display text-6xl font-extrabold leading-[0.92] md:text-8xl lg:text-9xl">ABIS Group</h1>
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

      <section id="brands" className="bg-brand-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">дочерние бренды</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Единая экосистема ABIS Group.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {childBrands.map((b) => (
              <a
                key={b.name}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary hover:shadow-luxe"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-2xl font-extrabold tracking-tight text-primary">{b.name}</p>
                    <p className="mt-2 font-semibold text-muted-foreground">{b.desc}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 -rotate-45 text-muted-foreground transition-all group-hover:rotate-0 group-hover:text-primary" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="retail" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">розничная сеть</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">Наши салоны в городах Казахстана.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">SVET.KZ и Центр Красок №1 — единый стандарт сервиса от флагмана в Алматы до фирменных салонов в Караганде и Астане.</p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {retailLocations.map((loc) => (
            <article key={loc.city} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={loc.image} alt={`${loc.name} — салон в городе ${loc.city}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <span className="absolute left-4 top-4 rounded-full bg-brand-deep/80 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-hero-foreground backdrop-blur-md">{loc.tag}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.2em] text-primary">
                  <MapPin className="h-4 w-4" /> {loc.city}
                </div>
                <h3 className="mt-3 font-display text-2xl font-extrabold">{loc.name}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{loc.address}</p>
              </div>
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

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">отзывы клиентов</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">5★ на 2GIS — годами.</h2>
          </div>
          <div className="flex gap-3">
            <a href="https://2gis.kz/almaty/search/svet.kz" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-extrabold text-primary transition-colors hover:bg-secondary">SVET.KZ на 2GIS</a>
            <a href="https://2gis.kz/almaty/search/Центр%20красок" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-extrabold text-primary transition-colors hover:bg-secondary">Центр Красок №1 на 2GIS</a>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <a key={r.name} href={r.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe">
              <div className="flex gap-0.5 text-brand-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 flex-1 leading-7 text-foreground">«{r.text}»</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="font-extrabold">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.source} · 2GIS</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">награды и признание</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Лидер отрасли — десятилетие подряд.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {awards.map((a) => (
              <article key={a.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <Trophy className="h-9 w-9 text-brand-gold" />
                <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.2em] text-primary">{a.year}</p>
                <h3 className="mt-2 font-display text-xl font-extrabold leading-tight">{a.title}</h3>
                <p className="mt-2 leading-6 text-muted-foreground">{a.desc}</p>
              </article>
            ))}
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
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {partners.map((partner) => (
            <div key={partner} className="grid min-h-24 place-items-center rounded-2xl border border-border bg-card p-5 text-center font-extrabold text-muted-foreground shadow-soft transition-colors hover:text-primary">
              {partner}
            </div>
          ))}
        </div>
      </section>

      <section id="contacts" className="bg-brand-deep py-24 text-hero-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-brand-gold">контакты</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Обсудим сотрудничество?</h2>
              <p className="mt-5 max-w-xl leading-8 text-hero-foreground/76">Оставьте заявку — команда ABIS Group подберет направление, формат работы и условия для вашего проекта.</p>
              <div className="mt-8 space-y-4 text-base">
                <a href="tel:+77272275018" className="flex items-center gap-3 font-bold transition-colors hover:text-brand-gold">
                  <Phone className="h-5 w-5 text-brand-gold" /> +7 (727) 227-50-18
                </a>
                <a href="mailto:info@abis.kz" className="flex items-center gap-3 font-bold transition-colors hover:text-brand-gold">
                  <Mail className="h-5 w-5 text-brand-gold" /> info@abis.kz
                </a>
                <p className="flex items-start gap-3 font-bold">
                  <MapPin className="mt-0.5 h-5 w-5 flex-none text-brand-gold" /> ТК ARMADA, ул. Кабдолова 1/8, 1 блок, 1G линия, Алматы
                </p>
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-hero-foreground/15">
                <iframe
                  title="ABIS Group на карте — Алматы, ТК ARMADA"
                  src="https://www.google.com/maps?q=ARMADA+Almaty+Kabdolova+1/8&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-3xl border border-hero-foreground/15 bg-hero-foreground/8 p-8 backdrop-blur-md">
              <h3 className="font-display text-2xl font-extrabold">Форма обратной связи</h3>
              <p className="mt-2 text-sm text-hero-foreground/72">Перезвоним в течение рабочего дня.</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-bold">Имя</label>
                  <input id="name" name="name" required maxLength={100} className="mt-2 w-full rounded-xl border border-hero-foreground/20 bg-brand-deep/40 px-4 py-3 font-semibold text-hero-foreground placeholder:text-hero-foreground/40 focus:border-brand-gold focus:outline-none" placeholder="Ваше имя" />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-bold">Телефон</label>
                  <input id="phone" name="phone" required maxLength={40} className="mt-2 w-full rounded-xl border border-hero-foreground/20 bg-brand-deep/40 px-4 py-3 font-semibold text-hero-foreground placeholder:text-hero-foreground/40 focus:border-brand-gold focus:outline-none" placeholder="+7 ___ ___ __ __" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-bold">Сообщение</label>
                  <textarea id="message" name="message" required maxLength={1000} rows={4} className="mt-2 w-full rounded-xl border border-hero-foreground/20 bg-brand-deep/40 px-4 py-3 font-semibold text-hero-foreground placeholder:text-hero-foreground/40 focus:border-brand-gold focus:outline-none" placeholder="Кратко опишите задачу" />
                </div>
                <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1 disabled:opacity-60">
                  <Send className="h-5 w-5" /> {submitting ? "Отправляем…" : "Отправить заявку"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-brand-deep pb-10 pt-4 text-hero-foreground">
        <div className="mx-auto max-w-7xl border-t border-hero-foreground/12 px-6 pt-12 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_auto]">
            <div>
              <p className="font-display text-3xl font-extrabold">ABIS Group</p>
              <p className="mt-3 max-w-md text-hero-foreground/72">Холдинг с 2010 года — освещение, краски, импорт, маркетинг и обучение.</p>
              <div className="mt-6 flex items-center gap-3">
                <a href="https://facebook.com/ABIS.Group.kz" target="_blank" rel="noopener noreferrer" aria-label="Facebook ABIS Group" className="grid h-10 w-10 place-items-center rounded-full border border-hero-foreground/20 transition-colors hover:bg-brand-gold hover:text-accent-foreground"><Facebook className="h-4 w-4" /></a>
                <a href="https://youtube.com/@abisgroup5800" target="_blank" rel="noopener noreferrer" aria-label="YouTube ABIS Group" className="grid h-10 w-10 place-items-center rounded-full border border-hero-foreground/20 transition-colors hover:bg-brand-gold hover:text-accent-foreground"><Youtube className="h-4 w-4" /></a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram ABIS Group" className="grid h-10 w-10 place-items-center rounded-full border border-hero-foreground/20 transition-colors hover:bg-brand-gold hover:text-accent-foreground"><Instagram className="h-4 w-4" /></a>
              </div>
            </div>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-semibold text-hero-foreground/80">
              <a href="/about" className="hover:text-brand-gold">О компании</a>
              <a href="/import" className="hover:text-brand-gold">Импорт</a>
              <a href="/marketing" className="hover:text-brand-gold">Маркетинг</a>
              <a href="/cooperation" className="hover:text-brand-gold">Сотрудничество</a>
              <a href="/education" className="hover:text-brand-gold">Обучение</a>
              <a href="/news" className="hover:text-brand-gold">Новости</a>
              <a href="/career" className="hover:text-brand-gold">Карьера</a>
              <a href="/contacts" className="hover:text-brand-gold">Контакты</a>
            </nav>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-hero-foreground/15 bg-hero-foreground/8 p-4 backdrop-blur-md transition-colors hover:border-brand-gold">
              <img src={QR_URL} alt="QR-код Instagram ABIS Group" width={96} height={96} className="h-24 w-24 rounded-md bg-white p-1" loading="lazy" />
              <div className="text-sm">
                <p className="font-extrabold">Instagram</p>
                <p className="text-hero-foreground/70">@abis.group</p>
                <p className="mt-1 text-xs text-hero-foreground/60">Наведите камеру</p>
              </div>
            </a>
          </div>
          <p className="mt-12 border-t border-hero-foreground/10 pt-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-hero-foreground/55">© Все права защищены 2026 — «ABIS Group»</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
