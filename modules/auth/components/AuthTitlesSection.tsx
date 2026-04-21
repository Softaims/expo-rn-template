import { View } from "react-native";
import { Text } from "@/components";
import { useTheme } from "@/lib/theme";

import type { AuthTitlesSectionProps } from "@/modules/auth/types";
import { styles } from "./AuthTitlesSection.styles";

export default function AuthTitlesSection({
  title,
  description,
  titleStyle,
  descriptionStyle,
}: AuthTitlesSectionProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrap}>
      <Text
        variant="heading1"
        style={[{ color: colors.text }, titleStyle]}
      >
        {title}
      </Text>
      <Text
        variant="bodyText2"
        style={[{ color: colors.mutedForeground }, descriptionStyle]}
      >
        {description}
      </Text>
    </View>
  );
}
