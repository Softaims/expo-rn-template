import type { TextStyle } from "react-native";
import type { ThemeColors } from "./colors";

/** Registered font family names — use in `StyleSheet` or with `typography` variants. */
export const fontFamily = {
  thin: "SharpSans-Thin",
  light: "SharpSans-Light",
  regular: "SharpSans-Regular",
  medium: "SharpSans-Medium",
  semibold: "SharpSans-Semibold",
  bold: "SharpSans-Bold",
} as const;

const sharp = fontFamily;

/**
 * Semantic text styles for raw StyleSheet / spread usage (e.g. Gifted Chat bubbles).
 */
const semantic = {
  heading1: {
    fontFamily: sharp.bold,
    fontSize: 32,
    lineHeight: 40,
  },
  heading2: {
    fontFamily: sharp.semibold,
    fontSize: 24,
    lineHeight: 32,
  },
  heading3: {
    fontFamily: sharp.medium,
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontFamily: sharp.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: sharp.bold,
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: sharp.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  label: {
    fontFamily: sharp.medium,
    fontSize: 14,
    lineHeight: 20,
  },
} satisfies Record<string, TextStyle>;

/**
 * Variants for `<Text variant="…" />` — mirrors the former NativeWind scale.
 */
const textVariants = {
  heading1: {
    fontFamily: sharp.bold,
    fontSize: 28,
    lineHeight: 36,
  },
  heading2: {
    fontFamily: sharp.bold,
    fontSize: 24,
    lineHeight: 32,
  },
  heading3: {
    fontFamily: sharp.bold,
    fontSize: 22,
    lineHeight: 30,
  },
  subheading1: {
    fontFamily: sharp.semibold,
    fontSize: 20,
    lineHeight: 28,
  },
  subheading2: {
    fontFamily: sharp.bold,
    fontSize: 18,
    lineHeight: 26,
  },
  subheading3: {
    fontFamily: sharp.semibold,
    fontSize: 16,
    lineHeight: 24,
  },
  subheading4: {
    fontFamily: sharp.semibold,
    fontSize: 14,
    lineHeight: 20,
  },
  bodyText1: {
    fontFamily: sharp.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  bodyText2: {
    fontFamily: sharp.medium,
    fontSize: 13,
    lineHeight: 19,
  },
  bodyText3: {
    fontFamily: sharp.medium,
    fontSize: 12,
    lineHeight: 18,
  },
  bodyText4: {
    fontFamily: sharp.medium,
    fontSize: 10,
    lineHeight: 16,
  },
} satisfies Record<string, TextStyle>;

export const typography = {
  ...semantic,
  textVariants,
} as const;

export type TextVariantName = keyof typeof textVariants;

export type Typography = typeof typography;

/** Default main body text color — always from `colors.text`, never omit (avoids system `labelColor`). */
export function mainTextColor(colors: ThemeColors): string {
  return colors.text;
}
