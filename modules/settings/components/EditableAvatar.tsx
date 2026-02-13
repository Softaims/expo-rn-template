import { View, Pressable, Image, ImageSourcePropType} from "react-native";
import { cn } from "@/lib/utils";
import { AvatarPlaceholder, EditIcon } from "@/assets/icons";

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
  md: "w-8 h-8",
  sm: "w-6 h-6",
  lg: "w-10 h-10",
};

export function EditableAvatar({
  avatarSource,
  name,
  onEditPress,
  containerStyles,
  avatarStyles,
  size = "lg",
}: EditableAvatarProps) {
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
        ) : (
          <AvatarPlaceholder width={40} height={40} fill="#9CA3AF" />
        )}
      </View>

      <Pressable
        onPress={onEditPress}
        className={cn(
          editIconSizeVariants[size],
          "absolute bottom-0 right-0 bg-foreground rounded-full items-center justify-center border-2 border-background"
        )}
      >
        <EditIcon width={18} height={18} fill="#fff" />
      </Pressable>
    </View>
  );
}
