import { mmkvZustandStorage } from "@/lib/mmkvStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

type PreferencesState = {
  theme: Theme;
  hapticsEnabled: boolean;
  setTheme: (theme: Theme) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  reset: () => void;
};

const defaultState: Pick<PreferencesState, "theme" | "hapticsEnabled"> = {
  theme: "system",
  hapticsEnabled: true,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...defaultState,
      setTheme: (theme) => set({ theme }),
      setHapticsEnabled: (enabled) => set({ hapticsEnabled: enabled }),
      reset: () => set(defaultState),
    }),
    {
      name: "preferences",
      storage: mmkvZustandStorage,
      partialize: (state) => ({
        theme: state.theme,
        hapticsEnabled: state.hapticsEnabled,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) {
          return;
        }
      },
    }
  )
);

