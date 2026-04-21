import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
});

export function createStyles(gap: number) {
  return StyleSheet.create({
    root: {
      gap,
    },
  });
}
