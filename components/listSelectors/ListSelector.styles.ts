import {
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import type { ThemeColors } from "@/lib/theme";
import { typography } from "@/lib/theme/fonts";
import { hp, wp } from "@/lib/responsive";

export const listSelectorLayout = StyleSheet.create({
  root: {
    width: "100%",
  },
  searchBar: {
    marginBottom: wp(4),
  },
  listContent: {
    gap: wp(3),
  },
  itemTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },
  itemImage: {
    width: wp(7.5),
    height: wp(7.5),
    borderRadius: wp(3.75),
  },
  itemLabel: {
    ...typography.textVariants.bodyText1,
  },
});

export function itemPressableStyle(
  colors: ThemeColors,
  opts: {
    isSelected: boolean;
    variant: "list" | "list-wrapped";
  }
): ViewStyle {
  return {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.input,
    padding: wp(3),
    borderWidth: 1,
    borderRadius: wp(2.5),
    borderColor: opts.isSelected ? colors.primary : colors.border,
    ...(opts.variant === "list-wrapped" ? { gap: wp(2.5) } : {}),
  };
}

export function itemLabelStyle(colors: ThemeColors): TextStyle {
  return {
    ...listSelectorLayout.itemLabel,
    color: colors.text,
  };
}

export function defaultItemImageStyle(): ImageStyle {
  return listSelectorLayout.itemImage;
}
