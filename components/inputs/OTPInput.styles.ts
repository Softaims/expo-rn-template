import { StyleSheet } from "react-native";
import { typography } from "@/lib/theme/fonts";
import { wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: wp(2.7),
  },
  digit: {
    ...typography.textVariants.bodyText1,
    borderWidth: 1.2,
    borderRadius: wp(2.7),
    textAlign: "center",
    height: wp(12.3),
    width: wp(12.3),
  },
});
