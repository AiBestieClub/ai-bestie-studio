"use client";
import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/types";
import type { SavedPrompt, Collection } from "@/types";
import { generateId } from "@/lib/utils";

export function usePromptVault() {
  const [savedPrompts, setSavedPrompts] = useLocalStorage<SavedPrompt[]>(STORAGE_KEYS.SAVED_PROMPTS, []);
  const [collections, setCollections] = useLocalStorage<Collection[]>(STORAGE_KEYS.COLLECTIONS, []);

  const savePrompt = useCallback((data: Omit<SavedPrompt, "id" | "createdAt" | "updatedAt" | "useCount">): SavedPrompt => {
    const now = new Date().toISOString();
    const prompt: SavedPrompt = { ...data, id: generateId(), useCount: 0, createdAt: now, updatedAt: now };
    setSavedPrompts((prev) => [prompt, ...prev]);
    return prompt;
  }, [setSavedPrompts]);

  const deletePrompt = useCallback((id: string) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id));
    setCollections((prev) => prev.map((c) => ({ ...c, promptIds: c.promptIds.filter((pid) => pid !== id) })));
  }, [setSavedPrompts, setCollections]);

  const toggleFavorite = useCallback((id: string) => {
    setSavedPrompts((prev) => prev.map((p) => p.id === id ? { ...p, isFavorite: !p.isFavorite, updatedAt: new Date().toISOString() } : p));
  }, [setSavedPrompts]);

  const duplicatePrompt = useCallback((id: string) => {
    const original = savedPrompts.find((p) => p.id === id);
    if (!original) return null;
    const now = new Date().toISOString();
    const copy: SavedPrompt = { ...original, id: generateId(), title: `${original.title} (Copy)`, useCount: 0, createdAt: now, updatedAt: now };
    setSavedPrompts((prev) => [copy, ...prev]);
    return copy;
  }, [savedPrompts, setSavedPrompts]);

  const createCollection = useCallback((name: string, emoji?: string): Collection => {
    const now = new Date().toISOString();
    const col: Collection = { id: generateId(), name, emoji, promptIds: [], createdAt: now, updatedAt: now };
    setCollections((prev) => [...prev, col]);
    return col;
  }, [setCollections]);

  const deleteCollection = useCallback((id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  }, [setCollections]);

  const searchPrompts = useCallback((query: string) => {
    const q = query.toLowerCase();
    return savedPrompts.filter((p) => p.title.toLowerCase().includes(q) || p.prompt.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)));
  }, [savedPrompts]);

  const getFavorites = useCallback(() => savedPrompts.filter((p) => p.isFavorite), [savedPrompts]);

  const stats = useMemo(() => ({
    total: savedPrompts.length,
    favorites: savedPrompts.filter((p) => p.isFavorite).length,
    collections: collections.length,
  }), [savedPrompts, collections]);

  return {
    savedPrompts, collections, savePrompt, deletePrompt, toggleFavorite,
    duplicatePrompt, createCollection, deleteCollection, searchPrompts,
    getFavorites, stats, promptCount: savedPrompts.length,
  };
}
