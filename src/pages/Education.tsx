import { CalendarClock, GraduationCap, Lightbulb, Palette, Users, Wrench } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const programs = [
  { icon: Lightbulb, title: "Технологии освещения", text: "Современные источники света, расчёт сценариев, управление DALI/Casambi." },
  { icon: Palette, title: "Колеровка и декоративные покрытия", text: "Работа со штукатурками, эффектами, колеровочными системами." },
  { icon: Wrench, title: "Монтаж и сервис", text: "Практикумы для монтажников: подключение трековых систем, диммирование, кейсы." },
  { icon: Users, title: "Тренинги для дизайнеров", text: "Светодизайн интерьера, подбор материалов, работа с заказчиком." },
];

const events = [
  { date: "Каждый месяц", title: "Мастер-класс по декоративным штукатуркам", place: "Студия ABIS, ARMADA" },
  { date: "По расписанию", title: "Семинар «Свет в интерьере»", place: "Шоурум SVET.KZ" },
  { date: "По запросу", title: "Корпоративное обучение менеджеров", place: "На территории заказчика" },
];

const Education = () => (
  <PageShell
    eyebrow="Обучение"
    title="Школа света и декора ABIS"
    lead="Делимся экспертизой с дизайнерами, монтажниками и менеджерами. Тренинги, мастер-классы и сертификационные программы — бесплатно для партнёров."
  >
    <div className="grid gap-6 md:grid-cols-2">
      {programs.map((p) => (
        <article
          key={p.title}
          className="group flex gap-5 rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-luxe"
        >
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-accent-foreground">
            <p.icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="mb-2 font-display text-2xl font-bold text-primary">{p.title}</h3>
            <p className="text-muted-foreground">{p.text}</p>
          </div>
        </article>
      ))}
    </div>

    <section className="mt-20">
      <h2 className="mb-8 flex items-center gap-3 font-display text-3xl font-extrabold text-primary md:text-4xl">
        <CalendarClock className="h-8 w-8 text-brand-gold" /> Ближайшие события
      </h2>
      <div className="overflow-hidden rounded-3xl border border-border/60">
        {events.map((e, i) => (
          <div
            key={e.title}
            className={`flex flex-col gap-2 px-7 py-6 md:flex-row md:items-center md:justify-between ${i % 2 === 0 ? "bg-card" : "bg-secondary/40"}`}
          >
            <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-brand-gold">{e.date}</div>
            <div className="flex-1 font-display text-xl font-bold text-primary md:px-8">{e.title}</div>
            <div className="text-sm text-muted-foreground">{e.place}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="mt-20 flex flex-col items-start gap-6 rounded-3xl bg-brand-deep p-10 text-hero-foreground md:flex-row md:items-center md:justify-between md:p-14">
      <div className="flex items-center gap-5">
        <GraduationCap className="h-12 w-12 text-brand-gold" />
        <div>
          <h3 className="font-display text-2xl font-extrabold md:text-3xl">Записаться на обучение</h3>
          <p className="mt-1 text-hero-foreground/75">Согласуем формат, дату и программу под вашу команду.</p>
        </div>
      </div>
      <a
        href="/contacts"
        className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1"
      >
        Оставить заявку
      </a>
    </section>
  </PageShell>
);

export default Education;
