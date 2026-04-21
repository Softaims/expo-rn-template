import { View } from "react-native";
import { Text } from "@/components/text";
import { SettingsHeaderProps } from "@/modules/settings/types";
import { useTheme } from "@/lib/theme";
import { styles } from "./SettingsHeader.styles";

export function SettingsHeader({
  title,
  containerStyles,
  textStyles,
}: SettingsHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrap} className={containerStyles}>
      <Text
        variant="subheading2"
        style={[styles.title, { color: colors.mutedForeground }]}
        className={textStyles}
      >
        {title}
      </Text>
    </View>
  );
}
