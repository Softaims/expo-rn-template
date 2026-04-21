import { View, Image, ImageSourcePropType } from "react-native";
import { AvatarPlaceholder } from "@/assets/icons";
import { useTheme } from "@/lib/theme";
import { avatarCircleOuter, styles } from "./AvatarCircle.styles";

interface AvatarCircleProps {
  avatarSource?: ImageSourcePropType;
  containerStyles?: string;
  size?: number;
  placeholderSize?: number;
}

export function AvatarCircle({
  avatarSource,
  containerStyles,
  size = 64,
  placeholderSize = 36,
}: AvatarCircleProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.outer,
        avatarCircleOuter(size),
        { backgroundColor: colors.muted },
      ]}
      className={containerStyles}
    >
      {avatarSource ? (
        <Image
          source={avatarSource}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <AvatarPlaceholder width={placeholderSize} height={placeholderSize} fill="#9CA3AF" />
      )}
    </View>
  );
}
