import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, GitFork, Users, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  stars: number;
  forks: number;
  contributors: number;
  openRoles?: string[];
  isHiring?: boolean;
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  tags, 
  stars, 
  forks, 
  contributors,
  openRoles = [],
  isHiring = false
}: ProjectCardProps) {
  return (
    <Card variant="elevated" className="group overflow-hidden">
      {/* Project Image */}
      {image && (
        <div className="h-40 overflow-hidden relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          {isHiring && (
            <Badge variant="neon" className="absolute top-3 right-3">
              🔥 Hiring
            </Badge>
          )}
        </div>
      )}

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-lg font-semibold group-hover:text-neon-purple transition-colors">
            {title}
          </h3>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Open Roles */}
        {openRoles.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Open Roles:</p>
            <div className="flex flex-wrap gap-1.5">
              {openRoles.map((role, i) => (
                <Badge key={i} variant="purple" className="text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            <span>{forks}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{contributors}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
