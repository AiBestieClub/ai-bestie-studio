"use client";
import { User, UserPlus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCharacters } from "@/hooks/useCharacters";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Character } from "@/types";

interface CharacterSelectorProps {
  selectedId: string | null;
  onSelect: (character: Character | null) => void;
}

export function CharacterSelector({ selectedId, onSelect }: CharacterSelectorProps) {
  const { characters } = useCharacters();

  return (
    <div className="space-y-2">
      {characters.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/50 p-4 text-center">
          <User className="h-6 w-6 text-text-faint mx-auto mb-2" />
          <p className="text-xs text-text-faint mb-2">No characters saved yet</p>
          <Link href="/create#character">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs"><UserPlus className="h-3 w-3" />Build Character</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button type="button" onClick={() => onSelect(null)}
            className={cn("flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-150",
              !selectedId ? "border-primary/60 bg-primary/10" : "border-border/40 bg-border/10 hover:bg-border/25")}>
            <div className="w-8 h-8 rounded-full bg-border/40 flex items-center justify-center">
              {!selectedId ? <Check className="h-3.5 w-3.5 text-primary" /> : <span className="text-[10px] text-text-faint">–</span>}
            </div>
            <span className="text-[11px] text-text-muted">None</span>
          </button>
          {characters.map((char) => (
            <button key={char.id} type="button" onClick={() => onSelect(char.id === selectedId ? null : char)}
              className={cn("flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-150",
                selectedId === char.id ? "border-primary/60 bg-primary/10" : "border-border/40 bg-border/10 hover:bg-border/25")}>
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-pink-accent/10 flex items-center justify-center border border-border/40 text-xl">
                {char.avatarEmoji ?? "✨"}
                {selectedId === char.id && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-[11px] font-semibold text-text-primary truncate max-w-[80px]">{char.name}</p>
                {char.niche && <p className="text-[10px] text-text-faint truncate max-w-[80px]">{char.niche}</p>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
