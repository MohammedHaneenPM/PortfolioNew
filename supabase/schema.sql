-- ==============================================================================
-- HUE SOLUTIONS CANDIDATE ASSESSMENT: SUPABASE DATABASE & STORAGE SCHEMA
-- ==============================================================================

-- 1. Enable uuid generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. PROJECTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_path TEXT,
  live_url TEXT,
  github_url TEXT,
  tags TEXT[] DEFAULT '{}'::TEXT[],
  category TEXT DEFAULT 'all',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for ordering projects
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects (created_at DESC);

-- Automatic updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects RLS Policies:
-- 1. Anyone (public visitors) can view projects
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
CREATE POLICY "Public can view published projects"
ON public.projects
FOR SELECT
USING (true);

-- 2. Only authenticated administrators can insert projects
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
CREATE POLICY "Admins can insert projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- 3. Only authenticated administrators can update projects
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
CREATE POLICY "Admins can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- 4. Only authenticated administrators can delete projects
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
CREATE POLICY "Admins can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- ==============================================================================
-- 3. MEETINGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  agenda TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  admin_email_status TEXT NOT NULL DEFAULT 'pending',
  visitor_email_status TEXT NOT NULL DEFAULT 'pending'
);

-- Index for ordering and filtering
CREATE INDEX IF NOT EXISTS idx_meetings_created_at ON public.meetings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_meetings_email ON public.meetings (email);

-- Enable Row Level Security
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

-- Meetings RLS Policies:
-- 1. Anyone (public visitors) can submit a meeting request (INSERT only)
DROP POLICY IF EXISTS "Public visitors can create meeting requests" ON public.meetings;
CREATE POLICY "Public visitors can create meeting requests"
ON public.meetings
FOR INSERT
WITH CHECK (true);

-- 2. Public visitors CANNOT read meetings (prevents scraping private emails/agendas)
-- Only authenticated administrators can read all meetings
DROP POLICY IF EXISTS "Only admins can view meeting requests" ON public.meetings;
CREATE POLICY "Only admins can view meeting requests"
ON public.meetings
FOR SELECT
TO authenticated
USING (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- 3. Only admins can update meetings (e.g. status updates)
DROP POLICY IF EXISTS "Only admins can update meeting requests" ON public.meetings;
CREATE POLICY "Only admins can update meeting requests"
ON public.meetings
FOR UPDATE
TO authenticated
USING (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- 4. Only admins can delete meeting requests
DROP POLICY IF EXISTS "Only admins can delete meeting requests" ON public.meetings;
CREATE POLICY "Only admins can delete meeting requests"
ON public.meetings
FOR DELETE
TO authenticated
USING (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- ==============================================================================
-- 4. SUPABASE STORAGE BUCKET: project-images
-- ==============================================================================

-- Create bucket if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880, -- 5 MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- Storage RLS Policies:
-- 1. Public can read/view images
DROP POLICY IF EXISTS "Public Access to project images" ON storage.objects;
CREATE POLICY "Public Access to project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- 2. Only authenticated administrators can upload images
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
CREATE POLICY "Admins can upload project images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images'
  AND (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
);

-- 3. Only authenticated administrators can update project images
DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
CREATE POLICY "Admins can update project images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'project-images'
  AND (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
);

-- 4. Only authenticated administrators can delete project images
DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;
CREATE POLICY "Admins can delete project images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-images'
  AND (
    auth.jwt() ->> 'email' = current_setting('app.admin_email', true)
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  )
);
