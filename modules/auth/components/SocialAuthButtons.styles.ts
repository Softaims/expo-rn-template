import { StyleSheet } from "react-native";
import { hp, wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  root: {
    marginTop: hp(3),
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3),
  },
  hairline: {
    flex: 1,
    height: 1,
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp(6),
  },
  iconButton: {
    width: wp(14),
    height: wp(14),
    borderRadius: 9999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
