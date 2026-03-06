import type { TextStyle } from "react-native";

export type Typography = {
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  body: TextStyle;
  bodyBold: TextStyle;
  caption: TextStyle;
  label: TextStyle;
};

export const typography: Typography = {
  heading1: {
    fontFamily: "SharpSans-Bold",
    fontSize: 32,
    lineHeight: 40,
  },
  heading2: {
    fontFamily: "SharpSans-Semibold",
    fontSize: 24,
    lineHeight: 32,
  },
  heading3: {
    fontFamily: "SharpSans-Medium",
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontFamily: "SharpSans-Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: "SharpSans-Bold",
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontFamily: "SharpSans-Regular",
    fontSize: 12,
    lineHeight: 16,
  },
  label: {
    fontFamily: "SharpSans-Medium",
    fontSize: 14,
    lineHeight: 20,
  },
};

