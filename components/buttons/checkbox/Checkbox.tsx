import { Pressable, View } from "react-native";
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
  // move states here
  value: boolean;
  onChnangeValue: (isChecked: boolean) => void; 
  
  label?: string;
  checked?: boolean;

  // variant?: 'check' | 'minus';
  indeterminate?: boolean; //replace with variant type

  disabled?: boolean;

  onCheckedChange?: (checked: boolean) => void;

  // Styling props
  containerStyles?: string;

  // --------- 
  checkedBoxStyle?: string;
  uncheckedBoxStyle?: string;
  indeterminateBoxStyle?: string; //remove
  // ---------

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
  containerStyles,
  checkedBoxStyle,
  uncheckedBoxStyle,
  indeterminateBoxStyle,
  disabledBoxStyle,
  labelStyle,
  disabledLabelStyle,
  checkIcon,
  indeterminateIcon,
  value,
  onChnangeValue,
}: CheckboxProps) {
  const handlePress = () => {
    if (disabled) return;
    const newValue = !value;
    onChnangeValue(newValue);
    onCheckedChange?.(newValue);
  };

  const getBoxStyle = () => {
    // Create a state key for switch statement
    let state = "normal";
    if (disabled && (value || indeterminate)) {
      state = "disabled-checked";
    } else if (disabled) {
      state = "disabled";
    } else if (indeterminate) {
      state = "indeterminate";
    } else if (value) {
      state = "checked";
    }

    switch (state) {
      case "disabled-checked":
        return cn(checkboxVariants.box.disabledChecked, disabledBoxStyle);
      case "disabled":
        return cn(checkboxVariants.box.disabled, disabledBoxStyle);
      case "indeterminate":
        return cn(checkboxVariants.box.checked, indeterminateBoxStyle);
      case "checked":
        return cn(checkboxVariants.box.checked, checkedBoxStyle);
      case "normal":
      default:
        return cn(checkboxVariants.box.normal, uncheckedBoxStyle);
    }
  };

  const renderIcon = () => {
    // Create a state key for switch statement
    let iconState = "none";
    if (indeterminate && indeterminateIcon) {
      iconState = "indeterminate";
    } else if (value && checkIcon) {
      iconState = "checked";
    }

    switch (iconState) {
      case "indeterminate":
        return indeterminateIcon;
      case "checked":
        return checkIcon;
      case "none":
      default:
        return null;
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(checkboxVariants.container, containerStyles)}
    >
      <View className={cn(checkboxVariants.box.base, getBoxStyle())}>
        {renderIcon()}
      </View>
      {label && (
        <Text
          className={cn(
            checkboxVariants.label.base,
            (() => {
              switch (true) {
                case disabled:
                  return cn(checkboxVariants.label.disabled, disabledLabelStyle);
                default:
                  return cn(checkboxVariants.label.normal, labelStyle);
              }
            })()
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
