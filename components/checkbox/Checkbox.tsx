import { Pressable, View } from "react-native";
import { cn } from "@/lib/utils";
import { Text } from "@/components/text/Text";
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
}

export function Checkbox({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  onCheckedChange,
  className,
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
      className={cn(checkboxVariants.container, className)}
    >
      <View className={cn(checkboxVariants.box.base, getBoxStyle())}>
        {indeterminate ? (
          <View className="w-2.5 h-0.5 bg-background rounded" />
        ) : isChecked ? (
          <View className="items-center justify-center">
            <Text className="text-background text-xs font-bold">✓</Text>
          </View>
        ) : null}
      </View>
      {label && (
        <Text
          className={cn(
            checkboxVariants.label.base,
            disabled
              ? checkboxVariants.label.disabled
              : checkboxVariants.label.normal
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
