import { StyleSheet } from "react-native";

export function createStyles(gap: number, pagePad: number) {
  return StyleSheet.create({
    row: {
      gap,
      paddingHorizontal: pagePad,
    },
  });
}
