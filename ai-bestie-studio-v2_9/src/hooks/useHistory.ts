"use client";
import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/types";
import type { HistoryEntry } from "@/types";
import { generateId } from "@/lib/utils";

export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>(STORAGE_KEYS.HISTORY, []);

  const addEntry = useCallback((entry: Omit<HistoryEntry, "id" | "createdAt">) => {
    const newEntry: HistoryEntry = { ...entry, id: generateId(), createdAt: new Date().toISOString() };
    setHistory((prev) => [newEntry, ...prev].slice(0, 100));
  }, [setHistory]);

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);
  const deleteEntry = useCallback((id: string) => setHistory((prev) => prev.filter((e) => e.id !== id)), [setHistory]);

  return { history, addEntry, clearHistory, deleteEntry };
}
