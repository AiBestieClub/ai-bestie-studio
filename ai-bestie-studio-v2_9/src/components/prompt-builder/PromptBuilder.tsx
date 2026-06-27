"use client";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DynamicBuilderSection } from "./DynamicBuilderSection";
import { ALL_BUILDER_SECTIONS } from "@/data/builder-config";
import type { PromptConfig } from "@/types";

interface PromptBuilderProps {
  config: Partial<PromptConfig>;
  onChange: (config: Partial<PromptConfig>) => void;
}

export function PromptBuilder({ config, onChange }: PromptBuilderProps) {
  const handleFieldChange = (key: keyof PromptConfig, value: unknown) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div id="prompt" className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-text-primary">Prompt Builder</h2>
          <p className="text-xs text-text-faint mt-0.5">Each selection updates the prompt in real time</p>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={() => onChange({})} title="Reset all">
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>
      {ALL_BUILDER_SECTIONS.map((section) => (
        <DynamicBuilderSection key={section.id} config={section} promptConfig={config} onChange={handleFieldChange} />
      ))}
    </div>
  );
}
