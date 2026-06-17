import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Lightbulb, Paintbrush } from "lucide-react";
import { Tr, useLang } from "@/i18n/LanguageContext";

import lAlmatySoul from "@/assets/projects/light-almaty-soul.jpg.asset.json";
import lBurgerKing from "@/assets/projects/light-burger-king.jpg.asset.json";
import lCompass from "@/assets/projects/light-compass-azs.jpg.asset.json";
import lFotostudiya from "@/assets/projects/light-fotostudiya.jpg.asset.json";
import lKafe588 from "@/assets/projects/light-kafe-5-88.jpg.asset.json";
import lKarakum from "@/assets/projects/light-karakumskie-bani.jpg.asset.json";
import lBueno from "@/assets/projects/light-kofeinya-bueno.jpg.asset.json";
import lLaTartine from "@/assets/projects/light-la-tartine.jpg.asset.json";
import lMountain from "@/assets/projects/light-mountain-breeze.jpg.asset.json";
import lHomedeco from "@/assets/projects/light-vystavka-homedeco.jpg.asset.json";
import lPresidents from "@/assets/projects/light-zhk-presidents-park.jpg.asset.json";

import pBaurdaq from "@/assets/projects/paints-baurdaq.jpg.asset.json";
import pLorena from "@/assets/projects/paints-butik-odezhdy-lorena-antoniazzi.jpg.asset.json";
import pCalisto from "@/assets/projects/paints-calisto-clinic.jpg.asset.json";
import pFish from "@/assets/projects/paints-fish-fried.jpg.asset.json";
import pInvictus from "@/assets/projects/paints-invictus-go.jpg.asset.json";
import pKinder from "@/assets/projects/paints-kinderland.jpg.asset.json";
import pDelfin from "@/assets/projects/paints-kvartira-zhk-delfin.jpg.asset.json";
import pMilanium from "@/assets/projects/paints-milanium.jpg.asset.json";
import pSadik from "@/assets/projects/paints-sadikusta.jpg.asset.json";
import pKomfort1 from "@/assets/projects/paints-zhk-komfort-siti-1.jpg.asset.json";
import pKomfort2 from "@/assets/projects/paints-zhk-komfort-siti-2.jpg.asset.json";
import pUrpaq from "@/assets/projects/paints-zhk-urpaq.jpg.asset.json";
import pZiyat from "@/assets/projects/paints-ziyat-republick.jpg.asset.json";

type Category = "paints" | "light";

type Project = { name: string; category: Category; image: string };

const projects: Project[] = [
  { name: "ЖК Президентс Парк", category: "light", image: lPresidents.url },
  { name: "Almaty Soul", category: "light", image: lAlmatySoul.url },
  { name: "Mountain Breeze", category: "light", image: lMountain.url },
  { name: "Burger King", category: "light", image: lBurgerKing.url },
  { name: "Compass АЗС", category: "light", image: lCompass.url },
  { name: "Кофейня Bueno", category: "light", image: lBueno.url },
  { name: "La Tartine", category: "light", image: lLaTartine.url },
  { name: "Кафе 5.88", category: "light", image: lKafe588.url },
  { name: "Каракумские бани", category: "light", image: lKarakum.url },
  { name: "Фотостудия", category: "light", image: lFotostudiya.url },
  { name: "Выставка HomeDeco", category: "light", image: lHomedeco.url },

  { name: "ЖК Комфорт Сити", category: "paints", image: pKomfort1.url },
  { name: "ЖК Комфорт Сити II", category: "paints", image: pKomfort2.url },
  { name: "ЖК Urpaq", category: "paints", image: pUrpaq.url },
  { name: "ЖК Дельфин", category: "paints", image: pDelfin.url },
  { name: "Milanium", category: "paints", image: pMilanium.url },
  { name: "Invictus GO", category: "paints", image: pInvictus.url },
  { name: "Baurdaq", category: "paints", image: pBaurdaq.url },
  { name: "Ziyat Republic", category: "paints", image: pZiyat.url },
  { name: "Lorena Antoniazzi", category: "paints", image: pLorena.url },
  { name: "Calisto Clinic", category: "paints", image: pCalisto.url },
  { name: "Kinderland", category: "paints", image: pKinder.url },
  { name: "SadikUsta", category: "paints", image: pSadik.url },
  { name: "Fish Fried", category: "paints", image: pFish.url },
];

const labels = {
  eyebrow: ["реализованные проекты", "жүзеге асырылған жобалар", "completed projects"] as Tr,
  title: ["Объекты, где работают наши решения", "Біздің шешімдеріміз жұмыс істейтін нысандар", "Spaces powered by our solutions"] as Tr,
  lead: [
    "Жилые комплексы, рестораны, шоурумы, клиники и общественные пространства — выбираем материалы и свет, которые служат годами.",
    "Тұрғын кешендер, мейрамханалар, шоурумдар, клиникалар мен қоғамдық кеңістіктер — жылдар бойы қызмет ететін материалдар мен жарықты таңдаймыз.",
    "Residential complexes, restaurants, showrooms, clinics and public spaces — we pick materials and lighting that last for years.",
  ] as Tr,
  all: ["Все проекты", "Барлық жобалар", "All projects"] as Tr,
  paints: ["Краски и декор", "Бояулар мен декор", "Paints & decor"] as Tr,
  light: ["Освещение", "Жарықтандыру", "Lighting"] as Tr,
  countLabel: ["проектов", "жоба", "projects"] as Tr,
};

export function ProjectsGallery() {
  const { t } = useLang();
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const tabs: Array<{ key: "all" | Category; label: Tr; icon?: typeof Lightbulb }> = [
    { key: "all", label: labels.all },
    { key: "light", label: labels.light, icon: Lightbulb },
    { key: "paints", label: labels.paints, icon: Paintbrush },
  ];

  return (
    <section id="projects" className="bg-brand-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">{t(labels.eyebrow)}</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">{t(labels.title)}</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{t(labels.lead)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = filter === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.12em] transition-all ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-luxe"
                      : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {t(tab.label)}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {filtered.length} {t(labels.countLabel)}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {filtered.map((p, idx) => {
            const featured = idx % 7 === 0;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => setActive(p)}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe ${
                  featured ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-hero-foreground/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-deep backdrop-blur-md">
                  {p.category === "light" ? <Lightbulb className="h-3 w-3" /> : <Paintbrush className="h-3 w-3" />}
                  {t(p.category === "light" ? labels.light : labels.paints)}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <h3 className="font-display text-lg font-extrabold leading-tight text-hero-foreground md:text-xl">
                    {p.name}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl overflow-hidden p-0">
          {active && (
            <>
              <img src={active.image} alt={active.name} className="h-auto max-h-[75vh] w-full object-contain bg-brand-deep" />
              <div className="flex items-center gap-3 p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                  {active.category === "light" ? <Lightbulb className="h-3.5 w-3.5" /> : <Paintbrush className="h-3.5 w-3.5" />}
                  {t(active.category === "light" ? labels.light : labels.paints)}
                </span>
                <DialogTitle className="font-display text-xl font-extrabold md:text-2xl">{active.name}</DialogTitle>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
