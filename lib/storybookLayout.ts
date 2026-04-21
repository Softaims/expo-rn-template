import { hp, wp } from "@/lib/responsive";

/** ~16px at typical widths — use instead of raw `padding: 16`. */
export const storyScreenPadding = wp(4);

/** ~20px — slightly roomier Storybook chrome. */
export const storyScreenPaddingComfortable = wp(5);

export const storyGap = wp(4);

export const storyDecoratorStyle = {
  padding: storyScreenPadding,
} as const;

export const storyDecoratorStyleWithGap = {
  padding: storyScreenPadding,
  gap: storyGap,
} as const;

/** Padded screen with extra vertical room (replaces `padding: 16` + `paddingVertical: 40`). */
export const storyDecoratorStyleTall = {
  paddingHorizontal: storyScreenPadding,
  paddingVertical: hp(5),
} as const;

export const storyDecoratorComfortable = {
  padding: storyScreenPaddingComfortable,
} as const;
