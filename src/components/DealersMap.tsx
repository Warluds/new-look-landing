import { useMemo, useState } from "react";
import { DEALERS_BY_CITY, TOTAL_DEALERS } from "@/data/dealers";
import { Tr, useLang } from "@/i18n/LanguageContext";
import kzMap from "@/assets/kz-map.jpg";

const T = {
  title: [
    "Карта действующих дилеров",
    "Қолданыстағы дилерлер картасы",
    "Active dealers map",
  ] as Tr,
  lead: [
    "Наши партнеры по всему Казахстану — от Уральска до Усть-Каменогорска.",
    "Қазақстан бойынша серіктестеріміз — Оралдан Өскеменге дейін.",
    "Our partners across Kazakhstan — from Uralsk to Ust-Kamenogorsk.",
  ] as Tr,
  totalLabel: ["действующих дилеров", "қолданыстағы дилерлер", "active dealers"] as Tr,
  citiesLabel: ["городов присутствия", "қалада қатысу", "cities of presence"] as Tr,
  hint: [
    "Нажмите на город, чтобы увидеть адреса дилеров",
    "Дилерлердің мекенжайларын көру үшін қаланы басыңыз",
    "Tap a city to see dealer addresses",
  ] as Tr,
};

// Rough lon/lat bounds of the illustrated Kazakhstan map artwork
const LON_MIN = 46;
const LON_MAX = 88;
const LAT_MIN = 40;
const LAT_MAX = 56;

const toXY = (lat: number, lon: number) => ({
  x: ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 84 + 8,
  y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 84 + 8,
});

export const DealersMap = () => {
  const { t } = useLang();
  const [active, setActive] = useState<string | null>(null);

  const cities = useMemo(
    () => [...DEALERS_BY_CITY].sort((a, b) => b.dealers.length - a.dealers.length),
    [],
  );

  const activeCity = cities.find((c) => c.city === active) ?? cities[0];

  return (
    <section className="mt-20">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-primary md:text-4xl">{t(T.title)}</h2>
          <p className="mt-2 text-muted-foreground">{t(T.lead)}</p>
        </div>
        <div className="flex gap-6 text-sm">
          <div>
            <div className="font-display text-3xl font-extrabold text-brand-gold">{TOTAL_DEALERS}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{t(T.totalLabel)}</div>
          </div>
          <div>
            <div className="font-display text-3xl font-extrabold text-brand-gold">{DEALERS_BY_CITY.length}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{t(T.citiesLabel)}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-soft">
          <img
            src={kzMap}
            alt="Kazakhstan"
            width={1600}
            height={912}
            loading="lazy"
            className="block h-auto w-full select-none"
            draggable={false}
          />
          <div className="absolute inset-0">
            {cities.map((c) => {
              const { x, y } = toXY(c.coords[0], c.coords[1]);
              const isActive = activeCity?.city === c.city;
              return (
                <button
                  key={c.city}
                  type="button"
                  onClick={() => setActive(c.city)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  aria-label={c.city}
                >
                  <span
                    className={`flex min-w-[28px] items-center justify-center rounded-full border-2 border-brand-gold px-2 py-0.5 font-display text-xs font-extrabold shadow-soft transition-transform ${
                      isActive
                        ? "scale-110 bg-brand-gold text-primary"
                        : "bg-primary text-primary-foreground group-hover:scale-110"
                    }`}
                  >
                    {c.dealers.length}
                  </span>
                  <span
                    className={`mt-1 block whitespace-nowrap rounded-md bg-background/85 px-1.5 py-0.5 text-center text-[11px] font-semibold text-foreground backdrop-blur-sm ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {c.city}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="font-display text-2xl font-extrabold text-primary">{activeCity.city}</h3>
            <span className="font-display text-xl font-extrabold text-brand-gold">{activeCity.dealers.length}</span>
          </div>
          <p className="mb-4 text-xs text-muted-foreground">{t(T.hint)}</p>
          <ul className="max-h-[440px] space-y-3 overflow-y-auto pr-2 text-sm">
            {activeCity.dealers.map((d, i) => (
              <li key={i} className="border-t border-border/60 pt-3 first:border-0 first:pt-0">
                <div className="font-semibold text-foreground">{d.name}</div>
                <a
                  href={`https://2gis.kz/search/${encodeURIComponent(`${activeCity.city} ${d.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground underline decoration-dotted underline-offset-2 hover:text-primary"
                >
                  {d.address}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <div key={c.city} className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="font-display text-lg font-extrabold text-primary">{c.city}</h3>
              <span className="text-sm font-bold text-brand-gold">{c.dealers.length}</span>
            </div>
            <ul className="space-y-2 text-sm">
              {c.dealers.map((d, i) => (
                <li key={i} className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{d.name}</span>
                  {" — "}
                  <a
                    href={`https://2gis.kz/search/${encodeURIComponent(`${c.city} ${d.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline decoration-dotted underline-offset-2 hover:text-primary"
                  >
                    {d.address}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
