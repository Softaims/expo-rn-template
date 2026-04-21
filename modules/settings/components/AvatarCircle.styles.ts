import type { ImageStyle, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  outer: {
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  } as ImageStyle,
});

export function avatarCircleOuter(size: number): ViewStyle {
  return {
    width: size,
    height: size,
  };
}
