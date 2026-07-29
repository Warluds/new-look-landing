CREATE TABLE public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date_ru text NOT NULL DEFAULT '',
  date_kk text NOT NULL DEFAULT '',
  date_en text NOT NULL DEFAULT '',
  tag_ru text NOT NULL DEFAULT '',
  tag_kk text NOT NULL DEFAULT '',
  tag_en text NOT NULL DEFAULT '',
  title_ru text NOT NULL DEFAULT '',
  title_kk text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  excerpt_ru text NOT NULL DEFAULT '',
  excerpt_kk text NOT NULL DEFAULT '',
  excerpt_en text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.news TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.news TO authenticated;
GRANT ALL ON public.news TO service_role;

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Anyone can insert news" ON public.news FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update news" ON public.news FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete news" ON public.news FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();