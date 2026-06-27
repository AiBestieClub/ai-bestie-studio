"use client";
import { Users, BookMarked, Zap, Layers } from "lucide-react";
import { useCharacters } from "@/hooks/useCharacters";
import { usePromptVault } from "@/hooks/usePromptVault";
import { PRESET_PACKS } from "@/data/presets";

export function StatsBar() {
  const { characterCount } = useCharacters();
  const { promptCount } = usePromptVault();
  const stats = [
    { label: "Characters", value: characterCount, icon: Users, color: "text-violet-400", bg: "bg-violet-500/10" },
    { label: "Saved Prompts", value: promptCount, icon: BookMarked, color: "text-pink-400", bg: "bg-pink-500/10" },
    { label: "Preset Packs", value: PRESET_PACKS.length, icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Builder Sections", value: 6, icon: Layers, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="rounded-xl border border-border/50 bg-card p-4 flex items-center gap-3">
          <div className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${bg}`}>
            <Icon className={`h-4 w-4 ${color}`} />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-bold text-text-primary leading-none">{value}</p>
            <p className="text-[11px] text-text-faint truncate">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
