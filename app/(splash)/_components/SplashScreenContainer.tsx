import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "@/components/buttons";
import { BarGroup } from "@/components/progressbar";
import { SPLASH_SCREENS, TOTAL_STEPS } from "../_config";
import SplashContent from "./SplashContent";
import SplashButtons from "./SplashButtons";

export default function SplashScreenContainer() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const currentScreen = SPLASH_SCREENS[currentStep - 1];

  const handleSkip = () => {
    router.push("/(auth)/login");
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  const handlePrimaryPress = () => {
    if (currentStep === 5) {
      handleLogin();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSecondaryPress = () => {
    if (currentStep === 5) {
      handleSignUp();
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: currentScreen.backgroundColor }}
    >
      <View className="flex-1 justify-between">
        {/* Skip Button - using Button component directly */}
        {currentScreen.showSkipButton? (
          <Button
            variant="text"
            size="sm"
            title="Skip"
            onPress={handleSkip}
            containerStyles="bg-transparent self-end"
            textStyles="font-medium"
          />)
          : <View/>
        }

        <View>
          <BarGroup
            containerStyles="items-center mb-8"
            totalSteps={TOTAL_STEPS}
            currentStep={currentStep}
            progress={(currentStep / TOTAL_STEPS) * 100}
            variant="bar"
          />

          {/* Content Area */}
          <View className="mb-12">
            <SplashContent
              title={currentScreen.title}
              description={currentScreen.description}
            />
          </View>

          <View className="pb-8">
            <SplashButtons
              buttonConfig={currentScreen.buttonConfig}
              onPrimaryPress={handlePrimaryPress}
              onSecondaryPress={handleSecondaryPress}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
