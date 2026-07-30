import { useState } from "react";
import {
  Award,
  Building2,
  GraduationCap,
  Handshake,
  Hotel,
  Layers,
  Palette,
  PackageCheck,
  Percent,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageShell } from "@/components/PageShell";
import { Tr, useLang } from "@/i18n/LanguageContext";

const T = {
  eyebrow: ["Сотрудничество", "Серіктестік", "Partnership"] as Tr,
  title: ["Партнёрство с ABIS Group", "ABIS Group-пен серіктестік", "Partnership with ABIS Group"] as Tr,
  lead: [
    "Открываем салоны, поставляем оптом, комплектуем проекты. Выберите формат — мы подготовим коммерческое предложение под вашу задачу.",
    "Салондар ашамыз, көтерме жеткіземіз, жобаларды жинақтаймыз. Форматты таңдаңыз — тапсырмаңызға сай коммерциялық ұсыныс дайындаймыз.",
    "We open showrooms, supply wholesale and equip projects. Pick a format and we'll prepare a tailored offer.",
  ] as Tr,
  whyTitle: [
    "Почему партнёрам выгодно с нами",
    "Серіктестерге бізбен жұмыс істеу неге тиімді",
    "Why it pays to partner with us",
  ] as Tr,
  whyLead: [
    "Восемь причин, по которым с ABIS Group работают застройщики, дизайнеры и розничные сети по всей стране.",
    "ABIS Group-пен бүкіл ел бойынша құрылыс компаниялары, дизайнерлер және бөлшек желілер жұмыс істейтін сегіз себеп.",
    "Eight reasons why developers, designers and retail chains across the country work with ABIS Group.",
  ] as Tr,
  withWhom: ["С кем мы сотрудничаем", "Кіммен жұмыс істейміз", "Who we work with"] as Tr,
  applyTitle: ["Оставить заявку", "Өтінім қалдыру", "Submit a request"] as Tr,
  applyLead: [
    "Заполните форму — мы свяжемся с вами в течение одного рабочего дня и подготовим персональные условия.",
    "Форманы толтырыңыз — бір жұмыс күні ішінде хабарласамыз және жеке шарттарды дайындаймыз.",
    "Fill out the form — we'll contact you within one business day with tailored terms.",
  ] as Tr,
  salesPhone: ["Телефон отдела продаж:", "Сату бөлімі телефоны:", "Sales phone:"] as Tr,
  email: ["Email:", "Email:", "Email:"] as Tr,
  phCompany: ["Компания", "Компания", "Company"] as Tr,
  phContact: ["Контактное лицо", "Байланыс тұлғасы", "Contact person"] as Tr,
  phPhone: ["Телефон или email", "Телефон немесе email", "Phone or email"] as Tr,
  phMessage: [
    "Расскажите о задаче или формате сотрудничества",
    "Тапсырма немесе серіктестік форматы туралы айтыңыз",
    "Describe the task or partnership format",
  ] as Tr,
  sending: ["Отправляем…", "Жіберілуде…", "Sending…"] as Tr,
  submit: ["Отправить заявку", "Өтінім жіберу", "Submit request"] as Tr,
  errCompany: ["Введите название компании", "Компания атауын енгізіңіз", "Enter the company name"] as Tr,
  errContact: ["Введите имя", "Атыңызды енгізіңіз", "Enter your name"] as Tr,
  errPhone: ["Введите телефон", "Телефонды енгізіңіз", "Enter a phone"] as Tr,
  errMessage: ["Опишите задачу подробнее", "Тапсырманы толығырақ сипаттаңыз", "Describe the task in more detail"] as Tr,
  success: [
    "Заявка отправлена. Менеджер свяжется в течение рабочего дня.",
    "Өтінім жіберілді. Менеджер жұмыс күні ішінде хабарласады.",
    "Request sent. A manager will get back to you within the business day.",
  ] as Tr,
};

const formats: Array<{ icon: typeof Store; title: Tr; text: Tr }> = [
  {
    icon: Store,
    title: ["Дилерство", "Дилерлік", "Dealership"],
    text: [
      "Открытие фирменных салонов света и красок под брендами ABIS Group.",
      "ABIS Group брендтерімен жарық және бояу фирмалық салондарын ашу.",
      "Opening branded ABIS Group light and paint showrooms.",
    ],
  },
  {
    icon: Truck,
    title: ["Оптовые поставки", "Көтерме жеткізілім", "Wholesale supply"],
    text: [
      "Прямые контракты, специальные цены и резервирование под объекты.",
      "Тікелей келісімшарттар, арнайы бағалар және нысандарға резервтеу.",
      "Direct contracts, special prices and project reservations.",
    ],
  },
  {
    icon: Layers,
    title: ["Проектное сотрудничество", "Жобалық серіктестік", "Project cooperation"],
    text: [
      "Комплектация ЖК, отелей, ТРЦ, ресторанов и офисных пространств.",
      "Тұрғын кешендерді, қонақүйлерді, СОО, мейрамханалар мен кеңселерді жинақтау.",
      "Equipping residential complexes, hotels, malls, restaurants and offices.",
    ],
  },
  {
    icon: Handshake,
    title: ["B2B-партнерство", "B2B серіктестік", "B2B partnership"],
    text: [
      "Дизайнерам и архитекторам — комиссия, обучение, выезд на объекты.",
      "Дизайнерлер мен сәулетшілерге — комиссия, оқыту, нысандарға бару.",
      "Designers and architects — commission, training and site visits.",
    ],
  },
];

const advantages: Array<{ icon: typeof PackageCheck; title: Tr; text: Tr }> = [
  {
    icon: PackageCheck,
    title: ["Комплектация под ключ", "Кілттік жинақтау", "Turnkey supply"],
    text: [
      "Объекты «под ключ» и «под заказ» — берём на себя весь процесс.",
      "«Кілтті бұрауға дайын» және «тапсырыс бойынша» нысандар — бүкіл процесті өзімізге аламыз.",
      "Turnkey and made-to-order projects — we handle the whole process.",
    ],
  },
  {
    icon: Percent,
    title: ["Цены от производителя", "Өндірушіден бағалар", "Manufacturer prices"],
    text: [
      "Прямые контракты позволяют держать выгодные условия для партнёров.",
      "Тікелей келісімшарттар серіктестер үшін тиімді шарттарды ұстауға мүмкіндік береді.",
      "Direct contracts let us keep favorable terms for partners.",
    ],
  },
  {
    icon: ShieldCheck,
    title: ["Сопровождение проекта", "Жобаны сүйемелдеу", "Project support"],
    text: [
      "Контроль на всех этапах — экономия времени и соблюдение сроков.",
      "Барлық кезеңдерде бақылау — уақытты үнемдеу және мерзімдерді сақтау.",
      "Control at every stage — saving time and meeting deadlines.",
    ],
  },
  {
    icon: Palette,
    title: ["145 000+ оттенков", "145 000+ реңк", "145,000+ tints"],
    text: [
      "Полная палитра колеровки — любой цвет и фактура под задачу.",
      "Толық колеровка палитрасы — тапсырмаға кез келген түс пен текстура.",
      "Full tinting palette — any color and texture for the task.",
    ],
  },
  {
    icon: Sparkles,
    title: ["3D-модели и каталоги", "3D модельдер мен каталогтар", "3D models & catalogs"],
    text: [
      "Доступ к базе 3D-моделей и актуальным электронным каталогам.",
      "3D модельдер базасына және өзекті электрондық каталогтарға қол жеткізу.",
      "Access to a 3D model library and up-to-date e-catalogs.",
    ],
  },
  {
    icon: RefreshCw,
    title: ["35% обновления в год", "Жылына 35% жаңару", "35% refresh per year"],
    text: [
      "Ассортимент обновляется ежегодно — всегда новинки и тренды.",
      "Ассортимент жыл сайын жаңарады — әрқашан жаңалықтар мен трендтер.",
      "The assortment refreshes yearly — always new arrivals and trends.",
    ],
  },
  {
    icon: Award,
    title: ["10 лет гарантии", "10 жыл кепілдік", "10-year warranty"],
    text: [
      "На всю продукцию действует 10-летняя гарантия качества.",
      "Барлық өнімге 10 жылдық сапа кепілдігі қолданылады.",
      "All products carry a 10-year quality warranty.",
    ],
  },
  {
    icon: Warehouse,
    title: ["Склад в Алматы", "Алматыдағы қойма", "Warehouse in Almaty"],
    text: [
      "Собственные склады, отгрузка по всему Казахстану от 1 дня.",
      "Меншікті қоймалар, Қазақстан бойынша жөнелту 1 күннен бастап.",
      "Our own warehouses, shipping across Kazakhstan from 1 day.",
    ],
  },
];

const segments: Array<{ icon: typeof Store; label: Tr }> = [
  { icon: Store, label: ["Салоны и бутики", "Салондар мен бутиктер", "Showrooms & boutiques"] },
  { icon: Hotel, label: ["ТРЦ и HoReCa", "СОО мен HoReCa", "Malls & HoReCa"] },
  { icon: GraduationCap, label: ["Учреждения и школы", "Мекемелер мен мектептер", "Institutions & schools"] },
  { icon: Building2, label: ["Бизнес-центры", "Бизнес-орталықтар", "Business centers"] },
  { icon: Users, label: ["Дизайнеры и архитекторы", "Дизайнерлер мен сәулетшілер", "Designers & architects"] },
  { icon: Truck, label: ["Государственные службы", "Мемлекеттік қызметтер", "Government services"] },
];

const bigStats: Array<[Tr, Tr]> = [
  [["125 000+", "125 000+", "125,000+"], ["моделей в каталоге", "каталогтағы модельдер", "models in catalog"]],
  [["20 000+", "20 000+", "20,000+"], ["позиций в наличии", "қордағы позициялар", "items in stock"]],
  [["145 000+", "145 000+", "145,000+"], ["оттенков колеровки", "колеровка реңктері", "tint shades"]],
  [["\n", "\n", "\n"], ["\n", "\n", "\n"]],
];

const Cooperation = () => {
  const { t } = useLang();
  const [form, setForm] = useState({ company: "", contact: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const schema = z.object({
    company: z.string().trim().min(2, t(T.errCompany)).max(120),
    contact: z.string().trim().min(2, t(T.errContact)).max(100),
    phone: z.string().trim().min(6, t(T.errPhone)).max(40),
    message: z.string().trim().min(10, t(T.errMessage)).max(2000),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success(t(T.success));
      setForm({ company: "", contact: "", phone: "", message: "" });
      setSubmitting(false);
    }, 600);
  };

  return (
    <PageShell eyebrow={T.eyebrow} title={T.title} lead={T.lead}>
      <div className="grid gap-6 md:grid-cols-2">
        {formats.map((f) => (
          <article
            key={t(f.title)}
            className="group rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-luxe"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-gradient text-accent-foreground">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-2xl font-bold text-primary">{t(f.title)}</h3>
            <p className="text-muted-foreground">{t(f.text)}</p>
          </article>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="mb-3 font-display text-3xl font-extrabold text-primary md:text-4xl">{t(T.whyTitle)}</h2>
        <p className="mb-8 max-w-2xl text-muted-foreground">{t(T.whyLead)}</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a) => (
            <div
              key={t(a.title)}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-gold"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient text-accent-foreground">
                <a.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 font-display text-lg font-bold text-primary">{t(a.title)}</h3>
              <p className="text-sm text-muted-foreground">{t(a.text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 rounded-3xl bg-brand-deep p-10 text-hero-foreground md:grid-cols-4 md:p-14">
        {bigStats.map(([n, label], idx) => (
          <div key={idx} className={t(n) === "\n" ? "hidden md:block" : ""}>
            <div className="font-display text-4xl font-extrabold text-brand-gold md:text-5xl">{t(n)}</div>
            <div className="mt-2 text-sm uppercase tracking-wider text-hero-foreground/70">{t(label)}</div>
          </div>
        ))}
      </section>

      <section className="mt-20">
        <h2 className="mb-8 font-display text-3xl font-extrabold text-primary md:text-4xl">{t(T.withWhom)}</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {segments.map((s) => (
            <div
              key={t(s.label)}
              className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-soft"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold text-primary">{t(s.label)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-10 rounded-3xl border border-border/60 bg-card p-8 shadow-soft md:grid-cols-[1fr,1.2fr] md:p-12">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-primary md:text-4xl">{t(T.applyTitle)}</h2>
          <p className="mt-4 text-muted-foreground">{t(T.applyLead)}</p>
          <div className="mt-8 space-y-3 text-sm">
            <div>
              <span className="font-bold text-primary">{t(T.salesPhone)}</span>{" "}
              <a href="tel:+77272275018" className="hover:text-brand-gold">+7 727 227 50 18</a>
            </div>
            <div>
              <span className="font-bold text-primary">{t(T.email)}</span>{" "}
              <a href="mailto:info@abis.kz" className="hover:text-brand-gold">info@abis.kz</a>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder={t(T.phCompany)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand-gold focus:outline-none"
          />
          <input
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            placeholder={t(T.phContact)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand-gold focus:outline-none"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder={t(T.phPhone)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand-gold focus:outline-none"
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={t(T.phMessage)}
            rows={5}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand-gold focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1 disabled:opacity-60"
          >
            {submitting ? t(T.sending) : t(T.submit)}
          </button>
        </form>
      </section>
    </PageShell>
  );
};

export default Cooperation;
