import { Pressable, View } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components/text";

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
    let state = "unselected";
    if (inactive) {
      state = "inactive";
    } else if (selected) {
      state = "selected";
    }

    switch (state) {
      case "inactive":
        return cn(radioVariants.circle.inactive, inactiveCircleStyle);
      case "selected":
        return cn(radioVariants.circle.selected, selectedCircleStyle);
      case "unselected":
      default:
        return cn(radioVariants.circle.unselected, unselectedCircleStyle);
    }
  };

  const getDotStyle = () => {
    switch (true) {
      case inactive:
        return cn(radioVariants.dot.inactive, inactiveDotStyle);
      default:
        return cn(radioVariants.dot.selected, selectedDotStyle);
    }
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
      className={cn(radioVariants.container, containerStyles)}
    >
      <View className={cn(radioVariants.circle.base, getCircleStyle())}>
        {renderContent()}
      </View>
      {label && (
        <Text
          className={cn(
            radioVariants.label.base,
            inactive
              ? cn(radioVariants.label.inactive, inactiveLabelStyle)
              : cn(radioVariants.label.normal, labelStyle)
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
