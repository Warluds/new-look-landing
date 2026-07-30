import { ArrowLeft, Building2, CalendarDays, CheckCircle2, GraduationCap, Images, Palette, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/abis-showroom-hero.jpg";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const sourcePhotos = import.meta.glob("../assets/about/source/*", { eager: true, import: "default" }) as Record<string, string>;

const photosByYear = Object.entries(sourcePhotos).reduce<Record<string, string[]>>((acc, [path, src]) => {
  const year = path.match(/(20\d{2})-/)?.[1];
  if (!year) return acc;
  acc[year] = [...(acc[year] ?? []), src];
  return acc;
}, {});

Object.values(photosByYear).forEach((photos) => photos.sort());

const getYearPhotos = (year: string) => photosByYear[year] ?? [];

const PhotoCollage = ({ year, title, photos }: { year: string; title: string; photos: string[] }) => {
  const visiblePhotos = photos.slice(0, 3);

  return (
    <div className="relative h-[24rem] overflow-hidden bg-brand-deep lg:h-full lg:min-h-[34rem]">
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-2 p-3">
        {visiblePhotos.map((photo, photoIndex) => (
          <figure
            key={photo}
            className={
              photoIndex === 0
                ? "col-span-5 row-span-3 overflow-hidden rounded-2xl md:col-span-3 md:row-span-5"
                : photoIndex === 1
                  ? "col-span-3 row-span-2 overflow-hidden rounded-2xl md:col-span-2 md:row-span-3"
                  : "col-span-2 row-span-2 overflow-hidden rounded-2xl md:col-span-2 md:row-span-2"
            }
          >
            <img
              src={photo}
              alt={`${year}: ${title}, фото ${photoIndex + 1} из архива ABIS Group`}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </figure>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-deep/95 via-brand-deep/45 to-transparent p-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-hero-foreground/18 bg-hero-foreground/12 px-4 py-2 text-sm font-extrabold backdrop-blur-md">
          <Images className="h-4 w-4 text-brand-gold" /> {photos.length} фото в архиве года
        </div>
      </div>
    </div>
  );
};

const summaryStats = [
  { value: "16 лет", label: "на рынке Казахстана и Центральной Азии" },
  { value: ">2 300 м²", label: "торговых площадей в рознице" },
  { value: "192", label: "сотрудника в команде" },
];

const companyAreas = [
  { icon: Building2, title: "Розничные салоны", text: "Световые решения, краски, декоративные покрытия и консультации для частных и коммерческих интерьеров." },
  { icon: Palette, title: "Премиальные материалы", text: "Центр Красок #1, шоурумы OIKOS, MAITRE DECO, ORAC DECOR и комплексные решения для отделки." },
  { icon: GraduationCap, title: "Обучение и экспертиза", text: "Собственный учебный центр, мастер-классы, презентации и развитие профессионального сообщества." },
];

const history = [
  {
    year: "2010",
    title: "Старт ABIS: первый фирменный магазин EGLO",
    text: "История началась в Алматы, когда австрийское представительство EGLO Kazakhstan предложило дилерство по продажам осветительных приборов. Компания открыла первые 35 м² фирменного магазина австрийского света EGLO в ТК «ARMADA». Штат состоял из 2 человек, но уже тогда была цель сделать из EGLO больше, чем просто магазин.",
    metrics: ["128 м² торговой площади", "5 сотрудников", "40 000 ₸ средний чек"],
  },
  {
    year: "2011",
    title: "Модернизация салонов и первые маркетинговые кампании",
    text: "Команда модернизировала два действующих салона торговым оборудованием, начала автоматизировать учет и продажи, усилила популяризацию ассортимента EGLO через специальную витрину в ТК «ARMADA». Для стимулирования продаж был проведен розыгрыш путевки в Турцию среди клиентов магазинов.",
    metrics: ["143 м² торговой площади", "72 м² склада", "8 сотрудников", "60 000 ₸ средний чек"],
  },
  {
    year: "2012",
    title: "La Bella и филиал EGLO в Караганде",
    text: "ABIS презентовала алматинцам новый салон света и интерьера La Bella, а для жителей и гостей Караганды открыла филиал фирменного магазина EGLO. Ассортимент расширился классическими хрустальными люстрами от иранских производителей — как уважение к локальным интерьерным предпочтениям.",
    metrics: ["255 м² торговой площади", "65 м² офиса", "120 м² склада", "15 сотрудников"],
  },
  {
    year: "2013",
    title: "Новые поставщики и рост сети",
    text: "В портфеле появились качественные европейские бренды Maytoni и ARTE Lamp, которые стали одними из ключевых поставщиков. Карагандинский филиал EGLO был оптимизирован, открылась новая торговая точка EGLO в ТЦ «Строй Март ГИПЕР» площадью 130 м². Команда начала посещать международные выставки света.",
    metrics: ["425 м² торговой площади", "120 м² склада", "15 сотрудников", "130 000 ₸ средний чек"],
  },
  {
    year: "2014",
    title: "Первый салон Maytoni в СНГ и национальная награда",
    text: "Открыт первый в СНГ фирменный салон немецкой торговой марки Maytoni, а объемы поставок выросли в разы. Делегация ABIS посетила Light + Building во Франкфурте. Компания получила Национальный золотой орден и сертификат «Лидера отрасли» Национального бизнес-рейтинга РК.",
    metrics: ["405 м² торговой площади", "80 м² офиса", "200 м² склада", "23 сотрудника"],
  },
  {
    year: "2015",
    title: "Шоурум EGLO и запуск направления красок",
    text: "Запущен единственный в Средней Азии фирменный шоурум австрийского света EGLO, где модели были представлены по сериям и стилям. В этом же году компания открыла направление лакокрасочных материалов AkzoNobel с брендами Dulux, Marshall, Pinotex и Hammerite. Появились концептуальные магазины «Мастерская Цвета Dulux» в Алматы и Караганде.",
    metrics: ["825 м² торговой площади", "110 м² офиса", "310 м² склада", "35 сотрудников"],
  },
  {
    year: "2016",
    title: "La Bella в Караганде и управленческая система",
    text: "В ТЦ «ASIA» в Караганде открылся новый салон света и интерьера La Bella с большим официальным запуском, СМИ, дизайнерами и архитекторами. Компания начала внедрять международные инструменты администрирования и прошла 14-месячный проект обучения и внедрения этих инструментов.",
    metrics: ["905 м² торговой площади", "140 м² офиса", "310 м² склада", "50 сотрудников"],
  },
  {
    year: "2017",
    title: "Новый формат салона и выделение ABIS Import",
    text: "Компания открыла дополнительную площадь в действующем салоне «Макси» в новом формате и получила высокую оценку от поставщиков. Два руководителя прошли долгосрочное обучение в Школе Топ Менеджеров. Дочерняя оптовая компания ABIS Import была выделена в отдельное направление для дистрибуции по всему Казахстану.",
    metrics: ["905 м² торговой площади", "160 м² офиса", "310 м² склада", "230 000 ₸ средний чек"],
  },
  {
    year: "2018",
    title: "Три новых салона и электроустановочная категория",
    text: "В рамках стратегического масштабирования ABIS запустила сразу 3 новых салона в ТК «Жибек Жолы». В ассортимент добавилась категория электроустановочных изделий от ведущих мировых производителей: Legrand, GIRA, JUNG, Schneider Electric.",
    metrics: ["1 350 м² торговой площади", "160 м² офиса", "400 м² склада", "80 сотрудников"],
  },
  {
    year: "2019",
    title: "Новая стилистика салонов и технический свет",
    text: "ABIS кардинально изменила стилизацию салонов, сделав визуальную подачу более современной и понятной для клиентов. В ТК «ARMADA» открылась дополнительная торговая точка с техническим светом — отдельным направлением для функционального освещения.",
    metrics: ["1 350 м² торговой площади", "160 м² офиса", "400 м² склада", "270 000 ₸ средний чек"],
  },
  {
    year: "2020",
    title: "Лидерство в освещении и первые шаги в e-commerce",
    text: "Группа компаний ABIS укрепила позицию лидера в торговле осветительными приборами и продолжила развивать широкий ассортимент в разных дизайнерских направлениях. Пандемия ускорила переход к интернет-формату: компания начала первые шаги по трансформации бизнеса в онлайн-продажи.",
    metrics: ["1 350 м² торговой площади", "180 м² офиса", "400 м² склада", "85 сотрудников"],
  },
  {
    year: "2021",
    title: "Запуск SVET.KZ и ребрендинг направлений",
    text: "Компания запустила собственный интернет-магазин SVET.KZ — современный многофункциональный сайт, удобный для клиентов и менеджеров салонов. Был проведен ребрендинг, а направление красок получило имя «Центр Красок #1». Это закрепило переход от отдельных салонов к сильным узнаваемым брендам.",
    metrics: ["1 400 м² торговой площади", "180 м² офиса", "400 м² склада", "95 сотрудников"],
  },
  {
    year: "2022",
    title: "Учебный центр ABIS и расширение ассортимента",
    text: "Из-за роста мастер-классов, презентаций и профессиональных встреч компания открыла собственный учебный центр. Он ориентирован на развитие талантов в интерьерном дизайне, колеровке, строительстве и авторском надзоре, вмещает до 50 человек и оснащен для продуктивных мероприятий. В салонах появился бренд Kudo.",
    metrics: ["1 870 м² торговой площади", "380 м² офиса", "450 м² склада", "120 сотрудников"],
  },
  {
    year: "2023",
    title: "Шоурумы OIKOS, MAITRE DECO и ORAC DECOR",
    text: "В Центре Красок #1 состоялось открытие шоурумов OIKOS, MAITRE DECO и ORAC DECOR. Мероприятие посетил президент OIKOS Клаудио Балестра. В этом же году сотрудники прошли масштабное обучение «Высшая лига продаж» с Евгением Котовым и получили дипломы.",
    metrics: ["2 000 м² торговой площади", "400 м² офиса", "450 м² склада", "167 сотрудников"],
  },
  {
    year: "2024",
    title: "Астана, новые форматы и Лаборатория света",
    text: "Открыт новый салон Центр Красок #1 в Астане с ассортиментом лакокрасочных материалов, штукатурки и малярных инструментов. SVET.KZ и Центр Красок #1 стали партнерами Traditional Design Dinner от Stella Group. Также появились филиал в Астане, салоны DISCOUNT и CLASSIC, уникальная Лаборатория света и участие в выставках Слёт KZ и KazBuild.",
    metrics: ["2 549 м² торговой площади", "400 м² офиса", "450 м² склада", "192 сотрудника"],
  },
  {
    year: "2025",
    title: "Год мощного роста и новых партнерств",
    text: "ABIS представила тренды освещения 2025 года на HomeDeco Kazakhstan, получила новые контакты среди ритейлеров, HoReCa и дизайнеров из Казахстана и Центральной Азии. Компания ярко выступила на Казахстанских днях дизайнеров и архитектуры, участвовала в Слёте Homestagers и усилила канал рекомендаций через коллаборации с BI Group и Sensata.",
    metrics: ["2 365 м² торговой площади", "400 м² офиса", "450 м² склада", "192 сотрудника"],
  },
];

const About = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[72vh] overflow-hidden text-hero-foreground">
        <img src={heroImage} alt="Шоурум ABIS Group с освещением и декоративными покрытиями" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="spotlight-mask pointer-events-none absolute inset-0" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 lg:px-8">
          <Link to="/" className="group inline-flex items-center gap-3 font-extrabold transition-colors hover:text-brand-gold">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" /> ABIS Group
          </Link>
          <LanguageSwitcher variant="light" />
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl content-end px-6 pb-16 pt-24 lg:px-8">
          <p className="mb-5 inline-flex w-fit items-center rounded-full border border-hero-foreground/25 bg-hero-foreground/12 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] backdrop-blur-md">
            история компании · 2010—2025
          </p>
          <h1 className="max-w-5xl text-balance font-display text-5xl font-extrabold leading-[0.95] md:text-7xl lg:text-8xl">О нас</h1>
          <p className="mt-7 max-w-3xl text-lg font-medium leading-8 text-hero-foreground/86 md:text-xl">
            ABIS Group — группа компаний в сфере света, красок, декоративных покрытий, импорта, розницы, обучения и консалтинг. Ниже — подробная история роста по каждому году.
          </p>
        </div>
      </section>

      <section className="relative -mt-12 z-20 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-luxe md:grid-cols-3">
          {summaryStats.map((item) => (
            <div key={item.label} className="border-border p-6 md:border-r md:last:border-r-0">
              <p className="font-display text-4xl font-extrabold text-primary">{item.value}</p>
              <p className="mt-2 font-semibold leading-6 text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">о компании</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold md:text-6xl">От 35 м² в ТД ARMADA до сети салонов и партнерской экосистемы.</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              ABIS Group — группа компаний с 16-летним опытом работы на рынке Казахстана и Центральной Азии. Мы развиваем направления освещения, красок, декоративных покрытий, дистрибуции и розничной торговли, создавая устойчивые партнерские отношения и долгосрочную ценность для клиентов.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {companyAreas.map((area) => (
              <article key={area.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <area.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-4 text-2xl font-extrabold">{area.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{area.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-clip bg-brand-deep py-20 text-hero-foreground">
        <div className="history-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-brand-gold">подробная история</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">Каждый год — новый масштаб.</h2>
            </div>
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-hero-foreground/18 bg-hero-foreground/10 px-5 py-3 font-bold backdrop-blur-md">
              <CalendarDays className="h-5 w-5 text-brand-gold" /> 2010—2025
            </div>
          </div>

          <nav className="sticky top-0 z-20 -mx-6 mt-10 overflow-x-auto border-y border-hero-foreground/12 bg-brand-deep/92 px-6 py-4 backdrop-blur-xl lg:-mx-8 lg:px-8" aria-label="Навигация по годам истории ABIS Group">
            <div className="flex min-w-max gap-2">
              {history.map((item) => (
                <a key={item.year} href={`#year-${item.year}`} className="rounded-full border border-hero-foreground/14 bg-hero-foreground/8 px-4 py-2 text-sm font-extrabold transition hover:border-brand-gold hover:bg-brand-gold hover:text-accent-foreground">
                  {item.year}
                </a>
              ))}
            </div>
          </nav>

          <div className="mt-12 space-y-6">
            {history.map((item, index) => {
              const photos = getYearPhotos(item.year);

              return (
                <article
                  key={item.year}
                  id={`year-${item.year}`}
                  className="group grid scroll-mt-24 overflow-hidden rounded-2xl border border-hero-foreground/14 bg-hero-foreground/8 shadow-luxe backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:border-brand-gold/45 lg:grid-cols-[0.82fr_1fr]"
                  style={{ animation: `fade-up .75s ease-out ${Math.min(index * 0.04, 0.35)}s both` }}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <PhotoCollage year={item.year} title={item.title} photos={photos} />
                  </div>
                  <div className="relative p-6 md:p-9">
                    <div className="absolute right-6 top-6 hidden h-16 w-16 rounded-full border border-brand-gold/30 bg-hero-foreground/8 transition-transform duration-500 group-hover:rotate-12 md:block" />
                    <p className="font-display text-6xl font-extrabold text-brand-gold md:text-7xl">{item.year}</p>
                    <h3 className="mt-3 text-2xl font-extrabold md:text-3xl">{item.title}</h3>
                    <p className="mt-5 leading-8 text-hero-foreground/78">{item.text}</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {item.metrics.map((metric) => (
                        <div key={metric} className="flex items-center gap-3 rounded-xl border border-hero-foreground/12 bg-hero-foreground/8 px-4 py-3 transition-colors group-hover:border-brand-gold/25">
                          <CheckCircle2 className="h-5 w-5 flex-none text-brand-gold" />
                          <span className="font-bold">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 rounded-3xl bg-card p-8 shadow-luxe md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-secondary px-4 py-2 font-bold text-secondary-foreground">
              <Users className="h-5 w-5 text-primary" /> команда, салоны, партнеры
            </div>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">Продолжим историю вместе?</h2>
            <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">ABIS Group развивает направления света, красок, импорта и партнерской поддержки для проектов по всему Казахстану.</p>
          </div>
          <Link to="/" className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 font-extrabold text-primary-foreground transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            Вернуться на лендинг
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;