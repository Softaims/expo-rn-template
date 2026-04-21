import { Pressable, View, Animated } from "react-native";
import { Text } from "@/components/text";
import { useState, useEffect, useRef, useMemo } from "react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import type { StyleProp, ViewStyle } from "react-native";
import {
  styles,
  toggleThumbSpring,
  toggleTrackColors,
  toggleLabelStyle,
} from "./styles";

export interface ToggleProps {
  label?: string;
  value?: boolean;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;

  containerStyles?: string;
  activeTrackStyle?: string;
  inactiveTrackStyle?: string;
  disabledInactiveTrackStyle?: string;
  disabledActiveTrackStyle?: string;
  activeThumbStyle?: string;
  inactiveThumbStyle?: string;
  disabledInactiveThumbStyle?: string;
  disabledActiveThumbStyle?: string;
  labelStyle?: string;
  disabledLabelStyle?: string;
}

export function Toggle({
  label,
  value = false,
  disabled = false,
  onValueChange,
  containerStyles,
  activeTrackStyle,
  inactiveTrackStyle,
  disabledInactiveTrackStyle,
  disabledActiveTrackStyle,
  activeThumbStyle,
  inactiveThumbStyle,
  disabledInactiveThumbStyle,
  disabledActiveThumbStyle,
  labelStyle,
  disabledLabelStyle,
}: ToggleProps) {
  const { colors, typography } = useTheme();
  const [isActive, setIsActive] = useState(value);
  const translateX = useRef(
    new Animated.Value(value ? toggleThumbSpring.on : toggleThumbSpring.off)
  ).current;

  useEffect(() => {
    setIsActive(value);
    Animated.spring(translateX, {
      toValue: value ? toggleThumbSpring.on : toggleThumbSpring.off,
      useNativeDriver: true,
    }).start();
  }, [value, translateX]);

  const handlePress = () => {
    if (disabled) return;
    const newValue = !isActive;
    setIsActive(newValue);
    Animated.spring(translateX, {
      toValue: newValue ? toggleThumbSpring.on : toggleThumbSpring.off,
      useNativeDriver: true,
    }).start();
    onValueChange?.(newValue);
  };

  const trackStyle = useMemo((): StyleProp<ViewStyle> => {
    return [styles.track, toggleTrackColors(colors, disabled, isActive)];
  }, [colors, disabled, isActive]);

  const trackClassName = cn(
    disabled && isActive && disabledActiveTrackStyle,
    disabled && !isActive && disabledInactiveTrackStyle,
    !disabled && isActive && activeTrackStyle,
    !disabled && !isActive && inactiveTrackStyle
  );

  const thumbClassName = cn(
    disabled && isActive && disabledActiveThumbStyle,
    disabled && !isActive && disabledInactiveThumbStyle,
    !disabled && isActive && activeThumbStyle,
    !disabled && !isActive && inactiveThumbStyle
  );

  const labelTextStyle = useMemo(
    () => toggleLabelStyle(colors, typography, disabled),
    [colors, disabled, typography]
  );

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={styles.row}
      className={containerStyles}
    >
      <View style={trackStyle} className={trackClassName}>
        <Animated.View
          style={[
            styles.thumb,
            { backgroundColor: colors.background },
            {
              transform: [{ translateX }],
            },
          ]}
          className={thumbClassName}
        />
      </View>
      {label && (
        <Text
          variant="subheading3"
          style={labelTextStyle}
          className={cn(disabled ? disabledLabelStyle : labelStyle)}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
