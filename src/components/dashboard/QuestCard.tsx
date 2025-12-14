import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Clock, CheckCircle2, Lock } from "lucide-react";

interface QuestCardProps {
  title: string;
  description: string;
  xp: number;
  duration: string;
  progress?: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

const difficultyColors = {
  Easy: "cyan",
  Medium: "purple",
  Hard: "pink",
  Expert: "neon"
} as const;

export function QuestCard({ 
  title, 
  description, 
  xp, 
  duration, 
  progress = 0, 
  isCompleted = false,
  isLocked = false,
  difficulty
}: QuestCardProps) {
  return (
    <Card 
      variant={isLocked ? "default" : "interactive"} 
      className={`relative overflow-hidden ${isLocked ? 'opacity-60' : ''}`}
    >
      {isCompleted && (
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="absolute top-3 right-[-35px] w-32 bg-green-500 text-white text-xs font-bold py-1 text-center rotate-45">
            Complete
          </div>
        </div>
      )}

      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-xl ${isCompleted ? 'bg-green-500/20' : 'bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20'} flex items-center justify-center shrink-0`}>
            {isLocked ? (
              <Lock className="w-6 h-6 text-muted-foreground" />
            ) : isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <Zap className="w-6 h-6 text-neon-purple" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display font-semibold truncate">{title}</h3>
              <Badge variant={difficultyColors[difficulty] as "cyan" | "purple" | "pink" | "neon"} className="text-xs shrink-0">
                {difficulty}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>

            {/* Progress Bar */}
            {!isCompleted && !isLocked && progress > 0 && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="xp-bar">
                  <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm">
                <Badge variant="xp" className="gap-1">
                  <Zap className="w-3 h-3" />
                  {xp} XP
                </Badge>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {duration}
                </span>
              </div>
              {!isCompleted && !isLocked && (
                <Button variant="neon" size="sm">
                  {progress > 0 ? "Continue" : "Start"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
