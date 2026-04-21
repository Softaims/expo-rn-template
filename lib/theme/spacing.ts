import { hp, wp } from "@/lib/responsive";

/**
 * Responsive rhythm tokens — derived with `wp` / `hp` so gaps scale across devices.
 */
export const spacing = {
  page: wp(4),
  gap: {
    xs: wp(1),
    sm: wp(2),
    md: wp(3),
    lg: wp(4),
    xl: wp(5),
  },
  vertical: {
    xs: hp(0.5),
    sm: hp(1),
    md: hp(1.5),
    lg: hp(2),
  },
} as const;
