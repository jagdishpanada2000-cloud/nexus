import { Sidebar } from "@/components/dashboard/Sidebar";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter, Users, Heart, Zap } from "lucide-react";

const mockMatches = [
  {
    name: "Maya Rodriguez",
    username: "mayarod",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    bio: "Backend wizard looking for frontend partners. Let's build something amazing together!",
    location: "Austin, TX",
    level: 18,
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    lookingFor: ["Frontend Dev", "UI/UX Designer"],
    matchPercentage: 94
  }
];

const Match = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-neon-purple" />
                Smart Matching
              </h1>
              <p className="text-muted-foreground">Find your perfect teammate based on skills, interests, and goals</p>
            </div>
            <Button variant="neon-outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Users, label: "Devs Online", value: "2,345", color: "text-neon-cyan" },
              { icon: Heart, label: "Matches Today", value: "12", color: "text-neon-pink" },
              { icon: Zap, label: "Your Match Rate", value: "87%", color: "text-neon-purple" },
            ].map((stat, i) => (
              <Card key={i} variant="glass" className="p-5">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-display text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Match Cards */}
          <div className="flex flex-col items-center">
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="cyan">Based on your skills</Badge>
              <Badge variant="purple">Similar interests</Badge>
              <Badge variant="pink">Same timezone</Badge>
            </div>
            
            {mockMatches.map((match, i) => (
              <MatchCard key={i} {...match} />
            ))}

            <p className="text-center text-muted-foreground mt-8">
              Swipe right to connect, left to pass, star to super-like
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Match;
