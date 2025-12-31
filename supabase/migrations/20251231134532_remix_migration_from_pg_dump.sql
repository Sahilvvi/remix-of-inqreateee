CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: team_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.team_role AS ENUM (
    'owner',
    'admin',
    'member'
);


--
-- Name: add_team_owner(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.add_team_owner() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.team_members (team_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'owner');
  RETURN NEW;
END;
$$;


--
-- Name: has_team_role(uuid, uuid, public.team_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_team_role(_user_id uuid, _team_id uuid, _role public.team_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_members
    WHERE user_id = _user_id
      AND team_id = _team_id
      AND role = _role
  )
$$;


--
-- Name: is_team_member(uuid, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_team_member(_user_id uuid, _team_id uuid) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.team_members
    WHERE user_id = _user_id
      AND team_id = _team_id
  )
$$;


--
-- Name: update_brand_templates_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_brand_templates_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


--
-- Name: update_ecommerce_products_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_ecommerce_products_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


--
-- Name: update_generated_blogs_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_generated_blogs_updated_at() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


--
-- Name: update_post_performance_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_post_performance_updated_at() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


--
-- Name: update_scheduled_posts_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_scheduled_posts_updated_at() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


--
-- Name: update_social_media_posts_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_social_media_posts_updated_at() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


--
-- Name: update_teams_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_teams_updated_at() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: brand_templates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.brand_templates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name text NOT NULL,
    category text DEFAULT 'Custom'::text NOT NULL,
    template text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: ecommerce_products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ecommerce_products (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    product_name text NOT NULL,
    category text NOT NULL,
    features text,
    target_audience text,
    title text NOT NULL,
    description text NOT NULL,
    selling_points jsonb,
    tags jsonb,
    meta_description text,
    price numeric(10,2),
    sku text,
    inventory_count integer DEFAULT 0,
    image_url text,
    status text DEFAULT 'draft'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: generated_blogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.generated_blogs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    topic text NOT NULL,
    keywords text,
    tone text NOT NULL,
    language text DEFAULT 'english'::text NOT NULL,
    word_count integer NOT NULL,
    image_url text,
    image_prompt text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: post_performance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_performance (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    post_id uuid,
    platform text NOT NULL,
    views integer DEFAULT 0,
    likes integer DEFAULT 0,
    comments integer DEFAULT 0,
    shares integer DEFAULT 0,
    engagement_rate numeric(5,2) DEFAULT 0,
    posted_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: scheduled_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scheduled_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    platform text NOT NULL,
    content text NOT NULL,
    image_url text,
    scheduled_time timestamp with time zone NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: seo_analyses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.seo_analyses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    content text NOT NULL,
    target_keywords text,
    seo_score integer,
    readability_score integer,
    meta_description text,
    suggestions jsonb,
    missing_keywords jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: social_accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.social_accounts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    platform text NOT NULL,
    account_name text,
    account_id text,
    access_token text,
    refresh_token text,
    token_expires_at timestamp with time zone,
    is_active boolean DEFAULT true NOT NULL,
    connected_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb
);


--
-- Name: social_media_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.social_media_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    platform text NOT NULL,
    topic text NOT NULL,
    tone text NOT NULL,
    post_content text NOT NULL,
    image_url text,
    image_prompt text,
    include_hashtags boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: team_invitations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_invitations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    team_id uuid NOT NULL,
    email text NOT NULL,
    invited_by uuid NOT NULL,
    role public.team_role DEFAULT 'member'::public.team_role NOT NULL,
    token text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '7 days'::interval) NOT NULL,
    CONSTRAINT team_invitations_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'accepted'::text, 'rejected'::text])))
);


--
-- Name: team_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_members (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    team_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role public.team_role DEFAULT 'member'::public.team_role NOT NULL,
    joined_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: teams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teams (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    created_by uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: brand_templates brand_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brand_templates
    ADD CONSTRAINT brand_templates_pkey PRIMARY KEY (id);


--
-- Name: ecommerce_products ecommerce_products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ecommerce_products
    ADD CONSTRAINT ecommerce_products_pkey PRIMARY KEY (id);


--
-- Name: generated_blogs generated_blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.generated_blogs
    ADD CONSTRAINT generated_blogs_pkey PRIMARY KEY (id);


--
-- Name: post_performance post_performance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_performance
    ADD CONSTRAINT post_performance_pkey PRIMARY KEY (id);


--
-- Name: scheduled_posts scheduled_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scheduled_posts
    ADD CONSTRAINT scheduled_posts_pkey PRIMARY KEY (id);


--
-- Name: seo_analyses seo_analyses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.seo_analyses
    ADD CONSTRAINT seo_analyses_pkey PRIMARY KEY (id);


--
-- Name: social_accounts social_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.social_accounts
    ADD CONSTRAINT social_accounts_pkey PRIMARY KEY (id);


--
-- Name: social_media_posts social_media_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.social_media_posts
    ADD CONSTRAINT social_media_posts_pkey PRIMARY KEY (id);


--
-- Name: team_invitations team_invitations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_invitations
    ADD CONSTRAINT team_invitations_pkey PRIMARY KEY (id);


--
-- Name: team_invitations team_invitations_team_id_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_invitations
    ADD CONSTRAINT team_invitations_team_id_email_key UNIQUE (team_id, email);


--
-- Name: team_invitations team_invitations_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_invitations
    ADD CONSTRAINT team_invitations_token_key UNIQUE (token);


--
-- Name: team_members team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_pkey PRIMARY KEY (id);


--
-- Name: team_members team_members_team_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_team_id_user_id_key UNIQUE (team_id, user_id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: idx_generated_blogs_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_generated_blogs_created_at ON public.generated_blogs USING btree (created_at DESC);


--
-- Name: idx_generated_blogs_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_generated_blogs_user_id ON public.generated_blogs USING btree (user_id);


--
-- Name: teams on_team_created; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER on_team_created AFTER INSERT ON public.teams FOR EACH ROW EXECUTE FUNCTION public.add_team_owner();


--
-- Name: brand_templates update_brand_templates_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_brand_templates_updated_at BEFORE UPDATE ON public.brand_templates FOR EACH ROW EXECUTE FUNCTION public.update_brand_templates_updated_at();


--
-- Name: ecommerce_products update_ecommerce_products_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_ecommerce_products_updated_at BEFORE UPDATE ON public.ecommerce_products FOR EACH ROW EXECUTE FUNCTION public.update_ecommerce_products_updated_at();


--
-- Name: generated_blogs update_generated_blogs_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_generated_blogs_updated_at BEFORE UPDATE ON public.generated_blogs FOR EACH ROW EXECUTE FUNCTION public.update_generated_blogs_updated_at();


--
-- Name: post_performance update_post_performance_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_post_performance_updated_at BEFORE UPDATE ON public.post_performance FOR EACH ROW EXECUTE FUNCTION public.update_post_performance_updated_at();


--
-- Name: scheduled_posts update_scheduled_posts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_scheduled_posts_updated_at BEFORE UPDATE ON public.scheduled_posts FOR EACH ROW EXECUTE FUNCTION public.update_scheduled_posts_updated_at();


--
-- Name: social_accounts update_social_accounts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_social_accounts_updated_at BEFORE UPDATE ON public.social_accounts FOR EACH ROW EXECUTE FUNCTION public.update_scheduled_posts_updated_at();


--
-- Name: social_media_posts update_social_media_posts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_social_media_posts_updated_at BEFORE UPDATE ON public.social_media_posts FOR EACH ROW EXECUTE FUNCTION public.update_social_media_posts_updated_at();


--
-- Name: teams update_teams_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_teams_updated_at();


--
-- Name: generated_blogs generated_blogs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.generated_blogs
    ADD CONSTRAINT generated_blogs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: post_performance post_performance_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_performance
    ADD CONSTRAINT post_performance_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.social_media_posts(id) ON DELETE CASCADE;


--
-- Name: team_invitations team_invitations_invited_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_invitations
    ADD CONSTRAINT team_invitations_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: team_invitations team_invitations_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_invitations
    ADD CONSTRAINT team_invitations_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: team_members team_members_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: team_members team_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: teams teams_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: team_invitations Team members can view invitations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can view invitations" ON public.team_invitations FOR SELECT USING ((public.is_team_member(auth.uid(), team_id) OR ((auth.jwt() ->> 'email'::text) = email)));


--
-- Name: team_members Team members can view their team members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team members can view their team members" ON public.team_members FOR SELECT USING (public.is_team_member(auth.uid(), team_id));


--
-- Name: team_members Team owners and admins can add members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team owners and admins can add members" ON public.team_members FOR INSERT WITH CHECK ((public.has_team_role(auth.uid(), team_id, 'owner'::public.team_role) OR public.has_team_role(auth.uid(), team_id, 'admin'::public.team_role)));


--
-- Name: team_invitations Team owners and admins can create invitations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team owners and admins can create invitations" ON public.team_invitations FOR INSERT WITH CHECK (((public.has_team_role(auth.uid(), team_id, 'owner'::public.team_role) OR public.has_team_role(auth.uid(), team_id, 'admin'::public.team_role)) AND (auth.uid() = invited_by)));


--
-- Name: team_members Team owners and admins can remove members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team owners and admins can remove members" ON public.team_members FOR DELETE USING ((public.has_team_role(auth.uid(), team_id, 'owner'::public.team_role) OR public.has_team_role(auth.uid(), team_id, 'admin'::public.team_role)));


--
-- Name: teams Team owners can delete their teams; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team owners can delete their teams" ON public.teams FOR DELETE USING (public.has_team_role(auth.uid(), id, 'owner'::public.team_role));


--
-- Name: team_members Team owners can update member roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team owners can update member roles" ON public.team_members FOR UPDATE USING (public.has_team_role(auth.uid(), team_id, 'owner'::public.team_role));


--
-- Name: teams Team owners can update their teams; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Team owners can update their teams" ON public.teams FOR UPDATE USING (public.has_team_role(auth.uid(), id, 'owner'::public.team_role));


--
-- Name: teams Users can create teams; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create teams" ON public.teams FOR INSERT WITH CHECK ((auth.uid() = created_by));


--
-- Name: seo_analyses Users can create their own SEO analyses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own SEO analyses" ON public.seo_analyses FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: generated_blogs Users can create their own blogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own blogs" ON public.generated_blogs FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: post_performance Users can create their own post performance; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own post performance" ON public.post_performance FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: ecommerce_products Users can create their own products; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own products" ON public.ecommerce_products FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: scheduled_posts Users can create their own scheduled posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own scheduled posts" ON public.scheduled_posts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: social_accounts Users can create their own social accounts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own social accounts" ON public.social_accounts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: social_media_posts Users can create their own social posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own social posts" ON public.social_media_posts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: brand_templates Users can create their own templates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own templates" ON public.brand_templates FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: seo_analyses Users can delete their own SEO analyses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own SEO analyses" ON public.seo_analyses FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: generated_blogs Users can delete their own blogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own blogs" ON public.generated_blogs FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: ecommerce_products Users can delete their own products; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own products" ON public.ecommerce_products FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: scheduled_posts Users can delete their own scheduled posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own scheduled posts" ON public.scheduled_posts FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: social_accounts Users can delete their own social accounts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own social accounts" ON public.social_accounts FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: social_media_posts Users can delete their own social posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own social posts" ON public.social_media_posts FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: brand_templates Users can delete their own templates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own templates" ON public.brand_templates FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: generated_blogs Users can update their own blogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own blogs" ON public.generated_blogs FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: team_invitations Users can update their own invitations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own invitations" ON public.team_invitations FOR UPDATE USING (((auth.jwt() ->> 'email'::text) = email));


--
-- Name: post_performance Users can update their own post performance; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own post performance" ON public.post_performance FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: ecommerce_products Users can update their own products; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own products" ON public.ecommerce_products FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: scheduled_posts Users can update their own scheduled posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own scheduled posts" ON public.scheduled_posts FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: social_accounts Users can update their own social accounts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own social accounts" ON public.social_accounts FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: brand_templates Users can update their own templates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own templates" ON public.brand_templates FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: seo_analyses Users can view their own SEO analyses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own SEO analyses" ON public.seo_analyses FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: generated_blogs Users can view their own blogs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own blogs" ON public.generated_blogs FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: post_performance Users can view their own post performance; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own post performance" ON public.post_performance FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: ecommerce_products Users can view their own products; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own products" ON public.ecommerce_products FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: scheduled_posts Users can view their own scheduled posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own scheduled posts" ON public.scheduled_posts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: social_accounts Users can view their own social accounts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own social accounts" ON public.social_accounts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: social_media_posts Users can view their own social posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own social posts" ON public.social_media_posts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: brand_templates Users can view their own templates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own templates" ON public.brand_templates FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: teams Users can view their teams; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their teams" ON public.teams FOR SELECT USING ((public.is_team_member(auth.uid(), id) OR (auth.uid() = created_by)));


--
-- Name: brand_templates; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.brand_templates ENABLE ROW LEVEL SECURITY;

--
-- Name: ecommerce_products; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.ecommerce_products ENABLE ROW LEVEL SECURITY;

--
-- Name: generated_blogs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.generated_blogs ENABLE ROW LEVEL SECURITY;

--
-- Name: post_performance; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.post_performance ENABLE ROW LEVEL SECURITY;

--
-- Name: scheduled_posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.scheduled_posts ENABLE ROW LEVEL SECURITY;

--
-- Name: seo_analyses; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.seo_analyses ENABLE ROW LEVEL SECURITY;

--
-- Name: social_accounts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;

--
-- Name: social_media_posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.social_media_posts ENABLE ROW LEVEL SECURITY;

--
-- Name: team_invitations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;

--
-- Name: team_members; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

--
-- Name: teams; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;