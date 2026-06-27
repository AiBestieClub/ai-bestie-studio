import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[80px] w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-text-primary",
      "placeholder:text-text-faint",
      "focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "transition-all duration-200 resize-none",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
