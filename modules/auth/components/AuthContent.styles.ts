import { StyleSheet } from "react-native";
import { hp, wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
  },
  upper: {
    flex: 1,
  },
  heroImage: {
    width: wp(26.7),
    height: wp(26.7),
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: hp(2.5),
    marginTop: "15%",
  },
});
