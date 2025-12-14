import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Github, Loader2, X, Plus, AlertCircle } from 'lucide-react';

interface Skill {
  name: string;
  bytes: number;
  percentage: number;
}

interface GitHubSkillsImportProps {
  onSkillsImported?: (skills: string[]) => void;
}

export function GitHubSkillsImport({ onSkillsImported }: GitHubSkillsImportProps) {
  const { user } = useAuth();
  const [githubUrl, setGithubUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectedSkills, setDetectedSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasImported, setHasImported] = useState(false);

  const extractUsername = (url: string): string | null => {
    const trimmed = url.trim();
    
    // Handle direct username
    if (!trimmed.includes('/') && !trimmed.includes('.')) {
      return trimmed;
    }
    
    // Handle GitHub URL patterns
    const patterns = [
      /github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)\/?$/,
      /^https?:\/\/github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)\/?$/,
    ];
    
    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  };

  const handleAnalyze = async () => {
    const username = extractUsername(githubUrl);
    
    if (!username) {
      setError('Please enter a valid GitHub profile URL (e.g., https://github.com/username)');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDetectedSkills([]);
    setSelectedSkills([]);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-github-skills', {
        body: { username },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        if (data.error.includes('not found')) {
          setError('GitHub user not found. Please check the username.');
        } else if (data.error.includes('rate limit')) {
          setError('GitHub API rate limit exceeded. Please try again later.');
        } else {
          setError(data.error);
        }
        return;
      }

      const skills = data.skills as Skill[];
      setDetectedSkills(skills);
      // Auto-select top skills (up to 10)
      setSelectedSkills(skills.slice(0, 10).map(s => s.name));
      setHasImported(true);

      toast({
        title: data.cached ? 'Skills loaded from cache' : 'Analysis complete!',
        description: `Found ${skills.length} programming languages.`,
      });
    } catch (err: any) {
      console.error('Error analyzing GitHub:', err);
      setError(err.message || 'Failed to analyze GitHub profile');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSkill = (skillName: string) => {
    setSelectedSkills(prev =>
      prev.includes(skillName)
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName]
    );
  };

  const addManualSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills(prev => [...prev, trimmed]);
      setNewSkill('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addManualSkill();
    }
  };

  const saveSkills = async () => {
    if (!user || selectedSkills.length === 0) return;

    setIsLoading(true);
    try {
      // Delete existing skills for the user
      await supabase
        .from('skills')
        .delete()
        .eq('user_id', user.id);

      // Insert new skills
      const skillsToInsert = selectedSkills.map(skillName => ({
        user_id: user.id,
        skill_name: skillName,
        source: detectedSkills.some(s => s.name === skillName) ? 'github' : 'manual',
      }));

      const { error: insertError } = await supabase
        .from('skills')
        .insert(skillsToInsert as any);

      if (insertError) throw insertError;

      toast({
        title: 'Skills saved!',
        description: `${selectedSkills.length} skills have been added to your profile.`,
      });

      onSkillsImported?.(selectedSkills);
    } catch (err: any) {
      console.error('Error saving skills:', err);
      toast({
        title: 'Error',
        description: 'Failed to save skills. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="glass" className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Github className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Import Skills from GitHub</h3>
          <p className="text-sm text-muted-foreground">
            Automatically detect your programming skills from your repositories
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="flex gap-2">
        <Input
          placeholder="https://github.com/username"
          value={githubUrl}
          onChange={(e) => {
            setGithubUrl(e.target.value);
            setError(null);
          }}
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          onClick={handleAnalyze} 
          disabled={isLoading || !githubUrl.trim()}
          className="shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            'Analyze'
          )}
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Detected Skills */}
      {detectedSkills.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              Skills imported from GitHub
            </p>
            <span className="text-xs text-muted-foreground">
              Click to toggle selection
            </span>
          </div>

          {/* Language bars */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {detectedSkills.slice(0, 15).map((skill) => (
              <button
                key={skill.name}
                onClick={() => toggleSkill(skill.name)}
                className={`w-full text-left p-2 rounded-lg transition-all ${
                  selectedSkills.includes(skill.name)
                    ? 'bg-primary/20 border border-primary/30'
                    : 'bg-muted/50 border border-transparent hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.percentage}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all"
                    style={{ width: `${Math.min(skill.percentage, 100)}%` }}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Selected Skills */}
          {selectedSkills.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Selected Skills</p>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="gap-1 pr-1 cursor-pointer hover:bg-destructive/20"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Add Manual Skill */}
          <div className="flex gap-2">
            <Input
              placeholder="Add custom skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={addManualSkill}
              disabled={!newSkill.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Save Button */}
          <Button
            onClick={saveSkills}
            disabled={isLoading || selectedSkills.length === 0}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              `Save ${selectedSkills.length} Skills`
            )}
          </Button>
        </div>
      )}

      {/* Initial State / Empty State */}
      {!hasImported && detectedSkills.length === 0 && !isLoading && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Enter your GitHub profile URL to automatically import your programming skills
        </p>
      )}
    </Card>
  );
}
