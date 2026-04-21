import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import type { ThemeColors } from "@/lib/theme";
import type { Typography } from "@/lib/theme/fonts";
import { wp } from "@/lib/responsive";

/** Thumb travel matches previous 2px / 20px spring targets at ~375pt width. */
export const toggleThumbSpring = {
  off: wp(0.55),
  on: wp(5.35),
} as const;

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  track: {
    width: wp(11.75),
    height: wp(6.4),
    borderRadius: 9999,
    justifyContent: "center",
  },
  thumb: {
    width: wp(5.35),
    height: wp(5.35),
    borderRadius: wp(2.67),
  },
});

export function toggleTrackColors(
  colors: ThemeColors,
  disabled: boolean,
  isActive: boolean
): ViewStyle {
  if (disabled) {
    return { backgroundColor: colors.muted, opacity: 0.5 };
  }
  if (isActive) {
    return { backgroundColor: colors.foreground };
  }
  return { backgroundColor: colors.border };
}

export function toggleLabelStyle(
  colors: ThemeColors,
  typography: Typography,
  disabled: boolean
): StyleProp<TextStyle> {
  const base: TextStyle = {
    ...typography.textVariants.subheading3,
  };
  if (disabled) {
    return [base, { color: colors.mutedForeground, opacity: 0.5 }];
  }
  return [base, { color: colors.text }];
}
