import { View } from "react-native";
import { Button } from "@/components";
import type { ButtonConfig } from "@/modules/splash/types";

interface SplashButtonsProps {
  buttons: ButtonConfig[];
}

export default function SplashButtons({ buttons }: SplashButtonsProps) {
  return (
    <View className="gap-4 px-4">
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.type}
          size="lg"
          title={button.label}
          onPress={button.onPress}
          containerStyles={button.containerStyles ?? (button.type === 'secondary' ? 'border-1 border-border' : 'w-full')}
          textStyles={button.textStyles}
        />
      ))}
    </View>
  );
}
