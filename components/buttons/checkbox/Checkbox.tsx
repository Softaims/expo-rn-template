import { CheckIcon, MinusIcon } from "@/assets/icons";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { Pressable, View } from "react-native";

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
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  containerStyles?: string;
  checkedBoxStyle?: string;
  uncheckedBoxStyle?: string;
  disabledBoxStyle?: string;
  labelStyle?: string;
  disabledLabelStyle?: string;
  checkIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
}

export function Checkbox({
  label,
  value = false,
  indeterminate = false,
  disabled = false,
  onValueChange,
  containerStyles,
  checkedBoxStyle,
  uncheckedBoxStyle,
  disabledBoxStyle,
  labelStyle,
  disabledLabelStyle,
  checkIcon,
  indeterminateIcon,
}: CheckboxProps) {
  const handlePress = () => {
    if (disabled) return;
    onValueChange(!value);
  };

  const isChecked = value || indeterminate;

  const getBoxStyle = () => {
    switch (true) {
      case disabled && isChecked:
        return cn(checkboxVariants.box.disabledChecked, disabledBoxStyle);
      case disabled:
        return cn(checkboxVariants.box.disabled, disabledBoxStyle);
      case isChecked:
        return cn(checkboxVariants.box.checked, checkedBoxStyle);
      default:
        return cn(checkboxVariants.box.normal, uncheckedBoxStyle);
    }
  };

  const boxStyle = getBoxStyle();

  const renderIcon = () => {
    if (indeterminate) {
      return (
        indeterminateIcon || (
          <MinusIcon width={12} height={12} color="#ffffff" />
        )
      );
    }
    if (value) {
      return checkIcon || <CheckIcon width={12} height={12} color="#ffffff" />;
    }
    return null;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(checkboxVariants.container, containerStyles)}
    >
      <View className={cn(checkboxVariants.box.base, boxStyle)}>
        {renderIcon()}
      </View>
      {label && (
        <Text
          className={cn(
            checkboxVariants.label.base,
            disabled
              ? cn(checkboxVariants.label.disabled, disabledLabelStyle)
              : cn(checkboxVariants.label.normal, labelStyle),
          )}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
