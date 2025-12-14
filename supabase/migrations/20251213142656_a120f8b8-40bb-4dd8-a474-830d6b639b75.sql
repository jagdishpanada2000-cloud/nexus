-- Add github_access_token column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS github_access_token text,
ADD COLUMN IF NOT EXISTS github_username text,
ADD COLUMN IF NOT EXISTS github_languages jsonb DEFAULT '{}';

-- Add comment for security
COMMENT ON COLUMN public.profiles.github_access_token IS 'Encrypted GitHub OAuth access token';