import { StyleSheet } from "react-native";
import { hp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  mainColumn: {
    flex: 1,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatListContent: {
    marginBottom: hp(4),
  },
});

export function createSlideStyles(width: number, pagePad: number) {
  return StyleSheet.create({
    slide: {
      width,
      paddingHorizontal: pagePad,
    },
  });
}
