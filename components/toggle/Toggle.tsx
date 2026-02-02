import { Pressable, View, Animated, ViewStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components";
import { useState, useEffect, useRef } from "react";

const toggleVariants = {
  container: "flex-row items-center gap-3",
  track: {
    base: "w-11 h-6 rounded-full justify-center",
    inactive: "bg-muted-foreground",
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
  className?: string;
  style?: ViewStyle;

  // Simple Tailwind class styling for sub-elements
  containerStyles?: string;
  trackStyles?: string;
  thumbStyles?: string;
  labelStyles?: string;
}

export function Toggle({
  label,
  value = false,
  disabled = false,
  onValueChange,
  className,
  style,
  containerStyles,
  trackStyles,
  thumbStyles,
  labelStyles,
}: ToggleProps) {
  const [isActive, setIsActive] = useState(value);
  const translateX = useRef(new Animated.Value(value ? 20 : 2)).current;

  useEffect(() => {
    setIsActive(value);
    Animated.spring(translateX, {
      toValue: value ? 20 : 2,
      useNativeDriver: true,
    }).start();
  }, [value]);

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
    if (disabled) return toggleVariants.track.disabled;
    return isActive ? toggleVariants.track.active : toggleVariants.track.inactive;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(toggleVariants.container, className, containerStyles)}
      style={style}
    >
      <View
        className={cn(toggleVariants.track.base, getTrackStyle(), trackStyles)}
      >
        <Animated.View
          className={cn(toggleVariants.thumb.base, thumbStyles)}
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
              ? toggleVariants.label.disabled
              : toggleVariants.label.normal,
            labelStyles
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
