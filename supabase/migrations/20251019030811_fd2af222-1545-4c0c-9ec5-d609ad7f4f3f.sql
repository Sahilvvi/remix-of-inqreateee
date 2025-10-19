-- Create enum for team member roles
CREATE TYPE public.team_role AS ENUM ('owner', 'admin', 'member');

-- Create teams table
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create team_members table (stores roles separately for security)
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role team_role NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(team_id, user_id)
);

-- Create team_invitations table
CREATE TABLE public.team_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  invited_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role team_role NOT NULL DEFAULT 'member',
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '7 days') NOT NULL,
  UNIQUE(team_id, email)
);

-- Enable RLS
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;

-- Security definer function to check team membership
CREATE OR REPLACE FUNCTION public.is_team_member(_user_id UUID, _team_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_members
    WHERE user_id = _user_id
      AND team_id = _team_id
  )
$$;

-- Security definer function to check team role
CREATE OR REPLACE FUNCTION public.has_team_role(_user_id UUID, _team_id UUID, _role team_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_members
    WHERE user_id = _user_id
      AND team_id = _team_id
      AND role = _role
  )
$$;

-- RLS Policies for teams
CREATE POLICY "Users can view their teams"
  ON public.teams FOR SELECT
  USING (public.is_team_member(auth.uid(), id));

CREATE POLICY "Users can create teams"
  ON public.teams FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Team owners can update their teams"
  ON public.teams FOR UPDATE
  USING (public.has_team_role(auth.uid(), id, 'owner'));

CREATE POLICY "Team owners can delete their teams"
  ON public.teams FOR DELETE
  USING (public.has_team_role(auth.uid(), id, 'owner'));

-- RLS Policies for team_members
CREATE POLICY "Team members can view their team members"
  ON public.team_members FOR SELECT
  USING (public.is_team_member(auth.uid(), team_id));

CREATE POLICY "Team owners and admins can add members"
  ON public.team_members FOR INSERT
  WITH CHECK (
    public.has_team_role(auth.uid(), team_id, 'owner') OR 
    public.has_team_role(auth.uid(), team_id, 'admin')
  );

CREATE POLICY "Team owners and admins can remove members"
  ON public.team_members FOR DELETE
  USING (
    public.has_team_role(auth.uid(), team_id, 'owner') OR 
    public.has_team_role(auth.uid(), team_id, 'admin')
  );

CREATE POLICY "Team owners can update member roles"
  ON public.team_members FOR UPDATE
  USING (public.has_team_role(auth.uid(), team_id, 'owner'));

-- RLS Policies for team_invitations
CREATE POLICY "Team members can view invitations"
  ON public.team_invitations FOR SELECT
  USING (
    public.is_team_member(auth.uid(), team_id) OR 
    auth.jwt() ->> 'email' = email
  );

CREATE POLICY "Team owners and admins can create invitations"
  ON public.team_invitations FOR INSERT
  WITH CHECK (
    (public.has_team_role(auth.uid(), team_id, 'owner') OR 
     public.has_team_role(auth.uid(), team_id, 'admin')) AND
    auth.uid() = invited_by
  );

CREATE POLICY "Users can update their own invitations"
  ON public.team_invitations FOR UPDATE
  USING (auth.jwt() ->> 'email' = email);

-- Trigger to automatically add creator as team owner
CREATE OR REPLACE FUNCTION public.add_team_owner()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.team_members (team_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'owner');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_team_created
  AFTER INSERT ON public.teams
  FOR EACH ROW
  EXECUTE FUNCTION public.add_team_owner();

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_teams_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW
  EXECUTE FUNCTION public.update_teams_updated_at();