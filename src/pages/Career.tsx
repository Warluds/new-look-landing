import { ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, ExternalLink, Lightbulb, QrCode, Rocket, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import careerHero from "@/assets/career/career-hero-2.jpg";
import careerTeam from "@/assets/career/career-team.jpg";
import careerQr from "@/assets/career/career-qr.png";

const hhUrl = "https://almaty.hh.kz/search/vacancy?L_is_autosearch=false&area=160&ored_clusters=true&employer_id=1667693";

const reasons = [
  {
    icon: TrendingUp,
    title: "Лидер отрасли",
    text: "ABIS Group работает с мировыми брендами EGLO, Maytoni, Arte Lamp, Dulux, Marshall, Pinotex и Hammerite — команда продает сильные продукты с устойчивой репутацией.",
  },
  {
    icon: Rocket,
    title: "Динамичное окружение",
    text: "Компания развивает розницу, опт и онлайн-продажи через svet.kz и Центр Красок #1, поэтому задачи быстро меняются и дают пространство для роста.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Карьерный рост",
    text: "В ABIS поддерживают обучение сотрудников, развитие компетенций и движение внутри команды — от первых задач до управленческих ролей.",
  },
  {
    icon: Lightbulb,
    title: "Культура инноваций",
    text: "Идеи сотрудников помогают улучшать продажи, дистрибуцию, сервис и взаимодействие с клиентами по всему Казахстану.",
  },
];

const Career = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[70vh] overflow-hidden text-hero-foreground">
        <img src={careerHero} alt="Команда и карьера в ABIS Group" className="absolute inset-0 h-full w-full object-cover motion-safe:animate-slow-pan" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="spotlight-mask pointer-events-none absolute inset-0" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <Link to="/" className="group inline-flex items-center gap-3 font-extrabold transition-colors hover:text-brand-gold">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" /> На главную
          </Link>
          <Link to="/about" className="font-bold transition-colors hover:text-brand-gold">О нас</Link>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl content-end px-6 pb-16 pt-24 lg:px-8">
          <p className="mb-5 inline-flex w-fit items-center rounded-full border border-hero-foreground/25 bg-hero-foreground/12 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] backdrop-blur-md">
            карьера · вакансии · команда
          </p>
          <h1 className="max-w-5xl text-balance font-display text-5xl font-extrabold leading-[0.95] md:text-7xl lg:text-8xl">Карьера в ABIS Group</h1>
          <p className="mt-7 max-w-3xl text-lg font-medium leading-8 text-hero-foreground/86 md:text-xl">
            Мы ищем талантливых и амбициозных людей, готовых стать частью команды и развивать рынок света, красок и интерьерных решений в Казахстане и Центральной Азии.
          </p>
          <a href={hhUrl} target="_blank" rel="noreferrer" className="mt-9 inline-flex w-fit items-center justify-center gap-3 rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-deep">
            Смотреть вакансии <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="animate-fade-up">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">почему ABIS</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-extrabold md:text-6xl">Место, где растут вместе с компанией.</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              В ABIS Group уверены: ключ к успеху — сотрудники. Компания объединяет сильные бренды, розничные салоны, оптовое направление, e-commerce и обучение, поэтому внутри много возможностей для профессионального развития.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <article key={reason.title} className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe" style={{ animation: `fade-up .7s ease-out ${index * 0.08}s both` }}>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary transition-transform group-hover:rotate-3 group-hover:scale-105">
                  <reason.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-extrabold">{reason.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-deep py-20 text-hero-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-hero-foreground/14 shadow-luxe">
            <img src={careerTeam} alt="Команда ABIS Group и рабочая атмосфера" className="h-full min-h-[24rem] w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
          </div>
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-hero-foreground/18 bg-hero-foreground/10 px-4 py-2 font-bold backdrop-blur-md">
              <Sparkles className="h-5 w-5 text-brand-gold" /> присоединяйтесь к нам
            </div>
            <h2 className="font-display text-4xl font-extrabold md:text-6xl">Открытые вакансии — на HeadHunter.</h2>
            <p className="mt-5 leading-8 text-hero-foreground/76">
              Если вы ищете интересные и насыщенные возможности в сфере розничной и оптовой торговли, изучите актуальные вакансии ABIS Group. Можно перейти по кнопке или отсканировать QR-код.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="w-44 rounded-3xl bg-card p-4 shadow-luxe">
                <img src={careerQr} alt="QR-код для перехода к вакансиям ABIS Group на HeadHunter" className="aspect-square w-full rounded-2xl object-contain" loading="lazy" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/45 bg-brand-gold/15 px-4 py-2 font-extrabold text-brand-gold">
                  <QrCode className="h-5 w-5" /> Отсканируйте QR
                </div>
                <ul className="mt-5 space-y-3 text-hero-foreground/82">
                  {[
                    "актуальные вакансии ABIS Group",
                    "быстрый переход на HeadHunter",
                    "удобно открыть с телефона",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-bold">
                      <CheckCircle2 className="h-5 w-5 flex-none text-brand-gold" /> {item}
                    </li>
                  ))}
                </ul>
                <a href={hhUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center justify-center gap-3 rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                  Перейти к вакансиям <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Career;
