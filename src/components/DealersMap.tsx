import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DEALERS_BY_CITY, TOTAL_DEALERS } from "@/data/dealers";
import { Tr, useLang } from "@/i18n/LanguageContext";

const makeIcon = (count: number) =>
  L.divIcon({
    className: "",
    html: `<div style="background:hsl(var(--primary));color:hsl(var(--primary-foreground));border:2px solid hsl(var(--brand-gold));border-radius:9999px;min-width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;box-shadow:0 4px 12px rgba(0,0,0,0.35);padding:0 6px;">${count}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -14],
  });

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
  category: ["Категория", "Санат", "Category"] as Tr,
  type: ["Тип точки", "Нүкте түрі", "Point type"] as Tr,
};

export const DealersMap = () => {
  const { t } = useLang();

  useEffect(() => {
    // ensure leaflet CSS grid sizing after mount
    window.dispatchEvent(new Event("resize"));
  }, []);

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

      <div className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
        <MapContainer
          center={[48.5, 68]}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: 520, width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {DEALERS_BY_CITY.map((c) => (
            <Marker key={c.city} position={c.coords} icon={makeIcon(c.dealers.length)}>
              <Popup maxWidth={340}>
                <div className="space-y-2">
                  <div className="font-display text-base font-extrabold text-primary">
                    {c.city} · {c.dealers.length}
                  </div>
                  <ul className="space-y-2 text-xs">
                    {c.dealers.map((d, i) => (
                      <li key={i} className="border-t border-border/60 pt-2 first:border-0 first:pt-0">
                        <div className="font-bold text-foreground">{d.name}</div>
                        <div className="text-muted-foreground">{d.address}</div>
                        <div className="mt-1 flex gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                          <span className="rounded bg-secondary px-1.5 py-0.5">{d.category}</span>
                          <span className="rounded bg-secondary px-1.5 py-0.5">{d.type}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DEALERS_BY_CITY.sort((a, b) => b.dealers.length - a.dealers.length).map((c) => (
          <div key={c.city} className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="font-display text-lg font-extrabold text-primary">{c.city}</h3>
              <span className="text-sm font-bold text-brand-gold">{c.dealers.length}</span>
            </div>
            <ul className="space-y-2 text-sm">
              {c.dealers.map((d, i) => (
                <li key={i} className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{d.name}</span>
                  <span className="text-xs"> — {d.address}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
