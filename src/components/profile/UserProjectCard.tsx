import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2 } from "lucide-react";
import { useDeleteProject } from "@/hooks/useProjects";
import { toast } from "sonner";

const RANDOM_THUMBNAILS = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=200&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=200&fit=crop",
  "https://images.unsplash.com/photo-1550439062-609e1531270e?w=400&h=200&fit=crop",
];

interface UserProjectCardProps {
  id: string;
  name: string;
  skills: string[];
  github_url: string;
}

export function UserProjectCard({ id, name, skills, github_url }: UserProjectCardProps) {
  const { mutate: deleteProject, isPending } = useDeleteProject();

  // Generate consistent random thumbnail based on project id
  const thumbnailIndex = id.charCodeAt(0) % RANDOM_THUMBNAILS.length;
  const thumbnail = RANDOM_THUMBNAILS[thumbnailIndex];

  const handleDelete = () => {
    deleteProject(id, {
      onSuccess: () => toast.success("Project deleted"),
      onError: () => toast.error("Failed to delete project"),
    });
  };

  return (
    <Card variant="glass" className="overflow-hidden group">
      <div className="relative h-32">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-display font-semibold text-lg truncate">{name}</h3>
        
        <div className="flex flex-wrap gap-1">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1"
            asChild
          >
            <a href={github_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3" />
              GitHub
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
