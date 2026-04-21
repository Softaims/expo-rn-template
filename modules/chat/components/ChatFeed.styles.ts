import { StyleSheet, type TextStyle, type ViewStyle } from "react-native";
import { type ThemeColors } from "@/lib/theme";
import { typography } from "@/lib/theme/fonts";
import { hp, wp } from "@/lib/responsive";

export const styles = StyleSheet.create({
  dayOuter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(2.5),
  },
});

export function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    messagesContainer: {
      borderWidth: 0,
      paddingHorizontal: wp(3),
    },
    rightBubble: {
      backgroundColor: colors.primary,
      borderRadius: wp(2.7),
      borderTopRightRadius: 0,
      paddingHorizontal: wp(1),
      paddingVertical: hp(0.25),
      marginVertical: hp(0.75),
    },
    leftBubble: {
      backgroundColor: colors.chatMessage,
      borderRadius: wp(2.7),
      borderBottomLeftRadius: 0,
      paddingHorizontal: wp(1),
      paddingVertical: hp(0.25),
      marginVertical: hp(0.75),
    },
    rightBubbleText: {
      ...typography.body,
      color: colors.primaryForeground,
    },
    leftBubbleText: {
      ...typography.body,
      color: colors.text,
    },
    inputContainer: {
      paddingHorizontal: wp(4),
      paddingTop: hp(1.5),
      borderTopWidth: 0,
    },
    replyPreview: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: wp(3),
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
      marginBottom: hp(1),
      borderLeftWidth: wp(1),
    },
    replyPreviewContent: {
      flex: 1,
    },
    chatComposerField: {
      backgroundColor: colors.input,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 9999,
      paddingHorizontal: wp(4),
    },
    chatComposerInput: {
      ...typography.textVariants.bodyText1,
    },
  });
}

export function chatTimestamp(colors: ThemeColors, isRight: boolean): TextStyle {
  return {
    ...typography.textVariants.bodyText3,
    fontSize: wp(3.2),
    lineHeight: Math.round(wp(3.2) * 1.35),
    color: colors.secondary,
    textAlign: isRight ? "right" : "left",
  };
}

export function chatDayRule(colors: ThemeColors): ViewStyle {
  return {
    height: 1,
    backgroundColor: colors.border,
    flex: 1,
    marginHorizontal: wp(3),
  };
}

export function chatDayLabel(colors: ThemeColors): TextStyle {
  return {
    ...typography.textVariants.subheading4,
    color: colors.secondary,
  };
}

export function chatInputToolbarExt(
  colors: ThemeColors,
  bottomInset: number
): ViewStyle {
  return {
    paddingBottom: bottomInset + hp(1),
    backgroundColor: colors.background,
    borderTopWidth: 0,
  };
}

export function chatReplyPreviewTint(colors: ThemeColors): ViewStyle {
  return {
    backgroundColor: colors.muted,
    borderLeftColor: colors.primary,
  };
}

export function chatReplyTitle(colors: ThemeColors): TextStyle {
  return {
    ...typography.textVariants.subheading3,
    color: colors.primary,
  };
}

export function chatReplySubtitle(colors: ThemeColors): TextStyle {
  return { color: colors.mutedForeground };
}

export function chatReplyClose(colors: ThemeColors): TextStyle {
  return {
    color: colors.mutedForeground,
    paddingHorizontal: wp(2),
  };
}
