import { useEffect, useState } from "react";
import { Copy, Plus, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { defaultNews, loadNews, saveNews, sortNews, type NewsItem } from "@/lib/newsStore";

const emptyForm = {
  date_ru: "",
  date_kk: "",
  date_en: "",
  tag_ru: "",
  tag_kk: "",
  tag_en: "",
  title_ru: "",
  title_kk: "",
  title_en: "",
  excerpt_ru: "",
  excerpt_kk: "",
  excerpt_en: "",
  sort_order: 0,
};

const NewsAdmin = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [form, setForm] = useState({ ...emptyForm });

  useEffect(() => {
    setItems(sortNews(loadNews()));
  }, []);

  const commit = (next: NewsItem[]) => {
    const sorted = sortNews(next);
    saveNews(sorted);
    setItems(sorted);
  };

  const set = (k: keyof typeof emptyForm) => (v: string) =>
    setForm((f) => ({ ...f, [k]: k === "sort_order" ? Number(v) || 0 : v }));

  const add = () => {
    if (!form.title_ru.trim()) {
      toast({ title: "Введите заголовок (RU)", variant: "destructive" });
      return;
    }
    const item: NewsItem = {
      ...form,
      id: `n-${Date.now()}`,
      date_kk: form.date_kk || form.date_ru,
      date_en: form.date_en || form.date_ru,
      tag_kk: form.tag_kk || form.tag_ru,
      tag_en: form.tag_en || form.tag_ru,
      title_kk: form.title_kk || form.title_ru,
      title_en: form.title_en || form.title_ru,
      excerpt_kk: form.excerpt_kk || form.excerpt_ru,
      excerpt_en: form.excerpt_en || form.excerpt_ru,
    };
    commit([...items, item]);
    setForm({ ...emptyForm });
    toast({ title: "Новость добавлена" });
  };

  const remove = (id: string) => {
    if (!confirm("Удалить новость?")) return;
    commit(items.filter((n) => n.id !== id));
    toast({ title: "Удалено" });
  };

  const reset = () => {
    if (!confirm("Вернуть новости из кода (все правки в браузере пропадут)?")) return;
    commit(defaultNews);
    toast({ title: "Сброшено" });
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(JSON.stringify(items, null, 2));
    toast({ title: "JSON скопирован", description: "Вставьте его в defaultNews в src/lib/newsStore.ts" });
  };

  const field = (label: string, key: keyof typeof emptyForm, area = false) => (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
      {area ? (
        <Textarea value={String(form[key])} onChange={(e) => set(key)(e.target.value)} rows={3} />
      ) : (
        <Input value={String(form[key])} onChange={(e) => set(key)(e.target.value)} />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-5xl space-y-10">
        <header>
          <h1 className="font-display text-3xl font-extrabold text-primary">Управление новостями</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Работает без базы данных: новости хранятся в этом браузере. Чтобы они появились у всех посетителей,
            нажмите «Скопировать JSON» и вставьте его в массив <code>defaultNews</code> в файле{" "}
            <code>src/lib/newsStore.ts</code>.
          </p>
        </header>

        <section className="rounded-3xl border border-border/60 bg-card p-8 shadow-soft">
          <h2 className="mb-6 font-display text-xl font-bold">Новая новость</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {field("Дата RU", "date_ru")}
            {field("Дата KK", "date_kk")}
            {field("Дата EN", "date_en")}
            {field("Тег RU", "tag_ru")}
            {field("Тег KK", "tag_kk")}
            {field("Тег EN", "tag_en")}
            {field("Заголовок RU", "title_ru")}
            {field("Заголовок KK", "title_kk")}
            {field("Заголовок EN", "title_en")}
            {field("Текст RU", "excerpt_ru", true)}
            {field("Текст KK", "excerpt_kk", true)}
            {field("Текст EN", "excerpt_en", true)}
            {field("Порядок (меньше = выше)", "sort_order")}
          </div>
          <Button className="mt-6" onClick={add}>
            <Plus className="mr-2 h-4 w-4" /> Добавить
          </Button>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold">Опубликованные ({items.length})</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyJson}>
                <Copy className="mr-2 h-4 w-4" /> Скопировать JSON
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="mr-2 h-4 w-4" /> Сбросить
              </Button>
            </div>
          </div>
          {items.map((n) => (
            <div
              key={n.id}
              className="flex items-start justify-between gap-6 rounded-2xl border border-border/60 bg-card p-6"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {n.date_ru} · {n.tag_ru} · #{n.sort_order}
                </div>
                <div className="mt-1 font-display text-lg font-bold text-primary">{n.title_ru}</div>
                <p className="mt-1 text-sm text-muted-foreground">{n.excerpt_ru}</p>
              </div>
              <Button variant="destructive" size="icon" onClick={() => remove(n.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default NewsAdmin;
