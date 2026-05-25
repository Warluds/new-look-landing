import { ArrowUpRight, CalendarDays } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Tr, useLang } from "@/i18n/LanguageContext";

const T = {
  eyebrow: ["Новости", "Жаңалықтар", "News"] as Tr,
  title: ["Что происходит в ABIS Group", "ABIS Group-та не болып жатыр", "What's happening at ABIS Group"] as Tr,
  lead: [
    "Открытия, партнёрства, обучение, награды — следите за жизнью холдинга и его брендов.",
    "Ашылулар, серіктестіктер, оқыту, марапаттар — холдинг пен оның брендтерінің өмірін қадағалаңыз.",
    "Openings, partnerships, training, awards — follow the life of the holding and its brands.",
  ] as Tr,
  more: ["Подробнее", "Толығырақ", "Read more"] as Tr,
};

const news: Array<{ date: Tr; tag: Tr; title: Tr; excerpt: Tr }> = [
  {
    date: ["2025 · Май", "2025 · Мамыр", "2025 · May"],
    tag: ["Розница", "Бөлшек", "Retail"],
    title: [
      "Открытие обновлённого флагмана SVET.KZ в ТК ARMADA",
      "ARMADA СО-да SVET.KZ жаңартылған флагманының ашылуы",
      "Opening of the updated SVET.KZ flagship at ARMADA Mall",
    ],
    excerpt: [
      "Расширили шоурум, добавили зону декоративных штукатурок и обновили коллекцию архитектурного света.",
      "Шоурумды кеңейттік, декоративтік сылақтар аймағын қостық және сәулеттік жарық коллекциясын жаңарттық.",
      "We expanded the showroom, added a decorative plaster zone and refreshed the architectural light collection.",
    ],
  },
  {
    date: ["2025 · Март", "2025 · Наурыз", "2025 · March"],
    tag: ["Партнерство", "Серіктестік", "Partnership"],
    title: [
      "ABIS Import подписал контракт с европейским производителем светильников",
      "ABIS Import еуропалық жарықтандыру өндірушісімен келісімшартқа қол қойды",
      "ABIS Import signs deal with a European lighting manufacturer",
    ],
    excerpt: [
      "Эксклюзивные права на дистрибуцию в Казахстане. Первые поставки уже на складе в Алматы.",
      "Қазақстанда дистрибуцияға эксклюзивті құқық. Алғашқы жеткізілімдер Алматыдағы қоймада.",
      "Exclusive distribution rights in Kazakhstan. First shipments already at the Almaty warehouse.",
    ],
  },
  {
    date: ["2024 · Декабрь", "2024 · Желтоқсан", "2024 · December"],
    tag: ["Награды", "Марапаттар", "Awards"],
    title: ["Лидер отрасли — 10-й год подряд", "Сала көшбасшысы — қатарынан 10-шы жыл", "Industry leader — 10th year in a row"],
    excerpt: [
      "ABIS Group снова получил статус «Лидер отрасли» в сфере осветительного оборудования.",
      "ABIS Group жарықтандыру жабдықтары саласында «Сала көшбасшысы» мәртебесін қайта алды.",
      "ABIS Group has again received the “Industry leader” status in lighting equipment.",
    ],
  },
  {
    date: ["2024 · Сентябрь", "2024 · Қыркүйек", "2024 · September"],
    tag: ["Обучение", "Оқыту", "Education"],
    title: [
      "Запуск Школы декоративных покрытий",
      "Декоративтік жабындар мектебінің ашылуы",
      "Launch of the Decorative Finishes School",
    ],
    excerpt: [
      "Бесплатные мастер-классы для дизайнеров и мастеров — по новой программе с практикой в студии.",
      "Дизайнерлер мен шеберлерге арналған тегін шеберлік сабақтары — студиядағы тәжірибесі бар жаңа бағдарлама бойынша.",
      "Free master classes for designers and craftsmen — a new program with hands-on studio practice.",
    ],
  },
  {
    date: ["2024 · Июнь", "2024 · Маусым", "2024 · June"],
    tag: ["Караганда", "Қарағанды", "Karaganda"],
    title: [
      "Открыт филиал Центра Красок №1 в Караганде",
      "Қарағандыда «Центр Красок №1» филиалы ашылды",
      "Paint Center No.1 branch opened in Karaganda",
    ],
    excerpt: [
      "Третий розничный город холдинга. Полный ассортимент колеровочных систем и ЛКМ.",
      "Холдингтің үшінші бөлшек қаласы. Колеровка жүйелері мен бояулардың толық ассортименті.",
      "The holding's third retail city. A full range of tinting systems and paints.",
    ],
  },
];

const News = () => {
  const { t } = useLang();
  return (
    <PageShell eyebrow={T.eyebrow} title={T.title} lead={T.lead}>
      <div className="grid gap-6 md:grid-cols-2">
        {news.map((n) => (
          <article
            key={t(n.title)}
            className="group flex flex-col rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-luxe"
          >
            <div className="mb-4 flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.25em]">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" /> {t(n.date)}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">{t(n.tag)}</span>
            </div>
            <h3 className="mb-3 font-display text-2xl font-bold leading-tight text-primary">{t(n.title)}</h3>
            <p className="flex-1 text-muted-foreground">{t(n.excerpt)}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-gold opacity-0 transition-opacity group-hover:opacity-100">
              {t(T.more)} <ArrowUpRight className="h-4 w-4" />
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
};

export default News;
