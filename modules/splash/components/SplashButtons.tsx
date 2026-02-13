import { View } from "react-native";
import { Button } from "@/components";
import type { ButtonConfig } from "@/modules/splash/types";

interface SplashButtonsProps {
  buttonConfig: ButtonConfig;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
}

export default function SplashButtons({
  buttonConfig,
  onPrimaryPress,
  onSecondaryPress,
}: SplashButtonsProps) {
  if (buttonConfig.type === "single") {
    return (
      <View className="px-6">
        <Button
          variant="primary"
          size="lg"
          title={buttonConfig.primaryLabel}
          onPress={onPrimaryPress}
        />
      </View>
    );
  }

  // Dual buttons layout
  return (
    <View className="px-6 gap-4">
      <Button
        variant="primary"
        size="lg"
        title={buttonConfig.primaryLabel}
        onPress={onPrimaryPress}
        containerStyles="w-full"
      />
      {buttonConfig.secondaryLabel && onSecondaryPress && (
        <Button
          variant="secondary"
          size="lg"
          title={buttonConfig.secondaryLabel}
          onPress={onSecondaryPress}
          containerStyles="border-1 border-border"

        />
      )}
    </View>
  );
}
