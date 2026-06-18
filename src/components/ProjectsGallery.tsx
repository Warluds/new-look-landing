import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Lightbulb, Paintbrush } from "lucide-react";
import { Tr, useLang } from "@/i18n/LanguageContext";

// Import local optimized images through Vite so production builds rewrite paths correctly.
const assetModules = import.meta.glob<string>("../assets/projects/*.webp", {
  eager: true,
  import: "default",
});

type Category = "paints" | "light";
type Project = { key: string; category: Category; name: string; images: string[] };

// Friendly Russian names per slug
const NAMES: Record<string, string> = {
  "almaty-soul": "Almaty Soul",
  "burger-king": "Burger King",
  "compass-azs": "Compass АЗС",
  "fotostudiya": "Фотостудия",
  "kafe-5-88": "Кафе 5.88",
  "karakumskie-bani": "Каракумские бани",
  "kofeinya-bueno": "Кофейня Bueno",
  "la-tartine": "La Tartine",
  "mountain-breeze": "Mountain Breeze",
  "vystavka-homedeco": "Выставка HomeDeco",
  "zhk-presidents-park": "ЖК Presidents Park",
  "baurdaq": "Baurdaq",
  "butik-odezhdy-lorena-antoniazzi": "Бутик Lorena Antoniazzi",
  "calisto-clinic": "Calisto Clinic",
  "fish-fried": "Fish Fried",
  "invictus-go": "Invictus GO",
  "kinderland": "Kinderland",
  "kvartira-zhk-delfin": "ЖК Дельфин",
  "milanium": "Milanium",
  "sadikusta": "SadikUsta",
  "zhk-komfort-siti-1": "ЖК Комфорт Сити I",
  "zhk-komfort-siti-2": "ЖК Комфорт Сити II",
  "zhk-urpaq": "ЖК Urpaq",
  "ziyat-republick": "Ziyat Republic",
};

// Group assets by base slug
const grouped: Record<string, Project> = {};
for (const [path, src] of Object.entries(assetModules)) {
  const fileName = path.split("/").pop()!.replace(".webp", "");
  const m = fileName.match(/^(paints|light)-(.+)-(\d+)$/);
  if (!m || !src) continue;
  const category = m[1] as Category;
  const slug = m[2];
  const idx = parseInt(m[3], 10);
  const key = `${category}-${slug}`;
  if (!grouped[key]) {
    grouped[key] = {
      key,
      category,
      name: NAMES[slug] ?? slug,
      images: [],
    };
  }
  grouped[key].images[idx - 1] = src;
}

for (const project of Object.values(grouped)) {
  project.images = project.images.filter(Boolean);
}

// Fixed display order
const ORDER: string[] = [
  "light-zhk-presidents-park",
  "paints-zhk-komfort-siti-1",
  "light-almaty-soul",
  "paints-invictus-go",
  "light-mountain-breeze",
  "paints-milanium",
  "light-burger-king",
  "paints-baurdaq",
  "light-compass-azs",
  "paints-ziyat-republick",
  "light-kofeinya-bueno",
  "paints-zhk-komfort-siti-2",
  "light-la-tartine",
  "paints-kvartira-zhk-delfin",
  "light-kafe-5-88",
  "paints-zhk-urpaq",
  "light-karakumskie-bani",
  "paints-butik-odezhdy-lorena-antoniazzi",
  "light-fotostudiya",
  "paints-calisto-clinic",
  "light-vystavka-homedeco",
  "paints-kinderland",
  "paints-sadikusta",
  "paints-fish-fried",
];

const projects: Project[] = ORDER.map((k) => grouped[k]).filter(Boolean);

const labels = {
  eyebrow: ["реализованные проекты", "жүзеге асырылған жобалар", "completed projects"] as Tr,
  title: ["Объекты, где реализованы наши решения", "Біздің шешімдеріміз жүзеге асырылған нысандар", "Projects where our solutions are implemented"] as Tr,
  lead: [
    "ЖК, частные дома, Horeca, коммерческие помещения и общественные объекты",
    "ТК, жеке үйлер, Horeca, коммерциялық нысандар және қоғамдық нысандар",
    "Residential complexes, private houses, Horeca, commercial premises and public facilities",
  ] as Tr,
  all: ["Все", "Барлығы", "All"] as Tr,
  paints: ["Краски", "Бояулар", "Paints"] as Tr,
  light: ["Свет", "Жарық", "Lighting"] as Tr,
  countLabel: ["проектов", "жоба", "projects"] as Tr,
};

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!hover || project.images.length < 2) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % project.images.length);
    }, 1100);
    return () => window.clearInterval(id);
  }, [hover, project.images.length]);

  const { t } = useLang();

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setIdx(0);
      }}
      className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe"
    >
      {project.images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={project.name}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            i === idx ? "opacity-100" : "opacity-0"
          } group-hover:scale-105`}
          style={{ transitionProperty: "opacity, transform" }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/30 to-transparent opacity-95" />

      {project.images.length > 1 && (
        <div className="absolute right-2 top-2 flex gap-1">
          {project.images.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-3 rounded-full transition-all ${
                i === idx ? "bg-hero-foreground" : "bg-hero-foreground/40"
              }`}
            />
          ))}
        </div>
      )}

      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-hero-foreground/95 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-brand-deep">
        {project.category === "light" ? <Lightbulb className="h-2.5 w-2.5" /> : <Paintbrush className="h-2.5 w-2.5" />}
        {t(project.category === "light" ? labels.light : labels.paints)}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="font-display text-sm font-extrabold leading-tight text-hero-foreground md:text-base">
          {project.name}
        </h3>
      </div>
    </button>
  );
}

export function ProjectsGallery() {
  const { t } = useLang();
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [active, setActive] = useState<Project | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const tabs: Array<{ key: "all" | Category; label: Tr; icon?: typeof Lightbulb }> = [
    { key: "all", label: labels.all },
    { key: "light", label: labels.light, icon: Lightbulb },
    { key: "paints", label: labels.paints, icon: Paintbrush },
  ];

  const open = (p: Project) => {
    setActive(p);
    setLightboxIdx(0);
  };

  const next = () => active && setLightboxIdx((i) => (i + 1) % active.images.length);
  const prev = () => active && setLightboxIdx((i) => (i - 1 + active.images.length) % active.images.length);

  return (
    <section id="projects" className="bg-brand-surface py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-primary">{t(labels.eyebrow)}</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-5xl">{t(labels.title)}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{t(labels.lead)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const isActive = filter === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] transition-all ${
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
            <span className="ml-1 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {filtered.length} {t(labels.countLabel)}
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((p) => (
            <ProjectCard key={p.key} project={p} onOpen={() => open(p)} />
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl overflow-hidden p-0">
          {active && (
            <>
              <div className="relative bg-brand-deep">
                <img
                  src={active.images[lightboxIdx]}
                  alt={active.name}
                  className="h-auto max-h-[75vh] w-full object-contain"
                />
                {active.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-hero-foreground/90 p-2 text-brand-deep transition hover:bg-hero-foreground"
                      aria-label="prev"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-hero-foreground/90 p-2 text-brand-deep transition hover:bg-hero-foreground"
                      aria-label="next"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {active.images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setLightboxIdx(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === lightboxIdx ? "w-6 bg-hero-foreground" : "w-1.5 bg-hero-foreground/50"
                          }`}
                          aria-label={`photo ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3 p-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
                  {active.category === "light" ? <Lightbulb className="h-3.5 w-3.5" /> : <Paintbrush className="h-3.5 w-3.5" />}
                  {t(active.category === "light" ? labels.light : labels.paints)}
                </span>
                <DialogTitle className="font-display text-lg font-extrabold md:text-2xl">{active.name}</DialogTitle>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
