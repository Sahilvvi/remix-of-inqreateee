-- Table 1: website_projects
CREATE TABLE public.website_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  template TEXT NOT NULL,
  description TEXT,
  customizations JSONB DEFAULT '{}',
  html_content TEXT,
  css_content TEXT,
  preview_url TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_projects ENABLE ROW LEVEL SECURITY;

-- User policies for website_projects
CREATE POLICY "Users can view their own projects"
  ON public.website_projects FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON public.website_projects FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON public.website_projects FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON public.website_projects FOR DELETE USING (auth.uid() = user_id);

-- Admin policy for website_projects
CREATE POLICY "Admins can view all projects"
  ON public.website_projects FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_website_projects_updated_at
  BEFORE UPDATE ON public.website_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Table 2: website_audits
CREATE TABLE public.website_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  url TEXT NOT NULL,
  overall_score INTEGER DEFAULT 0,
  performance_score INTEGER DEFAULT 0,
  seo_score INTEGER DEFAULT 0,
  accessibility_score INTEGER DEFAULT 0,
  security_score INTEGER DEFAULT 0,
  mobile_score INTEGER DEFAULT 0,
  suggestions JSONB DEFAULT '[]',
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_audits ENABLE ROW LEVEL SECURITY;

-- User policies for website_audits
CREATE POLICY "Users can view their own audits"
  ON public.website_audits FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own audits"
  ON public.website_audits FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own audits"
  ON public.website_audits FOR DELETE USING (auth.uid() = user_id);

-- Admin policy for website_audits
CREATE POLICY "Admins can view all audits"
  ON public.website_audits FOR SELECT USING (has_role(auth.uid(), 'admin'));