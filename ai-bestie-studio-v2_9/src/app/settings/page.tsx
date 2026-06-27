"use client";
import { motion } from "framer-motion";
import { Sparkles, Database, Download, Trash2, Monitor, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCharacters } from "@/hooks/useCharacters";
import { usePromptVault } from "@/hooks/usePromptVault";
import { useSettings } from "@/hooks/useSettings";
import { storageClearAll, storageUsage, formatStorageUsage } from "@/lib/storage";
import { toast } from "@/components/ui/toaster";
import { CONTENT_NICHES, LIGHTING, CAMERAS } from "@/data/options";

function Section({ title, icon: Icon, iconColor, children }: { title: string; icon: React.ComponentType<{ className?: string }>; iconColor: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/30">
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-border/30"><Icon className={`h-4 w-4 ${iconColor}`} /></div>
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
      </div>
      <div className="p-5 space-y-5">{children}</div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onCheckedChange }: { label: string; description?: string; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <Label className="text-text-primary text-sm">{label}</Label>
        {description && <p className="text-xs text-text-faint mt-0.5">{description}</p>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export default function SettingsPage() {
  const { characterCount } = useCharacters();
  const { promptCount } = usePromptVault();
  const { settings, updateSetting, resetSettings } = useSettings();
  const usage = storageUsage();
  const usagePct = Math.min((usage / (5 * 1024 * 1024)) * 100, 100);

  const handleClearData = () => {
    if (confirm("Clear ALL data? Characters, prompts, history. Cannot be undone.")) {
      storageClearAll();
      toast({ title: "All data cleared" });
      setTimeout(() => window.location.reload(), 500);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), version: "2.0", settings }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-bestie-studio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Data exported!", variant: "success" });
  };

  return (
    <div className="px-4 lg:px-6 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-faint mt-0.5">Preferences, defaults, and data management</p>
      </div>

      <div className="space-y-4">
        <Section title="Prompt Defaults" icon={Sparkles} iconColor="text-primary">
          <div className="space-y-4">
            <div>
              <Label className="text-text-secondary text-xs mb-2 block">Default Content Niche</Label>
              <Select value={settings.defaultNiche} onValueChange={(v) => updateSetting("defaultNiche", v)}>
                <SelectTrigger><SelectValue placeholder="No default..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No default</SelectItem>
                  {CONTENT_NICHES.map((n) => <SelectItem key={n.value} value={n.value}>{n.emoji} {n.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-text-secondary text-xs mb-2 block">Default Lighting</Label>
              <Select value={settings.defaultLighting} onValueChange={(v) => updateSetting("defaultLighting", v)}>
                <SelectTrigger><SelectValue placeholder="No default..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No default</SelectItem>
                  {LIGHTING.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-text-secondary text-xs mb-2 block">Default Camera</Label>
              <Select value={settings.defaultCamera} onValueChange={(v) => updateSetting("defaultCamera", v)}>
                <SelectTrigger><SelectValue placeholder="No default..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No default</SelectItem>
                  {CAMERAS.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Section>

        <Section title="App Behavior" icon={Monitor} iconColor="text-sky-400">
          <div className="space-y-5 divide-y divide-border/30">
            <ToggleRow label="Auto-Enhance Prompts" description="Automatically add editorial quality modifiers" checked={settings.autoEnhance} onCheckedChange={(v) => updateSetting("autoEnhance", v)} />
            <div className="pt-5"><ToggleRow label="Show Negative Prompt" description="Display negative prompt box by default" checked={settings.showNegativePrompt} onCheckedChange={(v) => updateSetting("showNegativePrompt", v)} /></div>
            <div className="pt-5"><ToggleRow label="Show Word Count" description="Display word count on prompt output" checked={settings.showWordCount} onCheckedChange={(v) => updateSetting("showWordCount", v)} /></div>
            <div className="pt-5"><ToggleRow label="Animations" description="Enable motion and transitions" checked={settings.animationsEnabled} onCheckedChange={(v) => updateSetting("animationsEnabled", v)} /></div>
            <div className="pt-5"><ToggleRow label="Compact Mode" description="Reduce spacing for more content" checked={settings.compactMode} onCheckedChange={(v) => updateSetting("compactMode", v)} /></div>
          </div>
        </Section>

        <Section title="Storage & Data" icon={Database} iconColor="text-emerald-400">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[{ label: "Characters", value: characterCount, color: "text-violet-400" }, { label: "Prompts", value: promptCount, color: "text-pink-400" }, { label: "Storage", value: formatStorageUsage(usage), color: "text-emerald-400" }].map((s) => (
              <div key={s.label} className="rounded-xl bg-border/20 p-3 text-center">
                <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[11px] text-text-faint">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-text-faint mb-1.5">
              <span>Storage Used</span><span>{formatStorageUsage(usage)} / 5 MB</span>
            </div>
            <div className="w-full h-2 bg-border/30 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${usagePct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-full bg-gradient-luxury rounded-full" />
            </div>
            <p className="text-[10px] text-text-faint mt-1">Local browser storage only — no data leaves your device</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" className="gap-2 flex-1" onClick={handleExport}><Download className="h-4 w-4" />Export Data</Button>
            <Button variant="outline" className="gap-2 flex-1 border-destructive/40 text-destructive hover:bg-destructive/10" onClick={handleClearData}><Trash2 className="h-4 w-4" />Clear All Data</Button>
          </div>
        </Section>

        <Section title="About" icon={Info} iconColor="text-text-faint">
          <div className="space-y-3 text-sm">
            {[["App", "AI Bestie Studio™"], ["Version", "2.0.0"], ["Stack", "Next.js 15 + TypeScript"], ["Storage", "Local browser only · No backend"], ["Made by", "AI Bestie Club™"]].map(([label, value], i) => (
              <div key={label} className={`flex justify-between ${i > 0 ? "border-t border-border/30 pt-3" : ""}`}>
                <span className="text-text-muted">{label}</span>
                <span className="text-text-primary font-medium">{value}</span>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={resetSettings} className="text-text-faint w-full mt-2">Reset all settings to defaults</Button>
        </Section>
      </div>
    </div>
  );
}
