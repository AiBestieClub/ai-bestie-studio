"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Sparkles, RotateCcw, Save, Check, Wand2, ChevronDown, ChevronUp, Zap, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { usePromptVault } from "@/hooks/usePromptVault";
import { useHistory } from "@/hooks/useHistory";
import { buildPrompt, enhancePrompt, buildNegativePrompt, scorePrompt } from "@/lib/prompt-engine";
import { toast } from "@/components/ui/toaster";
import { cn, countWords } from "@/lib/utils";
import type { PromptConfig, Character } from "@/types";
import type { NegativePresetKey } from "@/lib/prompt-engine";

// Re-export type so NegativePresetKey is used from prompt-engine
const NEG_PRESETS: { key: NegativePresetKey; label: string }[] = [
  { key: "realism",     label: "No Cartoon"  },
  { key: "hands",       label: "Fix Hands"   },
  { key: "artifacts",   label: "No Artifacts"},
  { key: "text",        label: "No Text"     },
  { key: "plasticSkin", label: "Real Skin"   },
  { key: "face",        label: "Fix Face"    },
];

interface LivePromptBoxProps {
  config: Partial<PromptConfig>;
  character?: Partial<Character>;
  onReset?: () => void;
}

export function LivePromptBox({ config, character, onReset }: LivePromptBoxProps) {
  const { savePrompt } = usePromptVault();
  const { addEntry } = useHistory();

  const [prompt, setPrompt] = useState("");
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [showNegative, setShowNegative] = useState(true);
  const [activeNegs, setActiveNegs] = useState<NegativePresetKey[]>(["realism", "hands", "artifacts", "text", "plasticSkin"]);
  const [negPrompt, setNegPrompt] = useState("");
  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedNeg, setCopiedNeg] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");

  useEffect(() => {
    setPrompt(buildPrompt(config, character));
    setIsEnhanced(false);
  }, [config, character]);

  useEffect(() => {
    setNegPrompt(buildNegativePrompt(activeNegs));
  }, [activeNegs]);

  const toggleNeg = (key: NegativePresetKey) => {
    setActiveNegs((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  const handleEnhance = useCallback(() => {
    if (!prompt.trim()) return;
    setPrompt(enhancePrompt(prompt));
    setIsEnhanced(true);
    toast({ title: "Prompt enhanced ✨", description: "Added editorial quality modifiers.", variant: "success" });
  }, [prompt]);

  const handleCopy = useCallback((text: string, which: "main" | "neg") => {
    navigator.clipboard.writeText(text);
    if (which === "main") { setCopiedMain(true); setTimeout(() => setCopiedMain(false), 2000); }
    else { setCopiedNeg(true); setTimeout(() => setCopiedNeg(false), 2000); }
    toast({ title: "Copied!", variant: "success" });
  }, []);

  const doSave = useCallback((title: string) => {
    const autoTitle = () => {
      if (character?.name) return `${character.name} — ${config.location ?? "Custom"}`;
      if (config.outfit) return `${config.outfit} — ${config.location ?? "Custom"}`;
      return `Prompt — ${new Date().toLocaleDateString()}`;
    };
    const resolvedTitle = title || autoTitle();
    const tags = [config.niche, config.lighting, config.location].filter(Boolean) as string[];
    savePrompt({ title: resolvedTitle, prompt, negativePrompt: negPrompt, config, characterId: (character as Character)?.id, tags, isFavorite: false });
    addEntry({ type: "prompt", title: resolvedTitle, preview: prompt.slice(0, 120), characterName: character?.name, prompt, negativePrompt: negPrompt, config });
    setSavedFlash(true);
    setShowSaveForm(false);
    setSaveTitle("");
    setTimeout(() => setSavedFlash(false), 2500);
    toast({ title: "Saved to Vault! 📁", variant: "success" });
  }, [prompt, negPrompt, config, character, savePrompt, addEntry]);

  const handleSave = () => {
    if (!prompt.trim()) { toast({ title: "Nothing to save", variant: "error" }); return; }
    if (!showSaveForm) { setShowSaveForm(true); return; }
    doSave(saveTitle);
  };

  const handleReset = () => {
    setPrompt(""); setIsEnhanced(false); setShowSaveForm(false); setSaveTitle("");
    onReset?.();
    toast({ title: "Reset", variant: "default" });
  };

  const score = scorePrompt(config, Boolean(character));
  const words = countWords(prompt);

  return (
    <div id="enhance" className="space-y-4">
      {/* Score */}
      <AnimatePresence>
        {prompt && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border/40 bg-card">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-20 h-1.5 bg-border/30 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${score.score}%` }} transition={{ duration: 0.6, ease: "easeOut" }} className="h-full bg-gradient-luxury rounded-full" />
              </div>
              <span className={cn("text-xs font-bold", score.color)}>{score.label}</span>
              <span className="text-[10px] text-text-faint">{score.score}/100</span>
            </div>
            {score.missing.length > 0 && (
              <div className="hidden sm:flex items-center gap-1">
                <Info className="h-3 w-3 text-text-faint" />
                <span className="text-[10px] text-text-faint truncate max-w-[160px]">Add: {score.missing.slice(0, 3).join(", ")}</span>
              </div>
            )}
            <span className="text-[10px] text-text-faint shrink-0">{words}w</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main prompt */}
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-text-primary">Generated Prompt</span>
            {isEnhanced && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold flex items-center gap-1">
                <Zap className="h-2.5 w-2.5" />Enhanced
              </span>
            )}
          </div>
          {words > 0 && <span className="text-[10px] text-text-faint">{words} words</span>}
        </div>
        <div className="p-4">
          <Textarea value={prompt} onChange={(e) => { setPrompt(e.target.value); setIsEnhanced(false); }}
            placeholder="Select options above to generate your cinematic prompt. Each choice adds to the output in real time..."
            className="min-h-[160px] text-sm leading-relaxed font-mono resize-none border-0 bg-transparent p-0 focus:ring-0 text-text-secondary" />
        </div>
        <AnimatePresence>
          {showSaveForm && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-border/30 overflow-hidden">
              <div className="p-4 flex gap-2">
                <Input autoFocus value={saveTitle} onChange={(e) => setSaveTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") doSave(saveTitle); if (e.key === "Escape") setShowSaveForm(false); }}
                  placeholder="Name this prompt..." className="flex-1 h-9" />
                <Button size="sm" onClick={() => doSave(saveTitle)}>Save</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowSaveForm(false)}>Cancel</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="border-t border-border/30 px-4 py-3 flex flex-wrap gap-2">
          <Button size="sm" onClick={handleEnhance} disabled={!prompt.trim()} className="gap-1.5"><Sparkles className="h-3.5 w-3.5" />Enhance</Button>
          <Button size="sm" variant="secondary" onClick={() => handleCopy(prompt, "main")} disabled={!prompt.trim()} className="gap-1.5">
            {copiedMain ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedMain ? "Copied!" : "Copy"}
          </Button>
          <Button size="sm" variant={savedFlash ? "gradient" : "secondary"} onClick={handleSave} disabled={!prompt.trim()} className="gap-1.5">
            {savedFlash ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            {savedFlash ? "Saved!" : "Save"}
          </Button>
          <Button size="sm" variant="ghost" onClick={handleReset} className="gap-1.5 text-text-faint ml-auto"><RotateCcw className="h-3.5 w-3.5" />Reset</Button>
        </div>
      </div>

      {/* Negative prompt */}
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <button type="button" onClick={() => setShowNegative((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-card-hover transition-colors">
          <span className="text-sm font-semibold text-text-primary">Negative Prompt</span>
          <div className="flex items-center gap-2 text-text-faint">
            <span className="text-[10px]">Exclude from image</span>
            {showNegative ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>
        <AnimatePresence>
          {showNegative && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="px-4 pb-4 border-t border-border/30">
                <div className="flex flex-wrap gap-1.5 pt-3 pb-3">
                  {NEG_PRESETS.map(({ key, label }) => (
                    <button key={key} type="button" onClick={() => toggleNeg(key)}
                      className={cn("px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all",
                        activeNegs.includes(key) ? "bg-border/40 border-border-bright text-text-primary" : "bg-card border-border/30 text-text-faint hover:border-border")}>
                      {label}
                    </button>
                  ))}
                </div>
                <Textarea value={negPrompt} onChange={(e) => setNegPrompt(e.target.value)} className="min-h-[80px] text-[11px] font-mono text-text-muted" />
                <div className="flex justify-end mt-2">
                  <Button size="sm" variant="secondary" onClick={() => handleCopy(negPrompt, "neg")} className="gap-1.5 text-xs">
                    {copiedNeg ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    {copiedNeg ? "Copied!" : "Copy Negative"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
