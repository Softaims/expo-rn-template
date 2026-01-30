import { Pressable, View, ViewStyle, TextStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components/text/Text";
import { getElementClasses, getElementTextStyle } from "@/lib/component-styles";

// Helper to get view style safely
const getViewStyle = (styles: any, key: string): ViewStyle | undefined => {
  return styles?.[key] as ViewStyle | undefined;
};

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

type RadioButtonElements = "container" | "circle" | "dot" | "label";

export interface RadioButtonProps {
  label?: string;
  selected?: boolean;
  inactive?: boolean;
  onSelect?: () => void;
  className?: string;
  style?: ViewStyle;
  classes?: Partial<Record<RadioButtonElements, string>>;
  styles?: {
    container?: ViewStyle;
    circle?: ViewStyle;
    dot?: ViewStyle;
    label?: TextStyle;
  };
}

export function RadioButton({
  label,
  selected = false,
  inactive = false,
  onSelect,
  className,
  style,
  classes,
  styles,
}: RadioButtonProps) {
  const handlePress = () => {
    if (inactive) return;
    onSelect?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={inactive}
      className={getElementClasses(
        classes,
        "container",
        cn(radioVariants.container, className)
      )}
      style={[style, getViewStyle(styles, "container")]}
    >
      <View
        className={getElementClasses(
          classes,
          "circle",
          cn(
            radioVariants.circle.base,
            inactive ? radioVariants.circle.inactive : radioVariants.circle.normal
          )
        )}
        style={getViewStyle(styles, "circle")}
      >
        {selected && (
          <View
            className={getElementClasses(
              classes,
              "dot",
              cn(
                radioVariants.dot.base,
                inactive ? radioVariants.dot.inactive : radioVariants.dot.normal
              )
            )}
            style={getViewStyle(styles, "dot")}
          />
        )}
      </View>
      {label && (
        <Text
          className={getElementClasses(
            classes,
            "label",
            cn(
              radioVariants.label.base,
              inactive
                ? radioVariants.label.inactive
                : radioVariants.label.normal
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
