import { z } from "zod";

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(60),
  avatarEmoji: z.string().default("✨"),
  gender: z.enum(["Woman", "Man", "Non-Binary", "Other"]).optional(),
  ageRange: z.enum(["18–24", "25–30", "31–35", "36–40", "41–45", "45+"]).optional(),
  ethnicity: z.string().optional(),
  skinTone: z.string().optional(),
  eyeColor: z.string().optional(),
  hairStyle: z.string().optional(),
  hairColor: z.string().optional(),
  bodyType: z.string().optional(),
  facialFeatures: z.array(z.string()).default([]),
  hasFreckles: z.boolean().default(false),
  hasBeautyMark: z.boolean().default(false),
  personality: z.array(z.string()).default([]),
  style: z.string().optional(),
  energy: z.string().optional(),
  niche: z.string().optional(),
  occupation: z.string().optional(),
  notes: z.string().optional(),
  presetId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Character = z.infer<typeof CharacterSchema>;
export type CharacterDraft = Partial<Omit<Character, "id" | "createdAt" | "updatedAt">>;

export const PromptConfigSchema = z.object({
  characterId: z.string().optional(),
  outfit: z.string().optional(),
  outfitDetails: z.string().optional(),
  designerBrand: z.string().optional(),
  shoes: z.string().optional(),
  accessories: z.array(z.string()).default([]),
  location: z.string().optional(),
  locationDetails: z.string().optional(),
  timeOfDay: z.string().optional(),
  season: z.string().optional(),
  pose: z.string().optional(),
  expression: z.string().optional(),
  camera: z.string().optional(),
  lens: z.string().optional(),
  shotType: z.string().optional(),
  cameraAngle: z.string().optional(),
  lighting: z.string().optional(),
  lightingDetails: z.string().optional(),
  colorGrading: z.string().optional(),
  niche: z.string().optional(),
  mood: z.string().optional(),
  visualStyle: z.string().optional(),
  additionalDetails: z.string().optional(),
});
export type PromptConfig = z.infer<typeof PromptConfigSchema>;

export type FieldType = "chips-single" | "chips-multi" | "select" | "input" | "textarea" | "visual-grid";
export type FieldOption = { value: string; label: string; emoji?: string; description?: string; };
export type BuilderFieldConfig = {
  id: string; label: string; hint?: string; type: FieldType;
  options?: FieldOption[]; placeholder?: string; maxSelect?: number;
  configKey: keyof PromptConfig;
};
export type BuilderSectionConfig = {
  id: string; title: string; subtitle?: string; icon: string;
  iconColor: string; defaultOpen?: boolean; fields: BuilderFieldConfig[];
};

export const SavedPromptSchema = z.object({
  id: z.string(),
  title: z.string(),
  prompt: z.string(),
  negativePrompt: z.string().optional(),
  characterId: z.string().optional(),
  config: PromptConfigSchema.optional(),
  tags: z.array(z.string()).default([]),
  collectionId: z.string().optional(),
  isFavorite: z.boolean().default(false),
  useCount: z.number().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type SavedPrompt = z.infer<typeof SavedPromptSchema>;

export const CollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  emoji: z.string().optional(),
  color: z.string().optional(),
  promptIds: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Collection = z.infer<typeof CollectionSchema>;

export const HistoryEntrySchema = z.object({
  id: z.string(),
  type: z.enum(["prompt", "character"]),
  title: z.string(),
  preview: z.string(),
  prompt: z.string().optional(),
  negativePrompt: z.string().optional(),
  characterName: z.string().optional(),
  config: PromptConfigSchema.optional(),
  createdAt: z.string(),
});
export type HistoryEntry = z.infer<typeof HistoryEntrySchema>;

export const AppSettingsSchema = z.object({
  autoEnhance: z.boolean().default(false),
  showNegativePrompt: z.boolean().default(true),
  showWordCount: z.boolean().default(true),
  animationsEnabled: z.boolean().default(true),
  compactMode: z.boolean().default(false),
  defaultNiche: z.string().default(""),
  defaultLighting: z.string().default(""),
  defaultCamera: z.string().default(""),
});
export type AppSettings = z.infer<typeof AppSettingsSchema>;
export const DEFAULT_SETTINGS: AppSettings = {
  autoEnhance: false, showNegativePrompt: true, showWordCount: true,
  animationsEnabled: true, compactMode: false, defaultNiche: "",
  defaultLighting: "", defaultCamera: "",
};

export type PresetPack = {
  id: string; name: string; tagline: string; emoji: string;
  gradient: string; accentColor: string;
  character: CharacterDraft; promptConfig: Partial<PromptConfig>;
  tags: string[]; isNew?: boolean; isTrending?: boolean;
};

export const STORAGE_KEYS = {
  CHARACTERS: "abs_characters",
  SAVED_PROMPTS: "abs_saved_prompts",
  COLLECTIONS: "abs_collections",
  HISTORY: "abs_history",
  SETTINGS: "abs_settings",
} as const;
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

