import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, 
  Users2, 
  BookOpen, 
  Trophy, 
  Sparkles,
  GitBranch,
  MessageSquare,
  Target
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Home Feed",
    description: "Share code snippets, project updates, and dev memes. Like Instagram, but for builders.",
    badge: "Social",
    color: "cyan"
  },
  {
    icon: GitBranch,
    title: "Projects Hub",
    description: "Showcase your repos, track contributions, and find open-source projects to join.",
    badge: "Build",
    color: "purple"
  },
  {
    icon: Users2,
    title: "Team Spaces",
    description: "Real-time chat, voice channels, and task boards. Your squad's command center.",
    badge: "Collaborate",
    color: "pink"
  },
  {
    icon: BookOpen,
    title: "Learning Quests",
    description: "Gamified tutorials with XP, streaks, and achievements. Level up while you learn.",
    badge: "Learn",
    color: "cyan"
  },
  {
    icon: Trophy,
    title: "Challenges",
    description: "Weekly hackathons, coding competitions, and global leaderboards.",
    badge: "Compete",
    color: "purple"
  },
  {
    icon: Sparkles,
    title: "Smart Matching",
    description: "AI-powered teammate finder. Swipe to connect with devs who complement your skills.",
    badge: "Network",
    color: "pink"
  },
  {
    icon: Target,
    title: "Career Hub",
    description: "Build your portfolio, earn verified badges, and get discovered by recruiters.",
    badge: "Grow",
    color: "cyan"
  },
  {
    icon: MessageSquare,
    title: "DMs & Groups",
    description: "Connect with devs worldwide. Voice calls, screen sharing, code collaboration.",
    badge: "Connect",
    color: "purple"
  },
];

export function Features() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="purple" className="mb-4">Features</Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="neon-text"> Ship & Grow</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            One platform. Infinite possibilities. Built for the next generation of developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              variant="interactive"
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-neon-${feature.color}/10 border border-neon-${feature.color}/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-neon-${feature.color}`} />
                </div>
                <Badge variant={feature.color as "cyan" | "purple" | "pink"} className="mb-3">
                  {feature.badge}
                </Badge>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
