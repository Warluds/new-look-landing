export type NewsItem = {
  id: string;
  date_ru: string;
  date_kk: string;
  date_en: string;
  tag_ru: string;
  tag_kk: string;
  tag_en: string;
  title_ru: string;
  title_kk: string;
  title_en: string;
  excerpt_ru: string;
  excerpt_kk: string;
  excerpt_en: string;
  sort_order: number;
};

const STORAGE_KEY = "abis_news_v1";

/** Новости "по умолчанию" — живут прямо в коде, переносятся вместе с проектом. */
export const defaultNews: NewsItem[] = [
  {
    id: "seed-1",
    date_ru: "2025",
    date_kk: "2025",
    date_en: "2025",
    tag_ru: "Розница",
    tag_kk: "Бөлшек сауда",
    tag_en: "Retail",
    title_ru: "Новый салон света SVET.KZ в Алматы",
    title_kk: "Алматыда жаңа SVET.KZ жарық салоны",
    title_en: "New SVET.KZ lighting showroom in Almaty",
    excerpt_ru: "ТК ARMADA, ряд 3, блок 1, линия G — центр правильного света.",
    excerpt_kk: "ARMADA СК, 3-қатар, 1-блок, G желісі — дұрыс жарық орталығы.",
    excerpt_en: "ARMADA mall, row 3, block 1, line G — the center of the right light.",
    sort_order: 1,
  },
];

export function loadNews(): NewsItem[] {
  if (typeof window === "undefined") return defaultNews;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultNews;
    const parsed = JSON.parse(raw) as NewsItem[];
    if (!Array.isArray(parsed)) return defaultNews;
    return parsed;
  } catch {
    return defaultNews;
  }
}

export function saveNews(items: NewsItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function sortNews(items: NewsItem[]) {
  return [...items].sort((a, b) => a.sort_order - b.sort_order);
}
