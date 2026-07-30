import { CalendarClock, GraduationCap, Lightbulb, Palette, Presentation, Users, Wrench } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Tr, useLang } from "@/i18n/LanguageContext";
import training1 from "@/assets/training/training-1.webp";
import training2 from "@/assets/training/training-2.webp";
import trainingVideo from "@/assets/training/training.mp4";

const T = {
  eyebrow: ["Обучение", "Оқыту", "Education"] as Tr,
  title: ["Школа света и декора ABIS", "ABIS жарық және декор мектебі", "ABIS School of Light and Decor"] as Tr,
  lead: [
    "Делимся экспертизой с дизайнерами, монтажниками и менеджерами. Тренинги, мастер-классы и сертификационные программы — бесплатно для партнёров.",
    "Дизайнерлермен, монтаждаушылармен және менеджерлермен тәжірибемізбен бөлісеміз. Тренингтер, шеберлік сабақтары және сертификаттау бағдарламалары — серіктестер үшін тегін.",
    "We share expertise with designers, installers and managers. Trainings, master classes and certification programs — free for partners.",
  ] as Tr,
  events: ["Ближайшие события", "Жақын іс-шаралар", "Upcoming events"] as Tr,
  ctaTitle: ["Записаться на обучение", "Оқуға жазылу", "Sign up for training"] as Tr,
  ctaLead: [
    "Согласуем формат, дату и программу под вашу команду.",
    "Командаңызға арналған форматты, күнді және бағдарламаны келісеміз.",
    "We'll agree on the format, date and program for your team.",
  ] as Tr,
  ctaBtn: ["Оставить заявку", "Өтінім қалдыру", "Submit a request"] as Tr,
};

const programs: Array<{ icon: typeof Lightbulb; title: Tr; text: Tr }> = [
  {
    icon: Lightbulb,
    title: ["Технологии освещения", "Жарықтандыру технологиялары", "Lighting technology"],
    text: [
      "Современные источники света, расчёт сценариев, управление DALI/Casambi.",
      "Заманауи жарық көздері, сценарийлерді есептеу, DALI/Casambi басқару.",
      "Modern light sources, scenario design, DALI/Casambi control.",
    ],
  },
  {
    icon: Palette,
    title: ["Колеровка и декоративные покрытия", "Колеровка және декоративтік жабындар", "Tinting & decorative finishes"],
    text: [
      "Работа со штукатурками, эффектами, колеровочными системами.",
      "Сылақтармен, эффектілермен, колеровка жүйелерімен жұмыс.",
      "Working with plasters, effects and tinting systems.",
    ],
  },
  {
    icon: Wrench,
    title: ["Монтаж и сервис", "Монтаж және сервис", "Installation & service"],
    text: [
      "Практикумы для монтажников: подключение трековых систем, диммирование, кейсы.",
      "Монтаждаушыларға арналған практикумдар: трек жүйелерін қосу, диммерлеу, кейстер.",
      "Hands-on workshops for installers: track systems, dimming, real cases.",
    ],
  },
  {
    icon: Users,
    title: ["Тренинги для дизайнеров", "Дизайнерлерге арналған тренингтер", "Designer trainings"],
    text: [
      "Светодизайн интерьера, подбор материалов, работа с заказчиком.",
      "Интерьер жарық дизайны, материалдарды таңдау, тапсырыс берушімен жұмыс.",
      "Interior light design, material selection, client work.",
    ],
  },
];

const events: Array<{ date: Tr; title: Tr; place: Tr }> = [
  {
    date: ["Каждый месяц", "Ай сайын", "Every month"],
    title: [
      "Мастер-класс по декоративным штукатуркам",
      "Декоративтік сылақтар бойынша шеберлік сабағы",
      "Decorative plasters master class",
    ],
    place: ["Студия ABIS, ARMADA", "ABIS студиясы, ARMADA", "ABIS studio, ARMADA"],
  },
  {
    date: ["По расписанию", "Кесте бойынша", "On schedule"],
    title: ["Семинар «Свет в интерьере»", "«Интерьердегі жарық» семинары", "“Light in interior” seminar"],
    place: ["Шоурум SVET.KZ", "SVET.KZ шоурумы", "SVET.KZ showroom"],
  },
  {
    date: ["По запросу", "Сұраныс бойынша", "On request"],
    title: [
      "Корпоративное обучение менеджеров",
      "Менеджерлерге арналған корпоративтік оқыту",
      "Corporate manager training",
    ],
    place: ["На территории заказчика", "Тапсырыс беруші аумағында", "On the client's site"],
  },
];

const Education = () => {
  const { t } = useLang();
  return (
    <PageShell eyebrow={T.eyebrow} title={T.title} lead={T.lead}>
      <div className="grid gap-6 md:grid-cols-2">
        {programs.map((p) => (
          <article
            key={t(p.title)}
            className="group flex gap-5 rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-luxe"
          >
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-accent-foreground">
              <p.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-2 font-display text-2xl font-bold text-primary">{t(p.title)}</h3>
              <p className="text-muted-foreground">{t(p.text)}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="mb-8 flex items-center gap-3 font-display text-3xl font-extrabold text-primary md:text-4xl">
          <CalendarClock className="h-8 w-8 text-brand-gold" /> {t(T.events)}
        </h2>
        <div className="overflow-hidden rounded-3xl border border-border/60">
          {events.map((e, i) => (
            <div
              key={t(e.title)}
              className={`flex flex-col gap-2 px-7 py-6 md:flex-row md:items-center md:justify-between ${i % 2 === 0 ? "bg-card" : "bg-secondary/40"}`}
            >
              <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-brand-gold">{t(e.date)}</div>
              <div className="flex-1 font-display text-xl font-bold text-primary md:px-8">{t(e.title)}</div>
              <div className="text-sm text-muted-foreground">{t(e.place)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-brand-gold">
              {t(["Наш тренинг-зал", "Біздің тренинг-зал", "Our training hall"] as Tr)}
            </p>
            <h2 className="mt-2 flex items-center gap-3 font-display text-3xl font-extrabold text-primary md:text-4xl">
              <Presentation className="h-8 w-8 text-brand-gold" />
              {t([
                "Современная площадка для обучения и мероприятий",
                "Оқыту мен іс-шараларға арналған заманауи алаң",
                "A modern venue for training and events",
              ] as Tr)}
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {t([
                "Оборудованный зал с проектором, интерактивным экраном, микрофонами и подиумом спикера. Подходит для семинаров, мастер-классов и презентаций. Также сдаётся в аренду под мероприятия партнёров.",
                "Проектормен, интерактивті экранмен, микрофондармен және спикер мінбесімен жабдықталған зал. Семинарларға, шеберлік сабақтарына және презентацияларға қолайлы. Серіктестердің іс-шараларына жалға да беріледі.",
                "Equipped hall with a projector, interactive screen, microphones and a speaker podium. Suitable for seminars, master classes and presentations. Also available for rent for partner events.",
              ] as Tr)}
            </p>
          </div>
          <a
            href="https://wa.me/77018807710"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1"
          >
            {t(["Узнать об аренде", "Жалдау туралы білу", "Ask about renting"] as Tr)}
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-3xl border border-border/60 bg-brand-deep shadow-soft">
            <video
              src={trainingVideo}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          {[training1, training2].map((src, i) => (
            <div key={i} className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
              <img
                src={src}
                alt={`Тренинг-зал ABIS, фото ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      </section>
    </PageShell>
  );
};

export default Education;
