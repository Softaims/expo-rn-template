import { StyleSheet } from "react-native";
import { wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  fieldStack: {
    gap: wp(4),
  },
  rootBase: {
    gap: wp(4),
  },
  forgotPressable: {
    alignSelf: "flex-end",
  },
  forgotText: {
    textDecorationLine: "underline",
  },
});
