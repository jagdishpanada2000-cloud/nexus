import { Sidebar } from "@/components/dashboard/Sidebar";
import { FeedPost } from "@/components/dashboard/FeedPost";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { QuestCard } from "@/components/dashboard/QuestCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Search, Plus, TrendingUp, Users, Trophy, Flame } from "lucide-react";

const mockPosts = [
  {
    author: {
      name: "Alex Chen",
      username: "alexchen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      level: 15
    },
    content: "Just shipped my first open-source project! 🚀 A React component library for building neon-themed UIs. Check it out and let me know what you think!",
    codeSnippet: `import { Button } from '@neonui/react';\n\n<Button variant="neon" glow>\n  Click me!\n</Button>`,
    tags: ["react", "opensource", "typescript"],
    likes: 234,
    comments: 45,
    timeAgo: "2h ago"
  },
  {
    author: {
      name: "Sarah Kim",
      username: "sarahk",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      level: 22
    },
    content: "Day 30 of my 100 days of code challenge! Built a full-stack app with Next.js, Prisma, and PostgreSQL. The streak continues 🔥",
    tags: ["100daysofcode", "nextjs", "fullstack"],
    likes: 567,
    comments: 89,
    timeAgo: "4h ago"
  }
];

const mockProjects = [
  {
    title: "NeonUI",
    description: "A beautiful React component library with neon-themed styling and animations.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    tags: ["React", "TypeScript", "UI Library"],
    stars: 1234,
    forks: 234,
    contributors: 12,
    isHiring: true,
    openRoles: ["Frontend Dev", "Designer"]
  },
  {
    title: "DevMatch",
    description: "AI-powered teammate finder for hackathons and projects.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop",
    tags: ["Python", "ML", "API"],
    stars: 890,
    forks: 156,
    contributors: 8,
    isHiring: false,
    openRoles: []
  }
];

const mockQuests = [
  {
    title: "React Fundamentals",
    description: "Master the basics of React including components, props, and state management.",
    xp: 500,
    duration: "2 hours",
    progress: 75,
    difficulty: "Easy" as const
  },
  {
    title: "Build a REST API",
    description: "Learn to create RESTful APIs with Node.js and Express.",
    xp: 750,
    duration: "3 hours",
    progress: 0,
    difficulty: "Medium" as const
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Search projects, devs, teams..."
                  className="w-full pl-10 pr-4 py-2 bg-secondary rounded-xl border border-border focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-neon-pink rounded-full" />
              </Button>
              <Button variant="neon" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Create
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple p-0.5">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover bg-background"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: TrendingUp, label: "XP Today", value: "+125", color: "text-neon-cyan" },
                  { icon: Flame, label: "Streak", value: "7 days", color: "text-orange-500" },
                  { icon: Users, label: "Connections", value: "234", color: "text-neon-purple" },
                  { icon: Trophy, label: "Rank", value: "#152", color: "text-amber-500" },
                ].map((stat, i) => (
                  <Card key={i} variant="glass" className="p-4">
                    <div className="flex items-center gap-3">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="font-display font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Feed */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-bold">Your Feed</h2>
                  <div className="flex gap-2">
                    <Badge variant="neon">For You</Badge>
                    <Badge variant="secondary">Following</Badge>
                    <Badge variant="secondary">Trending</Badge>
                  </div>
                </div>
                {mockPosts.map((post, i) => (
                  <FeedPost key={i} {...post} />
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Trending Projects */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-neon-purple" />
                    Trending Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockProjects.map((project, i) => (
                    <ProjectCard key={i} {...project} />
                  ))}
                  <Button variant="ghost" className="w-full">View All Projects</Button>
                </CardContent>
              </Card>

              {/* Active Quests */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-neon-cyan" />
                    Active Quests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockQuests.map((quest, i) => (
                    <QuestCard key={i} {...quest} />
                  ))}
                  <Button variant="ghost" className="w-full">Browse All Quests</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
