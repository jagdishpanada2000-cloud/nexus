import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Heart, Star, MapPin, Zap } from "lucide-react";

interface MatchCardProps {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  level: number;
  skills: string[];
  lookingFor: string[];
  matchPercentage: number;
}

export function MatchCard({ 
  name, 
  username, 
  avatar, 
  bio, 
  location, 
  level,
  skills,
  lookingFor,
  matchPercentage
}: MatchCardProps) {
  return (
    <Card variant="neon" className="max-w-sm mx-auto overflow-hidden">
      {/* Image */}
      <div className="h-80 relative">
        <img 
          src={avatar} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Match Percentage */}
        <div className="absolute top-4 right-4">
          <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border-2 border-neon-purple">
            <div className="text-center">
              <div className="font-display text-lg font-bold text-neon-purple">{matchPercentage}%</div>
              <div className="text-[10px] text-muted-foreground">Match</div>
            </div>
          </div>
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display text-2xl font-bold text-white">{name}</h3>
            <Badge variant="level" className="gap-1">
              <Star className="w-3 h-3" />
              {level}
            </Badge>
          </div>
          <p className="text-white/80 text-sm mb-2">@{username}</p>
          <p className="text-white/60 text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </p>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Bio */}
        <p className="text-muted-foreground text-sm mb-4">{bio}</p>

        {/* Skills */}
        <div className="mb-4">
          <h4 className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            SKILLS
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <Badge key={i} variant="cyan" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Looking For */}
        <div className="mb-6">
          <h4 className="text-xs text-muted-foreground mb-2">LOOKING FOR</h4>
          <div className="flex flex-wrap gap-1.5">
            {lookingFor.map((item, i) => (
              <Badge key={i} variant="purple" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-14 h-14 rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="w-6 h-6" />
          </Button>
          <Button 
            variant="neon" 
            size="icon" 
            className="w-16 h-16 rounded-full"
          >
            <Heart className="w-8 h-8" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="w-14 h-14 rounded-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
          >
            <Star className="w-6 h-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
