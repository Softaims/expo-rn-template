import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { Pressable, View } from "react-native";

const selectedItemVariants = {
  container: {
    base: "flex-row items-center gap-2 px-3 py-1.5 rounded-md",
    normal: "bg-muted",
    disabled: "bg-muted opacity-50",
  },
  label: {
    base: "text-sm",
    normal: "text-foreground",
    disabled: "text-muted-foreground",
  },
  closeButton: "w-4 h-4 items-center justify-center",
  closeIcon: "text-foreground text-xs",
} as const;

export interface SelectedItemProps {
  label: string;
  onRemove?: () => void;
  disabled?: boolean;
  showClose?: boolean;
  closeIcon?: React.ReactNode;

  // Simple Tailwind class styling for sub-elements
  containerStyles?: string;
  labelStyles?: string;
  closeButtonStyles?: string;
}

export function SelectedItem({
  label,
  onRemove,
  disabled = false,
  showClose = true,
  closeIcon,
  containerStyles,
  labelStyles,
  closeButtonStyles,
}: SelectedItemProps) {
  const getContainerStyle = () => {
    return disabled
      ? selectedItemVariants.container.disabled
      : selectedItemVariants.container.normal;
  };

  const getLabelStyle = () => {
    return disabled
      ? selectedItemVariants.label.disabled
      : selectedItemVariants.label.normal;
  };

  return (
    <View
      className={cn(selectedItemVariants.container.base, getContainerStyle(), containerStyles)}
    >
      <Text className={cn(selectedItemVariants.label.base, getLabelStyle(), labelStyles)}>
        {label}
      </Text>
      {showClose && onRemove && closeIcon && (
        <Pressable
          onPress={onRemove}
          disabled={disabled}
          className={cn(selectedItemVariants.closeButton, closeButtonStyles)}
        >
          {closeIcon}
        </Pressable>
      )}
    </View>
  );
}
