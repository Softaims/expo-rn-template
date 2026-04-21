import type { TextStyle, ViewStyle, StyleProp } from "react-native";
import { StyleSheet } from "react-native";
import type { ThemeColors } from "@/lib/theme";
import { wp } from "@/lib/responsive";

export type TabVariant =
  | "underline"
  | "filled"
  | "filled-rounded"
  | "pill"
  | "icon";

export const styles = StyleSheet.create({
  containerUnderline: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  containerFilled: {
    flexDirection: "row",
    gap: wp(2),
  },
  containerRow: {
    flexDirection: "row",
  },
  tabUnderline: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  tabFilled: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    borderRadius: wp(2),
    alignItems: "center",
    justifyContent: "center",
  },
  tabPill: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingVertical: wp(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp(2),
    borderBottomWidth: 2,
  },
});

export function tabsContainer(
  variant: TabVariant,
  colors: ThemeColors
): StyleProp<ViewStyle> {
  switch (variant) {
    case "underline":
    case "icon":
      return [
        styles.containerUnderline,
        { borderBottomColor: colors.border },
      ];
    case "filled":
    case "filled-rounded":
    case "pill":
      return styles.containerFilled;
    default:
      return styles.containerRow;
  }
}

function tabBase(variant: TabVariant): ViewStyle {
  switch (variant) {
    case "underline":
      return styles.tabUnderline;
    case "filled":
    case "filled-rounded":
      return styles.tabFilled;
    case "pill":
      return styles.tabPill;
    case "icon":
      return styles.tabIcon;
    default:
      return {};
  }
}

export function tabVisual(
  variant: TabVariant,
  isActive: boolean,
  colors: ThemeColors
): StyleProp<ViewStyle> {
  const base = tabBase(variant) as ViewStyle;
  if (variant === "underline" || variant === "icon") {
    return [
      base,
      { borderBottomColor: isActive ? colors.primary : "transparent" },
    ];
  }
  if (variant === "filled" || variant === "pill") {
    return [
      base,
      { backgroundColor: isActive ? colors.primary : "transparent" },
    ];
  }
  if (variant === "filled-rounded") {
    return [
      base,
      { backgroundColor: isActive ? colors.primary : colors.muted },
    ];
  }
  return base;
}

export function tabLabelStyle(
  variant: TabVariant,
  isActive: boolean,
  colors: ThemeColors
): TextStyle {
  if (variant === "filled" || variant === "filled-rounded" || variant === "pill") {
    return {
      color: isActive ? colors.primaryForeground : colors.mutedForeground,
    };
  }
  return {
    color: isActive ? colors.text : colors.mutedForeground,
  };
}
