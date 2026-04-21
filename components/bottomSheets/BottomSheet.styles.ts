import { StyleSheet } from "react-native";
import { hp, wp } from "@/lib/responsive";

export const bottomSheetStyles = StyleSheet.create({
  content: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(4),
  },
  defaultImage: {
    width: wp(30),
    height: wp(30),
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: hp(2),
  },
  title: {
    textAlign: "center",
    marginBottom: hp(1.25),
  },
  description: {
    textAlign: "center",
    marginBottom: hp(4.25),
  },
});
