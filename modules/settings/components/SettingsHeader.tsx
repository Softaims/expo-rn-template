import { View } from "react-native";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { SettingsHeaderProps } from "@/modules/settings/types";

const settingsHeaderVariants = {
  container: "mb-4",
  text: "text-lg font-semibold text-muted-foreground",
} as const;

export function SettingsHeader({
  title,
  containerStyles,
  textStyles,
}: SettingsHeaderProps) {
  return (
    <View className={cn(settingsHeaderVariants.container, containerStyles)}>
      <Text className={cn(settingsHeaderVariants.text, textStyles)}>
        {title}
      </Text>
    </View>
  );
}
