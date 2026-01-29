import { Pressable, PressableProps, Text, View } from "react-native";
import { cn } from "@/lib/utils";

const buttonVariants = {
  base: "rounded-lg flex-row items-center justify-center",
  variant: {
    primary: "bg-primary",
    secondary: "bg-white border-2 border-primary",
    disabled: "bg-onboardingSelected",
    actioned: "bg-lightStroke",
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
    primary: "text-white font-semibold",
    secondary: "text-primary font-semibold",
    disabled: "text-lightStroke font-semibold",
    actioned: "text-primary font-semibold",
    text: "text-primary font-semibold",
  },
  size: {
    lg: "text-lg",
    md: "text-base",
    sm: "text-sm",
  },
} as const;

export interface ButtonProps extends Omit<PressableProps, "onPress"> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  className?: string;
  title: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onPress?: () => void;
}

export function Button({
  variant = "primary",
  size = "md",
  disabled,
  className,
  title,
  icon,
  iconPosition = "left",
  onPress,
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
        className
      )}
      onPress={onPress}
      {...props}
    >
      <View className="flex-row items-center justify-center gap-2">
        {icon && iconPosition === "left" && <View>{icon}</View>}
        <Text
          className={cn(
            textVariants.variant[effectiveVariant],
            textVariants.size[size]
          )}
        >
          {title}
        </Text>
        {icon && iconPosition === "right" && <View>{icon}</View>}
      </View>
    </Pressable>
  );
}
