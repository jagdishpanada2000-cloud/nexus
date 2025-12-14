import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";

interface FeedPostProps {
  author: {
    name: string;
    username: string;
    avatar: string;
    level: number;
  };
  content: string;
  image?: string;
  codeSnippet?: string;
  tags: string[];
  likes: number;
  comments: number;
  timeAgo: string;
}

export function FeedPost({ author, content, image, codeSnippet, tags, likes, comments, timeAgo }: FeedPostProps) {
  return (
    <Card variant="glass" className="mb-4 hover:border-neon-purple/30 transition-all">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple p-0.5">
              <img 
                src={author.avatar} 
                alt={author.name}
                className="w-full h-full rounded-full object-cover bg-background"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{author.name}</span>
                <Badge variant="level" className="text-xs py-0">Lvl {author.level}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">@{author.username} • {timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <p className="text-foreground mb-4">{content}</p>

        {/* Code Snippet */}
        {codeSnippet && (
          <div className="bg-background rounded-xl p-4 mb-4 font-mono text-sm overflow-x-auto border border-border">
            <pre className="text-neon-cyan">{codeSnippet}</pre>
          </div>
        )}

        {/* Image */}
        {image && (
          <div className="rounded-xl overflow-hidden mb-4">
            <img src={image} alt="Post content" className="w-full h-auto" />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-neon-pink">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-neon-cyan">
              <MessageCircle className="w-4 h-4" />
              <span>{comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon-purple">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
