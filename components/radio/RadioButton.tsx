import { Pressable, View, ViewStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components";

const radioVariants = {
  container: "flex-row items-center gap-3",
  circle: {
    base: "w-5 h-5 rounded-full border-2 items-center justify-center",
    selected: "border-foreground",
    unselected: "border-foreground",
    inactive: "border-muted-foreground opacity-50",
  },
  dot: {
    base: "w-2.5 h-2.5 rounded-full",
    selected: "bg-foreground",
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

  // Styling props
  containerStyles?: string;
  selectedCircleStyle?: string;
  unselectedCircleStyle?: string;
  inactiveCircleStyle?: string;
  selectedDotStyle?: string;
  inactiveDotStyle?: string;
  labelStyle?: string;
  inactiveLabelStyle?: string;

  // Custom content (JSX elements)
  selectedIcon?: React.ReactNode;
}

export function RadioButton({
  label,
  selected = false,
  inactive = false,
  onSelect,
  className,
  style,
  containerStyles,
  selectedCircleStyle,
  unselectedCircleStyle,
  inactiveCircleStyle,
  selectedDotStyle,
  inactiveDotStyle,
  labelStyle,
  inactiveLabelStyle,
  selectedIcon,
}: RadioButtonProps) {
  const handlePress = () => {
    if (inactive) return;
    onSelect?.();
  };

  const getCircleStyle = () => {
    if (inactive) {
      return inactiveCircleStyle || radioVariants.circle.inactive;
    }

    if (selected) {
      return selectedCircleStyle || radioVariants.circle.selected;
    }

    return unselectedCircleStyle || radioVariants.circle.unselected;
  };

  const getDotStyle = () => {
    if (inactive) {
      return inactiveDotStyle || radioVariants.dot.inactive;
    }

    return selectedDotStyle || radioVariants.dot.selected;
  };

  const renderContent = () => {
    if (selected && selectedIcon) {
      return selectedIcon;
    }

    if (selected) {
      return <View className={cn(radioVariants.dot.base, getDotStyle())} />;
    }

    return null;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={inactive}
      className={cn(radioVariants.container, className, containerStyles)}
      style={style}
    >
      <View className={cn(radioVariants.circle.base, getCircleStyle())}>
        {renderContent()}
      </View>
      {label && (
        <Text
          className={cn(
            radioVariants.label.base,
            inactive
              ? inactiveLabelStyle || radioVariants.label.inactive
              : labelStyle || radioVariants.label.normal
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
