import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { themeColors, type ThemeColors } from "./colors";
import { typography, type Typography } from "./fonts";
import { spacing } from "./spacing";

export type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  isDark: boolean;
  colors: ThemeColors;
  typography: Typography;
  spacing: typeof spacing;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
  initialMode?: ThemeMode;
};

export function ThemeProvider({
  children,
  initialMode = "system",
}: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const resolvedMode: "light" | "dark" =
    mode === "system"
      ? (systemScheme ?? "light") === "dark"
        ? "dark"
        : "light"
      : mode;

  const isDark = resolvedMode === "dark";

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedMode,
      isDark,
      colors: themeColors[resolvedMode],
      typography,
      spacing,
      setMode,
      toggleMode: () =>
        setMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    [mode, resolvedMode, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

