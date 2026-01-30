import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { cn } from "@/lib/utils";
import { fontFamilies } from "@/hooks/useFonts";

const textVariants = {
  base: "",
  variant: {
    heading1: "text-[28px] leading-[36px]",
    heading2: "text-2xl leading-[32px]",
    heading3: "text-[22px] leading-[30px]",
    subheading1: "text-xl leading-[28px]",
    subheading2: "text-lg leading-[26px]",
    subheading3: "text-base leading-6",
    subheading4: "text-sm leading-5",
    bodyText1: "text-sm leading-5",
    bodyText2: "text-[13px] leading-[19px]",
    bodyText3: "text-xs leading-[18px]",
    bodyText4: "text-[10px] leading-4",
  },
} as const;

const fontWeightMap = {
  heading1: fontFamilies.bold,
  heading2: fontFamilies.bold,
  heading3: fontFamilies.bold,
  subheading1: fontFamilies.semibold,
  subheading2: fontFamilies.bold,
  subheading3: fontFamilies.semibold,
  subheading4: fontFamilies.semibold,
  bodyText1: fontFamilies.medium,
  bodyText2: fontFamilies.medium,
  bodyText3: fontFamilies.medium,
  bodyText4: fontFamilies.medium,
} as const;

export interface TextProps extends RNTextProps {
  variant?: keyof typeof textVariants.variant;
  className?: string;
  children: React.ReactNode;
}

export function Text({
  variant = "bodyText1",
  className,
  children,
  style,
  ...props
}: TextProps) {
  const fontFamily = fontWeightMap[variant];

  return (
    <RNText
      className={cn(
        textVariants.base,
        textVariants.variant[variant],
        className
      )}
      style={[{ fontFamily }, style]}
      {...props}
    >
      {children}
    </RNText>
  );
}
