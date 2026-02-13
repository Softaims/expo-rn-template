import { Pressable, View } from "react-native";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { SettingsItemProps } from "@/modules/settings/types";

const settingsItemVariants = {
  container: "flex-row items-center justify-between bg-input border border-border rounded-[10px] px-4 py-4 mb-3",
  leftSection: "flex-row items-center gap-1 flex-1",
  iconContainer: "w-7 h-7 items-center justify-center",
  textContainer: "flex-1",
  rightSection: "items-center justify-center",
} as const;

export function SettingsItem({
  leftIcon,
  text,
  rightIcon,
  onPress,
  disabled = false,
  containerStyles,
  leftIconStyles,
  textStyles,
  rightIconStyles,
  variant = "default",
}: SettingsItemProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      className={cn(
        settingsItemVariants.container,
        disabled && "opacity-50",
        containerStyles,
        variant === "default" && "bg-input",
        variant === "container" && "border-0"
      )}
    >
      <View className={settingsItemVariants.leftSection}>
        {leftIcon && (
          <View className={cn(settingsItemVariants.iconContainer, leftIconStyles)}>
            {leftIcon}
          </View>
        )}
        <View className={settingsItemVariants.textContainer}>
          <Text
            className={cn(
              "text-base font-medium text-foreground",
              textStyles
            )}
          >
            {text}
          </Text>
        </View>
      </View>
      {rightIcon && (
        <View className={cn(settingsItemVariants.rightSection, rightIconStyles)}>
          {rightIcon}
        </View>
      )}
    </Pressable>
  );
}
