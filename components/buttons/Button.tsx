import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { Pressable, PressableProps, View } from "react-native";

const buttonVariants = {
  base: "rounded-[10px] flex-row items-center justify-center",
  variant: {
    primary: "bg-primary",
    secondary: "bg-background border-2 border-primary",
    disabled: "bg-secondary",
    actioned: "bg-accent",
    text: "bg-transparent",
  },
  size: {
    lg: "px-6 py-4",
    md: "px-5 py-2",
    sm: "px-0 py-0",
  },
} as const;

const textVariants = {
  variant: {
    primary: "text-primary-foreground",
    secondary: "text-primary",
    disabled: "text-white",
    actioned: "text-accent-foreground",
    text: "text-primary",
  },
  size: {
    lg: "text-lg font-semibold text-[18px]",
    md: "text-base font-semibold text-base",
    sm: "text-[14px] font-semibold",
  },
} as const;

export interface ButtonProps extends Omit<PressableProps, "onPress" | "style"> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  title: string;
  onPress?: () => void;

  // Icon props (JSX elements)
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // Styling props
  containerStyles?: string;
  innerWrapperStyles?: string;
  textStyles?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  disabled,
  title,
  leftIcon,
  rightIcon,
  onPress,
  containerStyles,
  innerWrapperStyles,
  textStyles,
  ...props
}: ButtonProps) {
  const effectiveVariant = disabled ? "disabled" : variant;

  return (
    <Pressable
      disabled={disabled}
      className={cn(
        buttonVariants.base,
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        disabled && variant !== "text" && buttonVariants.variant.disabled,
        containerStyles,

      )}
      onPress={onPress}
      {...props}
    >
      <View className={cn("flex-row", innerWrapperStyles)}>
        {leftIcon}
        <Text
          className={cn(
            textVariants.variant[effectiveVariant],
            textVariants.size[size],
            disabled && variant === "text" && "text-muted-foreground",
            textStyles,
          )}
        >
          {title}
        </Text>
        {rightIcon}
      </View>
    </Pressable>
  );
}
