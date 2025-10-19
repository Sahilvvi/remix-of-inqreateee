-- Create social_accounts table to store connected social media accounts
CREATE TABLE public.social_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  platform TEXT NOT NULL,
  account_name TEXT,
  account_id TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own social accounts"
  ON public.social_accounts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own social accounts"
  ON public.social_accounts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social accounts"
  ON public.social_accounts
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social accounts"
  ON public.social_accounts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_social_accounts_updated_at
  BEFORE UPDATE ON public.social_accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_scheduled_posts_updated_at();