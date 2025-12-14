import { Sidebar } from "@/components/dashboard/Sidebar";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, TrendingUp, Star, GitFork, Users } from "lucide-react";

const mockProjects = [
  {
    title: "NeonUI",
    description: "A beautiful React component library with neon-themed styling and animations.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
    tags: ["React", "TypeScript", "UI Library", "CSS"],
    stars: 1234,
    forks: 234,
    contributors: 12,
    isHiring: true,
    openRoles: ["Frontend Dev", "Designer"]
  },
  {
    title: "DevMatch",
    description: "AI-powered teammate finder for hackathons and collaborative projects.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop",
    tags: ["Python", "ML", "API", "FastAPI"],
    stars: 890,
    forks: 156,
    contributors: 8,
    isHiring: false,
    openRoles: []
  },
  {
    title: "CodeFlow",
    description: "Real-time collaborative code editor with built-in video chat.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    tags: ["WebRTC", "Node.js", "Monaco", "Socket.io"],
    stars: 2341,
    forks: 456,
    contributors: 23,
    isHiring: true,
    openRoles: ["Backend Dev"]
  },
  {
    title: "TaskZen",
    description: "Minimalist task management with AI-powered prioritization.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop",
    tags: ["Next.js", "Prisma", "OpenAI", "PostgreSQL"],
    stars: 567,
    forks: 89,
    contributors: 5,
    isHiring: false,
    openRoles: []
  },
  {
    title: "PixelCraft",
    description: "Browser-based pixel art editor with collaborative features.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=200&fit=crop",
    tags: ["Canvas", "React", "WebSocket", "Zustand"],
    stars: 1567,
    forks: 234,
    contributors: 15,
    isHiring: true,
    openRoles: ["Full Stack", "UI/UX"]
  },
  {
    title: "BeatMaker",
    description: "Web-based music production tool with loop sequencing.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=200&fit=crop",
    tags: ["Web Audio", "React", "TypeScript"],
    stars: 789,
    forks: 123,
    contributors: 7,
    isHiring: false,
    openRoles: []
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
                <GitFork className="w-8 h-8 text-neon-purple" />
                Projects Hub
              </h1>
              <p className="text-muted-foreground">Discover, contribute, and build amazing projects</p>
            </div>
            <Button variant="neon" className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: GitFork, label: "Total Projects", value: "12,345", color: "text-neon-purple" },
              { icon: Star, label: "Stars Given", value: "45.2K", color: "text-amber-500" },
              { icon: Users, label: "Contributors", value: "8,901", color: "text-neon-cyan" },
              { icon: TrendingUp, label: "Active Today", value: "1,234", color: "text-green-500" },
            ].map((stat, i) => (
              <Card key={i} variant="glass" className="p-4">
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="font-display text-xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects by name, tech, or creator..."
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="neon-outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <div className="flex gap-1">
                <Badge variant="cyan" className="cursor-pointer hover:opacity-80">All</Badge>
                <Badge variant="secondary" className="cursor-pointer hover:opacity-80">Hiring</Badge>
                <Badge variant="secondary" className="cursor-pointer hover:opacity-80">Trending</Badge>
                <Badge variant="secondary" className="cursor-pointer hover:opacity-80">New</Badge>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="neon-outline">Load More Projects</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
