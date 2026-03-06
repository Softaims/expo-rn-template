export type ThemeColors = {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
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

export const lightColors: ThemeColors = {
  primary: "#000000",
  primaryForeground: "#ffffff",
  secondary: "#929292",
  secondaryForeground: "#ffffff",
  background: "#ffffff",
  foreground: "#000000",
  muted: "#efefef",
  mutedForeground: "#929292",
  accent: "#a0a0a0",
  accentForeground: "#ffffff",
  destructive: "#ff5050",
  destructiveForeground: "#ffffff",
  border: "#e5e5e5",
  input: "#fafafa",
  ring: "#000000",
  chatMessage: "#f5f5f5",
};

export const darkColors: ThemeColors = {
  primary: "#ffffff",
  primaryForeground: "#000000",
  secondary: "#929292",
  secondaryForeground: "#000000",
  background: "#000000",
  foreground: "#ffffff",
  muted: "#1a1a1a",
  mutedForeground: "#929292",
  accent: "#a0a0a0",
  accentForeground: "#000000",
  destructive: "#ff5050",
  destructiveForeground: "#ffffff",
  border: "#2a2a2a",
  input: "#1a1a1a",
  ring: "#ffffff",
  chatMessage: "#1a1a1a",
};

export const themeColors = {
  light: lightColors,
  dark: darkColors,
} as const;

