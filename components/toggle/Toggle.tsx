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

  // Styling props
  containerStyles?: string;
  activeTrackStyle?: string;
  inactiveTrackStyle?: string;
  disabledTrackStyle?: string;
  activeThumbStyle?: string;
  inactiveThumbStyle?: string;
  disabledThumbStyle?: string;
  labelStyle?: string;
  disabledLabelStyle?: string;
}

export function Toggle({
  label,
  value = false,
  disabled = false,
  onValueChange,
  className,
  style,
  containerStyles,
  activeTrackStyle,
  inactiveTrackStyle,
  disabledTrackStyle,
  activeThumbStyle,
  inactiveThumbStyle,
  disabledThumbStyle,
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
    if (disabled) {
      return disabledTrackStyle || toggleVariants.track.disabled;
    }

    if (isActive) {
      return activeTrackStyle || toggleVariants.track.active;
    }

    return inactiveTrackStyle || toggleVariants.track.inactive;
  };

  const getThumbStyle = () => {
    if (disabled) {
      return disabledThumbStyle || toggleVariants.thumb.base;
    }

    if (isActive) {
      return activeThumbStyle || toggleVariants.thumb.base;
    }

    return inactiveThumbStyle || toggleVariants.thumb.base;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(toggleVariants.container, className, containerStyles)}
      style={style}
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
              ? disabledLabelStyle || toggleVariants.label.disabled
              : labelStyle || toggleVariants.label.normal
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
