import { StyleSheet } from "react-native";
import { hp, wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  centeredWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(3),
    marginBottom: hp(3),
  },
  defaultRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: wp(2.5),
    padding: wp(2),
    marginBottom: hp(3),
    borderWidth: 1,
  },
  avatarSpacerCentered: {
    marginBottom: hp(2),
  },
  textColCentered: {
    alignItems: "center",
  },
  textColRow: {
    flex: 1,
    marginLeft: wp(4),
  },
});
