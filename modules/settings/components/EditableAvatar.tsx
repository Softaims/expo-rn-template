import { View, Pressable, ImageSourcePropType } from "react-native";
import { cn } from "@/lib/utils";
import { EditIcon } from "@/assets/icons";
import { AvatarCircle } from "./AvatarCircle";

export interface EditableAvatarProps {
  avatarSource?: ImageSourcePropType;
  name?: string;
  onEditPress?: () => void;
  containerStyles?: string;
  avatarStyles?: string;
  size?: "sm" | "md" | "lg";
}

const sizeVariants = {
  sm: "w-20 h-20",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

const editBadgeSizeVariants = {
  sm: "w-6 h-6",
  md: "w-7 h-7",
  lg: "w-9 h-9",
};

const editIconSizes = {
  sm: 12,
  md: 14,
  lg: 16,
};

export function EditableAvatar({
  avatarSource,
  onEditPress,
  containerStyles,
  avatarStyles,
  size = "lg",
}: EditableAvatarProps) {
  const EditBadge = onEditPress ? Pressable : View;

  return (
    <View className={cn("relative items-center justify-center", containerStyles)}>
      <AvatarCircle
        avatarSource={avatarSource}
        containerStyles={cn(
          sizeVariants[size],
          "border-2 border-gray-200",
          avatarStyles
        )}
        placeholderSize={40}
      />

      <EditBadge
        onPress={onEditPress}
        className={cn(
          "absolute bottom-0 right-0 bg-foreground rounded-full items-center justify-center border-2 border-background",
          editBadgeSizeVariants[size]
        )}
      >
        <EditIcon
          width={editIconSizes[size]}
          height={editIconSizes[size]}
          fill="#fff"
        />
      </EditBadge>
    </View>
  );
}
