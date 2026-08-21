import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Tr, useLang } from "@/i18n/LanguageContext";

const T = {
  eyebrow: ["Контакты", "Байланыс", "Contacts"] as Tr,
  title: ["Свяжитесь с ABIS Group", "ABIS Group-пен байланысыңыз", "Get in touch with ABIS Group"] as Tr,
  lead: [
    "Главный офис, шоурум и склад находятся в ТК ARMADA, Алматы. Звоните, пишите или приезжайте — будем рады встрече.",
    "Бас кеңсе, шоурум және қойма Алматыдағы ARMADA СО-да орналасқан. Қоңырау шалыңыз, жазыңыз немесе келіңіз — жүздескенімізге қуанышты боламыз.",
    "Head office, showroom and warehouse are in ARMADA Mall, Almaty. Call, write or drop by — we'd love to meet.",
  ] as Tr,
  phone: ["Телефон", "Телефон", "Phone"] as Tr,
  email: ["Email", "Email", "Email"] as Tr,
  address: ["Адрес", "Мекенжай", "Address"] as Tr,
  addressVal: [
    "ТК ARMADA, ул. Кабдолова 1/8, 1 блок, 1G линия, Алматы",
    "ARMADA СО, Қабдолов к-сі 1/8, 1 блок, 1G желісі, Алматы",
    "ARMADA Mall, 1/8 Kabdolova str., block 1, line 1G, Almaty",
  ] as Tr,
  hours: ["Часы работы", "Жұмыс уақыты", "Working hours"] as Tr,
  hoursVal: [
    "Пн–Сб: 09:00 — 19:00 · Вс: выходной",
    "Дс–Сб: 09:00 — 19:00 · Жс: демалыс",
    "Mon–Sat: 09:00 — 19:00 · Sun: closed",
  ] as Tr,
  formTitle: ["Напишите нам", "Бізге жазыңыз", "Write to us"] as Tr,
  formLead: [
    "Заполните форму — ответим в течение рабочего дня.",
    "Форманы толтырыңыз — жұмыс күні ішінде жауап береміз.",
    "Fill the form — we'll reply within the business day.",
  ] as Tr,
  name: ["Имя", "Аты", "Name"] as Tr,
  phonePh: ["Телефон или email", "Телефон немесе email", "Phone or email"] as Tr,
  message: ["Сообщение", "Хабарлама", "Message"] as Tr,
  sending: ["Отправляем…", "Жіберілуде…", "Sending…"] as Tr,
  submit: ["Отправить", "Жіберу", "Send"] as Tr,
  errName: ["Введите имя", "Атыңызды енгізіңіз", "Enter your name"] as Tr,
  errPhone: ["Введите телефон", "Телефонды енгізіңіз", "Enter a phone"] as Tr,
  errMessage: ["Сообщение слишком короткое", "Хабарлама тым қысқа", "Message is too short"] as Tr,
  success: [
    "Сообщение отправлено. Мы свяжемся с вами в ближайшее время.",
    "Хабарлама жіберілді. Біз сізбен жақын арада хабарласамыз.",
    "Message sent. We'll contact you shortly.",
  ] as Tr,
};

const Contacts = () => {
  const { t } = useLang();


  return (
    <PageShell eyebrow={T.eyebrow} title={T.title} lead={T.lead}>

      <div className="grid gap-10">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <Phone className="mb-3 h-6 w-6 text-brand-gold" />
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{t(T.phone)}</div>
              <a href="tel:+77272275018" className="mt-1 block font-display text-xl font-bold text-primary hover:text-brand-gold">
                +7 727 227 50 18
              </a>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <Mail className="mb-3 h-6 w-6 text-brand-gold" />
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{t(T.email)}</div>
              <a href="mailto:info@abis.kz" className="mt-1 block font-display text-xl font-bold text-primary hover:text-brand-gold">
                info@abis.kz
              </a>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft sm:col-span-2">
              <MapPin className="mb-3 h-6 w-6 text-brand-gold" />
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{t(T.address)}</div>
              <div className="mt-1 font-display text-xl font-bold text-primary">
                {t(T.addressVal)}
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft sm:col-span-2">
              <Clock className="mb-3 h-6 w-6 text-brand-gold" />
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{t(T.hours)}</div>
              <div className="mt-1 font-display text-lg font-bold text-primary">{t(T.hoursVal)}</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
            <iframe
              title="ABIS Group — map"
              src="https://www.google.com/maps?q=ARMADA+Almaty+Kabdolova+1/8&output=embed"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </PageShell>
  );
};

export default Contacts;
