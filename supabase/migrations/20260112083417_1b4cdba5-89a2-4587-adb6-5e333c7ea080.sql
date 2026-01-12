-- Create the update_updated_at_column function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create brand_assets table for storing logo, colors, fonts
CREATE TABLE public.brand_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  logo_url TEXT,
  brand_colors JSONB DEFAULT '[]'::jsonb,
  heading_font TEXT DEFAULT 'Poppins',
  body_font TEXT DEFAULT 'Open Sans',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_user_brand_assets UNIQUE (user_id)
);

-- Create saved_hashtags table
CREATE TABLE public.saved_hashtags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  hashtag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create content_drafts table for approval workflow
CREATE TABLE public.content_drafts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  content_type TEXT NOT NULL DEFAULT 'blog',
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_by UUID NOT NULL,
  reviewed_by UUID,
  review_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.brand_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_drafts ENABLE ROW LEVEL SECURITY;

-- Brand assets policies
CREATE POLICY "Users can view their own brand assets" ON public.brand_assets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own brand assets" ON public.brand_assets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own brand assets" ON public.brand_assets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own brand assets" ON public.brand_assets FOR DELETE USING (auth.uid() = user_id);

-- Saved hashtags policies
CREATE POLICY "Users can view their own hashtags" ON public.saved_hashtags FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own hashtags" ON public.saved_hashtags FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own hashtags" ON public.saved_hashtags FOR DELETE USING (auth.uid() = user_id);

-- Content drafts policies
CREATE POLICY "Users can view drafts for their teams" ON public.content_drafts FOR SELECT USING (
  auth.uid() = user_id OR 
  auth.uid() = submitted_by OR 
  (team_id IS NOT NULL AND is_team_member(auth.uid(), team_id))
);
CREATE POLICY "Users can create drafts" ON public.content_drafts FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "Users can update their own drafts" ON public.content_drafts FOR UPDATE USING (
  auth.uid() = submitted_by OR 
  (team_id IS NOT NULL AND (has_team_role(auth.uid(), team_id, 'owner') OR has_team_role(auth.uid(), team_id, 'admin')))
);
CREATE POLICY "Users can delete their own drafts" ON public.content_drafts FOR DELETE USING (auth.uid() = submitted_by);

-- Update triggers
CREATE TRIGGER update_brand_assets_updated_at
  BEFORE UPDATE ON public.brand_assets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_drafts_updated_at
  BEFORE UPDATE ON public.content_drafts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.brand_assets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.saved_hashtags;
ALTER PUBLICATION supabase_realtime ADD TABLE public.content_drafts;