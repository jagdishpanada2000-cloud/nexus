import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface LanguageStats {
  name: string;
  bytes: number;
  percentage: number;
}

export function useGitHubLanguages() {
  const { user, session } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [languages, setLanguages] = useState<LanguageStats[]>([]);

  const analyzeGitHubLanguages = useCallback(async () => {
    if (!user || !session) return;

    // Get provider token from session
    const providerToken = session.provider_token;
    
    if (!providerToken) {
      toast({
        title: 'GitHub Connection Required',
        description: 'Please sign in with GitHub to analyze your repositories.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Fetch all public repos
      const reposResponse = await fetch('https://api.github.com/user/repos?per_page=100&type=owner', {
        headers: {
          Authorization: `Bearer ${providerToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }

      const repos = await reposResponse.json();
      
      // Fetch languages for each repo
      const languageTotals: Record<string, number> = {};
      
      for (const repo of repos) {
        if (repo.fork) continue; // Skip forked repos
        
        const langResponse = await fetch(repo.languages_url, {
          headers: {
            Authorization: `Bearer ${providerToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (langResponse.ok) {
          const repoLanguages = await langResponse.json();
          
          for (const [lang, bytes] of Object.entries(repoLanguages)) {
            languageTotals[lang] = (languageTotals[lang] || 0) + (bytes as number);
          }
        }
      }

      // Calculate percentages
      const totalBytes = Object.values(languageTotals).reduce((sum, bytes) => sum + bytes, 0);
      
      const languageStats: LanguageStats[] = Object.entries(languageTotals)
        .map(([name, bytes]) => ({
          name,
          bytes,
          percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
        }))
        .sort((a, b) => b.bytes - a.bytes);

      setLanguages(languageStats);

      // Get top 3 skills
      const topSkills = languageStats.slice(0, 3).map(l => l.name);

      // Update profile with languages and top skills
      const { error } = await supabase
        .from('profiles')
        .update({
          github_languages: JSON.parse(JSON.stringify(languageStats)),
          skills: topSkills,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Analysis Complete',
        description: `Analyzed ${repos.length} repositories and found ${languageStats.length} languages.`,
      });

      return languageStats;
    } catch (error: any) {
      console.error('Error analyzing GitHub:', error);
      toast({
        title: 'Analysis Failed',
        description: error.message || 'Failed to analyze GitHub repositories.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [user, session]);

  return {
    analyzeGitHubLanguages,
    isAnalyzing,
    languages,
  };
}
