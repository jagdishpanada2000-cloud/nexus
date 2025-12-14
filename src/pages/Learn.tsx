import { Sidebar } from "@/components/dashboard/Sidebar";
import { QuestCard } from "@/components/dashboard/QuestCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Flame, Trophy, Target, Zap, Star, Lock } from "lucide-react";

const learningPaths = [
  {
    title: "Frontend Mastery",
    description: "Master React, TypeScript, and modern CSS",
    progress: 65,
    totalXP: 5000,
    earnedXP: 3250,
    quests: 12,
    completedQuests: 8,
    color: "from-neon-cyan to-neon-blue"
  },
  {
    title: "Backend Fundamentals",
    description: "Node.js, databases, and API design",
    progress: 30,
    totalXP: 4500,
    earnedXP: 1350,
    quests: 10,
    completedQuests: 3,
    color: "from-neon-purple to-neon-pink"
  }
];

const quests = [
  {
    title: "React Hooks Deep Dive",
    description: "Master useState, useEffect, useContext and custom hooks.",
    xp: 500,
    duration: "2 hours",
    progress: 75,
    difficulty: "Medium" as const
  },
  {
    title: "TypeScript Generics",
    description: "Learn to write reusable, type-safe code with generics.",
    xp: 600,
    duration: "1.5 hours",
    progress: 0,
    difficulty: "Hard" as const
  },
  {
    title: "CSS Grid Layouts",
    description: "Build complex, responsive layouts with CSS Grid.",
    xp: 400,
    duration: "1 hour",
    difficulty: "Easy" as const,
    isCompleted: true
  },
  {
    title: "Advanced Animations",
    description: "Create stunning animations with Framer Motion.",
    xp: 750,
    duration: "3 hours",
    difficulty: "Expert" as const,
    isLocked: true
  }
];

const Learn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-neon-cyan" />
                Learning Quests
              </h1>
              <p className="text-muted-foreground">Level up your skills through gamified challenges</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Zap, label: "Total XP", value: "4,600", color: "text-neon-cyan" },
              { icon: Flame, label: "Day Streak", value: "7", color: "text-orange-500" },
              { icon: Trophy, label: "Quests Done", value: "23", color: "text-amber-500" },
              { icon: Target, label: "Accuracy", value: "94%", color: "text-green-500" },
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
            {/* Learning Paths */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-display text-xl font-semibold">Your Learning Paths</h2>
              
              {learningPaths.map((path, i) => (
                <Card key={i} variant="interactive" className="overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${path.color}`} />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold mb-1">{path.title}</h3>
                        <p className="text-sm text-muted-foreground">{path.description}</p>
                      </div>
                      <Badge variant="level">{path.completedQuests}/{path.quests} Quests</Badge>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="neon-text font-semibold">{path.progress}%</span>
                      </div>
                      <div className="xp-bar h-3">
                        <div className="xp-bar-fill" style={{ width: `${path.progress}%` }} />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{path.earnedXP.toLocaleString()} / {path.totalXP.toLocaleString()} XP</span>
                      <span>{path.totalXP - path.earnedXP} XP remaining</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Available Quests */}
              <h2 className="font-display text-xl font-semibold pt-4">Available Quests</h2>
              <div className="space-y-4">
                {quests.map((quest, i) => (
                  <QuestCard key={i} {...quest} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Daily Goal */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-neon-purple" />
                    Daily Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-secondary"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${0.6 * 351.86} 351.86`}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--neon-cyan))" />
                            <stop offset="100%" stopColor="hsl(var(--neon-purple))" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div>
                          <p className="font-display text-2xl font-bold">60%</p>
                          <p className="text-xs text-muted-foreground">Complete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Earn <span className="text-neon-cyan font-semibold">200 more XP</span> to hit your daily goal!
                  </p>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Weekly Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { rank: 1, name: "Alex C.", xp: "2,450", avatar: "🥇" },
                    { rank: 2, name: "Sarah K.", xp: "2,120", avatar: "🥈" },
                    { rank: 3, name: "Jordan L.", xp: "1,890", avatar: "🥉" },
                    { rank: 4, name: "You", xp: "1,650", avatar: "⭐", isYou: true },
                  ].map((user, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center gap-3 p-3 rounded-xl ${user.isYou ? 'bg-neon-purple/10 border border-neon-purple/30' : 'bg-secondary'}`}
                    >
                      <span className="text-2xl">{user.avatar}</span>
                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.xp} XP this week</p>
                      </div>
                      <Badge variant={user.rank === 1 ? "xp" : "secondary"}>#{user.rank}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Learn;
