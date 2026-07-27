export type Dealer = {
  name: string;
  address: string;
  category: string;
  type: string;
};

export type CityDealers = {
  city: string;
  coords: [number, number];
  dealers: Dealer[];
};

const CITY_COORDS: Record<string, [number, number]> = {
  "Астана": [51.1694, 71.4491],
  "Алматы": [43.222, 76.8512],
  "Шымкент": [42.3417, 69.5901],
  "Караганда": [49.8047, 73.1094],
  "Актау": [43.648, 51.1722],
  "Атырау": [47.0945, 51.9238],
  "Уральск": [51.2296, 51.3606],
  "Костанай": [53.2144, 63.6246],
  "Актобе": [50.2839, 57.167],
  "Усть-Каменогорск": [49.9482, 82.628],
  "Павлодар": [52.2871, 76.9674],
  "Кызылорда": [44.8488, 65.4823],
};

const RAW: Array<Omit<Dealer, ""> & { city: string }> = [
  { name: "AURA", city: "Астана", address: "Проспект Богенбай батыра, 16/1, 311 бутик, 3 этаж", category: "B", type: "ТТ" },
  { name: "Alem свет", city: "Уральск", address: "Шолохова 7/3, 2 этаж", category: "B", type: "E-com" },
  { name: "Art Light", city: "Актау", address: "15 мкр, 68/3", category: "B", type: "ТТ" },
  { name: "Art Light", city: "Атырау", address: "ул. Баймуханова, 25а", category: "B", type: "ТТ" },
  { name: "LIGHTS HOME", city: "Шымкент", address: "Елшибек Батыр ул., здание 64", category: "VIP", type: "ТТ" },
  { name: "ONEkz (Smart Dome)", city: "Атырау", address: "ул. Курмангазы, 72А", category: "B", type: "E-com" },
  { name: "PRESTIGE TRADE", city: "Шымкент", address: "ул. Ақпан Батыр, 111", category: "B", type: "Комплектовочный шоу-рум" },
  { name: "Pro Light", city: "Шымкент", address: "Ескиозен, 8", category: "B", type: "ТТ" },
  { name: "LIGHT HOME (Абдрахманова)", city: "Астана", address: "Проспект Мангилик Ел, 27, 2 этаж", category: "B", type: "ТТ" },
  { name: "LAMPER", city: "Алматы", address: "Саги Ашимова, 140", category: "B", type: "ТТ" },
  { name: "Всё возможно (HAYDI, ДОМ ЛЮСТР)", city: "Караганда", address: "Проспект Строителей, 33/14; ТЦ KAZMART; ТЦ Строймарт", category: "VIP", type: "ТТ" },
  { name: "EuroLamp", city: "Астана", address: "Проспект Мангилик Ел, 36, 2 этаж, НП 38", category: "B", type: "ТТ" },
  { name: "MITRIS", city: "Астана", address: "Улица Кайым Мухамедханов, 4а, 4 офис, 1 этаж, НП 4", category: "B", type: "ТТ" },
  { name: "ПОЛАРИС ЛАЙТС", city: "Алматы", address: "Саламат 3, бутик 24, 2 этаж", category: "Дилер", type: "ТТ" },
  { name: "LAMP.KZ", city: "Астана", address: "Проспект Мангилик Ел, 41/2", category: "B", type: "ТТ" },
  { name: "100 Дверей (Interio)", city: "Костанай", address: "Дощанова, 182", category: "B", type: "ТТ" },
  { name: "Lampa (Каракулова)", city: "Актобе", address: "ул. Шайкенова, 7", category: "B", type: "ТТ" },
  { name: "Империал", city: "Усть-Каменогорск", address: "Улица Максима Горького, 58", category: "B", type: "ТТ" },
  { name: "LAMPA (БатысМассив)", city: "Астана", address: "Проспект Улы Дала, 56", category: "B", type: "ТТ" },
  { name: "Comfy you (Аманас)", city: "Алматы", address: "Розыбакиева, 237", category: "B", type: "ТТ" },
  { name: "СОФИТ (Инком Трейд)", city: "Усть-Каменогорск", address: "Улица Кабанбай батыра, 166", category: "B", type: "ТТ" },
  { name: "Eza light (CONCEPT ID)", city: "Алматы", address: "Тимирязева, д. 82", category: "B", type: "ТТ" },
  { name: "LuminX-Aktau", city: "Актау", address: "5 мкр, Т/Ц «Волна»", category: "B", type: "Комплектовочный магазин" },
  { name: "ARTLAMP", city: "Алматы", address: "Саламат, 4, 2 этаж, 40 бутик", category: "B", type: "ТТ" },
  { name: "Богемия (Bohemia)", city: "Павлодар", address: "Проспект Нурсултана Назарбаева, 42, 32 бутик", category: "B", type: "ТТ" },
  { name: "Адам (Байманов)", city: "Кызылорда", address: "Абулхайыр Хан, 92", category: "B", type: "—" },
  { name: "Dream Interiors", city: "Атырау", address: "Канцева, 1", category: "B", type: "Комплектовочный магазин" },
  { name: "Westcom Energy", city: "Атырау", address: "Канцева, 1", category: "C", type: "ТТ" },
  { name: "Capella (Акапэлл)", city: "Алматы", address: "ул. Ауэзова, 163А; склад Муканова, 159", category: "C", type: "Дизайн студия" },
  { name: "Lampella (Led Line)", city: "Астана", address: "Аль-Фараби проспект, 35стр, 1 этаж, НП 10", category: "C", type: "ТТ" },
  { name: "Elite Light", city: "Павлодар", address: "ул. Астана, д.160, бутик 27а", category: "C", type: "ТТ" },
  { name: "Amarena", city: "Алматы", address: "ул. Тимирязева, 82", category: "C", type: "ТТ" },
  { name: "Casadilusso", city: "Актау", address: "Мкр 5а, 2 подъезд", category: "C", type: "Комплектовочный магазин" },
  { name: "ТАТАЛИНА (Дом Декора)", city: "Алматы", address: "Чурина, дом 6", category: "C", type: "E-com" },
];

export const DEALERS_BY_CITY: CityDealers[] = Object.entries(
  RAW.reduce<Record<string, Dealer[]>>((acc, r) => {
    (acc[r.city] ||= []).push({ name: r.name, address: r.address, category: r.category, type: r.type });
    return acc;
  }, {}),
).map(([city, dealers]) => ({
  city,
  coords: CITY_COORDS[city] ?? [48, 68],
  dealers,
}));

export const TOTAL_DEALERS = RAW.length;
