import type { ViewStyle, StyleProp } from "react-native";
import { StyleSheet } from "react-native";
import type { ThemeColors } from "@/lib/theme";
import type { TextVariantName } from "@/lib/theme/fonts";
import { hp, wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  padLg: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    borderRadius: wp(2.5),
  },
  padMd: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: wp(2.5),
  },
  padSm: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: wp(2.5),
  },
});

function sizeStyle(size: "lg" | "md" | "sm"): ViewStyle {
  if (size === "lg") return styles.padLg;
  if (size === "sm") return styles.padSm;
  return styles.padMd;
}

export function resolveButtonAppearance(
  colors: ThemeColors,
  variant: "primary" | "secondary" | "disabled" | "actioned" | "text",
  effectiveVariant: "primary" | "secondary" | "disabled" | "actioned" | "text",
  size: "lg" | "md" | "sm",
  disabled: boolean | null | undefined,
  originalVariant: "primary" | "secondary" | "disabled" | "actioned" | "text"
): {
  pressableStyle: StyleProp<ViewStyle>;
  textColor: string;
  textVariant: TextVariantName;
} {
  const sizePad = sizeStyle(size);

  const textVariant: TextVariantName =
    size === "lg"
      ? "subheading2"
      : size === "sm"
        ? "bodyText1"
        : "subheading3";

  let bg: ViewStyle = {};
  let border: ViewStyle = {};
  let color: string = colors.primaryForeground;

  if (effectiveVariant === "primary") {
    bg = { backgroundColor: colors.primary };
    color = colors.primaryForeground;
  } else if (effectiveVariant === "secondary") {
    bg = { backgroundColor: colors.background };
    border = { borderWidth: 2, borderColor: colors.primary };
    color = colors.primary;
  } else if (effectiveVariant === "disabled") {
    bg = { backgroundColor: colors.secondary };
    color = "#ffffff";
  } else if (effectiveVariant === "actioned") {
    bg = { backgroundColor: colors.accent };
    color = colors.accentForeground;
  } else if (effectiveVariant === "text") {
    bg = { backgroundColor: "transparent" };
    color = disabled ? colors.mutedForeground : colors.primary;
  }

  if (disabled && originalVariant !== "text") {
    bg = { backgroundColor: colors.secondary };
    color = "#ffffff";
  }

  const pressable: StyleProp<ViewStyle> = [
    styles.row,
    sizePad,
    bg,
    border,
  ];

  return { pressableStyle: pressable, textColor: color, textVariant };
}
