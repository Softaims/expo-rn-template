import { useMemo } from "react";
import { View } from "react-native";
import { Text } from "@/components";
import { useTheme } from "@/lib/theme";
import type { SplashContentProps } from "@/modules/splash/types";
import { createStyles, styles } from "./SplashContent.styles";

export default function SplashContent({ title, description }: SplashContentProps) {
  const { colors, spacing } = useTheme();

  const layout = useMemo(
    () => createStyles(spacing.gap.lg),
    [spacing.gap.lg]
  );

  return (
    <View style={layout.root}>
      <Text variant="heading1" style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      <Text
        variant="bodyText1"
        style={[styles.description, { color: colors.mutedForeground }]}
      >
        {description}
      </Text>
    </View>
  );
}
