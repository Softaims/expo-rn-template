import { StyleSheet } from "react-native";
import { fontFamily } from "@/lib/theme/fonts";
import { hp, wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  row: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: wp(1),
  },
  link: {
    fontFamily: fontFamily.semibold,
    textDecorationLine: "underline",
  },
});
