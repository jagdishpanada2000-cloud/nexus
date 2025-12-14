import { Sidebar } from "@/components/dashboard/Sidebar";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { FeedPost } from "@/components/dashboard/FeedPost";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { ProjectForm } from "@/components/profile/ProjectForm";
import { UserProjectCard } from "@/components/profile/UserProjectCard";
import { GitHubLanguageChart } from "@/components/profile/GitHubLanguageChart";
import { GitHubSkillsImport } from "@/components/profile/GitHubSkillsImport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Code2, Trophy, Users, Loader2 } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

// Default gamification data (will be dynamic later)
const defaultGamification = {
  level: 1,
  xp: 0,
  xpToNext: 1000,
  streak: 0,
  badges: [
    { icon: "🚀", name: "Early Adopter" }
  ],
  stats: {
    projects: 0,
    contributions: 0,
    followers: 0,
    following: 0
  }
};


const mockActivity = [
  {
    author: {
      name: "Jordan Lee",
      username: "jordanlee",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      level: 12
    },
    content: "Shipped v2.0 of NeonUI with 15 new components! Thanks to everyone who contributed 💜",
    tags: ["neonui", "release", "opensource"],
    likes: 345,
    comments: 67,
    timeAgo: "1d ago"
  }
];

const Profile = () => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const queryClient = useQueryClient();

  const handleSkillsImported = () => {
    queryClient.invalidateQueries({ queryKey: ['profile'] });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Get skills from profile, using github_languages as fallback for skill levels
  const profileSkills = profile?.skills || [];
  const rawGithubLangs = profile?.github_languages;
  const githubLanguages = Array.isArray(rawGithubLangs) ? rawGithubLangs as Array<{ name: string; percentage: number }> : [];
  
  // Create skill objects with levels based on github language data or default random
  const mappedSkills = profileSkills.length > 0
    ? profileSkills.map((skill) => {
        // Try to find matching github language for percentage
        const langMatch = githubLanguages.find(
          (lang) => lang.name.toLowerCase() === skill.toLowerCase()
        );
        return { 
          name: skill, 
          level: langMatch ? Math.round(langMatch.percentage) : Math.floor(50 + Math.random() * 40) 
        };
      })
    : [{ name: "Add your skills", level: 0 }];

  const profileData = {
    name: profile?.display_name || user?.email?.split("@")[0] || "User",
    username: user?.email?.split("@")[0] || "user",
    avatar: profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`,
    bio: profile?.bio || "No bio yet. Tell us about yourself!",
    location: "",
    website: "",
    joinDate: profile?.created_at ? format(new Date(profile.created_at), "MMMM yyyy") : "Recently",
    ...defaultGamification,
    skills: mappedSkills
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1 space-y-4">
              <ProfileCard {...profileData} />
              <div className="flex justify-center">
                <ProfileEditForm />
              </div>
              <GitHubSkillsImport onSkillsImported={handleSkillsImported} />
              <GitHubLanguageChart languages={profile?.github_languages as any || []} />
            </div>

            {/* Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="activity" className="w-full">
                <TabsList className="w-full justify-start mb-6 bg-secondary p-1 rounded-xl">
                  <TabsTrigger value="activity" className="gap-2 rounded-lg data-[state=active]:bg-background">
                    <Activity className="w-4 h-4" />
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="gap-2 rounded-lg data-[state=active]:bg-background">
                    <Code2 className="w-4 h-4" />
                    Projects
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="gap-2 rounded-lg data-[state=active]:bg-background">
                    <Trophy className="w-4 h-4" />
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger value="teams" className="gap-2 rounded-lg data-[state=active]:bg-background">
                    <Users className="w-4 h-4" />
                    Teams
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="activity" className="space-y-4">
                  {mockActivity.map((post, i) => (
                    <FeedPost key={i} {...post} />
                  ))}
                </TabsContent>

                <TabsContent value="projects">
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <ProjectForm />
                    </div>
                    {projectsLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : projects.length === 0 ? (
                      <Card variant="glass">
                        <CardContent className="p-6 text-center py-12">
                          <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="font-display text-xl font-semibold mb-2">No Projects Yet</h3>
                          <p className="text-muted-foreground">Add your first project to showcase your work!</p>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map((project) => (
                          <UserProjectCard key={project.id} {...project} />
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="achievements">
                  <Card variant="glass">
                    <CardHeader>
                      <CardTitle>Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {profileData.badges.map((badge, i) => (
                          <div 
                            key={i}
                            className="glass rounded-xl p-4 text-center hover-glow"
                          >
                            <div className="text-4xl mb-2">{badge.icon}</div>
                            <p className="text-sm font-medium">{badge.name}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="teams">
                  <Card variant="glass">
                    <CardContent className="p-6">
                      <div className="text-center py-12">
                        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-display text-xl font-semibold mb-2">No Teams Yet</h3>
                        <p className="text-muted-foreground mb-4">Join a team or create your own to collaborate with other devs!</p>
                        <Badge variant="neon" className="cursor-pointer">Find a Team</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
