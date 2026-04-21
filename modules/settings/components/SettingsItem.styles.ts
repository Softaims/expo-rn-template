import { StyleSheet } from "react-native";
import { hp, wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  pressableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: wp(2.5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.25),
    marginBottom: hp(1.5),
    borderWidth: 1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(1),
    flex: 1,
  },
  iconBox: {
    width: wp(7),
    height: wp(7),
    alignItems: "center",
    justifyContent: "center",
  },
  textCol: {
    flex: 1,
  },
  right: {
    alignItems: "center",
    justifyContent: "center",
  },
});
