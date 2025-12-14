import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Users2, MessageSquare, Mic, CheckSquare, Crown, Star } from "lucide-react";

const mockTeams = [
  {
    name: "NeonUI Core",
    description: "Building the future of React UI components",
    banner: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=200&fit=crop",
    members: 12,
    online: 5,
    tags: ["React", "TypeScript", "Open Source"],
    isOwner: true
  },
  {
    name: "Hackathon Squad",
    description: "Weekly hackathon team - always looking for challenges!",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=200&fit=crop",
    members: 6,
    online: 3,
    tags: ["Hackathons", "Full Stack", "AI/ML"],
    isOwner: false
  },
  {
    name: "Design Systems Guild",
    description: "Exploring design tokens, accessibility, and component patterns",
    banner: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=200&fit=crop",
    members: 24,
    online: 8,
    tags: ["Design", "UI/UX", "Figma"],
    isOwner: false
  }
];

const mockChannels = [
  { name: "general", type: "chat", unread: 5 },
  { name: "dev-help", type: "chat", unread: 0 },
  { name: "show-and-tell", type: "chat", unread: 12 },
  { name: "voice-lounge", type: "voice", active: 3 },
  { name: "pair-programming", type: "voice", active: 0 },
];

const Teams = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
                <Users2 className="w-8 h-8 text-neon-cyan" />
                Team Spaces
              </h1>
              <p className="text-muted-foreground">Collaborate with your squad in real-time</p>
            </div>
            <Button variant="neon" className="gap-2">
              <Plus className="w-4 h-4" />
              Create Team
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Teams List */}
            <div className="lg:col-span-1 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search teams..."
                  className="pl-10 bg-secondary border-border"
                />
              </div>

              <h2 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Your Teams ({mockTeams.length})
              </h2>

              {mockTeams.map((team, i) => (
                <Card 
                  key={i} 
                  variant="interactive" 
                  className={i === 0 ? "border-neon-purple/50 shadow-[0_0_20px_hsl(var(--neon-purple)/0.2)]" : ""}
                >
                  <div className="h-20 overflow-hidden rounded-t-xl relative">
                    <img 
                      src={team.banner} 
                      alt={team.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    {team.isOwner && (
                      <Badge variant="xp" className="absolute top-2 right-2 gap-1">
                        <Crown className="w-3 h-3" />
                        Owner
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-display font-semibold mb-1">{team.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{team.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users2 className="w-4 h-4" />
                        <span>{team.members} members</span>
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span>{team.online} online</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="ghost" className="w-full">Browse More Teams</Button>
            </div>

            {/* Active Team View */}
            <div className="lg:col-span-2">
              <Card variant="glass" className="h-full">
                {/* Team Header */}
                <div className="h-32 overflow-hidden rounded-t-xl relative">
                  <img 
                    src={mockTeams[0].banner}
                    alt={mockTeams[0].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h2 className="font-display text-2xl font-bold text-white">{mockTeams[0].name}</h2>
                    <p className="text-white/80 text-sm">{mockTeams[0].description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 divide-x divide-border">
                  {/* Channels Sidebar */}
                  <div className="col-span-1 p-4 border-r border-border">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                      Channels
                    </h3>
                    <div className="space-y-1">
                      {mockChannels.map((channel, i) => (
                        <div 
                          key={i}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                            i === 0 ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'
                          }`}
                        >
                          {channel.type === 'chat' ? (
                            <MessageSquare className="w-4 h-4" />
                          ) : (
                            <Mic className="w-4 h-4" />
                          )}
                          <span className="flex-1 text-sm">{channel.name}</span>
                          {channel.type === 'chat' && channel.unread > 0 && (
                            <Badge variant="neon" className="text-xs px-1.5">{channel.unread}</Badge>
                          )}
                          {channel.type === 'voice' && channel.active > 0 && (
                            <Badge variant="cyan" className="text-xs px-1.5">{channel.active}</Badge>
                          )}
                        </div>
                      ))}
                    </div>

                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mt-6 mb-4">
                      Tasks
                    </h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary/50 cursor-pointer">
                        <CheckSquare className="w-4 h-4" />
                        <span className="text-sm">Kanban Board</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="col-span-3 flex flex-col h-[500px]">
                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                      {[
                        { user: "Alex", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop", message: "Just pushed the new animation system! Check it out 🎉", time: "2:34 PM" },
                        { user: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop", message: "Nice! The easing looks so smooth now", time: "2:35 PM" },
                        { user: "Jordan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop", message: "Let me review the PR real quick", time: "2:36 PM" },
                      ].map((msg, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <img 
                            src={msg.avatar}
                            alt={msg.user}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">{msg.user}</span>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-border">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Message #general..."
                          className="bg-secondary border-border"
                        />
                        <Button variant="neon">Send</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Teams;
