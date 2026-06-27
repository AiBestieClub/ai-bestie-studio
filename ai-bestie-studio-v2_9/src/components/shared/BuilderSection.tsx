"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface BuilderSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
  badge?: string;
}

export function BuilderSection({ id, title, subtitle, icon: Icon, iconColor = "text-primary", children, defaultOpen = true, collapsible = true, badge }: BuilderSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div id={id} className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => collapsible && setIsOpen((p) => !p)}
        className={cn("w-full flex items-center justify-between p-4 lg:p-5 text-left", collapsible ? "hover:bg-card-hover transition-colors cursor-pointer" : "cursor-default")}
        aria-expanded={collapsible ? isOpen : undefined}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-border/30">
              <Icon className={cn("h-4 w-4", iconColor)} aria-hidden="true" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
              {badge && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">{badge}</span>}
            </div>
            {subtitle && <p className="text-xs text-text-faint mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {collapsible && (
          <div className="text-text-faint shrink-0 ml-4" aria-hidden="true">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-5 lg:px-5 lg:pb-6 border-t border-border/30">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

export function FieldRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-xs font-semibold text-text-secondary">{label}</p>
        {hint && <p className="text-[11px] text-text-faint">{hint}</p>}
      </div>
      {children}
    </div>
  );
}
