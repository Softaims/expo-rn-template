import { View, Pressable, Image, ImageSourcePropType, Text } from "react-native";
import { cn } from "@/lib/utils";
import { PersonIcon, EditIcon } from "@/assets/icons";

export interface EditableAvatarProps {
  avatarSource?: ImageSourcePropType;
  name?: string;
  onEditPress: () => void;
  containerStyles?: string;
  avatarStyles?: string;
  size?: "sm" | "md" | "lg";
}

const sizeVariants = {
  sm: "w-20 h-20",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

const editIconSizeVariants = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function EditableAvatar({
  avatarSource,
  name,
  onEditPress,
  containerStyles,
  avatarStyles,
  size = "lg",
}: EditableAvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  return (
    <View className={cn("relative items-center justify-center", containerStyles)}>
      <View
        className={cn(
          sizeVariants[size],
          "rounded-full bg-gray-100 border-2 border-gray-200 items-center justify-center overflow-hidden",
          avatarStyles
        )}
      >
        {avatarSource ? (
          <Image
            source={avatarSource}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : initials ? (
          <View className="w-full h-full items-center justify-center">
            <View className="text-2xl font-bold text-white">
              {/* Render initials as text */}
            </View>
          </View>
        ) : (
          <PersonIcon width={40} height={40} stroke="#9CA3AF" />
        )}
      </View>

      <Pressable
        onPress={onEditPress}
        className={cn(
          editIconSizeVariants[size],
          "absolute bottom-0 right-0 bg-foreground rounded-full items-center justify-center border-2 border-background"
        )}
      >
        <EditIcon width={16} height={16} stroke="#fff" />
      </Pressable>
    </View>
  );
}
