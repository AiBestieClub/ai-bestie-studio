"use client";
import { useState, useEffect, useCallback } from "react";
import type { StorageKey } from "@/types";
import { storageGet, storageSet } from "@/lib/storage";

export function useLocalStorage<T>(key: StorageKey, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const stored = storageGet<T>(key);
    return stored !== null ? stored : defaultValue;
  });

  useEffect(() => {
    const stored = storageGet<T>(key);
    if (stored !== null) setStoredValue(stored);
  }, [key]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const next = typeof value === "function" ? (value as (p: T) => T)(prev) : value;
      storageSet(key, next);
      return next;
    });
  }, [key]);

  return [storedValue, setValue];
}
