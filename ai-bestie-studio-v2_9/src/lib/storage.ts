import { STORAGE_KEYS, type StorageKey } from "@/types";

const isBrowser = typeof window !== "undefined";

export function storageGet<T>(key: StorageKey): T | null {
  if (!isBrowser) return null;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch { return null; }
}

export function storageSet<T>(key: StorageKey, value: T): boolean {
  if (!isBrowser) return false;
  try { window.localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}

export function storageClearAll(): void {
  if (!isBrowser) return;
  Object.values(STORAGE_KEYS).forEach((k) => { try { window.localStorage.removeItem(k); } catch {} });
}

export function storageUsage(): number {
  if (!isBrowser) return 0;
  return Object.values(STORAGE_KEYS).reduce((total, k) => {
    const item = window.localStorage.getItem(k);
    return total + (item ? item.length * 2 : 0);
  }, 0);
}

export function formatStorageUsage(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}
