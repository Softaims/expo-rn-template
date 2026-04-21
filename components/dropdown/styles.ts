import { StyleSheet } from "react-native";
import { type ThemeColors } from "@/lib/theme";
import { fontFamily, typography } from "@/lib/theme/fonts";
import { hp, wp } from "@/lib/responsive";

/** Full themed sheet for dropdown / autocomplete (merge in component via `useMemo`). */
export function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      marginBottom: hp(1),
    },
    dropdown: {
      minHeight: hp(6),
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: wp(2),
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.5),
      backgroundColor: colors.input,
    },
    placeholderStyle: {
      ...typography.label,
      color: colors.mutedForeground,
    },
    selectedTextStyle: {
      ...typography.label,
      color: colors.text,
    },
    inputSearchStyle: {
      height: hp(5),
      marginHorizontal: wp(3.5),
      borderRadius: wp(2),
      backgroundColor: colors.input,
      ...typography.label,
    },
    itemContainerStyle: {
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.5),
      flexDirection: "row",
      alignItems: "center",
    },
    itemTextStyle: {
      ...typography.label,
      color: colors.text,
    },
    selectedStyle: {
      borderRadius: wp(1.5),
      backgroundColor: colors.muted,
      paddingHorizontal: wp(3),
      paddingVertical: hp(0.75),
      marginRight: wp(2),
      marginTop: hp(1),
      flexDirection: "row",
      alignItems: "center",
    },
    selectedTextStylePill: {
      ...typography.label,
      color: colors.mutedForeground,
      marginRight: wp(2),
    },
    iconContainer: {
      padding: wp(1),
    },
    checkboxContainer: {
      marginRight: wp(3),
      width: wp(6),
    },
    checkbox: {
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    checkmark: {
      color: "#FFFFFF",
      fontFamily: fontFamily.bold,
    },
    autocompleteWrapper: {
      position: "relative",
      zIndex: 1000,
    },
    autocompleteInput: {
      ...typography.label,
      color: colors.text,
    },
    suggestionsContainer: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: colors.input,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: wp(2),
      marginTop: hp(0.5),
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      zIndex: 1001,
    },
    suggestionItem: {
      paddingHorizontal: wp(4),
      paddingVertical: hp(1.5),
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconWrapper: {
      marginHorizontal: wp(2),
    },
  });
}
