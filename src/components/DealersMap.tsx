import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DEALERS_BY_CITY, TOTAL_DEALERS } from "@/data/dealers";
import { Tr, useLang } from "@/i18n/LanguageContext";

const makeIcon = (count: number) =>
  L.divIcon({
    className: "",
    html: `<div style="background:hsl(var(--primary));color:hsl(var(--primary-foreground));border:2px solid hsl(var(--brand-gold));border-radius:9999px;min-width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;box-shadow:0 6px 16px rgba(0,0,0,0.35);padding:0 8px;">${count}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16],
  });

const T = {
  title: [
    "Карта действующих дилеров",
    "Қолданыстағы дилерлер картасы",
    "Active dealers map",
  ] as Tr,
  lead: [
    "Наши партнеры по всему Казахстану",
    "Қазақстан бойынша серіктестеріміз",
    "Our partners across Kazakhstan",
  ] as Tr,
  totalLabel: ["\n", "\n", "\n"] as Tr,
  citiesLabel: ["\n", "\n", "\n"] as Tr,
};

export const DealersMap = () => {
  const { t } = useLang();

  useEffect(() => {
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
            <div className="font-display text-3xl font-extrabold text-brand-gold">{"\n"}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{t(T.totalLabel)}</div>
          </div>
          <div>
            <div className="font-display text-3xl font-extrabold text-brand-gold">{"\n"}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{t(T.citiesLabel)}</div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border/60 shadow-soft">
        <MapContainer
          center={[48.5, 68]}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: 560, width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            subdomains={["a", "b", "c", "d"]}
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
                        <a
                          href={`https://2gis.kz/search/${encodeURIComponent(`${c.city} ${d.address}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground underline decoration-dotted underline-offset-2 hover:text-primary"
                        >
                          {d.address}
                        </a>
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
        {[...DEALERS_BY_CITY]
          .sort((a, b) => b.dealers.length - a.dealers.length)
          .map((c) => (
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
