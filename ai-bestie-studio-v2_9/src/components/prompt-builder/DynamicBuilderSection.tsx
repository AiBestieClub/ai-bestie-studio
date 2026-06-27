"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { SingleChipGroup, ChipGroup } from "@/components/shared/SelectionChip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { BuilderSectionConfig, PromptConfig } from "@/types";

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[name] as React.ComponentType<{ className?: string }> | undefined;
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

function VisualGrid({ options, value, onChange }: { options: { value: string; label: string; description?: string }[]; value: string; onChange: (v: string) => void; }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {options.map((opt) => (
        <button key={opt.value} type="button" onClick={() => onChange(opt.value === value ? "" : opt.value)}
          className={cn("flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-150",
            value === opt.value ? "border-primary/60 bg-primary/10 text-text-primary" : "border-border/40 bg-border/10 text-text-secondary hover:bg-border/30 hover:text-text-primary")}>
          <span className="text-xs font-semibold mb-0.5 leading-tight">{opt.label}</span>
          {opt.description && <span className="text-[10px] text-text-faint leading-tight">{opt.description}</span>}
        </button>
      ))}
    </div>
  );
}

function FieldRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
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

interface DynamicBuilderSectionProps {
  config: BuilderSectionConfig;
  promptConfig: Partial<PromptConfig>;
  onChange: (key: keyof PromptConfig, value: unknown) => void;
}

export function DynamicBuilderSection({ config, promptConfig, onChange }: DynamicBuilderSectionProps) {
  const [isOpen, setIsOpen] = useState(config.defaultOpen ?? true);

  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      <button type="button" onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 lg:p-5 text-left hover:bg-card-hover transition-colors cursor-pointer"
        aria-expanded={isOpen}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-border/30">
            <DynamicIcon name={config.icon} className={cn("h-4 w-4", config.iconColor)} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">{config.title}</h3>
            {config.subtitle && <p className="text-xs text-text-faint mt-0.5">{config.subtitle}</p>}
          </div>
        </div>
        <div className="text-text-faint" aria-hidden="true">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-5 lg:px-5 lg:pb-6 border-t border-border/30">
          <div className="pt-4 space-y-4">
            {config.fields.map((field) => {
              const raw = promptConfig[field.configKey];
              const strValue = typeof raw === "string" ? raw : "";
              const arrValue = Array.isArray(raw) ? raw as string[] : [];

              return (
                <FieldRow key={field.id} label={field.label} hint={field.hint}>
                  {field.type === "chips-single" && (
                    <SingleChipGroup options={field.options ?? []} value={strValue} onChange={(v) => onChange(field.configKey, v || undefined)} />
                  )}
                  {field.type === "chips-multi" && (
                    <ChipGroup options={field.options ?? []} value={arrValue} onChange={(v) => onChange(field.configKey, v)} maxSelect={field.maxSelect} />
                  )}
                  {field.type === "select" && (
                    <Select value={strValue} onValueChange={(v) => onChange(field.configKey, v || undefined)}>
                      <SelectTrigger><SelectValue placeholder={field.placeholder ?? "Select..."} /></SelectTrigger>
                      <SelectContent>{(field.options ?? []).map((opt) => (<SelectItem key={opt.value} value={opt.value}>{opt.emoji ? `${opt.emoji} ${opt.label}` : opt.label}</SelectItem>))}</SelectContent>
                    </Select>
                  )}
                  {field.type === "input" && (
                    <Input value={strValue} onChange={(e) => onChange(field.configKey, e.target.value || undefined)} placeholder={field.placeholder} />
                  )}
                  {field.type === "visual-grid" && (
                    <VisualGrid options={field.options ?? []} value={strValue} onChange={(v) => onChange(field.configKey, v || undefined)} />
                  )}
                </FieldRow>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
