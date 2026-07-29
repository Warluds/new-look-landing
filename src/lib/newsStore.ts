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

export type NewsInput = Omit<NewsItem, "id">;

// Новости хранятся в обычном файле /api/news.json на хостинге.
// Запись выполняет PHP-скрипт /api/news.php (без базы данных).
const JSON_URL = "/api/news.json";
const API_URL = "/api/news.php";

export async function fetchNews(): Promise<NewsItem[]> {
  const res = await fetch(`${JSON_URL}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("fetch failed");
  const data = (await res.json()) as NewsItem[];
  return [...data].sort((a, b) => a.sort_order - b.sort_order);
}

export async function saveNews(items: NewsItem[], password: string): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, items }),
  });
  const text = await res.text();
  if (!res.ok) {
    let msg = "Ошибка сохранения";
    try {
      msg = JSON.parse(text).error ?? msg;
    } catch {
      msg = "PHP недоступен (в предпросмотре Lovable сохранение не работает — только на хостинге)";
    }
    throw new Error(msg);
  }
}

export function newId(): string {
  return `n${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
