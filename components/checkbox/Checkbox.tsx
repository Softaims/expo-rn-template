import { Pressable, View, ViewStyle } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components";
import { useState } from "react";

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

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  style?: ViewStyle;

  // Simple Tailwind class styling for sub-elements
  containerStyles?: string;
  boxStyles?: string;
  checkmarkStyles?: string;
  labelStyles?: string;
}

export function Checkbox({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  onCheckedChange,
  className,
  style,
  containerStyles,
  boxStyles,
  checkmarkStyles,
  labelStyles,
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
      className={cn(checkboxVariants.container, className, containerStyles)}
      style={style}
    >
      <View className={cn(checkboxVariants.box.base, getBoxStyle(), boxStyles)}>
        {indeterminate ? (
          <View className={cn("w-2.5 h-0.5 bg-background rounded", checkmarkStyles)} />
        ) : isChecked ? (
          <View className={cn("items-center justify-center", checkmarkStyles)}>
            <Text className="text-background text-xs font-bold">✓</Text>
          </View>
        ) : null}
      </View>
      {label && (
        <Text
          className={cn(
            checkboxVariants.label.base,
            disabled ? checkboxVariants.label.disabled : checkboxVariants.label.normal,
            labelStyles
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
