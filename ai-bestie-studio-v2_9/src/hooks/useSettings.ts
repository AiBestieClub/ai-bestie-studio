"use client";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS, DEFAULT_SETTINGS } from "@/types";
import type { AppSettings } from "@/types";

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<AppSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };
  const resetSettings = () => setSettings(DEFAULT_SETTINGS);
  return { settings, updateSetting, resetSettings };
}
