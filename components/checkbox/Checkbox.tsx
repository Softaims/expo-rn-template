import { Pressable, View, ViewStyle, TextStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components/text/Text";
import { useState } from "react";
import { getElementClasses } from "@/lib/component-styles";

// Helper to get view style safely
const getViewStyle = (styles: any, key: string): ViewStyle | undefined => {
  return styles?.[key] as ViewStyle | undefined;
};

// Helper to get text style safely
const getTextStyle = (styles: any, key: string): TextStyle | undefined => {
  return styles?.[key] as TextStyle | undefined;
};

const checkboxVariants = {
  container: "flex-row items-center gap-3",
  box: {
    base: "w-5 h-5 rounded border-2 items-center justify-center",
    normal: "border-foreground bg-background",
    checked: "border-foreground bg-foreground",
    disabled: "border-muted-foreground bg-muted opacity-50",
    disabledChecked: "border-muted-foreground bg-muted-foreground opacity-50",
  },
  label: {
    base: "text-base",
    normal: "text-foreground",
    disabled: "text-muted-foreground opacity-50",
  },
} as const;

type CheckboxElements = "container" | "box" | "checkmark" | "label";

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  style?: ViewStyle;
  classes?: Partial<Record<CheckboxElements, string>>;
  styles?: {
    container?: ViewStyle;
    box?: ViewStyle;
    checkmark?: ViewStyle;
    label?: TextStyle;
  };
}

export function Checkbox({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  onCheckedChange,
  className,
  style,
  classes,
  styles,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handlePress = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onCheckedChange?.(newValue);
  };

  const getBoxStyle = () => {
    if (disabled) {
      return isChecked || indeterminate
        ? checkboxVariants.box.disabledChecked
        : checkboxVariants.box.disabled;
    }
    return isChecked || indeterminate
      ? checkboxVariants.box.checked
      : checkboxVariants.box.normal;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={getElementClasses(
        classes,
        "container",
        cn(checkboxVariants.container, className)
      )}
      style={[style, getViewStyle(styles, "container")]}
    >
      <View
        className={getElementClasses(
          classes,
          "box",
          cn(checkboxVariants.box.base, getBoxStyle())
        )}
        style={getViewStyle(styles, "box")}
      >
        {indeterminate ? (
          <View
            className={getElementClasses(
              classes,
              "checkmark",
              "w-2.5 h-0.5 bg-background rounded"
            )}
            style={getViewStyle(styles, "checkmark")}
          />
        ) : isChecked ? (
          <View
            className={getElementClasses(
              classes,
              "checkmark",
              "items-center justify-center"
            )}
            style={getViewStyle(styles, "checkmark")}
          >
            <Text className="text-background text-xs font-bold">✓</Text>
          </View>
        ) : null}
      </View>
      {label && (
        <Text
          className={getElementClasses(
            classes,
            "label",
            cn(
              checkboxVariants.label.base,
              disabled
                ? checkboxVariants.label.disabled
                : checkboxVariants.label.normal
            )
          )}
          style={getTextStyle(styles, "label")}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
