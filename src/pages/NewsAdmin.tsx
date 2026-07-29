import { useEffect, useState } from "react";
import { Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { fetchNews, newId, saveNews, type NewsInput, type NewsItem } from "@/lib/newsStore";

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
  const [password, setPassword] = useState(() => sessionStorage.getItem("abis-news-pass") ?? "");
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

  const persist = async (next: NewsItem[], successTitle: string) => {
    if (!password.trim()) {
      toast({ title: "Введите пароль", variant: "destructive" });
      return false;
    }
    setBusy(true);
    try {
      await saveNews(next, password);
      sessionStorage.setItem("abis-news-pass", password);
      setItems([...next].sort((a, b) => a.sort_order - b.sort_order));
      toast({ title: successTitle });
      return true;
    } catch (e) {
      toast({ title: e instanceof Error ? e.message : "Ошибка сохранения", variant: "destructive" });
      return false;
    } finally {
      setBusy(false);
    }
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
    const next = editingId
      ? items.map((n) => (n.id === editingId ? { ...payload, id: editingId } : n))
      : [...items, { ...payload, id: newId() }];
    const ok = await persist(next, editingId ? "Новость обновлена" : "Новость опубликована");
    if (ok) cancel();
  };

  const startEdit = (n: NewsItem) => {
    const { id, ...rest } = n;
    setEditingId(id);
    setForm(rest);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id: string) => {
    if (!confirm("Удалить новость?")) return;
    const ok = await persist(
      items.filter((n) => n.id !== id),
      "Удалено",
    );
    if (ok && editingId === id) cancel();
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
            Новости хранятся в файле <code>/api/news.json</code> на хостинге — без базы данных. Добавьте,
            измените или удалите новость, введите пароль — и изменения сразу видны всем посетителям.
          </p>
        </header>

        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
          <div className="max-w-sm space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Пароль</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль администратора"
            />
          </div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={async () => {
              try {
                const res = await fetch(`/api/news.php?t=${Date.now()}`, { cache: "no-store" });
                const text = await res.text();
                const isJson = text.trim().startsWith("[") || text.trim().startsWith("{");
                toast({
                  title: `Ответ сервера: HTTP ${res.status}`,
                  description: isJson
                    ? "PHP работает, файл новостей читается."
                    : `PHP не выполняется. Начало ответа: ${text.trim().slice(0, 80) || "пусто"}`,
                  variant: res.ok && isJson ? undefined : "destructive",
                });
              } catch (e) {
                toast({
                  title: "Файл api/news.php недоступен",
                  description: e instanceof Error ? e.message : "",
                  variant: "destructive",
                });
              }
            }}
          >
            Проверить связь с сервером
          </Button>
        </section>

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
                <Button variant="outline" size="icon" onClick={() => startEdit(n)} disabled={busy}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => remove(n.id)} disabled={busy}>
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
