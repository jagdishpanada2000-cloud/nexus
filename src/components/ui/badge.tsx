import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        neon: "border-transparent bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-white",
        cyan: "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan",
        purple: "border-neon-purple/50 bg-neon-purple/10 text-neon-purple",
        pink: "border-neon-pink/50 bg-neon-pink/10 text-neon-pink",
        xp: "border-transparent bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold",
        level: "border-transparent bg-gradient-to-r from-neon-cyan to-neon-blue text-white font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
