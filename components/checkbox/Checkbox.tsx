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

  // Styling props
  containerStyles?: string;
  checkedBoxStyle?: string;
  uncheckedBoxStyle?: string;
  indeterminateBoxStyle?: string;
  disabledBoxStyle?: string;
  labelStyle?: string;
  disabledLabelStyle?: string;

  // Custom icons (JSX elements)
  checkIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
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
  checkedBoxStyle,
  uncheckedBoxStyle,
  indeterminateBoxStyle,
  disabledBoxStyle,
  labelStyle,
  disabledLabelStyle,
  checkIcon,
  indeterminateIcon,
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
      return (
        disabledBoxStyle ||
        (isChecked || indeterminate
          ? checkboxVariants.box.disabledChecked
          : checkboxVariants.box.disabled)
      );
    }

    if (indeterminate) {
      return indeterminateBoxStyle || checkboxVariants.box.checked;
    }

    if (isChecked) {
      return checkedBoxStyle || checkboxVariants.box.checked;
    }

    return uncheckedBoxStyle || checkboxVariants.box.normal;
  };

  const renderIcon = () => {
    if (indeterminate && indeterminateIcon) {
      return indeterminateIcon;
    }

    if (isChecked && checkIcon) {
      return checkIcon;
    }

    return null;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(checkboxVariants.container, className, containerStyles)}
      style={style}
    >
      <View className={cn(checkboxVariants.box.base, getBoxStyle())}>
        {renderIcon()}
      </View>
      {label && (
        <Text
          className={cn(
            checkboxVariants.label.base,
            disabled
              ? disabledLabelStyle || checkboxVariants.label.disabled
              : labelStyle || checkboxVariants.label.normal
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
