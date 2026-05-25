import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { PageShell } from "@/components/PageShell";

const schema = z.object({
  name: z.string().trim().min(2, "Введите имя").max(100),
  phone: z.string().trim().min(6, "Введите телефон").max(40),
  message: z.string().trim().min(5, "Сообщение слишком короткое").max(1000),
});

const Contacts = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
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
      toast.success("Сообщение отправлено. Мы свяжемся с вами в ближайшее время.");
      setForm({ name: "", phone: "", message: "" });
      setSubmitting(false);
    }, 600);
  };

  return (
    <PageShell
      eyebrow="Контакты"
      title="Свяжитесь с ABIS Group"
      lead="Главный офис, шоурум и склад находятся в ТК ARMADA, Алматы. Звоните, пишите или приезжайте — будем рады встрече."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <Phone className="mb-3 h-6 w-6 text-brand-gold" />
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Телефон</div>
              <a href="tel:+77272275018" className="mt-1 block font-display text-xl font-bold text-primary hover:text-brand-gold">
                +7 727 227 50 18
              </a>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <Mail className="mb-3 h-6 w-6 text-brand-gold" />
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Email</div>
              <a href="mailto:info@abis.kz" className="mt-1 block font-display text-xl font-bold text-primary hover:text-brand-gold">
                info@abis.kz
              </a>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft sm:col-span-2">
              <MapPin className="mb-3 h-6 w-6 text-brand-gold" />
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Адрес</div>
              <div className="mt-1 font-display text-xl font-bold text-primary">
                ТК ARMADA, ул. Кабдолова 1/8, 1 блок, 1G линия, Алматы
              </div>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft sm:col-span-2">
              <Clock className="mb-3 h-6 w-6 text-brand-gold" />
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Часы работы</div>
              <div className="mt-1 font-display text-lg font-bold text-primary">Пн–Сб: 09:00 — 19:00 · Вс: выходной</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
            <iframe
              title="ABIS Group на карте"
              src="https://www.google.com/maps?q=ARMADA+Almaty+Kabdolova+1/8&output=embed"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-border/60 bg-card p-8 shadow-soft md:p-10"
        >
          <h2 className="font-display text-3xl font-extrabold text-primary md:text-4xl">Напишите нам</h2>
          <p className="mt-3 text-muted-foreground">Заполните форму — ответим в течение рабочего дня.</p>
          <div className="mt-8 space-y-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Имя"
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
              placeholder="Сообщение"
              rows={6}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base focus:border-brand-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-gold-gradient px-7 py-4 font-extrabold text-accent-foreground shadow-luxe transition-transform hover:-translate-y-1 disabled:opacity-60"
            >
              {submitting ? "Отправляем…" : "Отправить"}
            </button>
          </div>
        </form>
      </div>
    </PageShell>
  );
};

export default Contacts;
