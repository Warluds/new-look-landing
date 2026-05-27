import { useState } from "react";
import { ArrowRight, Award, Building2, CheckCircle2, Facebook, Instagram, Lightbulb, Mail, MapPin, Menu, Paintbrush, Phone, Send, Star, Trophy, X, Youtube } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import heroImage from "@/assets/abis-showroom-hero.jpg";
import karagandaStore from "@/assets/retail/karaganda-storefront.jpg";
import almatyPaintSalon from "@/assets/almaty-paint-salon.jpg";
import astanaProject from "@/assets/astana-project.jpg";
import logoApplecity from "@/assets/partners/applecity.png";
import logoMeloman from "@/assets/partners/meloman.png";
import logoHalyk from "@/assets/partners/halyk.png";
import logoDastarkhan from "@/assets/partners/dastarkhan.png";
import logoDetskiyMir from "@/assets/partners/detskiy-mir.png";
import logoNazik from "@/assets/partners/nazik.png";
import logoEuromebel from "@/assets/partners/euromebel.png";
import logoKazakhmys from "@/assets/partners/kazakhmys.png";
import logoSunkar from "@/assets/partners/sunkar.png";
import logoKazakhYuvelir from "@/assets/partners/kazakh-yuvelir.png";
import logoRams from "@/assets/partners/rams.png";
import logoGorodMasterov from "@/assets/partners/gorod-masterov.png";
import logoNomad from "@/assets/partners/nomad.png";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Tr, useLang } from "@/i18n/LanguageContext";

const childBrands: Array<{ name: string; desc: Tr; href: string }> = [
  { name: "SVET.KZ", desc: ["Салоны света", "Жарық салондары", "Lighting showrooms"], href: "https://svet.kz" },
  { name: "Центр Красок №1", desc: ["Розничная сеть ЛКМ", "Бояулар бөлшек желісі", "Paints retail network"], href: "https://centr-krasok.kz" },
  { name: "DecorPlus", desc: ["Декоративные решения", "Декоративтік шешімдер", "Decorative solutions"], href: "https://decor-plus.kz" },
  { name: "PRO DECOR", desc: ["Студия декора", "Декор студиясы", "Decor studio"], href: "https://pro-decor.kz" },
  { name: "Impulse Media", desc: ["SMM и реклама", "SMM және жарнама", "SMM & advertising"], href: "https://impulse-media.kz" },
  { name: "And Asia", desc: ["Дизайнерские решения", "Дизайнерлік шешімдер", "Designer solutions"], href: "https://an-d.asia" },
];

const SVET_2GIS = "https://2gis.kz/almaty/firm/70000001043802177";
const KRASKI_2GIS = "https://2gis.kz/almaty/firm/70000001028399796/tab/reviews";

const partners = [
  { name: "Apple City", logo: logoApplecity },
  { name: "Meloman", logo: logoMeloman },
  { name: "Halyk Bank", logo: logoHalyk },
  { name: "Dastarkhan", logo: logoDastarkhan },
  { name: "Детский мир", logo: logoDetskiyMir },
  { name: "Nazik", logo: logoNazik },
  { name: "EuroMebel", logo: logoEuromebel },
  { name: "Kazakhmys", logo: logoKazakhmys },
  { name: "Sunkar", logo: logoSunkar },
  { name: "Казах Ювелир", logo: logoKazakhYuvelir },
  { name: "RAMS Kazakhstan", logo: logoRams },
  { name: "Город мастеров", logo: logoGorodMasterov },
  { name: "Nomad", logo: logoNomad },
];

const reviews: Array<{ name: string; text: Tr; source: string; href: string }> = [
  {
    name: "Тимур Остемиров",
    text: [
      "Отличный сервис, консультанты молодцы, знают как помочь и прекрасно справляются с этим. Респект!",
      "Тамаша сервис, кеңесшілер керемет, көмектесуді біледі және өз ісінің шеберлері. Респект!",
      "Excellent service — the consultants know how to help and do it brilliantly. Respect!",
    ],
    source: "SVET.KZ",
    href: SVET_2GIS,
  },
  {
    name: "Дуйсен Оразалиев",
    text: [
      "Разнообразный выбор, высокий уровень сервиса. Профессионалы своего дела, всё делают качественно и в срок. 5 звёзд.",
      "Кең таңдау, жоғары деңгейдегі сервис. Өз ісінің кәсіби мамандары, бәрін сапалы әрі мерзімінде орындайды. 5 жұлдыз.",
      "Wide selection, high level of service. True professionals — everything is done well and on time. 5 stars.",
    ],
    source: "Центр Красок №1",
    href: KRASKI_2GIS,
  },
  {
    name: "Айдана Махмутова",
    text: [
      "Отличное обслуживание. Позвонили, всё объяснили и быстро доставили. Спасибо!",
      "Тамаша қызмет көрсету. Қоңырау шалып, бәрін түсіндіріп, жылдам жеткізді. Рахмет!",
      "Great service. They called, explained everything and delivered quickly. Thank you!",
    ],
    source: "SVET.KZ",
    href: SVET_2GIS,
  },
  {
    name: "Анна Казанцева",
    text: [
      "Услугами магазина осталась очень довольна. Хороший выбор, нормальные цены, доброжелательные менеджеры.",
      "Дүкеннің қызметіне өте риза болдым. Жақсы таңдау, қалыпты бағалар, ілтипатты менеджерлер.",
      "Very happy with the store. Good selection, fair prices, friendly managers.",
    ],
    source: "Центр Красок №1",
    href: KRASKI_2GIS,
  },
];

const awards: Array<{ year: string; title: Tr; desc: Tr }> = [
  {
    year: "2014",
    title: ["Национальный золотой орден и сертификат «Лидер отрасли»", "Ұлттық алтын орден және «Сала көшбасшысы» сертификаты", "National Gold Order and “Industry Leader” certificate"],
    desc: ["", "", ""],
  },
  {
    year: "2014, 2015",
    title: ["Золото Национального бизнес-рейтинга РК", "ҚР Ұлттық бизнес рейтингінің алтыны", "Gold of the National Business Rating of Kazakhstan"],
    desc: ["", "", ""],
  },
  {
    year: "2014–2024",
    title: ["Номинант премии «Лидер отрасли» в сфере осветительного оборудования", "Жарықтандыру жабдықтары саласындағы «Сала көшбасшысы» сыйлығының номинанты", "Nominee for the “Industry Leader” award in lighting equipment"],
    desc: ["", "", ""],
  },
  {
    year: "—",
    title: ["Диплом «Samruk Trade»", "«Samruk Trade» дипломы", "Samruk Trade diploma"],
    desc: ["", "", ""],
  },
];

const retailLocations: Array<{ city: Tr; name: string; address: Tr; image: string; tag: Tr }> = [
  {
    city: ["Караганда", "Қарағанды", "Karaganda"],
    name: "Центр Красок №1",
    address: [
      "Фирменный салон сети — всё для любителей и профессионалов",
      "Желінің фирмалық салоны — әуесқойларға да, кәсіби мамандарға да",
      "Flagship store of the chain — for both enthusiasts and professionals",
    ],
    image: karagandaStore,
    tag: ["EST. 2015", "EST. 2015", "EST. 2015"],
  },
  {
    city: ["Алматы", "Алматы", "Almaty"],
    name: "Салоны красок Алматы",
    address: [
      "ТК ARMADA, ул. Кабдолова 1/8, 1 блок, 1G линия",
      "ARMADA СО, Қабдолов к-сі 1/8, 1 блок, 1G желісі",
      "ARMADA Mall, 1/8 Kabdolova str., block 1, line 1G",
    ],
    image: almatyPaintSalon,
    tag: ["EST. 2015", "EST. 2015", "EST. 2015"],
  },
  {
    city: ["Астана", "Астана", "Astana"],
    name: "SVET.KZ · Центр Красок №1",
    address: [
      "Розничная сеть света и красок премиум-сегмента",
      "Премиум сегменттегі жарық пен бояулардың бөлшек желісі",
      "Premium retail network for lighting and paints",
    ],
    image: astanaProject,
    tag: ["Сеть", "Желі", "Network"],
  },
];

const directions: Array<{ icon: typeof Lightbulb; title: Tr; text: Tr }> = [
  {
    icon: Lightbulb,
    title: ["Профессиональное освещение", "Кәсіби жарықтандыру", "Professional lighting"],
    text: [
      "Подбор, поставка и сопровождение световых решений для магазинов, офисов, HoReCa и частных интерьеров.",
      "Дүкендер, кеңселер, HoReCa және жеке интерьерлерге арналған жарық шешімдерін таңдау, жеткізу және сүйемелдеу.",
      "Selection, supply and support of lighting solutions for retail, offices, HoReCa and private interiors.",
    ],
  },
  {
    icon: Paintbrush,
    title: ["Краски и декоративные покрытия", "Бояулар және декоративтік жабындар", "Paints & decorative finishes"],
    text: [
      "Материалы, колеровка и консультации для отделки, ремонта и комплексных коммерческих объектов.",
      "Әрлеу, жөндеу және кешенді коммерциялық нысандарға арналған материалдар, колеровка және кеңес беру.",
      "Materials, tinting and consulting for finishing, renovation and turnkey commercial projects.",
    ],
  },
  {
    icon: Building2,
    title: ["Импорт и розничная сеть", "Импорт және бөлшек желі", "Import & retail network"],
    text: [
      "Единая экосистема брендов ABIS Group: от закупок и логистики до продаж и маркетинга.",
      "ABIS Group брендтерінің бірыңғай экожүйесі: сатып алу мен логистикадан сату мен маркетингке дейін.",
      "A single ABIS Group ecosystem — from procurement and logistics to sales and marketing.",
    ],
  },
];

const stats: Array<{ value: Tr; label: Tr }> = [
  { value: ["15 лет", "15 жыл", "15 years"], label: ["присутствия на рынке", "нарықтағы жұмыс", "on the market"] },
  { value: ["500+", "500+", "500+"], label: ["партнеров", "серіктестер", "partners"] },
  { value: ["2 365 м²", "2 365 м²", "2,365 m²"], label: ["торговая площадь", "сауда алаңы", "retail space"] },
];

const partnerScenarios: Tr[] = [
  ["Ассортимент для розницы и объектов", "Бөлшек және нысандар үшін ассортимент", "Range for retail and projects"],
  ["Консультации экспертов", "Сарапшылардың кеңесі", "Expert consultations"],
  ["Маркетинговая поддержка", "Маркетингтік қолдау", "Marketing support"],
  ["Стабильная поставка", "Тұрақты жеткізу", "Stable supply"],
];

const tr = {
  navAbout: ["О нас", "Біз туралы", "About"] as Tr,
  navImport: ["Импорт", "Импорт", "Import"] as Tr,
  navMarketing: ["Маркетинг", "Маркетинг", "Marketing"] as Tr,
  navCooperation: ["Сотрудничество", "Серіктестік", "Partnership"] as Tr,
  navEducation: ["Обучение", "Оқыту", "Education"] as Tr,
  navNews: ["Новости", "Жаңалықтар", "News"] as Tr,
  navCareer: ["Карьера", "Мансап", "Career"] as Tr,
  navContacts: ["Контакты", "Байланыс", "Contacts"] as Tr,
  heroEyebrow: [
    "освещение · краски · импорт · маркетинг",
    "жарық · бояу · импорт · маркетинг",
    "lighting · paints · import · marketing",
  ] as Tr,
  heroLead: [
    "Группа компаний для тех, кто создает красивые и технологичные пространства: профессиональный свет, краски, декоративные покрытия и партнерская инфраструктура.",
    "Сұлу әрі технологиялық кеңістік жасайтындар үшін компаниялар тобы: кәсіби жарық, бояу, декоративтік жабындар және серіктестік инфрақұрылым.",
    "A group of companies for those who craft beautiful, technological spaces: professional lighting, paints, decorative finishes and a partner infrastructure.",
  ] as Tr,
  becomePartner: ["Стать партнером", "Серіктес болу", "Become a partner"] as Tr,
  seeDirections: ["Смотреть направления", "Бағыттарды көру", "Explore directions"] as Tr,
  whatGroupDoes: ["что делает группа", "топ не істейді", "what the group does"] as Tr,
  directionsTitle: [
    "Поставляем решения, которые видны в каждом интерьере.",
    "Әр интерьерден көрінетін шешімдер ұсынамыз.",
    "We deliver solutions visible in every interior.",
  ] as Tr,
  brandsEyebrow: ["дочерние бренды", "еншілес брендтер", "subsidiary brands"] as Tr,
  brandsTitle: ["Единая экосистема ABIS Group.", "ABIS Group бірыңғай экожүйесі.", "A single ABIS Group ecosystem."] as Tr,
  retailEyebrow: ["розничная сеть", "бөлшек желі", "retail network"] as Tr,
  retailTitle: [
    "Наши салоны в городах Казахстана.",
    "Қазақстан қалаларындағы салондарымыз.",
    "Our showrooms across Kazakhstan.",
  ] as Tr,
  retailLead: [
    "SVET.KZ и Центр Красок №1 — единый стандарт сервиса от флагмана в Алматы до фирменных салонов в Караганде и Астане.",
    "SVET.KZ және Центр Красок №1 — Алматыдағы флагманнан Қарағанды мен Астанадағы фирмалық салондарға дейін бірыңғай қызмет стандарты.",
    "SVET.KZ and Paint Center No.1 — one service standard from the Almaty flagship to branded showrooms in Karaganda and Astana.",
  ] as Tr,
  cooperationEyebrow: [
    "как начать сотрудничество",
    "серіктестікті қалай бастау керек",
    "how to start working with us",
  ] as Tr,
  cooperationTitle: [
    "Два понятных сценария для партнеров.",
    "Серіктестер үшін екі түсінікті сценарий.",
    "Two clear scenarios for partners.",
  ] as Tr,
  cooperationLead: [
    "Выберите направление — освещение или краски — и получите условия по ассортименту, логистике, маркетинговой поддержке и обучению команды.",
    "Бағытты таңдаңыз — жарық немесе бояу — және ассортимент, логистика, маркетингтік қолдау және команда оқыту бойынша шарттарды алыңыз.",
    "Pick a track — lighting or paints — and receive terms on assortment, logistics, marketing support and team training.",
  ] as Tr,
  reviewsEyebrow: ["отзывы клиентов", "клиенттердің пікірлері", "client reviews"] as Tr,
  reviewsTitle: ["5★ на 2GIS — годами.", "2GIS-те жылдар бойы 5★.", "5★ on 2GIS — for years."] as Tr,
  on2gis: ["на 2GIS", "2GIS-те", "on 2GIS"] as Tr,
  awardsEyebrow: ["награды и признание", "марапаттар мен мойындау", "awards & recognition"] as Tr,
  awardsTitle: [
    "НАШИ НАГРАДЫ НАЦИОНАЛЬНОГО УРОВНЯ",
    "ҰЛТТЫҚ ДЕҢГЕЙДЕГІ МАРАПАТТАРЫМЫЗ",
    "OUR NATIONAL LEVEL AWARDS",
  ] as Tr,
  partnersEyebrow: ["с нами уже работают", "бізбен қазірдің өзінде жұмыс істейді", "already working with us"] as Tr,
  partnersTitle: [
    "Бренды, сети и проекты по всему Казахстану.",
    "Қазақстан бойынша брендтер, желілер және жобалар.",
    "Brands, chains and projects across Kazakhstan.",
  ] as Tr,
  fiveStarService: ["5-звездочный сервис", "5 жұлдызды сервис", "5-star service"] as Tr,
  contactsEyebrow: ["контакты", "байланыс", "contacts"] as Tr,
  contactsTitle: ["Обсудим сотрудничество?", "Серіктестікті талқылайық па?", "Let's talk partnership?"] as Tr,
  contactsLead: [
    "Оставьте заявку — команда ABIS Group подберет направление, формат работы и условия для вашего проекта.",
    "Өтінім қалдырыңыз — ABIS Group командасы сіздің жобаңызға бағытты, жұмыс форматын және шарттарды таңдайды.",
    "Leave a request — the ABIS Group team will tailor a direction, format and terms for your project.",
  ] as Tr,
  formTitle: ["Форма обратной связи", "Кері байланыс формасы", "Contact form"] as Tr,
  formLead: [
    "Перезвоним в течение рабочего дня.",
    "Жұмыс күні ішінде хабарласамыз.",
    "We'll get back to you within the business day.",
  ] as Tr,
  formName: ["Имя", "Аты", "Name"] as Tr,
  formNamePh: ["Ваше имя", "Сіздің атыңыз", "Your name"] as Tr,
  formPhone: ["Телефон", "Телефон", "Phone"] as Tr,
  formMessage: ["Сообщение", "Хабарлама", "Message"] as Tr,
  formMessagePh: ["Кратко опишите задачу", "Тапсырманы қысқаша сипаттаңыз", "Briefly describe the task"] as Tr,
  sending: ["Отправляем…", "Жіберілуде…", "Sending…"] as Tr,
  submit: ["Отправить заявку", "Өтінім жіберу", "Submit"] as Tr,
  errName: ["Введите имя", "Атыңызды енгізіңіз", "Enter your name"] as Tr,
  errPhone: ["Введите телефон", "Телефонды енгізіңіз", "Enter a phone"] as Tr,
  errMessage: ["Сообщение слишком короткое", "Хабарлама тым қысқа", "Message is too short"] as Tr,
  successMsg: [
    "Заявка отправлена — мы свяжемся с вами в ближайшее время.",
    "Өтінім жіберілді — біз сізбен жақын арада хабарласамыз.",
    "Request sent — we'll contact you shortly.",
  ] as Tr,
  footerTagline: [
    "Холдинг с 2010 года — освещение, краски, импорт, маркетинг и обучение.",
    "2010 жылдан бері холдинг — жарық, бояу, импорт, маркетинг және оқыту.",
    "A holding since 2010 — lighting, paints, import, marketing and education.",
  ] as Tr,
  qrHint: ["Наведите камеру", "Камераны бағыттаңыз", "Point your camera"] as Tr,
  copyright: [
    "© Все права защищены 2026 — «ABIS Group»",
    "© Барлық құқықтары қорғалған 2026 — «ABIS Group»",
    "© All rights reserved 2026 — ABIS Group",
  ] as Tr,
};

const INSTAGRAM_URL = "https://instagram.com/abis.group";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(INSTAGRAM_URL)}`;

const Index = () => {
  const { t } = useLang();
  const [submitting, setSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const contactSchema = z.object({
    name: z.string().trim().min(2, t(tr.errName)).max(100),
    phone: z.string().trim().min(6, t(tr.errPhone)).max(40),
    message: z.string().trim().min(5, t(tr.errMessage)).max(1000),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success(t(tr.successMsg));
    }, 600);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative min-h-[92vh] text-hero-foreground">
        <img
          src={heroImage}
          alt="ABIS Group showroom — lighting and decorative finishes in Almaty"
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
            <a className="transition-colors hover:text-brand-gold" href="/about">{t(tr.navAbout)}</a>
            <a className="transition-colors hover:text-brand-gold" href="/import">{t(tr.navImport)}</a>
            <a className="transition-colors hover:text-brand-gold" href="/marketing">{t(tr.navMarketing)}</a>
            <a className="transition-colors hover:text-brand-gold" href="/cooperation">{t(tr.navCooperation)}</a>
            <a className="transition-colors hover:text-brand-gold" href="/education">{t(tr.navEducation)}</a>
            <a className="transition-colors hover:text-brand-gold" href="/news">{t(tr.navNews)}</a>
            <a className="transition-colors hover:text-brand-gold" href="/career">{t(tr.navCareer)}</a>
            <a className="transition-colors hover:text-brand-gold" href="/contacts">{t(tr.navContacts)}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="light" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hero-foreground/30 bg-hero-foreground/10 text-hero-foreground backdrop-blur-md lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        {menuOpen && (
          <div className="fixed inset-0 z-[60] bg-brand-deep text-hero-foreground lg:hidden">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-hero-foreground/35 bg-hero-foreground/10 font-display text-xl font-bold">A</div>
                <div className="leading-none">
                  <p className="font-display text-2xl font-bold">ABIS</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-hero-foreground/72">Group</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hero-foreground/30 bg-hero-foreground/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-lg font-semibold uppercase tracking-wider">
              <a onClick={() => setMenuOpen(false)} className="hover:text-brand-gold" href="/about">{t(tr.navAbout)}</a>
              <a onClick={() => setMenuOpen(false)} className="hover:text-brand-gold" href="/import">{t(tr.navImport)}</a>
              <a onClick={() => setMenuOpen(false)} className="hover:text-brand-gold" href="/marketing">{t(tr.navMarketing)}</a>
              <a onClick={() => setMenuOpen(false)} className="hover:text-brand-gold" href="/cooperation">{t(tr.navCooperation)}</a>
              <a onClick={() => setMenuOpen(false)} className="hover:text-brand-gold" href="/education">{t(tr.navEducation)}</a>
              <a onClick={() => setMenuOpen(false)} className="hover:text-brand-gold" href="/news">{t(tr.navNews)}</a>
              <a onClick={() => setMenuOpen(false)} className="hover:text-brand-gold" href="/career">{t(tr.navCareer)}</a>
              <a onClick={() => setMenuOpen(false)} className="hover:text-brand-gold" href="/contacts">{t(tr.navContacts)}</a>
            </nav>
          </div>
        )}

        <div id="top" className="relative z-10 mx-auto grid min-h-[72vh] max-w-7xl content-center px-6 pb-16 pt-10 lg:px-8">
          <div className="max-w-4xl animate-fade-up">
            <p className="mb-5 inline-flex items-center rounded-full border border-hero-foreground/25 bg-hero-foreground/12 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] backdrop-blur-md">
              {t(tr.heroEyebrow)}
            </p>
            <h1 className="max-w-5xl text-balance font-display text-6xl font-extrabold leading-[0.92] md:text-8xl lg:text-9xl">ABIS Group</h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-hero-foreground/86 md:text-xl">{t(tr.heroLead)}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#contacts" className="inline-flex items-center justify-center gap-3 rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-deep">
                {t(tr.becomePartner)} <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#directions" className="inline-flex items-center justify-center rounded-full border border-hero-foreground/35 bg-hero-foreground/10 px-7 py-4 font-extrabold backdrop-blur-md transition-colors hover:bg-hero-foreground/18 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                {t(tr.seeDirections)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-14 z-20 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-luxe md:grid-cols-3">
          {stats.map((s) => (
            <div key={t(s.label)} className="border-border p-7 md:border-r md:last:border-r-0">
              <p className="font-display text-5xl font-extrabold text-primary">{t(s.value)}</p>
              <p className="mt-2 font-semibold text-muted-foreground">{t(s.label)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="directions" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">{t(tr.whatGroupDoes)}</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-extrabold md:text-6xl">{t(tr.directionsTitle)}</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {directions.map((item) => (
            <article key={t(item.title)} className="group rounded-2xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe">
              <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary transition-transform group-hover:rotate-3 group-hover:scale-105">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-extrabold">{t(item.title)}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{t(item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="brands" className="bg-brand-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">{t(tr.brandsEyebrow)}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">{t(tr.brandsTitle)}</h2>
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
                    <p className="mt-2 font-semibold text-muted-foreground">{t(b.desc)}</p>
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
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">{t(tr.retailEyebrow)}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-6xl">{t(tr.retailTitle)}</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{t(tr.retailLead)}</p>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {retailLocations.map((loc) => (
            <article key={loc.name} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={loc.image} alt={`${loc.name} — ${t(loc.city)}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <span className="absolute left-4 top-4 rounded-full bg-brand-deep/80 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-hero-foreground backdrop-blur-md">{t(loc.tag)}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.2em] text-primary">
                  <MapPin className="h-4 w-4" /> {t(loc.city)}
                </div>
                <h3 className="mt-3 font-display text-2xl font-extrabold">{loc.name}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{t(loc.address)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-deep py-20 text-hero-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-brand-gold">{t(tr.cooperationEyebrow)}</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">{t(tr.cooperationTitle)}</h2>
              <p className="mt-5 leading-8 text-hero-foreground/74">{t(tr.cooperationLead)}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {partnerScenarios.map((item) => (
                <div key={t(item)} className="flex items-center gap-3 rounded-2xl border border-hero-foreground/14 bg-hero-foreground/8 p-5 backdrop-blur-md">
                  <CheckCircle2 className="h-5 w-5 flex-none text-brand-gold" />
                  <span className="font-bold">{t(item)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">{t(tr.reviewsEyebrow)}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">{t(tr.reviewsTitle)}</h2>
          </div>
          <div className="flex gap-3">
            <a href={SVET_2GIS} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-extrabold text-primary transition-colors hover:bg-secondary">SVET.KZ {t(tr.on2gis)}</a>
            <a href={KRASKI_2GIS} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-extrabold text-primary transition-colors hover:bg-secondary">Центр Красок №1 {t(tr.on2gis)}</a>
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
              <p className="mt-4 flex-1 leading-7 text-foreground">«{t(r.text)}»</p>
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
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">{t(tr.awardsEyebrow)}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">{t(tr.awardsTitle)}</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {awards.map((a) => (
              <article key={t(a.title)} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <Trophy className="h-9 w-9 text-brand-gold" />
                <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.2em] text-primary">{a.year}</p>
                <h3 className="mt-2 font-display text-xl font-extrabold leading-tight">{t(a.title)}</h3>
                <p className="mt-2 leading-6 text-muted-foreground">{t(a.desc)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">{t(tr.partnersEyebrow)}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">{t(tr.partnersTitle)}</h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-secondary px-5 py-4 font-bold text-secondary-foreground">
            <Award className="h-5 w-5 text-primary" /> {t(tr.fiveStarService)}
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {partners.map((partner) => (
            <div key={partner.name} className="grid min-h-24 place-items-center rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-luxe" title={partner.name}>
              <img src={partner.logo} alt={partner.name} loading="lazy" className="max-h-14 w-auto max-w-full object-contain opacity-80 transition-opacity hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      <section id="contacts" className="bg-brand-deep py-24 text-hero-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-brand-gold">{t(tr.contactsEyebrow)}</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">{t(tr.contactsTitle)}</h2>
              <p className="mt-5 max-w-xl leading-8 text-hero-foreground/76">{t(tr.contactsLead)}</p>
              <div className="mt-8 space-y-4 text-base">
                <a href="tel:+77272275018" className="flex items-center gap-3 font-bold transition-colors hover:text-brand-gold">
                  <Phone className="h-5 w-5 text-brand-gold" /> +7 (727) 227-50-18
                </a>
                <a href="mailto:info@abis.kz" className="flex items-center gap-3 font-bold transition-colors hover:text-brand-gold">
                  <Mail className="h-5 w-5 text-brand-gold" /> info@abis.kz
                </a>
                <p className="flex items-start gap-3 font-bold">
                  <MapPin className="mt-0.5 h-5 w-5 flex-none text-brand-gold" />{" "}
                  {t([
                    "ТК ARMADA, ул. Кабдолова 1/8, 1 блок, 1G линия, Алматы",
                    "ARMADA СО, Қабдолов к-сі 1/8, 1 блок, 1G желісі, Алматы",
                    "ARMADA Mall, 1/8 Kabdolova str., block 1, line 1G, Almaty",
                  ])}
                </p>
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-hero-foreground/15">
                <iframe
                  title="ABIS Group — Almaty, ARMADA"
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
              <h3 className="font-display text-2xl font-extrabold">{t(tr.formTitle)}</h3>
              <p className="mt-2 text-sm text-hero-foreground/72">{t(tr.formLead)}</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-bold">{t(tr.formName)}</label>
                  <input id="name" name="name" required maxLength={100} className="mt-2 w-full rounded-xl border border-hero-foreground/20 bg-brand-deep/40 px-4 py-3 font-semibold text-hero-foreground placeholder:text-hero-foreground/40 focus:border-brand-gold focus:outline-none" placeholder={t(tr.formNamePh)} />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-bold">{t(tr.formPhone)}</label>
                  <input id="phone" name="phone" required maxLength={40} className="mt-2 w-full rounded-xl border border-hero-foreground/20 bg-brand-deep/40 px-4 py-3 font-semibold text-hero-foreground placeholder:text-hero-foreground/40 focus:border-brand-gold focus:outline-none" placeholder="+7 ___ ___ __ __" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-bold">{t(tr.formMessage)}</label>
                  <textarea id="message" name="message" required maxLength={1000} rows={4} className="mt-2 w-full rounded-xl border border-hero-foreground/20 bg-brand-deep/40 px-4 py-3 font-semibold text-hero-foreground placeholder:text-hero-foreground/40 focus:border-brand-gold focus:outline-none" placeholder={t(tr.formMessagePh)} />
                </div>
                <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1 disabled:opacity-60">
                  <Send className="h-5 w-5" /> {submitting ? t(tr.sending) : t(tr.submit)}
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
              <p className="mt-3 max-w-md text-hero-foreground/72">{t(tr.footerTagline)}</p>
              <div className="mt-6 flex items-center gap-3">
                <a href="https://facebook.com/ABIS.Group.kz" target="_blank" rel="noopener noreferrer" aria-label="Facebook ABIS Group" className="grid h-10 w-10 place-items-center rounded-full border border-hero-foreground/20 transition-colors hover:bg-brand-gold hover:text-accent-foreground"><Facebook className="h-4 w-4" /></a>
                <a href="https://youtube.com/@abisgroup5800" target="_blank" rel="noopener noreferrer" aria-label="YouTube ABIS Group" className="grid h-10 w-10 place-items-center rounded-full border border-hero-foreground/20 transition-colors hover:bg-brand-gold hover:text-accent-foreground"><Youtube className="h-4 w-4" /></a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram ABIS Group" className="grid h-10 w-10 place-items-center rounded-full border border-hero-foreground/20 transition-colors hover:bg-brand-gold hover:text-accent-foreground"><Instagram className="h-4 w-4" /></a>
              </div>
            </div>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-semibold text-hero-foreground/80">
              <a href="/about" className="hover:text-brand-gold">{t(tr.navAbout)}</a>
              <a href="/import" className="hover:text-brand-gold">{t(tr.navImport)}</a>
              <a href="/marketing" className="hover:text-brand-gold">{t(tr.navMarketing)}</a>
              <a href="/cooperation" className="hover:text-brand-gold">{t(tr.navCooperation)}</a>
              <a href="/education" className="hover:text-brand-gold">{t(tr.navEducation)}</a>
              <a href="/news" className="hover:text-brand-gold">{t(tr.navNews)}</a>
              <a href="/career" className="hover:text-brand-gold">{t(tr.navCareer)}</a>
              <a href="/contacts" className="hover:text-brand-gold">{t(tr.navContacts)}</a>
            </nav>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-hero-foreground/15 bg-hero-foreground/8 p-4 backdrop-blur-md transition-colors hover:border-brand-gold">
              <img src={QR_URL} alt="Instagram QR — ABIS Group" width={96} height={96} className="h-24 w-24 rounded-md bg-white p-1" loading="lazy" />
              <div className="text-sm">
                <p className="font-extrabold">Instagram</p>
                <p className="text-hero-foreground/70">@abis.group</p>
                <p className="mt-1 text-xs text-hero-foreground/60">{t(tr.qrHint)}</p>
              </div>
            </a>
          </div>
          <p className="mt-12 border-t border-hero-foreground/10 pt-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-hero-foreground/55">{t(tr.copyright)}</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
