import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { SettingsItemProps } from "@/modules/settings/types";
import { Pressable, View } from "react-native";
import { getSettingsIcon } from "../config/settingsConfig";

const settingsItemVariants = {
  container: "flex-row items-center justify-between bg-input border border-border rounded-[10px] px-[12px] py-[10px] mb-3",
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
  variant = "primary",
}: SettingsItemProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      className={cn(
        settingsItemVariants.container,
        disabled && "opacity-50",
        containerStyles,
        variant === "primary" && "bg-input",
        variant === "secondary" && "border-0"
      )}
    >
      <View className={settingsItemVariants.leftSection}>
        {leftIcon && (
          <View className={cn(settingsItemVariants.iconContainer, leftIconStyles)}>
            {getSettingsIcon(leftIcon as string)}
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
