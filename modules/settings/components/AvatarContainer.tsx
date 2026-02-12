import { View, Image } from "react-native";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { AvatarContainerProps } from "@/modules/settings/types";

const avatarContainerVariants = {
  container: {
    default: "flex-row items-center bg-muted border border-border rounded-2xl p-4 mb-6",
    centered: "items-center justify-center py-6 mb-6",
  },
  avatar: {
    default: "w-16 h-16 rounded-full mr-4",
    centered: "w-24 h-24 rounded-full mb-4",
  },
  textContainer: {
    default: "flex-1",
    centered: "items-center",
  },
  name: {
    default: "text-xl font-semibold text-foreground",
    centered: "text-2xl font-semibold text-foreground",
  },
  email: {
    default: "text-sm text-muted-foreground mt-1",
    centered: "text-sm text-muted-foreground mt-2",
  },
} as const;

export function AvatarContainer({
  name,
  email,
  avatarSource,
  variant = "default",
  containerStyles,
  avatarStyles,
  nameStyles,
  emailStyles,
}: AvatarContainerProps) {

  return (
    <View className={cn(avatarContainerVariants.container[variant], containerStyles)}>
      <Image
        source={avatarSource}
        className={cn(avatarContainerVariants.avatar[variant], avatarStyles)}
      />
      <View className={avatarContainerVariants.textContainer[variant]}>
        <Text className={cn(avatarContainerVariants.name[variant], nameStyles)}>
          {name}
        </Text>
        <Text className={cn(avatarContainerVariants.email[variant], emailStyles)}>
          {email}
        </Text>
      </View>
    </View>
  );
}
