import { Pressable, View, ViewStyle, TextStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components";

const radioVariants = {
  container: "flex-row items-center gap-3",
  circle: {
    base: "w-5 h-5 rounded-full border-2 items-center justify-center",
    normal: "border-foreground",
    inactive: "border-muted-foreground opacity-50",
  },
  dot: {
    base: "w-2.5 h-2.5 rounded-full",
    normal: "bg-foreground",
    inactive: "bg-muted-foreground",
  },
  label: {
    base: "text-base",
    normal: "text-foreground",
    inactive: "text-muted-foreground opacity-50",
  },
} as const;

export interface RadioButtonProps {
  label?: string;
  selected?: boolean;
  inactive?: boolean;
  onSelect?: () => void;
  className?: string;
  style?: ViewStyle;

  // Simple Tailwind class styling for sub-elements
  containerStyles?: string;
  circleStyles?: string;
  dotStyles?: string;
  labelStyles?: string;
}

export function RadioButton({
  label,
  selected = false,
  inactive = false,
  onSelect,
  className,
  style,
  containerStyles,
  circleStyles,
  dotStyles,
  labelStyles,
}: RadioButtonProps) {
  const handlePress = () => {
    if (inactive) return;
    onSelect?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={inactive}
      className={cn(radioVariants.container, className, containerStyles)}
      style={style}
    >
      <View
        className={cn(
          radioVariants.circle.base,
          inactive ? radioVariants.circle.inactive : radioVariants.circle.normal,
          circleStyles
        )}
      >
        {selected && (
          <View
            className={cn(
              radioVariants.dot.base,
              inactive ? radioVariants.dot.inactive : radioVariants.dot.normal,
              dotStyles
            )}
          />
        )}
      </View>
      {label && (
        <Text
          className={cn(
            radioVariants.label.base,
            inactive ? radioVariants.label.inactive : radioVariants.label.normal,
            labelStyles
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
