-- Create table for storing generated blogs
CREATE TABLE IF NOT EXISTS public.generated_blogs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  topic text NOT NULL,
  keywords text,
  tone text NOT NULL,
  language text NOT NULL DEFAULT 'english',
  word_count integer NOT NULL,
  image_url text,
  image_prompt text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.generated_blogs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own blogs"
  ON public.generated_blogs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own blogs"
  ON public.generated_blogs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blogs"
  ON public.generated_blogs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own blogs"
  ON public.generated_blogs FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_generated_blogs_user_id ON public.generated_blogs(user_id);
CREATE INDEX idx_generated_blogs_created_at ON public.generated_blogs(created_at DESC);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_generated_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_generated_blogs_updated_at
  BEFORE UPDATE ON public.generated_blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_generated_blogs_updated_at();