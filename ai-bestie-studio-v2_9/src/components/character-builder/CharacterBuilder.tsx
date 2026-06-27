"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Sparkles, Shirt, Briefcase, Save, RotateCcw, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldRow } from "@/components/shared/BuilderSection";
import { ChipGroup, SingleChipGroup } from "@/components/shared/SelectionChip";
import { useCharacters } from "@/hooks/useCharacters";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { CharacterDraft, Character } from "@/types";
import {
  GENDERS, AGE_RANGES, ETHNICITIES, SKIN_TONES, EYE_COLORS,
  HAIR_STYLES, HAIR_COLORS, BODY_TYPES, FACIAL_FEATURES,
  PERSONALITY_TRAITS, STYLES, ENERGY_TYPES, CONTENT_NICHES, SKIN_TONE_COLORS,
} from "@/data/options";

// ─── Types ────────────────────────────────────────────────

type Draft = CharacterDraft & { name: string };

// Single explicit update function type used everywhere
type UpdateFn = (key: keyof Draft, value: Draft[keyof Draft]) => void;

const STEPS = [
  { id: "identity", label: "Identity", icon: User,      color: "text-violet-400" },
  { id: "physical", label: "Physical", icon: Sparkles,  color: "text-pink-400"   },
  { id: "style",    label: "Style",    icon: Shirt,     color: "text-amber-400"  },
  { id: "brand",    label: "Brand",    icon: Briefcase, color: "text-emerald-400" },
];

const AVATAR_EMOJIS = ["✨", "👑", "💎", "🌸", "🔥", "💜", "⚡", "🌙", "🦋", "💫", "🎯", "🌺"];

const DEFAULT_DRAFT: Draft = {
  name: "", avatarEmoji: "✨", gender: undefined, ageRange: undefined,
  ethnicity: undefined, skinTone: undefined, eyeColor: undefined,
  hairStyle: undefined, hairColor: undefined, bodyType: undefined,
  facialFeatures: [], personality: [], hasFreckles: false, hasBeautyMark: false,
  style: undefined, energy: undefined, niche: undefined, occupation: "", notes: "",
};

// ─── Preview ──────────────────────────────────────────────

function CharacterPreview({ draft }: { draft: Draft }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/8 to-pink-accent/5 p-4 sticky top-20">
      <p className="section-label mb-3">Live Preview</p>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-luxury flex items-center justify-center text-2xl shadow-glow-soft shrink-0">
          {draft.avatarEmoji}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-text-primary text-sm truncate">{draft.name || "New Character"}</p>
          {draft.ethnicity && <p className="text-xs text-text-secondary truncate">{draft.ethnicity}</p>}
          {draft.ageRange && <p className="text-xs text-text-faint">{draft.ageRange} yrs</p>}
        </div>
      </div>
      {draft.personality && draft.personality.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {draft.personality.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">{t}</span>
          ))}
        </div>
      )}
      <div className="space-y-1.5 text-xs">
        {draft.skinTone && <div className="flex justify-between"><span className="text-text-faint">Skin</span><span className="text-text-secondary font-medium">{draft.skinTone}</span></div>}
        {draft.hairStyle && draft.hairColor && <div className="flex justify-between"><span className="text-text-faint">Hair</span><span className="text-text-secondary font-medium">{draft.hairColor} {draft.hairStyle}</span></div>}
        {draft.style && <div className="flex justify-between"><span className="text-text-faint">Style</span><span className="text-text-secondary font-medium truncate max-w-[120px]">{draft.style}</span></div>}
        {draft.niche && <div className="flex justify-between"><span className="text-text-faint">Niche</span><span className="text-text-secondary font-medium">{draft.niche}</span></div>}
      </div>
      {!draft.name && !draft.ethnicity && !draft.style && (
        <p className="text-xs text-text-faint text-center mt-2">Fill in details to see preview</p>
      )}
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────

function StepIdentity({ draft, update }: { draft: Draft; update: UpdateFn }) {
  return (
    <div className="space-y-5">
      <FieldRow label="Avatar Emoji">
        <div className="flex flex-wrap gap-2">
          {AVATAR_EMOJIS.map((emoji) => (
            <button key={emoji} type="button" onClick={() => update("avatarEmoji", emoji)}
              className={cn("w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all",
                draft.avatarEmoji === emoji ? "border-primary/60 bg-primary/15 shadow-glow-soft" : "border-border/40 bg-card hover:border-primary/30")}>
              {emoji}
            </button>
          ))}
        </div>
      </FieldRow>
      <FieldRow label="Character Name *">
        <Input placeholder="e.g. Lexi London, Nova Vale, Zara Flux..." value={draft.name} onChange={(e) => update("name", e.target.value)} autoFocus />
      </FieldRow>
      <FieldRow label="Gender">
        <SingleChipGroup options={GENDERS} value={draft.gender ?? ""} onChange={(v) => update("gender", v || undefined)} />
      </FieldRow>
      <FieldRow label="Age Range">
        <SingleChipGroup options={AGE_RANGES} value={draft.ageRange ?? ""} onChange={(v) => update("ageRange", v || undefined)} />
      </FieldRow>
      <FieldRow label="Ethnicity">
        <Select value={draft.ethnicity ?? ""} onValueChange={(v) => update("ethnicity", v || undefined)}>
          <SelectTrigger><SelectValue placeholder="Select ethnicity..." /></SelectTrigger>
          <SelectContent>{ETHNICITIES.map((e) => <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>)}</SelectContent>
        </Select>
      </FieldRow>
    </div>
  );
}

function StepPhysical({ draft, update }: { draft: Draft; update: UpdateFn }) {
  return (
    <div className="space-y-5">
      <FieldRow label="Skin Tone">
        <div className="grid grid-cols-2 gap-2">
          {SKIN_TONES.map((tone) => (
            <button key={tone.value} type="button"
              onClick={() => update("skinTone", tone.value === draft.skinTone ? undefined : tone.value)}
              className={cn("flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all",
                draft.skinTone === tone.value ? "border-primary/60 bg-primary/10 text-text-primary" : "border-border/40 bg-card hover:bg-card-hover text-text-secondary")}>
              <div className="w-5 h-5 rounded-full shrink-0 border border-border/30" style={{ background: SKIN_TONE_COLORS[tone.value] ?? "#a0785a" }} />
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{tone.label}</p>
                {tone.description && <p className="text-[10px] text-text-faint truncate">{tone.description}</p>}
              </div>
            </button>
          ))}
        </div>
      </FieldRow>
      <FieldRow label="Eye Color">
        <SingleChipGroup options={EYE_COLORS} value={draft.eyeColor ?? ""} onChange={(v) => update("eyeColor", v || undefined)} />
      </FieldRow>
      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Hair Style">
          <Select value={draft.hairStyle ?? ""} onValueChange={(v) => update("hairStyle", v || undefined)}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>{HAIR_STYLES.map((h) => <SelectItem key={h.value} value={h.value}>{h.label}</SelectItem>)}</SelectContent>
          </Select>
        </FieldRow>
        <FieldRow label="Hair Color">
          <Select value={draft.hairColor ?? ""} onValueChange={(v) => update("hairColor", v || undefined)}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>{HAIR_COLORS.map((h) => <SelectItem key={h.value} value={h.value}>{h.label}</SelectItem>)}</SelectContent>
          </Select>
        </FieldRow>
      </div>
      <FieldRow label="Body Type">
        <SingleChipGroup options={BODY_TYPES} value={draft.bodyType ?? ""} onChange={(v) => update("bodyType", v || undefined)} />
      </FieldRow>
      <FieldRow label="Facial Features" hint="Select all that apply">
        <ChipGroup
          options={FACIAL_FEATURES.map((f) => ({ value: f, label: f }))}
          value={draft.facialFeatures ?? []}
          onChange={(v) => update("facialFeatures", v)}
        />
      </FieldRow>
      <div className="flex gap-3">
        {[
          { key: "hasFreckles" as const, label: "✨ Freckles" },
          { key: "hasBeautyMark" as const, label: "💋 Beauty Mark" },
        ].map(({ key, label }) => (
          <button key={key} type="button" onClick={() => update(key, !draft[key])}
            className={cn("flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all",
              draft[key] ? "border-primary/60 bg-primary/15 text-text-primary" : "border-border/40 bg-card text-text-muted hover:bg-card-hover")}>
            {draft[key] && <Check className="h-3 w-3 text-primary" />}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepStyle({ draft, update }: { draft: Draft; update: UpdateFn }) {
  return (
    <div className="space-y-5">
      <FieldRow label="Personality Traits" hint="Pick up to 5">
        <ChipGroup
          options={PERSONALITY_TRAITS.map((t) => ({ value: t, label: t }))}
          value={draft.personality ?? []}
          onChange={(v) => update("personality", v)}
          maxSelect={5}
        />
      </FieldRow>
      <FieldRow label="Visual Style">
        <Select value={draft.style ?? ""} onValueChange={(v) => update("style", v || undefined)}>
          <SelectTrigger><SelectValue placeholder="Select style..." /></SelectTrigger>
          <SelectContent>{STYLES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
        </Select>
      </FieldRow>
      <FieldRow label="Energy">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ENERGY_TYPES.map((e) => (
            <button key={e.value} type="button"
              onClick={() => update("energy", e.value === draft.energy ? undefined : e.value)}
              className={cn("p-3 rounded-xl border text-left text-xs font-medium transition-all",
                draft.energy === e.value ? "border-primary/60 bg-primary/10 text-text-primary" : "border-border/40 bg-card text-text-secondary hover:bg-card-hover")}>
              {e.label}
            </button>
          ))}
        </div>
      </FieldRow>
    </div>
  );
}

function StepBrand({ draft, update }: { draft: Draft; update: UpdateFn }) {
  return (
    <div className="space-y-5">
      <FieldRow label="Content Niche">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CONTENT_NICHES.map((n) => (
            <button key={n.value} type="button"
              onClick={() => update("niche", n.value === draft.niche ? undefined : n.value)}
              className={cn("flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-medium transition-all",
                draft.niche === n.value ? "border-primary/60 bg-primary/10 text-text-primary" : "border-border/40 bg-card text-text-secondary hover:bg-card-hover")}>
              {n.emoji && <span className="text-base">{n.emoji}</span>}
              <span className="truncate">{n.label}</span>
            </button>
          ))}
        </div>
      </FieldRow>
      <FieldRow label="Occupation">
        <Input placeholder="e.g. Entrepreneur, Model, Content Creator..." value={draft.occupation ?? ""} onChange={(e) => update("occupation", e.target.value)} />
      </FieldRow>
      <FieldRow label="Notes / Backstory">
        <Textarea
          placeholder="She runs a luxury boutique, travels to Dubai and Paris, always has a designer bag..."
          value={draft.notes ?? ""}
          onChange={(e) => update("notes", e.target.value)}
          className="min-h-[90px]"
        />
      </FieldRow>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────

interface CharacterBuilderProps {
  initialDraft?: Partial<Character>;
  onSaved?: (character: Character) => void;
}

export function CharacterBuilder({ initialDraft, onSaved }: CharacterBuilderProps) {
  const { saveCharacter } = useCharacters();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({ ...DEFAULT_DRAFT, ...initialDraft, name: initialDraft?.name ?? "" });
  const [saved, setSaved] = useState(false);

  const update = useCallback<UpdateFn>((key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }, []);

  const handleSave = () => {
    if (!draft.name.trim()) {
      toast({ title: "Name required", description: "Give your character a name first.", variant: "error" });
      setStep(0);
      return;
    }
    const char = saveCharacter(draft);
    setSaved(true);
    toast({ title: `${draft.name} saved! ✨`, description: "Ready to use in the prompt builder.", variant: "success" });
    onSaved?.(char);
  };

  const completionPct = Math.round(
    (Object.entries(draft).filter(([, v]) =>
      v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0) && v !== false
    ).length / Object.keys(draft).length) * 100
  );

  const stepPanels = [
    <StepIdentity key="identity" draft={draft} update={update} />,
    <StepPhysical key="physical" draft={draft} update={update} />,
    <StepStyle    key="style"    draft={draft} update={update} />,
    <StepBrand    key="brand"    draft={draft} update={update} />,
  ];

  return (
    <div id="character" className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-text-primary">AI Character Builder™</h2>
          <p className="text-xs text-text-faint mt-0.5">Build a reusable AI identity</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-20 h-1.5 bg-border/30 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-luxury rounded-full transition-all duration-500" style={{ width: `${completionPct}%` }} />
            </div>
            <span className="text-[10px] text-text-faint">{completionPct}%</span>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={() => { setDraft(DEFAULT_DRAFT); setStep(0); setSaved(false); }} title="Reset">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Step tabs */}
      <div className="flex gap-1 rounded-xl border border-border/40 p-1 bg-card">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === i;
          const isDone = i < step;
          return (
            <button key={s.id} type="button" onClick={() => setStep(i)}
              className={cn("flex-1 flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-medium transition-all duration-200",
                isActive ? "bg-gradient-luxury text-white shadow-glow-soft" : isDone ? "text-emerald-400 hover:bg-card-hover" : "text-text-faint hover:text-text-muted hover:bg-card-hover")}>
              {isDone ? <Check className="h-3.5 w-3.5" /> : <Icon className={cn("h-3.5 w-3.5", !isActive && s.color)} />}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-4">
        <div className="rounded-2xl border border-border/50 bg-card p-5">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
              <div className="flex items-center gap-2 mb-5">
                {(() => { const Icon = STEPS[step].icon; return <Icon className={cn("h-4 w-4", STEPS[step].color)} />; })()}
                <h3 className="text-sm font-semibold text-text-primary">{STEPS[step].label}</h3>
              </div>
              {stepPanels[step]}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="hidden xl:block"><CharacterPreview draft={draft} /></div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="gap-1.5">
          <ChevronLeft className="h-3.5 w-3.5" />Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button size="sm" onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} className="gap-1.5">
            Next<ChevronRight className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button size="sm" onClick={handleSave} className={cn("gap-1.5", saved && "bg-emerald-600 hover:bg-emerald-700")}>
            {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
            {saved ? "Saved!" : "Save Character"}
          </Button>
        )}
      </div>
    </div>
  );
}
