import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { cn } from "@/lib/utils";

const textVariants = {
  base: "",
  variant: {
    heading1: "text-[28px] leading-[36px] font-bold",
    heading2: "text-2xl leading-[32px] font-bold",
    heading3: "text-[22px] leading-[30px] font-bold",
    subheading1: "text-xl leading-[28px] font-semibold",
    subheading2: "text-lg leading-[26px] font-bold",
    subheading3: "text-base leading-6 font-semibold",
    subheading4: "text-sm leading-5 font-semibold",
    bodyText1: "text-sm leading-5 font-medium",
    bodyText2: "text-[13px] leading-[19px] font-medium",
    bodyText3: "text-xs leading-[18px] font-medium",
    bodyText4: "text-[10px] leading-4 font-medium",
  },
} as const;

export interface TextProps extends Omit<RNTextProps, 'style'> {
  variant?: keyof typeof textVariants.variant;
  className?: string;
  children: React.ReactNode;
}

export function Text({
  variant = "bodyText1",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <RNText
      className={cn(
        textVariants.base,
        textVariants.variant[variant],
        className
      )}
      {...props}
    >
      {children}
    </RNText>
  );
}
