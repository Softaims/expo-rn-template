import { Pressable, PressableProps, View, ViewStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components";

const buttonVariants = {
  base: "rounded-lg flex-row items-center justify-center",
  variant: {
    primary: "bg-primary",
    secondary: "bg-background border-2 border-primary",
    disabled: "bg-muted",
    actioned: "bg-accent",
    text: "bg-transparent",
  },
  size: {
    lg: "px-6 py-4",
    md: "px-5 py-3",
    sm: "px-4 py-2",
  },
} as const;

const textVariants = {
  variant: {
    primary: "text-primary-foreground",
    secondary: "text-primary",
    disabled: "text-muted-foreground",
    actioned: "text-accent-foreground",
    text: "text-primary",
  },
  size: {
    lg: "text-lg",
    md: "text-base",
    sm: "text-[15px]",
  },
} as const;

export interface ButtonProps extends Omit<PressableProps, "onPress" | "style"> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  className?: string;
  style?: ViewStyle;
  title: string;
  onPress?: () => void;

  // Icon props (JSX elements)
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Styling props
  containerStyles?: string;
  innerWrapperStyles?: string;
  textStyles?: string;
  leftIconWrapperStyles?: string;
  rightIconWrapperStyles?: string;

  // Font family (optional)
  fontFamily?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  disabled,
  className,
  style,
  title,
  leftIcon,
  rightIcon,
  onPress,
  containerStyles,
  innerWrapperStyles,
  textStyles,
  leftIconWrapperStyles,
  rightIconWrapperStyles,
  fontFamily,
  ...props
}: ButtonProps) {
  const effectiveVariant = disabled ? "disabled" : variant;

  return (
    <Pressable
      disabled={disabled}
      className={cn(
        buttonVariants.base,
        buttonVariants.variant[effectiveVariant],
        buttonVariants.size[size],
        className,
        containerStyles
      )}
      style={style}
      onPress={onPress}
      {...props}
    >
      <View className={cn("flex-row items-center justify-center gap-2", innerWrapperStyles)}>
        {leftIcon && (
          <View className={leftIconWrapperStyles}>
            {leftIcon}
          </View>
        )}
        <Text
          className={cn(
            textVariants.variant[effectiveVariant],
            textVariants.size[size],
            textStyles
          )}
          style={fontFamily ? { fontFamily } : undefined}
        >
          {title}
        </Text>
        {rightIcon && (
          <View className={rightIconWrapperStyles}>
            {rightIcon}
          </View>
        )}
      </View>
    </Pressable>
  );
}
