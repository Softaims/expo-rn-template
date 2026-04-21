import { createMMKV } from "react-native-mmkv";
import type { StateStorage } from "zustand/middleware";

const zustandStorage = createMMKV({ id: "zustand" });

export const mmkvZustandStorage: StateStorage = {
  getItem: (name) => {
    try {
      if (!zustandStorage.contains(name)) return null;
      return zustandStorage.getString(name) ?? null;
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      zustandStorage.set(name, value);
    } catch {
      // ignore write errors – stores should fall back to defaults
    }
  },
  removeItem: (name) => {
    try {
      zustandStorage.remove(name);
    } catch {
      // ignore remove errors
    }
  },
};

