import { View } from "react-native";
import { Text } from "@/components";
import { useTheme } from "@/lib/theme";

import type { AuthTitlesSectionProps } from "@/modules/auth/types";
import { styles } from "./AuthTitlesSection.styles";

export default function AuthTitlesSection({
  title,
  description,
  titleStyles,
  descriptionStyles,
}: AuthTitlesSectionProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.wrap}>
      <Text
        variant="heading1"
        style={{ color: colors.text }}
        className={titleStyles}
      >
        {title}
      </Text>
      <Text
        variant="bodyText2"
        style={{ color: colors.mutedForeground }}
        className={descriptionStyles}
      >
        {description}
      </Text>
    </View>
  );
}
