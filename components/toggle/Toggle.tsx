import { Pressable, View, Animated } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components/text";
import { useState, useEffect, useRef } from "react";

const toggleVariants = {
  container: "flex-row items-center gap-3",
  track: {
    base: "w-11 h-6 rounded-full justify-center",
    inactive: "bg-border",
    active: "bg-foreground",
    disabled: "bg-muted opacity-50",
  },
  thumb: {
    base: "w-5 h-5 rounded-full bg-background",
  },
  label: {
    base: "text-base",
    normal: "text-foreground",
    disabled: "text-muted-foreground opacity-50",
  },
} as const;

export interface ToggleProps {
  label?: string;
  value?: boolean;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;

  // Styling props
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
  const [isActive, setIsActive] = useState(value);
  const translateX = useRef(new Animated.Value(value ? 20 : 2)).current;

  useEffect(() => {
    setIsActive(value);
    Animated.spring(translateX, {
      toValue: value ? 20 : 2,
      useNativeDriver: true,
    }).start();
  }, [value, translateX]);

  const handlePress = () => {
    if (disabled) return;
    const newValue = !isActive;
    setIsActive(newValue);
    Animated.spring(translateX, {
      toValue: newValue ? 20 : 2,
      useNativeDriver: true,
    }).start();
    onValueChange?.(newValue);
  };

  const getTrackStyle = () => {
    if (disabled && isActive) {
      return cn(toggleVariants.track.disabled, disabledActiveTrackStyle);
    } else if (disabled && !isActive) {
      return cn(toggleVariants.track.disabled, disabledInactiveTrackStyle);
    } else if (isActive) {
      return cn(toggleVariants.track.active, activeTrackStyle);
    }
    return cn(toggleVariants.track.inactive, inactiveTrackStyle);
  };

  const getThumbStyle = () => {
    if (disabled && isActive) {
      return cn(toggleVariants.thumb.base, disabledActiveThumbStyle);
    } else if (disabled && !isActive) {
      return cn(toggleVariants.thumb.base, disabledInactiveThumbStyle);
    } else if (isActive) {
      return cn(toggleVariants.thumb.base, activeThumbStyle);
    }
    return cn(toggleVariants.thumb.base, inactiveThumbStyle);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(toggleVariants.container, containerStyles)}
    >
      <View className={cn(toggleVariants.track.base, getTrackStyle())}>
        <Animated.View
          className={cn(getThumbStyle())}
          style={{
            transform: [{ translateX }],
          }}
        />
      </View>
      {label && (
        <Text
          className={cn(
            toggleVariants.label.base,
            disabled
              ? cn(toggleVariants.label.disabled, disabledLabelStyle)
              : cn(toggleVariants.label.normal, labelStyle)
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
