import { Pressable, PressableProps, View, ViewStyle, TextStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components/text/Text";
import { fontFamilies } from "@/hooks/useFonts";
import { getElementClasses } from "@/lib/component-styles";

// Helper to get view style safely
const getViewStyle = (styles: any, key: string): ViewStyle | undefined => {
  return styles?.[key] as ViewStyle | undefined;
};

// Helper to get text style safely
const getTextStyle = (styles: any, key: string): TextStyle | undefined => {
  return styles?.[key] as TextStyle | undefined;
};

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

type ButtonElements = "container" | "innerWrapper" | "text" | "iconWrapper";

export interface ButtonProps extends Omit<PressableProps, "onPress" | "style"> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  className?: string;
  style?: ViewStyle;
  title: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onPress?: () => void;
  classes?: Partial<Record<ButtonElements, string>>;
  styles?: {
    container?: ViewStyle;
    innerWrapper?: ViewStyle;
    text?: TextStyle;
    iconWrapper?: ViewStyle;
  };
}

export function Button({
  variant = "primary",
  size = "md",
  disabled,
  className,
  style,
  title,
  icon,
  iconPosition = "left",
  onPress,
  classes,
  styles,
  ...props
}: ButtonProps) {
  const effectiveVariant = disabled ? "disabled" : variant;

  return (
    <Pressable
      disabled={disabled}
      className={getElementClasses(
        classes,
        "container",
        cn(
          buttonVariants.base,
          buttonVariants.variant[effectiveVariant],
          buttonVariants.size[size],
          className
        )
      )}
      style={[style, getViewStyle(styles, "container")]}
      onPress={onPress}
      {...props}
    >
      <View
        className={getElementClasses(
          classes,
          "innerWrapper",
          "flex-row items-center justify-center gap-2"
        )}
        style={getViewStyle(styles, "innerWrapper")}
      >
        {icon && iconPosition === "left" && (
          <View
            className={getElementClasses(classes, "iconWrapper", "")}
            style={getViewStyle(styles, "iconWrapper")}
          >
            {icon}
          </View>
        )}
        <Text
          className={getElementClasses(
            classes,
            "text",
            cn(
              textVariants.variant[effectiveVariant],
              textVariants.size[size]
            )
          )}
          style={[
            { fontFamily: fontFamilies.semibold },
            getTextStyle(styles, "text"),
          ]}
        >
          {title}
        </Text>
        {icon && iconPosition === "right" && (
          <View
            className={getElementClasses(classes, "iconWrapper", "")}
            style={getViewStyle(styles, "iconWrapper")}
          >
            {icon}
          </View>
        )}
      </View>
    </Pressable>
  );
}
