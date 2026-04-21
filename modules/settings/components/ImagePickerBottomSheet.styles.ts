import { StyleSheet } from "react-native";
import { hp, wp } from "@/lib/responsive";

export const imagePickerSheetStyles = StyleSheet.create({
  card: {
    borderRadius: wp(4),
    overflow: "hidden",
  },
  option: {
    paddingVertical: hp(2),
    alignItems: "center",
  },
  divider: {
    height: 1,
  },
  cancelOuter: {
    borderRadius: wp(4),
    paddingVertical: hp(2),
    alignItems: "center",
    marginTop: wp(3),
  },
});
