export type ThemeColors = {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  /** Default body / primary text — always set explicitly; never rely on RN system label color. */
  text: string;
  /** Same as `text` — use for foreground-on-surface semantics where helpful. */
  foreground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  chatMessage: string;
};

/** Shared “paper” palette: white-shaded surfaces + black / near-black type. */
const paper = {
  primary: "#000000",
  primaryForeground: "#ffffff",
  secondary: "#6e6e73",
  secondaryForeground: "#ffffff",
  /** Slightly off-white canvas */
  background: "#f6f6f8",
  text: "#0a0a0a",
  foreground: "#0a0a0a",
  /** Subtle shaded blocks */
  muted: "#ececee",
  /** Secondary copy — still dark, not light gray on white */
  mutedForeground: "#5c5c61",
  accent: "#8e8e93",
  accentForeground: "#0a0a0a",
  destructive: "#ff5050",
  destructiveForeground: "#ffffff",
  border: "#e0e0e4",
  /** Inputs sit slightly brighter than page bg */
  input: "#ffffff",
  ring: "#000000",
  chatMessage: "#f0f0f3",
} as const satisfies ThemeColors;

/** Light: white-shaded bg, black typography. */
export const lightColors: ThemeColors = {
  ...paper,
};

/**
 * Dark (system): same paper look — white-shaded surfaces + black type.
 * Avoids gray/black “night” UI; StatusBar in root still follows `isDark` for icons.
 */
export const darkColors: ThemeColors = {
  ...paper,
};

export const themeColors = {
  light: lightColors,
  dark: darkColors,
} as const;
