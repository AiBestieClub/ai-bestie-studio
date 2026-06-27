import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/20 text-primary",
        secondary: "border-transparent bg-border/40 text-text-secondary",
        destructive: "border-transparent bg-destructive/20 text-destructive",
        outline: "border-border text-text-muted",
        gradient: "border-transparent text-white bg-gradient-luxury",
        new: "border-transparent bg-pink-accent/20 text-pink-accent",
        trending: "border-transparent bg-amber-500/20 text-amber-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
