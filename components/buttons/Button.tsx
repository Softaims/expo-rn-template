import { Text } from "@/components/text";
import { useTheme } from "@/lib/theme";
import { useMemo } from "react";
import { Pressable, PressableProps, View } from "react-native";
import { resolveButtonAppearance, styles } from "./Button.styles";

export interface ButtonProps extends Omit<PressableProps, "onPress" | "style"> {
  variant?: "primary" | "secondary" | "disabled" | "actioned" | "text";
  size?: "lg" | "md" | "sm";
  title: string;
  onPress?: () => void;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  /** NativeWind classes on the outer pressable. */
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
  const { colors } = useTheme();
  const effectiveVariant = disabled ? "disabled" : variant;

  const { pressableStyle, textColor, textVariant } = useMemo(
    () =>
      resolveButtonAppearance(
        colors,
        variant,
        effectiveVariant,
        size,
        disabled,
        variant
      ),
    [colors, disabled, effectiveVariant, size, variant]
  );

  return (
    <Pressable
      disabled={disabled}
      style={pressableStyle}
      className={containerStyles}
      onPress={onPress}
      {...props}
    >
      <View style={styles.row} className={innerWrapperStyles}>
        {leftIcon}
        <Text
          variant={textVariant}
          style={{ color: textColor, textAlign: "center" }}
          className={textStyles}
        >
          {title}
        </Text>
        {rightIcon}
      </View>
    </Pressable>
  );
}
