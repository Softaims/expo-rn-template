import { createMMKV } from "react-native-mmkv";

const defaultStorage = createMMKV({ id: "default" });

export const storage = {
  get: (key: string): string | null => {
    try {
      if (!defaultStorage.contains(key)) return null;
      return defaultStorage.getString(key) ?? null;
    } catch {
      return null;
    }
  },

  set: (key: string, value: string): void => {
    try {
      defaultStorage.set(key, value);
    } catch {
      // ignore write errors – callers should assume best-effort persistence
    }
  },

  getObject: <T>(key: string): T | null => {
    try {
      if (!defaultStorage.contains(key)) return null;
      const value = defaultStorage.getString(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  setObject: <T>(key: string, value: T): void => {
    try {
      defaultStorage.set(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  },

  remove: (key: string): void => {
    try {
      defaultStorage.remove(key);
    } catch {
      // ignore remove errors
    }
  },

  clear: (): void => {
    try {
      defaultStorage.clearAll();
    } catch {
      // ignore clear errors
    }
  },
};
