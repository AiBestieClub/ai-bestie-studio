"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, Wand2, Sparkles, LayoutGrid, ChevronDown } from "lucide-react";
import { CharacterBuilder } from "@/components/character-builder/CharacterBuilder";
import { PromptBuilder } from "@/components/prompt-builder/PromptBuilder";
import { LivePromptBox } from "@/components/prompt-builder/LivePromptBox";
import { CharacterSelector } from "@/components/prompt-builder/CharacterSelector";
import { BuilderSection } from "@/components/shared/BuilderSection";
import { PRESET_PACKS } from "@/data/presets";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { PromptConfig, Character } from "@/types";

function PresetGrid({ onSelect, activeId }: { onSelect: (id: string) => void; activeId?: string }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? PRESET_PACKS : PRESET_PACKS.slice(0, 5);
  return (
    <div id="presets">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2"><LayoutGrid className="h-4 w-4 text-text-faint" /><p className="section-label">Load a Preset Pack</p></div>
        <button onClick={() => setExpanded(!expanded)} className="text-xs text-text-muted hover:text-primary transition-colors flex items-center gap-1">
          {expanded ? "Show less" : `+${PRESET_PACKS.length - 5} more`}<ChevronDown className={cn("h-3 w-3 transition-transform", expanded && "rotate-180")} />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        <AnimatePresence initial={false}>
          {visible.map((pack, i) => (
            <motion.button key={pack.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.02 }}
              type="button" onClick={() => onSelect(pack.id)}
              className={cn("relative overflow-hidden rounded-xl border p-3 text-left cursor-pointer transition-all duration-200 hover:-translate-y-0.5", `bg-gradient-to-br ${pack.gradient}`,
                activeId === pack.id ? "border-primary/70 shadow-glow-soft" : "border-border/50 hover:border-primary/30")}>
              {activeId === pack.id && <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-primary flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white" /></div>}
              <span className="text-xl block mb-1.5">{pack.emoji}</span>
              <p className="text-[11px] font-bold text-text-primary leading-tight">{pack.name}</p>
              <p className="text-[10px] text-text-faint mt-0.5 line-clamp-1">{pack.tagline}</p>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CreatePageInner() {
  const searchParams = useSearchParams();
  const presetId = searchParams.get("preset");
  const [activeTab, setActiveTab] = useState<"character" | "prompt">("character");
  const [promptConfig, setPromptConfig] = useState<Partial<PromptConfig>>({});
  const [selectedCharacter, setSelectedCharacter] = useState<Partial<Character> | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | undefined>(presetId ?? undefined);

  useEffect(() => {
    if (!presetId) return;
    const preset = PRESET_PACKS.find((p) => p.id === presetId);
    if (preset) {
      setPromptConfig(preset.promptConfig);
      setActivePresetId(presetId);
      toast({ title: `${preset.emoji} ${preset.name} loaded!`, variant: "success" });
    }
  }, [presetId]);

  const handlePresetSelect = (id: string) => {
    const preset = PRESET_PACKS.find((p) => p.id === id);
    if (!preset) return;
    setPromptConfig(preset.promptConfig);
    setActivePresetId(id);
    toast({ title: `${preset.emoji} ${preset.name} loaded!`, variant: "success" });
  };

  const handleReset = () => { setPromptConfig({}); setSelectedCharacter(null); setActivePresetId(undefined); };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-luxury shadow-glow-soft"><Sparkles className="h-4 w-4 text-white" /></div>
          <h1 className="text-xl font-bold text-text-primary">Create</h1>
          {activePresetId && (
            <motion.span initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
              {PRESET_PACKS.find((p) => p.id === activePresetId)?.emoji} {PRESET_PACKS.find((p) => p.id === activePresetId)?.name}
            </motion.span>
          )}
        </div>
        <p className="text-sm text-text-faint ml-11">Build your AI character & generate cinematic prompts</p>
      </motion.div>

      {/* Mobile tabs */}
      <div className="lg:hidden flex rounded-xl border border-border/50 p-1 bg-card mb-5 gap-1">
        {(["character", "prompt"] as const).map((tab) => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)} aria-pressed={activeTab === tab}
            className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === tab ? "bg-gradient-luxury text-white shadow-glow-soft" : "text-text-muted hover:text-text-primary")}>
            {tab === "character" ? <User className="h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
            {tab === "character" ? "Character" : "Prompt"}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className={cn("lg:block", activeTab !== "character" && "hidden")}><CharacterBuilder /></div>
          <div className="hidden lg:block my-6 border-t border-border/30" />
          <div className={cn("lg:block", activeTab !== "prompt" && "hidden lg:block")}><PromptBuilder config={promptConfig} onChange={setPromptConfig} /></div>
        </div>
        <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 space-y-4">
          <BuilderSection title="Use a Character" icon={User} iconColor="text-violet-400" subtitle="Attach a saved character" defaultOpen collapsible>
            <CharacterSelector selectedId={(selectedCharacter as Character)?.id ?? null} onSelect={(char) => setSelectedCharacter(char)} />
          </BuilderSection>
          <div className="lg:sticky lg:top-20">
            <LivePromptBox config={promptConfig} character={selectedCharacter ?? undefined} onReset={handleReset} />
          </div>
        </div>
      </div>
      <div className="mt-8"><PresetGrid onSelect={handlePresetSelect} activeId={activePresetId} /></div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]"><div className="w-10 h-10 rounded-xl bg-gradient-luxury animate-pulse shadow-glow-soft" /></div>}>
      <CreatePageInner />
    </Suspense>
  );
}
