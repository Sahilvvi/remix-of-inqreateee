-- Create table for social media posts history
CREATE TABLE IF NOT EXISTS public.social_media_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  platform text NOT NULL,
  topic text NOT NULL,
  tone text NOT NULL,
  post_content text NOT NULL,
  image_url text,
  image_prompt text,
  include_hashtags boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_media_posts ENABLE ROW LEVEL SECURITY;

-- RLS policies for social_media_posts
CREATE POLICY "Users can view their own social posts"
  ON public.social_media_posts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own social posts"
  ON public.social_media_posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social posts"
  ON public.social_media_posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create table for scheduled posts
CREATE TABLE IF NOT EXISTS public.scheduled_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  platform text NOT NULL,
  content text NOT NULL,
  image_url text,
  scheduled_time timestamp with time zone NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scheduled_posts ENABLE ROW LEVEL SECURITY;

-- RLS policies for scheduled_posts
CREATE POLICY "Users can view their own scheduled posts"
  ON public.scheduled_posts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own scheduled posts"
  ON public.scheduled_posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scheduled posts"
  ON public.scheduled_posts
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scheduled posts"
  ON public.scheduled_posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create table for SEO analyses history
CREATE TABLE IF NOT EXISTS public.seo_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  content text NOT NULL,
  target_keywords text,
  seo_score integer,
  readability_score integer,
  meta_description text,
  suggestions jsonb,
  missing_keywords jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.seo_analyses ENABLE ROW LEVEL SECURITY;

-- RLS policies for seo_analyses
CREATE POLICY "Users can view their own SEO analyses"
  ON public.seo_analyses
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own SEO analyses"
  ON public.seo_analyses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own SEO analyses"
  ON public.seo_analyses
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create table for post performance metrics
CREATE TABLE IF NOT EXISTS public.post_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  post_id uuid REFERENCES public.social_media_posts(id) ON DELETE CASCADE,
  platform text NOT NULL,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  comments integer DEFAULT 0,
  shares integer DEFAULT 0,
  engagement_rate numeric(5,2) DEFAULT 0,
  posted_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.post_performance ENABLE ROW LEVEL SECURITY;

-- RLS policies for post_performance
CREATE POLICY "Users can view their own post performance"
  ON public.post_performance
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own post performance"
  ON public.post_performance
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own post performance"
  ON public.post_performance
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Enable realtime for all new tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_media_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scheduled_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.seo_analyses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_performance;

-- Create update trigger function for social_media_posts
CREATE OR REPLACE FUNCTION public.update_social_media_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_social_media_posts_updated_at
BEFORE UPDATE ON public.social_media_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_social_media_posts_updated_at();

-- Create update trigger function for scheduled_posts
CREATE OR REPLACE FUNCTION public.update_scheduled_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_scheduled_posts_updated_at
BEFORE UPDATE ON public.scheduled_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_scheduled_posts_updated_at();

-- Create update trigger function for post_performance
CREATE OR REPLACE FUNCTION public.update_post_performance_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_post_performance_updated_at
BEFORE UPDATE ON public.post_performance
FOR EACH ROW
EXECUTE FUNCTION public.update_post_performance_updated_at();