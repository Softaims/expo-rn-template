import { View, Pressable } from "react-native";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "@/assets/icons";

export interface ScreenHeaderProps {
  title?: string;
  onBackPress?: () => void;
  leftIcon?: React.ReactNode;
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  containerStyles?: string;
  titleStyles?: string;
}

const screenHeaderVariants = {
  container: "flex-row items-center py-4 bg-background",
  leftSection: "items-center justify-center",
  centerSection: "flex-1 items-center justify-center",
  rightSection: "items-center justify-center",
  title: "text-xl font-semibold text-foreground",
} as const;

export function ScreenHeader({
  title,
  onBackPress,
  leftIcon,
  leftContent,
  centerContent,
  rightContent,
  containerStyles,
  titleStyles,
}: ScreenHeaderProps) {
  // Determine left content
  const resolvedLeftContent = leftContent ?? (
    leftIcon ? (
      leftIcon
    ) : onBackPress ? (
      <Pressable onPress={onBackPress}>
        <ArrowLeftIcon width={7.5} height={15.5} fill="#000" />
      </Pressable>
    ) : null
  );

  // Determine center content
  const resolvedCenterContent = centerContent ?? (
    title ? (
      <Text className={cn(screenHeaderVariants.title, titleStyles)}>
        {title}
      </Text>
    ) : null
  );

  // Determine layout class
  const getContainerClass = () => {
    const hasLeft = !!resolvedLeftContent;
    const hasCenter = !!resolvedCenterContent;
    const hasRight = !!rightContent;

    if (hasLeft && hasCenter && hasRight) {
      return "justify-between";
    } else if (hasCenter) {
      return "justify-center";
    } else {
      return "justify-start";
    }
  };

  return (
    <View className={cn(screenHeaderVariants.container, getContainerClass(), containerStyles)}>
      {resolvedLeftContent && (
        <View className={cn(screenHeaderVariants.leftSection, "w-10")}>
          {resolvedLeftContent}
        </View>
      )}

      {resolvedCenterContent && (
        <View className={screenHeaderVariants.centerSection}>
          {resolvedCenterContent}
        </View>
      )}

      {rightContent && (
        <View className={cn(screenHeaderVariants.rightSection, "w-10")}>
          {rightContent}
        </View>
      )}
    </View>
  );
}
