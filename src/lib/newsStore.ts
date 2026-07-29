import { supabase } from "@/integrations/supabase/client";

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

export async function fetchNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as NewsItem[];
}

export async function createNews(input: NewsInput) {
  const { error } = await supabase.from("news").insert(input);
  if (error) throw error;
}

export async function updateNews(id: string, input: NewsInput) {
  const { error } = await supabase.from("news").update(input).eq("id", id);
  if (error) throw error;
}

export async function deleteNews(id: string) {
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw error;
}
