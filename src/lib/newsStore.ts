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

// Новости хранятся в обычном файле api/news.json на хостинге.
// Запись выполняет PHP-скрипт api/news.php (без базы данных).
// Пути относительные — работают и в подпапке хостинга.
const JSON_URL = "api/news.json";
const API_URL = "api/news.php";

function base(): string {
  const path = window.location.pathname;
  // всё до последнего "/" — корень, где лежит index.html
  return path.slice(0, path.lastIndexOf("/") + 1).replace(/[^/]*$/, "");
}

function url(rel: string): string {
  return `/${rel}`.replace(/^\/+/, "/");
}

async function readJson(res: Response): Promise<NewsItem[]> {
  const text = await res.text();
  const data = JSON.parse(text) as NewsItem[];
  if (!Array.isArray(data)) throw new Error("bad json");
  return data;
}

export async function fetchNews(): Promise<NewsItem[]> {
  const candidates = [`${url(API_URL)}?t=${Date.now()}`, `${url(JSON_URL)}?t=${Date.now()}`];
  let lastErr: unknown = null;
  for (const u of candidates) {
    try {
      const res = await fetch(u, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await readJson(res);
      return [...data].sort((a, b) => a.sort_order - b.sort_order);
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error(lastErr instanceof Error ? lastErr.message : "fetch failed");
}

export async function saveNews(items: NewsItem[], password: string): Promise<void> {
  const res = await fetch(url(API_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, items }),
  });
  const text = await res.text();
  let parsed: { error?: string; ok?: boolean } | null = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = null;
  }

  if (!res.ok || !parsed) {
    if (parsed?.error) throw new Error(parsed.error);
    const snippet = text.trim().slice(0, 120).replace(/\s+/g, " ");
    throw new Error(
      `Сервер вернул не JSON (HTTP ${res.status}). Проверьте, что файл api/news.php загружен на хостинг и PHP включён. Ответ: ${snippet || "пусто"}`,
    );
  }
}

export function newId(): string {
  return `n${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
