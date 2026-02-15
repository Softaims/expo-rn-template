import { BarGroup, Button } from "@/components";
import { SplashButtons, SplashContent } from "@/modules/splash/components";
import { SPLASH_SCREENS, TOTAL_STEPS } from "@/modules/splash/config";
import { useSplashAnimation } from "@/modules/splash/hooks";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();
  const {
    currentStep,
    swipeDirection,
    animatedStyle,
    nextAnimatedStyle,
    panGesture,
    animateToNextStep,
  } = useSplashAnimation();
  const currentScreen = SPLASH_SCREENS[currentStep - 1];
  const nextStep = currentStep + 1;
  const nextScreen =
    nextStep <= TOTAL_STEPS ? SPLASH_SCREENS[nextStep - 1] : null;
  const prevStep = currentStep - 1;
  const prevScreen = prevStep >= 1 ? SPLASH_SCREENS[prevStep - 1] : null;

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
    if (currentStep === TOTAL_STEPS) {
      handleLogin();
    } else {
      animateToNextStep();
    }
  };

  const handleSecondaryPress = () => {
    if (currentStep === TOTAL_STEPS) {
      handleSignUp();
    }
  };

  return (
    <View
      className="flex-1 justify-between bg-background"
    >
      {/* Skip and Storybook Buttons */}
      {currentScreen.showSkipButton && (
        <View className="flex-row justify-between items-center">
          <Button
            variant="text"
            size="sm"
            title="Storybook"
            onPress={() => router.push("/storybook")}
            containerStyles="bg-transparent"
            textStyles="font-medium"
          />
          <Button
            variant="text"
            size="sm"
            title="Skip"
            onPress={handleSkip}
            textStyles="font-medium"
          />
        </View>
      )}

      <View>
        <BarGroup
          containerStyles="items-center mb-8"
          totalSteps={TOTAL_STEPS}
          currentStep={currentStep}
          progress={(currentStep / TOTAL_STEPS) * 100}
          variant="bar"
        />

        <GestureDetector gesture={panGesture}>
          <View className="relative overflow-hidden h-48">
            {/* Current Content */}
            <Animated.View style={animatedStyle} className="absolute w-full">
              <View className="mb-12">
                <SplashContent
                  title={currentScreen.title}
                  description={currentScreen.description}
                />
              </View>
            </Animated.View>

            {/* Next Content (overlapping from right) - only when swiping forward */}
            {swipeDirection === "next" && nextScreen && (
              <Animated.View
                style={nextAnimatedStyle}
                className="absolute w-full"
              >
                <View>
                  <SplashContent
                    title={nextScreen.title}
                    description={nextScreen.description}
                  />
                </View>
              </Animated.View>
            )}

            {/* Previous Content (overlapping from left) - only when swiping backward */}
            {swipeDirection === "prev" && prevScreen && (
              <Animated.View
                style={nextAnimatedStyle}
                className="absolute w-full"
              >
                <View>
                  <SplashContent
                    title={prevScreen.title}
                    description={prevScreen.description}
                  />
                </View>
              </Animated.View>
            )}
          </View>
        </GestureDetector>

        <View className="pb-8">
          <SplashButtons
            buttonConfig={currentScreen.buttonConfig}
            onPrimaryPress={handlePrimaryPress}
            onSecondaryPress={handleSecondaryPress}
          />
        </View>
      </View>
    </View>
  );
}
