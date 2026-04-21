import { useTheme } from "@/lib/theme";
import type { TextVariantName } from "@/lib/theme/fonts";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  StyleProp,
} from "react-native";

export interface TextProps extends RNTextProps {
  variant?: TextVariantName;
  /** Optional NativeWind / Tailwind classes — layered after theme typography. */
  className?: string;
  children: React.ReactNode;
}

export function Text({
  variant = "bodyText1",
  className,
  style,
  children,
  ...props
}: TextProps) {
  const { colors, typography: themeTypography } = useTheme();
  const variantStyle = themeTypography.textVariants[variant];

  const themed: StyleProp<TextStyle> = [
    variantStyle,
    { color: colors.text },
    style,
  ];

  return (
    <RNText style={themed} className={className} {...props}>
      {children}
    </RNText>
  );
}
