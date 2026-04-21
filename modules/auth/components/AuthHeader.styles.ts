import { StyleSheet } from "react-native";
import { hp, wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
    marginBottom: hp(4),
  },
});
