import { STORAGE_KEYS } from "@/lib/storageKeys";
import { mmkvZustandStorage } from "@/lib/mmkvStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (value: boolean) => void;
  reset: () => void;
};

const defaultState: Pick<OnboardingState, "hasSeenOnboarding"> = {
  hasSeenOnboarding: false,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...defaultState,
      setHasSeenOnboarding: (value) => {
        set({ hasSeenOnboarding: value });
      },
      reset: () => set(defaultState),
    }),
    {
      name: STORAGE_KEYS.HAS_SEEN_ONBOARDING,
      storage: mmkvZustandStorage,
      partialize: (state) => ({
        hasSeenOnboarding: state.hasSeenOnboarding,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) {
          // If rehydration fails, fall back to defaults
          return;
        }
      },
    }
  )
);

