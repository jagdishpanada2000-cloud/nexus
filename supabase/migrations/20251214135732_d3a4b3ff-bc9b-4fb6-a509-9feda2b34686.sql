-- Create enum for skill source
CREATE TYPE public.skill_source AS ENUM ('github', 'manual');

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  source skill_source NOT NULL DEFAULT 'manual',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, skill_name)
);

-- Enable RLS
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view all skills"
ON public.skills
FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own skills"
ON public.skills
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skills"
ON public.skills
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills"
ON public.skills
FOR DELETE
USING (auth.uid() = user_id);

-- Create cache table for GitHub language results
CREATE TABLE public.github_skills_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  github_username TEXT NOT NULL UNIQUE,
  languages JSONB NOT NULL DEFAULT '[]'::jsonb,
  cached_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public read, no write from client)
ALTER TABLE public.github_skills_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read cache"
ON public.github_skills_cache
FOR SELECT
USING (true);