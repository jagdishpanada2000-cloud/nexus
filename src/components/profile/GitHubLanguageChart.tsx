import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, RefreshCw, Loader2, Github } from "lucide-react";
import { useGitHubLanguages } from "@/hooks/useGitHubLanguages";
import { useAuth } from "@/contexts/AuthContext";

interface LanguageStat {
  name: string;
  bytes: number;
  percentage: number;
}

interface GitHubLanguageChartProps {
  languages?: LanguageStat[];
}

const languageColors: Record<string, string> = {
  TypeScript: 'from-blue-400 to-blue-600',
  JavaScript: 'from-yellow-400 to-yellow-600',
  Python: 'from-green-400 to-blue-500',
  Java: 'from-red-400 to-orange-500',
  'C++': 'from-pink-400 to-purple-500',
  C: 'from-gray-400 to-gray-600',
  'C#': 'from-purple-400 to-purple-600',
  Go: 'from-cyan-400 to-cyan-600',
  Rust: 'from-orange-400 to-red-500',
  Ruby: 'from-red-500 to-red-700',
  PHP: 'from-indigo-400 to-purple-500',
  Swift: 'from-orange-400 to-orange-600',
  Kotlin: 'from-purple-400 to-orange-400',
  Dart: 'from-cyan-400 to-blue-500',
  HTML: 'from-orange-500 to-red-500',
  CSS: 'from-blue-500 to-purple-500',
  Shell: 'from-green-500 to-green-700',
  Vue: 'from-green-400 to-teal-500',
  Svelte: 'from-orange-500 to-red-600',
};

function getLanguageColor(language: string): string {
  return languageColors[language] || 'from-neon-cyan to-neon-purple';
}

export function GitHubLanguageChart({ languages = [] }: GitHubLanguageChartProps) {
  const { analyzeGitHubLanguages, isAnalyzing } = useGitHubLanguages();
  const { session } = useAuth();
  
  const hasGitHubToken = !!session?.provider_token && session?.user?.app_metadata?.provider === 'github';
  
  // Ensure languages is always an array
  const languageArray = Array.isArray(languages) ? languages : [];
  const topLanguages = languageArray.slice(0, 6);

  return (
    <Card variant="glass">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Code2 className="w-5 h-5 text-neon-cyan" />
          GitHub Languages
        </CardTitle>
        {hasGitHubToken && (
          <Button
            variant="ghost"
            size="sm"
            onClick={analyzeGitHubLanguages}
            disabled={isAnalyzing}
            className="gap-1"
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Refresh
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!hasGitHubToken ? (
          <div className="text-center py-8">
            <Github className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Connect your GitHub account to see your language stats
            </p>
            <p className="text-sm text-muted-foreground">
              Sign in with GitHub on the auth page
            </p>
          </div>
        ) : topLanguages.length === 0 ? (
          <div className="text-center py-8">
            <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              No language data yet
            </p>
            <Button
              variant="neon"
              size="sm"
              onClick={analyzeGitHubLanguages}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                'Analyze My Repos'
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Top 3 Skills Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {topLanguages.slice(0, 3).map((lang, i) => (
                <Badge
                  key={lang.name}
                  variant="neon"
                  className="gap-1"
                >
                  {i === 0 && '🥇'}
                  {i === 1 && '🥈'}
                  {i === 2 && '🥉'}
                  {lang.name}
                </Badge>
              ))}
            </div>

            {/* Language Bars */}
            <div className="space-y-3">
              {topLanguages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-muted-foreground">{lang.percentage}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getLanguageColor(lang.name)} transition-all duration-500`}
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Total Stats */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                {languageArray.length} languages across your repositories
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
