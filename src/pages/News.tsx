import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Tr, useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const T = {
  eyebrow: ["Новости", "Жаңалықтар", "News"] as Tr,
  title: ["Что происходит в ABIS Group", "ABIS Group-та не болып жатыр", "What's happening at ABIS Group"] as Tr,
  lead: [
    "Открытия, партнёрства, обучение, награды — следите за жизнью холдинга и его брендов.",
    "Ашылулар, серіктестіктер, оқыту, марапаттар — холдинг пен оның брендтерінің өмірін қадағалаңыз.",
    "Openings, partnerships, training, awards — follow the life of the holding and its brands.",
  ] as Tr,
  more: ["Подробнее", "Толығырақ", "Read more"] as Tr,
  empty: ["Пока новостей нет.", "Әзірге жаңалықтар жоқ.", "No news yet."] as Tr,
};

type NewsRow = Tables<"news">;

const News = () => {
  const { t } = useLang();
  const [items, setItems] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("news")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <PageShell eyebrow={T.eyebrow} title={T.title} lead={T.lead}>
      {!loading && items.length === 0 && <p className="text-muted-foreground">{t(T.empty)}</p>}
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((n) => (
          <article
            key={n.id}
            className="group flex flex-col rounded-3xl border border-border/60 bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-luxe"
          >
            <div className="mb-4 flex items-center gap-4 text-xs font-extrabold uppercase tracking-[0.25em]">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" /> {t([n.date_ru, n.date_kk, n.date_en])}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">
                {t([n.tag_ru, n.tag_kk, n.tag_en])}
              </span>
            </div>
            <h3 className="mb-3 font-display text-2xl font-bold leading-tight text-primary">
              {t([n.title_ru, n.title_kk, n.title_en])}
            </h3>
            <p className="flex-1 text-muted-foreground">{t([n.excerpt_ru, n.excerpt_kk, n.excerpt_en])}</p>
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
