"use client";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectionChipProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick: () => void;
}

export function SelectionChip({ label, emoji, selected = false, onClick }: SelectionChipProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer no-tap-highlight min-h-[36px]",
        selected
          ? "text-white border-primary/70 bg-gradient-to-r from-primary/30 to-pink-accent/20"
          : "text-text-secondary border-border/50 bg-border/20 hover:bg-border/40 hover:text-text-primary hover:border-border-bright"
      )}
    >
      {emoji && <span className="text-sm leading-none" aria-hidden="true">{emoji}</span>}
      {selected && !emoji && <Check className="h-3 w-3 shrink-0" aria-hidden="true" />}
      {label}
    </button>
  );
}

interface ChipGroupProps {
  options: { value: string; label: string; emoji?: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelect?: number;
}

export function ChipGroup({ options, value, onChange, maxSelect }: ChipGroupProps) {
  const toggle = (v: string) => {
    if (value.includes(v)) { onChange(value.filter((x) => x !== v)); return; }
    const next = maxSelect && value.length >= maxSelect ? [...value.slice(1), v] : [...value, v];
    onChange(next);
  };
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => (
        <SelectionChip key={opt.value} label={opt.label} emoji={opt.emoji} selected={value.includes(opt.value)} onClick={() => toggle(opt.value)} />
      ))}
    </div>
  );
}

interface SingleChipGroupProps {
  options: { value: string; label: string; emoji?: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function SingleChipGroup({ options, value, onChange }: SingleChipGroupProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => (
        <SelectionChip key={opt.value} label={opt.label} emoji={opt.emoji} selected={value === opt.value} onClick={() => onChange(opt.value === value ? "" : opt.value)} />
      ))}
    </div>
  );
}
