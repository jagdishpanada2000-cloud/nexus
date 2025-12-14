import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Link as LinkIcon, Calendar, Zap, Flame, Trophy, Star } from "lucide-react";

interface ProfileCardProps {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  website?: string;
  joinDate: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  badges: { icon: string; name: string }[];
  skills: { name: string; level: number }[];
  stats: {
    projects: number;
    contributions: number;
    followers: number;
    following: number;
  };
}

export function ProfileCard({ 
  name, 
  username, 
  avatar, 
  bio, 
  location, 
  website, 
  joinDate,
  level,
  xp,
  xpToNext,
  streak,
  badges,
  skills,
  stats
}: ProfileCardProps) {
  return (
    <Card variant="glass" className="overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNC00aC0ydi0yaDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      </div>

      <CardContent className="p-6 -mt-16 relative">
        {/* Avatar */}
        <div className="flex items-end justify-between mb-4">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple p-1">
            <img 
              src={avatar} 
              alt={name}
              className="w-full h-full rounded-xl object-cover bg-background"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="neon-outline" size="sm">Edit Profile</Button>
            <Button variant="neon" size="sm">Share</Button>
          </div>
        </div>

        {/* Name & Level */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display text-2xl font-bold">{name}</h2>
            <Badge variant="level" className="gap-1">
              <Star className="w-3 h-3" />
              Lvl {level}
            </Badge>
          </div>
          <p className="text-muted-foreground">@{username}</p>
        </div>

        {/* XP & Streak */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{xp.toLocaleString()} XP</span>
              <span className="text-neon-purple">{xpToNext.toLocaleString()} to next</span>
            </div>
            <div className="xp-bar">
              <div className="xp-bar-fill" style={{ width: `${(xp / (xp + xpToNext)) * 100}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-500">{streak}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-foreground mb-4">{bio}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
          {website && (
            <a href={website} className="flex items-center gap-1 hover:text-neon-cyan transition-colors">
              <LinkIcon className="w-4 h-4" />
              {website.replace('https://', '')}
            </a>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Joined {joinDate}
          </span>
        </div>

        {/* Badges */}
        <div className="mb-6">
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-neon-purple" />
            Badges
          </h3>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, i) => (
              <div 
                key={i}
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-pointer"
                title={badge.name}
              >
                {badge.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-neon-cyan" />
            Top Skills
          </h3>
          <div className="space-y-3">
            {skills.slice(0, 4).map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border">
          <div className="text-center">
            <div className="font-display text-2xl font-bold">{stats.projects}</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl font-bold">{stats.contributions}</div>
            <div className="text-xs text-muted-foreground">Contributions</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl font-bold">{stats.followers}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl font-bold">{stats.following}</div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
