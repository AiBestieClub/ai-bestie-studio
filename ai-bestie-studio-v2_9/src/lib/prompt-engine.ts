import type { Character, PromptConfig } from "@/types";

export const NEGATIVE_PRESETS = {
  realism: ["cartoon", "anime", "illustration", "painting", "sketch", "3d render", "cgi", "stylized"],
  hands: ["bad hands", "extra fingers", "missing fingers", "deformed hands", "fused fingers", "mutated hands"],
  text: ["text", "logo", "watermark", "signature", "written text", "captions"],
  artifacts: ["blur", "blurry", "pixelated", "jpeg artifacts", "low quality", "grainy", "noise", "overexposed"],
  plasticSkin: ["plastic skin", "waxy skin", "doll-like", "synthetic skin", "over-smoothed", "mannequin"],
  face: ["bad face", "distorted face", "asymmetrical face", "double face", "floating head"],
  extraLimbs: ["extra limbs", "extra arms", "mutated", "deformed", "malformed", "disfigured"],
} as const;

export type NegativePresetKey = keyof typeof NEGATIVE_PRESETS;

export function buildNegativePrompt(categories: NegativePresetKey[]): string {
  const terms = new Set<string>();
  categories.forEach((key) => NEGATIVE_PRESETS[key].forEach((t) => terms.add(t)));
  return Array.from(terms).join(", ");
}

export function buildCharacterDescription(char: Partial<Character>): string {
  const parts: string[] = [];
  const ageGender = [char.ageRange ? `${char.ageRange} year old` : "", char.gender?.toLowerCase() ?? "woman"].filter(Boolean).join(" ");
  if (char.ethnicity) parts.push(`${char.ethnicity} ${ageGender}`);
  else if (ageGender) parts.push(ageGender);
  if (char.skinTone) parts.push(`${char.skinTone.toLowerCase()} skin`);
  if (char.eyeColor) parts.push(`${char.eyeColor.toLowerCase()} eyes`);
  if (char.hairColor && char.hairStyle) parts.push(`${char.hairColor.toLowerCase()} ${char.hairStyle.toLowerCase()} hair`);
  else if (char.hairStyle) parts.push(`${char.hairStyle.toLowerCase()} hair`);
  if (char.bodyType) parts.push(`${char.bodyType.toLowerCase()} figure`);
  if (char.hasFreckles) parts.push("delicate freckles");
  if (char.hasBeautyMark) parts.push("beauty mark");
  if (char.facialFeatures?.length) parts.push(char.facialFeatures.slice(0, 3).join(", ").toLowerCase());
  return parts.join(", ");
}

export function buildPrompt(config: Partial<PromptConfig>, character?: Partial<Character>): string {
  const segments: string[] = [];

  if (character) {
    const desc = buildCharacterDescription(character);
    if (desc) segments.push(desc);
    if (character.style) segments.push(`${character.style.toLowerCase()} aesthetic`);
    if (character.energy) segments.push(character.energy.toLowerCase());
  }

  if (config.outfit) {
    const parts = [config.outfit];
    if (config.designerBrand) parts.push(`by ${config.designerBrand}`);
    if (config.shoes) parts.push(config.shoes);
    if (config.outfitDetails) parts.push(config.outfitDetails);
    segments.push(parts.join(", "));
  }

  if (config.pose) segments.push(config.pose.toLowerCase());
  if (config.expression) segments.push(config.expression.toLowerCase());

  if (config.location) {
    const parts = [config.location];
    if (config.locationDetails) parts.push(config.locationDetails);
    if (config.timeOfDay) parts.push(config.timeOfDay.toLowerCase());
    if (config.season) parts.push(config.season.toLowerCase());
    segments.push(parts.join(", "));
  }

  if (config.shotType) segments.push(`${config.shotType} shot`);
  if (config.camera) segments.push(`shot on ${config.camera}`);
  if (config.lens) segments.push(`${config.lens} lens`);
  if (config.cameraAngle) segments.push(config.cameraAngle.toLowerCase());
  if (config.lighting) segments.push(`${config.lighting} lighting`);
  if (config.colorGrading) segments.push(config.colorGrading.toLowerCase());
  if (config.mood) segments.push(config.mood.toLowerCase());
  if (config.visualStyle) segments.push(config.visualStyle.toLowerCase());
  if (config.additionalDetails) segments.push(config.additionalDetails);

  segments.push("ultra-realistic, photorealistic, 8K resolution, sharp focus");
  segments.push("detailed skin texture, professional photography, cinematic lighting, editorial quality");

  return segments.filter(Boolean).join(", ");
}

const ENHANCE_POOLS = {
  awards: ["award-winning photography", "Annie Leibovitz", "Peter Lindbergh", "Steven Meisel"],
  publications: ["Vogue editorial", "Harper's Bazaar", "W Magazine", "CR Fashion Book"],
  technical: ["35mm film quality", "medium format", "RAW photography", "tack-sharp focus"],
  skin: ["hyperrealistic skin texture", "natural pores", "healthy skin glow", "flawless yet real complexion"],
  lighting: ["volumetric lighting", "perfect catchlights in eyes", "atmospheric depth"],
  cinematic: ["cinematic color grading", "movie still quality", "masterpiece composition"],
};

export function enhancePrompt(basePrompt: string): string {
  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const additions = [
    pick(ENHANCE_POOLS.awards),
    pick(ENHANCE_POOLS.publications),
    pick(ENHANCE_POOLS.technical),
    pick(ENHANCE_POOLS.skin),
    pick(ENHANCE_POOLS.lighting),
    pick(ENHANCE_POOLS.cinematic),
  ];
  return `${basePrompt}, ${additions.join(", ")}`;
}

export type PromptScore = {
  score: number;
  label: "Basic" | "Good" | "Strong" | "Elite";
  color: string;
  missing: string[];
};

export function scorePrompt(config: Partial<PromptConfig>, hasCharacter: boolean): PromptScore {
  const checks: { key: keyof PromptConfig | "character"; label: string }[] = [
    { key: "character", label: "Character" },
    { key: "outfit", label: "Outfit" },
    { key: "location", label: "Location" },
    { key: "pose", label: "Pose" },
    { key: "lighting", label: "Lighting" },
    { key: "shotType", label: "Shot type" },
    { key: "camera", label: "Camera" },
    { key: "mood", label: "Mood" },
  ];
  const missing: string[] = [];
  let passed = 0;
  for (const check of checks) {
    const has = check.key === "character" ? hasCharacter : Boolean(config[check.key as keyof PromptConfig]);
    if (has) passed++;
    else missing.push(check.label);
  }
  const score = Math.round((passed / checks.length) * 100);
  const label = score < 40 ? "Basic" : score < 65 ? "Good" : score < 85 ? "Strong" : "Elite";
  const color = score < 40 ? "text-red-400" : score < 65 ? "text-amber-400" : score < 85 ? "text-emerald-400" : "text-primary";
  return { score, label, color, missing };
}
