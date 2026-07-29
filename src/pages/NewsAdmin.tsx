import { useEffect, useState } from "react";
import { Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  createNews,
  deleteNews,
  fetchNews,
  updateNews,
  type NewsInput,
  type NewsItem,
} from "@/lib/newsStore";

const emptyForm: NewsInput = {
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
  const [form, setForm] = useState<NewsInput>({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const reload = async () => {
    try {
      setItems(await fetchNews());
    } catch {
      toast({ title: "Не удалось загрузить новости", variant: "destructive" });
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const set = (k: keyof NewsInput) => (v: string) =>
    setForm((f) => ({ ...f, [k]: k === "sort_order" ? Number(v) || 0 : v }));

  const cancel = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const submit = async () => {
    if (!form.title_ru.trim()) {
      toast({ title: "Введите заголовок (RU)", variant: "destructive" });
      return;
    }
    const payload: NewsInput = {
      ...form,
      date_kk: form.date_kk || form.date_ru,
      date_en: form.date_en || form.date_ru,
      tag_kk: form.tag_kk || form.tag_ru,
      tag_en: form.tag_en || form.tag_ru,
      title_kk: form.title_kk || form.title_ru,
      title_en: form.title_en || form.title_ru,
      excerpt_kk: form.excerpt_kk || form.excerpt_ru,
      excerpt_en: form.excerpt_en || form.excerpt_ru,
    };
    setBusy(true);
    try {
      if (editingId) {
        await updateNews(editingId, payload);
        toast({ title: "Новость обновлена — уже видна всем" });
      } else {
        await createNews(payload);
        toast({ title: "Новость опубликована — уже видна всем" });
      }
      cancel();
      await reload();
    } catch {
      toast({ title: "Ошибка сохранения", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (n: NewsItem) => {
    const { id, ...rest } = n;
    setEditingId(id);
    setForm(rest);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id: string) => {
    if (!confirm("Удалить новость?")) return;
    try {
      await deleteNews(id);
      if (editingId === id) cancel();
      await reload();
      toast({ title: "Удалено" });
    } catch {
      toast({ title: "Ошибка удаления", variant: "destructive" });
    }
  };

  const field = (label: string, key: keyof NewsInput, area = false) => (
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
            Добавьте, измените или удалите новость — изменения сразу появляются на сайте у всех посетителей.
            Ничего копировать и пересобирать не нужно.
          </p>
        </header>

        <section className="rounded-3xl border border-border/60 bg-card p-8 shadow-soft">
          <h2 className="mb-6 font-display text-xl font-bold">
            {editingId ? "Редактирование новости" : "Новая новость"}
          </h2>
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
          <div className="mt-6 flex gap-2">
            <Button onClick={submit} disabled={busy}>
              {editingId ? <Save className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
              {editingId ? "Сохранить" : "Опубликовать"}
            </Button>
            {editingId && (
              <Button variant="outline" onClick={cancel}>
                <X className="mr-2 h-4 w-4" /> Отмена
              </Button>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold">Опубликованные ({items.length})</h2>
            <Button variant="outline" onClick={reload}>
              <RefreshCw className="mr-2 h-4 w-4" /> Обновить
            </Button>
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
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => startEdit(n)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => remove(n.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default NewsAdmin;
