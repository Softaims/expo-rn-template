import type { TextStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import type { ThemeColors } from "@/lib/theme";
import { typography } from "@/lib/theme/fonts";
import { wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  fullWidth: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  segmentBase: {
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  dotBase: {
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});

export function barAnimatedHeights() {
  const dot = wp(2.1);
  const wide = wp(8.5);
  return { dot, wide };
}

export function barSolidSegment(
  colors: ThemeColors,
  isCurrent: boolean
): ViewStyle {
  const { dot, wide } = barAnimatedHeights();
  return {
    ...styles.segmentBase,
    height: dot,
    width: isCurrent ? wide : dot,
    backgroundColor: isCurrent ? colors.primary : colors.muted,
  };
}

export function barSolidLabel(
  colors: ThemeColors,
  isCurrent: boolean
): TextStyle {
  return {
    ...typography.textVariants.bodyText3,
    fontSize: wp(3.2),
    lineHeight: Math.round(wp(3.2) * 1.35),
    color: isCurrent ? colors.primaryForeground : colors.text,
  };
}

export function dotThumb(
  colors: ThemeColors,
  isCurrent: boolean,
  filled: boolean
): ViewStyle {
  const s = wp(2.1);
  if (isCurrent) {
    return {
      ...styles.dotBase,
      height: s,
      width: s,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.primary,
    };
  }
  if (filled) {
    return {
      ...styles.dotBase,
      height: s,
      width: s,
      backgroundColor: colors.primary,
    };
  }
  return {
    ...styles.dotBase,
    height: s,
    width: s,
    backgroundColor: colors.muted,
  };
}

export function dotLabel(colors: ThemeColors): TextStyle {
  return {
    ...typography.textVariants.bodyText3,
    fontSize: wp(3.2),
    lineHeight: Math.round(wp(3.2) * 1.35),
    color: colors.text,
  };
}
