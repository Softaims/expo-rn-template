import { Pressable, View } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components/text";

const radioVariants = {
  container: "flex-row items-center gap-3",
  circle: {
    base: "w-[20px] h-[20px] rounded-full border-[1.5px] items-center justify-center",
    selected: "border-foreground",
    unselected: "border-foreground",
    inactive: "border-muted-foreground opacity-50",
  },
  dot: {
    base: "w-4 h-4 rounded-full",
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
    switch (true) {
      case inactive:
        return cn(radioVariants.circle.inactive, inactiveCircleStyle);
      case selected:
        return cn(radioVariants.circle.selected, selectedCircleStyle);
      default:
        return cn(radioVariants.circle.unselected, unselectedCircleStyle);
    }
  };

  const circleStyle = getCircleStyle();

  const getDotStyle = () => {
    switch (true) {
      case inactive:
        return cn(radioVariants.dot.inactive, inactiveDotStyle);
      default:
        return cn(radioVariants.dot.selected, selectedDotStyle);
    }
  };

  const dotStyle = getDotStyle();

  const renderContent = () => {
    if (!selected) return null;
    if (selectedIcon) return selectedIcon;
    return <View className={cn(radioVariants.dot.base, dotStyle)} />;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={inactive}
      className={cn(radioVariants.container, containerStyles)}
    >
      <View className={cn(radioVariants.circle.base, circleStyle)}>
        {renderContent()}
      </View>
      {label && (
        <Text
          className={cn(
            radioVariants.label.base,
            inactive
              ? cn(radioVariants.label.inactive, inactiveLabelStyle)
              : cn(radioVariants.label.normal, labelStyle),
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
