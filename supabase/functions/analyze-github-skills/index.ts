import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GITHUB_TOKEN = Deno.env.get('GITHUB_TOKEN');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

// Cache duration: 24 hours
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { username } = await req.json();
    
    if (!username || typeof username !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid GitHub username' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const cleanUsername = username.trim().toLowerCase();
    console.log(`Analyzing GitHub skills for: ${cleanUsername}`);

    // Create Supabase client with service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check cache first
    const { data: cacheData } = await supabase
      .from('github_skills_cache')
      .select('*')
      .eq('github_username', cleanUsername)
      .maybeSingle();

    if (cacheData) {
      const cacheAge = Date.now() - new Date(cacheData.cached_at).getTime();
      if (cacheAge < CACHE_DURATION_MS) {
        console.log(`Returning cached data for ${cleanUsername}`);
        return new Response(
          JSON.stringify({ skills: cacheData.languages, cached: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Fetch from GitHub API
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'SkillsAnalyzer',
    };
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    // Verify user exists
    const userResponse = await fetch(`https://api.github.com/users/${cleanUsername}`, { headers });
    
    if (userResponse.status === 404) {
      return new Response(
        JSON.stringify({ error: 'GitHub user not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (userResponse.status === 403) {
      const rateLimitRemaining = userResponse.headers.get('X-RateLimit-Remaining');
      console.log(`GitHub rate limit remaining: ${rateLimitRemaining}`);
      return new Response(
        JSON.stringify({ error: 'GitHub API rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user: ${userResponse.status}`);
    }

    // Fetch all public repos (paginated)
    let allRepos: any[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const reposResponse = await fetch(
        `https://api.github.com/users/${cleanUsername}/repos?per_page=${perPage}&page=${page}&type=owner`,
        { headers }
      );

      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repos: ${reposResponse.status}`);
      }

      const repos = await reposResponse.json();
      if (repos.length === 0) break;

      allRepos = allRepos.concat(repos);
      if (repos.length < perPage) break;
      page++;

      // Safety limit
      if (page > 10) break;
    }

    console.log(`Found ${allRepos.length} repos for ${cleanUsername}`);

    // Filter out forks and fetch languages
    const ownedRepos = allRepos.filter((repo: any) => !repo.fork);
    console.log(`${ownedRepos.length} non-forked repos`);

    const languageTotals: Record<string, number> = {};

    // Fetch languages for each repo (with concurrency limit)
    const batchSize = 5;
    for (let i = 0; i < ownedRepos.length; i += batchSize) {
      const batch = ownedRepos.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (repo: any) => {
          try {
            const langResponse = await fetch(repo.languages_url, { headers });
            if (langResponse.ok) {
              const languages = await langResponse.json();
              for (const [lang, bytes] of Object.entries(languages)) {
                languageTotals[lang] = (languageTotals[lang] || 0) + (bytes as number);
              }
            }
          } catch (err) {
            console.error(`Error fetching languages for ${repo.name}:`, err);
          }
        })
      );
    }

    // Calculate percentages and sort
    const totalBytes = Object.values(languageTotals).reduce((sum, bytes) => sum + bytes, 0);
    
    const skills = Object.entries(languageTotals)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.bytes - a.bytes);

    console.log(`Analyzed ${skills.length} languages for ${cleanUsername}`);

    // Update cache
    await supabase
      .from('github_skills_cache')
      .upsert({
        github_username: cleanUsername,
        languages: skills,
        cached_at: new Date().toISOString(),
      }, { onConflict: 'github_username' });

    return new Response(
      JSON.stringify({ skills, cached: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error analyzing GitHub skills:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
