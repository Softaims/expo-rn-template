import { View, Image, ImageSourcePropType } from "react-native";
import { cn } from "@/lib/utils";
import { AvatarPlaceholder } from "@/assets/icons";

interface AvatarCircleProps {
  avatarSource?: ImageSourcePropType;
  containerStyles?: string;
  placeholderSize?: number;
}

export function AvatarCircle({
  avatarSource,
  containerStyles,
  placeholderSize = 36,
}: AvatarCircleProps) {
  return (
    <View
      className={cn(
        "rounded-full bg-gray-100 items-center justify-center overflow-hidden",
        containerStyles
      )}
    >
      {avatarSource ? (
        <Image source={avatarSource} className="w-full h-full" resizeMode="cover" />
      ) : (
        <AvatarPlaceholder width={placeholderSize} height={placeholderSize} fill="#9CA3AF" />
      )}
    </View>
  );
}
