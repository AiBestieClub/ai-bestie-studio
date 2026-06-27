import type { BuilderSectionConfig } from "@/types";
import {
  OUTFIT_TYPES, DESIGNER_BRANDS, LOCATIONS, POSES, CAMERAS, LENSES,
  SHOT_TYPES, LIGHTING, CAMERA_ANGLES, CONTENT_NICHES, MOODS,
  TIME_OF_DAY, SEASONS, EXPRESSIONS, VISUAL_STYLES, COLOR_GRADINGS,
} from "./options";

export const OUTFIT_SECTION: BuilderSectionConfig = {
  id: "outfit", title: "Outfit", subtitle: "Clothing, designer, accessories",
  icon: "Shirt", iconColor: "text-pink-400", defaultOpen: true,
  fields: [
    { id: "outfit", label: "Outfit Type", type: "chips-single", options: OUTFIT_TYPES, configKey: "outfit" },
    { id: "designerBrand", label: "Designer Brand", type: "select", options: DESIGNER_BRANDS, configKey: "designerBrand", placeholder: "Select designer..." },
    { id: "shoes", label: "Shoes", type: "input", configKey: "shoes", placeholder: "e.g. strappy heels, white sneakers, pointed mules..." },
    { id: "outfitDetails", label: "Additional Details", type: "input", configKey: "outfitDetails", placeholder: "e.g. gold chain, belt, silk scarf..." },
  ],
};

export const LOCATION_SECTION: BuilderSectionConfig = {
  id: "location", title: "Location", subtitle: "Where is the shot set?",
  icon: "MapPin", iconColor: "text-emerald-400", defaultOpen: true,
  fields: [
    { id: "location", label: "Location", type: "chips-single", options: LOCATIONS, configKey: "location" },
    { id: "locationDetails", label: "Location Details", type: "input", configKey: "locationDetails", placeholder: "e.g. marble floors, rooftop at sunset, rose gold accents..." },
    { id: "timeOfDay", label: "Time of Day", type: "chips-single", options: TIME_OF_DAY, configKey: "timeOfDay" },
    { id: "season", label: "Season", type: "chips-single", options: SEASONS, configKey: "season" },
  ],
};

export const POSE_SECTION: BuilderSectionConfig = {
  id: "pose", title: "Pose & Expression", subtitle: "What is the character doing?",
  icon: "User", iconColor: "text-violet-400", defaultOpen: true,
  fields: [
    { id: "pose", label: "Pose / Action", type: "chips-single", options: POSES, configKey: "pose" },
    { id: "expression", label: "Expression", type: "chips-single", options: EXPRESSIONS, configKey: "expression" },
  ],
};

export const CAMERA_SECTION: BuilderSectionConfig = {
  id: "camera", title: "Camera & Shot", subtitle: "Lens, shot type, angle",
  icon: "Camera", iconColor: "text-sky-400", defaultOpen: true,
  fields: [
    { id: "shotType", label: "Shot Type", type: "chips-single", options: SHOT_TYPES, configKey: "shotType" },
    { id: "camera", label: "Camera", type: "select", options: CAMERAS, configKey: "camera", placeholder: "Select camera..." },
    { id: "lens", label: "Lens", type: "select", options: LENSES, configKey: "lens", placeholder: "Select lens..." },
    { id: "cameraAngle", label: "Camera Angle", type: "chips-single", options: CAMERA_ANGLES, configKey: "cameraAngle" },
  ],
};

export const LIGHTING_SECTION: BuilderSectionConfig = {
  id: "lighting", title: "Lighting", subtitle: "Set the mood with light",
  icon: "Sun", iconColor: "text-amber-400", defaultOpen: true,
  fields: [
    { id: "lighting", label: "Lighting Style", type: "visual-grid", options: LIGHTING, configKey: "lighting" },
    { id: "colorGrading", label: "Color Grading", type: "chips-single", options: COLOR_GRADINGS, configKey: "colorGrading" },
  ],
};

export const MOOD_SECTION: BuilderSectionConfig = {
  id: "mood", title: "Mood & Creative", subtitle: "Emotional tone and visual style",
  icon: "Palette", iconColor: "text-fuchsia-400", defaultOpen: false,
  fields: [
    { id: "mood", label: "Mood", type: "chips-single", options: MOODS, configKey: "mood" },
    { id: "visualStyle", label: "Visual Style", type: "chips-single", options: VISUAL_STYLES, configKey: "visualStyle" },
    { id: "niche", label: "Content Niche", type: "chips-single", options: CONTENT_NICHES, configKey: "niche" },
    { id: "additionalDetails", label: "Additional Details", type: "input", configKey: "additionalDetails", placeholder: "Any other specific details to include..." },
  ],
};

export const ALL_BUILDER_SECTIONS = [
  OUTFIT_SECTION, LOCATION_SECTION, POSE_SECTION,
  CAMERA_SECTION, LIGHTING_SECTION, MOOD_SECTION,
];
