import { View, Pressable } from "react-native";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

export interface ScreenHeaderProps {
  title: string;
  onBackPress?: () => void;
  leftIcon?: React.ReactNode;
  containerStyles?: string;
  titleStyles?: string;
}

const screenHeaderVariants = {
  container: "flex-row items-center justify-between px-4 py-4 bg-background",
  leftSection: "w-10 items-center justify-center",
  centerSection: "flex-1 items-center justify-center",
  rightSection: "w-10",
  title: "text-xl font-semibold text-foreground",
} as const;

export function ScreenHeader({
  title,
  onBackPress,
  leftIcon,
  containerStyles,
  titleStyles,
}: ScreenHeaderProps) {
  return (
    <View className={cn(screenHeaderVariants.container, containerStyles)}>
      <View className={screenHeaderVariants.leftSection}>
        {leftIcon ? (
          leftIcon
        ) : onBackPress ? (
          <Pressable onPress={onBackPress}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
        ) : null}
      </View>

      <View className={screenHeaderVariants.centerSection}>
        <Text className={cn(screenHeaderVariants.title, titleStyles)}>
          {title}
        </Text>
      </View>

      <View className={screenHeaderVariants.rightSection} />
    </View>
  );
}
