import { View } from "react-native";
import { Text } from "@/components/text";
import { AvatarContainerProps } from "@/modules/settings/types";
import { AvatarCircle } from "./AvatarCircle";
import { useTheme } from "@/lib/theme";
import { hp } from "@/lib/responsive";
import { styles } from "./AvatarContainer.styles";

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
  const { colors } = useTheme();

  const isCentered = variant === "centered";

  return (
    <View
      style={
        isCentered
          ? styles.centeredWrap
          : [
              styles.defaultRow,
              {
                backgroundColor: colors.input,
                borderColor: colors.border,
              },
            ]
      }
      className={containerStyles}
    >
      <View style={isCentered ? styles.avatarSpacerCentered : undefined}>
        <AvatarCircle
          avatarSource={avatarSource}
          containerStyles={avatarStyles}
          size={isCentered ? 96 : 64}
          placeholderSize={isCentered ? 48 : 36}
        />
      </View>
      <View
        style={isCentered ? styles.textColCentered : styles.textColRow}
      >
        <Text
          variant={isCentered ? "heading2" : "subheading1"}
          style={{ color: colors.text }}
          className={nameStyles}
        >
          {name}
        </Text>
        <Text
          variant="bodyText1"
          style={{
            color: colors.mutedForeground,
            marginTop: isCentered ? hp(1) : hp(0.5),
          }}
          className={emailStyles}
        >
          {email}
        </Text>
      </View>
    </View>
  );
}
