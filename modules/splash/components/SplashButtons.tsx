import { useMemo } from "react";
import { View } from "react-native";
import { Button } from "@/components";
import { useTheme } from "@/lib/theme";
import type { SplashButtonsProps } from "@/modules/splash/types";
import { createStyles } from "./SplashButtons.styles";

export default function SplashButtons({ buttons }: SplashButtonsProps) {
  const { spacing } = useTheme();

  const styles = useMemo(
    () => createStyles(spacing.gap.lg, spacing.page),
    [spacing.gap.lg, spacing.page]
  );

  return (
    <View style={styles.row}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.type}
          size="lg"
          title={button.label}
          onPress={button.onPress}
          containerStyles={
            button.containerStyles ??
            (button.type === "secondary" ? "border border-border" : "w-full")
          }
          textStyles={button.textStyles}
        />
      ))}
    </View>
  );
}
