import { StyleSheet } from "react-native";
import { hp, wp } from "@/lib/responsive";

/**
 * Layout only — font metrics come from `typography` in the component (see expo-styling rule).
 */
export const textInputStyles = StyleSheet.create({
  labelSpacing: {
    marginBottom: hp(1.5),
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(3),
    borderRadius: wp(2.5),
    gap: wp(1.25),
    borderWidth: 1.2,
  },
  fieldRowDisabled: {
    opacity: 0.5,
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: wp(1.25),
  },
  input: {
    flex: 1,
    paddingVertical: hp(1.5),
  },
  inputMultiline: {
    minHeight: hp(17.5),
    textAlignVertical: "top",
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(1.25),
    marginTop: hp(1.25),
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneFlagWrap: {
    marginRight: -wp(1),
  },
  phoneCalling: {
    marginTop: hp(0.25),
    marginRight: wp(2),
  },
  phoneDivider: {
    height: hp(3),
    width: 1,
    marginLeft: wp(1.25),
    marginRight: wp(0.25),
  },
});
