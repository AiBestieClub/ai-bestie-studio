"use client";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/types";
import type { Character, CharacterDraft } from "@/types";
import { generateId } from "@/lib/utils";

export function useCharacters() {
  const [characters, setCharacters] = useLocalStorage<Character[]>(STORAGE_KEYS.CHARACTERS, []);

  const saveCharacter = useCallback((draft: CharacterDraft & { name: string }): Character => {
    const now = new Date().toISOString();
    const char: Character = {
      id: generateId(), createdAt: now, updatedAt: now,
      name: draft.name, avatarEmoji: draft.avatarEmoji ?? "✨",
      facialFeatures: draft.facialFeatures ?? [],
      personality: draft.personality ?? [],
      hasFreckles: draft.hasFreckles ?? false,
      hasBeautyMark: draft.hasBeautyMark ?? false,
      gender: draft.gender, ageRange: draft.ageRange, ethnicity: draft.ethnicity,
      skinTone: draft.skinTone, eyeColor: draft.eyeColor, hairStyle: draft.hairStyle,
      hairColor: draft.hairColor, bodyType: draft.bodyType, style: draft.style,
      energy: draft.energy, niche: draft.niche, occupation: draft.occupation,
      notes: draft.notes, presetId: draft.presetId,
    };
    setCharacters((prev) => [char, ...prev]);
    return char;
  }, [setCharacters]);

  const updateCharacter = useCallback((id: string, updates: Partial<CharacterDraft>) => {
    setCharacters((prev) => prev.map((c) =>
      c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
    ));
  }, [setCharacters]);

  const deleteCharacter = useCallback((id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  }, [setCharacters]);

  const duplicateCharacter = useCallback((id: string): Character | null => {
    const original = characters.find((c) => c.id === id);
    if (!original) return null;
    const now = new Date().toISOString();
    const copy: Character = { ...original, id: generateId(), name: `${original.name} (Copy)`, createdAt: now, updatedAt: now };
    setCharacters((prev) => [copy, ...prev]);
    return copy;
  }, [characters, setCharacters]);

  const getCharacterById = useCallback((id: string) => characters.find((c) => c.id === id), [characters]);

  return { characters, saveCharacter, updateCharacter, deleteCharacter, duplicateCharacter, getCharacterById, characterCount: characters.length };
}
