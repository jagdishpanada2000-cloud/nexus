import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Users, Zap, Star, Medal, Target, Flame } from "lucide-react";

const mockChallenges = [
  {
    title: "Winter Hackathon 2024",
    description: "Build innovative solutions for climate change. 48 hours of coding, prizes worth $50,000!",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=300&fit=crop",
    prize: "$50,000",
    participants: 2341,
    teams: 456,
    deadline: "2d 14h 32m",
    status: "live",
    tags: ["Climate Tech", "AI", "Web3"]
  },
  {
    title: "AI Agent Challenge",
    description: "Create autonomous AI agents that can solve real-world problems.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop",
    prize: "$25,000",
    participants: 1567,
    teams: 312,
    deadline: "5d 8h 15m",
    status: "live",
    tags: ["AI/ML", "LLMs", "Agents"]
  },
  {
    title: "Mobile App Sprint",
    description: "Design and build a mobile app in 24 hours. Focus on UX and innovation.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=300&fit=crop",
    prize: "$10,000",
    participants: 890,
    teams: 178,
    deadline: "Registration Open",
    status: "upcoming",
    tags: ["Mobile", "React Native", "UI/UX"]
  }
];

const leaderboard = [
  { rank: 1, team: "Code Wizards", points: 9850, avatar: "🧙‍♂️" },
  { rank: 2, team: "Binary Beasts", points: 9420, avatar: "🐺" },
  { rank: 3, team: "Pixel Pirates", points: 9180, avatar: "🏴‍☠️" },
  { rank: 4, team: "Debug Dragons", points: 8790, avatar: "🐉" },
  { rank: 5, team: "Your Team", points: 8450, avatar: "⭐", isYou: true },
];

const Challenges = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-amber-500" />
                Global Challenges
              </h1>
              <p className="text-muted-foreground">Compete, learn, and win amazing prizes</p>
            </div>
            <Button variant="neon" className="gap-2">
              <Target className="w-4 h-4" />
              My Submissions
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Trophy, label: "Total Prizes", value: "$85,000", color: "text-amber-500" },
              { icon: Users, label: "Participants", value: "4,798", color: "text-neon-cyan" },
              { icon: Flame, label: "Active Now", value: "2 Live", color: "text-neon-pink" },
              { icon: Medal, label: "Your Wins", value: "3", color: "text-neon-purple" },
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Challenges List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="neon" className="cursor-pointer">All</Badge>
                <Badge variant="secondary" className="cursor-pointer">Live</Badge>
                <Badge variant="secondary" className="cursor-pointer">Upcoming</Badge>
                <Badge variant="secondary" className="cursor-pointer">Completed</Badge>
              </div>

              {mockChallenges.map((challenge, i) => (
                <Card key={i} variant="elevated" className="overflow-hidden group">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      {challenge.status === 'live' ? (
                        <Badge variant="neon" className="gap-1 animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-white" />
                          LIVE
                        </Badge>
                      ) : (
                        <Badge variant="cyan">Upcoming</Badge>
                      )}
                    </div>

                    {/* Prize */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="xp" className="text-lg px-4 py-1">
                        {challenge.prize}
                      </Badge>
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-2xl font-bold text-white mb-1">
                        {challenge.title}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">{challenge.description}</p>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {challenge.tags.map((tag, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>

                    {/* Stats & CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {challenge.participants.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {challenge.teams} teams
                        </span>
                        <span className="flex items-center gap-1 text-neon-pink">
                          <Clock className="w-4 h-4" />
                          {challenge.deadline}
                        </span>
                      </div>
                      <Button variant={challenge.status === 'live' ? "neon" : "neon-outline"}>
                        {challenge.status === 'live' ? "Join Now" : "Register"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Global Leaderboard */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Global Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.map((entry, i) => (
                    <div 
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        entry.isYou 
                          ? 'bg-neon-purple/10 border border-neon-purple/30' 
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                        entry.rank === 1 ? 'bg-amber-500/20' :
                        entry.rank === 2 ? 'bg-gray-400/20' :
                        entry.rank === 3 ? 'bg-orange-600/20' : 'bg-secondary'
                      }`}>
                        {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{entry.team}</p>
                        <p className="text-xs text-muted-foreground">{entry.points.toLocaleString()} pts</p>
                      </div>
                      <Badge variant={entry.rank <= 3 ? "xp" : "secondary"}>#{entry.rank}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Your Stats */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-neon-cyan" />
                    Your Challenge Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-secondary rounded-xl">
                      <p className="font-display text-2xl font-bold neon-text">12</p>
                      <p className="text-xs text-muted-foreground">Participated</p>
                    </div>
                    <div className="text-center p-4 bg-secondary rounded-xl">
                      <p className="font-display text-2xl font-bold text-amber-500">3</p>
                      <p className="text-xs text-muted-foreground">Wins</p>
                    </div>
                    <div className="text-center p-4 bg-secondary rounded-xl">
                      <p className="font-display text-2xl font-bold text-neon-cyan">8,450</p>
                      <p className="text-xs text-muted-foreground">Total Points</p>
                    </div>
                    <div className="text-center p-4 bg-secondary rounded-xl">
                      <p className="font-display text-2xl font-bold text-green-500">$2,500</p>
                      <p className="text-xs text-muted-foreground">Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Challenges;
