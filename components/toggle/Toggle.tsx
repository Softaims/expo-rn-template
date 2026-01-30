import { Pressable, View, Animated, ViewStyle, TextStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components/text/Text";
import { useState, useEffect, useRef } from "react";
import { getElementClasses, getElementTextStyle } from "@/lib/component-styles";

// Helper to get view style safely
const getViewStyle = (styles: any, key: string): ViewStyle | undefined => {
  return styles?.[key] as ViewStyle | undefined;
};

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

type ToggleElements = "container" | "track" | "thumb" | "label";

export interface ToggleProps {
  label?: string;
  value?: boolean;
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;
  className?: string;
  style?: ViewStyle;
  classes?: Partial<Record<ToggleElements, string>>;
  styles?: {
    container?: ViewStyle;
    track?: ViewStyle;
    thumb?: ViewStyle;
    label?: TextStyle;
  };
}

export function Toggle({
  label,
  value = false,
  disabled = false,
  onValueChange,
  className,
  style,
  classes,
  styles,
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
      className={getElementClasses(
        classes,
        "container",
        cn(toggleVariants.container, className)
      )}
      style={[style, getViewStyle(styles, "container")]}
    >
      <View
        className={getElementClasses(
          classes,
          "track",
          cn(toggleVariants.track.base, getTrackStyle())
        )}
        style={getViewStyle(styles, "track")}
      >
        <Animated.View
          className={getElementClasses(
            classes,
            "thumb",
            toggleVariants.thumb.base
          )}
          style={[
            {
              transform: [{ translateX }],
            },
            getViewStyle(styles, "thumb"),
          ]}
        />
      </View>
      {label && (
        <Text
          className={getElementClasses(
            classes,
            "label",
            cn(
              toggleVariants.label.base,
              disabled
                ? toggleVariants.label.disabled
                : toggleVariants.label.normal
            )
          )}
          style={getElementTextStyle(styles, "label")}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
