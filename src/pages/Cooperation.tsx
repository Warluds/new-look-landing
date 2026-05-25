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

const formats = [
  { icon: Store, title: "Дилерство", text: "Открытие фирменных салонов света и красок под брендами ABIS Group." },
  { icon: Truck, title: "Оптовые поставки", text: "Прямые контракты, специальные цены и резервирование под объекты." },
  { icon: Layers, title: "Проектное сотрудничество", text: "Комплектация ЖК, отелей, ТРЦ, ресторанов и офисных пространств." },
  { icon: Handshake, title: "B2B-партнерство", text: "Дизайнерам и архитекторам — комиссия, обучение, выезд на объекты." },
];

const advantages = [
  { icon: PackageCheck, title: "Комплектация под ключ", text: "Объекты «под ключ» и «под заказ» — берём на себя весь процесс." },
  { icon: Percent, title: "Цены от производителя", text: "Прямые контракты позволяют держать выгодные условия для партнёров." },
  { icon: ShieldCheck, title: "Сопровождение проекта", text: "Контроль на всех этапах — экономия времени и соблюдение сроков." },
  { icon: Palette, title: "110 000+ оттенков", text: "Полная палитра колеровки — любой цвет и фактура под задачу." },
  { icon: Sparkles, title: "3D-модели и каталоги", text: "Доступ к базе 3D-моделей и актуальным электронным каталогам." },
  { icon: RefreshCw, title: "35% обновления в год", text: "Ассортимент обновляется ежегодно — всегда новинки и тренды." },
  { icon: Award, title: "10 лет гарантии", text: "На всю продукцию действует 10-летняя гарантия качества." },
  { icon: Warehouse, title: "Склад в Алматы", text: "Собственные склады, отгрузка по всему Казахстану от 1 дня." },
];

const segments = [
  { icon: Store, label: "Салоны и бутики" },
  { icon: Hotel, label: "ТРЦ и HoReCa" },
  { icon: GraduationCap, label: "Учреждения и школы" },
  { icon: Building2, label: "Бизнес-центры" },
  { icon: Users, label: "Дизайнеры и архитекторы" },
  { icon: Truck, label: "Государственные службы" },
];

const schema = z.object({
  company: z.string().trim().min(2, "Введите название компании").max(120),
  contact: z.string().trim().min(2, "Введите имя").max(100),
  phone: z.string().trim().min(6, "Введите телефон").max(40),
  message: z.string().trim().min(10, "Опишите задачу подробнее").max(2000),
});

const Cooperation = () => {
  const [form, setForm] = useState({ company: "", contact: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Проверьте форму");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Заявка отправлена. Менеджер свяжется в течение рабочего дня.");
      setForm({ company: "", contact: "", phone: "", message: "" });
      setSubmitting(false);
    }, 600);
  };

  return (
    <PageShell
      eyebrow="Сотрудничество"
      title="Партнёрство с ABIS Group"
      lead="Открываем салоны, поставляем оптом, комплектуем проекты. Выберите формат — мы подготовим коммерческое предложение под вашу задачу."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {formats.map((f) => (
          <article
            key={f.title}
            className="group rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-luxe"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-gradient text-accent-foreground">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-display text-2xl font-bold text-primary">{f.title}</h3>
            <p className="text-muted-foreground">{f.text}</p>
          </article>
        ))}
      </div>

      <section className="mt-20 grid gap-10 rounded-3xl border border-border/60 bg-card p-8 shadow-soft md:grid-cols-[1fr,1.2fr] md:p-12">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-primary md:text-4xl">Оставить заявку</h2>
          <p className="mt-4 text-muted-foreground">
            Заполните форму — мы свяжемся с вами в течение одного рабочего дня и подготовим персональные условия.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <div>
              <span className="font-bold text-primary">Телефон отдела продаж:</span>{" "}
              <a href="tel:+77272275018" className="hover:text-brand-gold">+7 727 227 50 18</a>
            </div>
            <div>
              <span className="font-bold text-primary">Email:</span>{" "}
              <a href="mailto:info@abis.kz" className="hover:text-brand-gold">info@abis.kz</a>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Компания"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand-gold focus:outline-none"
          />
          <input
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            placeholder="Контактное лицо"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand-gold focus:outline-none"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Телефон или email"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand-gold focus:outline-none"
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Расскажите о задаче или формате сотрудничества"
            rows={5}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand-gold focus:outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1 disabled:opacity-60"
          >
            {submitting ? "Отправляем…" : "Отправить заявку"}
          </button>
        </form>
      </section>
    </PageShell>
  );
};

export default Cooperation;
