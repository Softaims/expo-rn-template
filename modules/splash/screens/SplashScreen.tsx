import { useState } from "react";
import { View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Button, BarGroup } from "@/components";
import { SPLASH_SCREENS, TOTAL_STEPS } from "@/modules/splash/config";
import { SplashContent, SplashButtons } from "@/modules/splash/components";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;
const SWIPE_VELOCITY = 500; // Fast swipe detection

// Faster spring configuration
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 180,
  mass: 0.4,
};

export default function SplashScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const currentScreen = SPLASH_SCREENS[currentStep - 1];

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

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
      // Animate transition for button press
      translateX.value = withSpring(-SCREEN_WIDTH, SPRING_CONFIG);
      opacity.value = withSpring(0, SPRING_CONFIG, () => {
        runOnJS(changeStep)(currentStep + 1);
      });
    }
  };

  const handleSecondaryPress = () => {
    if (currentStep === 5) {
      handleSignUp();
    }
  };

  const changeStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= TOTAL_STEPS) {
      setCurrentStep(newStep);
      translateX.value = 0;
      opacity.value = withSpring(1, SPRING_CONFIG);
    } else {
      translateX.value = withSpring(0, SPRING_CONFIG);
      opacity.value = withSpring(1, SPRING_CONFIG);
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      const progress = Math.abs(event.translationX) / SCREEN_WIDTH;
      opacity.value = 1 - progress * 0.3; // Less opacity change for snappier feel
    })
    .onEnd((event) => {
      const velocity = event.velocityX;
      const translation = event.translationX;

      // Fast swipe detection using velocity
      const isFastSwipeLeft = velocity < -SWIPE_VELOCITY && currentStep < TOTAL_STEPS;
      const isFastSwipeRight = velocity > SWIPE_VELOCITY && currentStep > 1;

      // Distance-based detection
      const shouldMoveNext = translation < -SWIPE_THRESHOLD && currentStep < TOTAL_STEPS;
      const shouldMovePrev = translation > SWIPE_THRESHOLD && currentStep > 1;

      if (isFastSwipeLeft || shouldMoveNext) {
        translateX.value = withSpring(-SCREEN_WIDTH, SPRING_CONFIG);
        opacity.value = withSpring(0, SPRING_CONFIG, () => {
          runOnJS(changeStep)(currentStep + 1);
        });
      } else if (isFastSwipeRight || shouldMovePrev) {
        translateX.value = withSpring(SCREEN_WIDTH, SPRING_CONFIG);
        opacity.value = withSpring(0, SPRING_CONFIG, () => {
          runOnJS(changeStep)(currentStep - 1);
        });
      } else {
        translateX.value = withSpring(0, SPRING_CONFIG);
        opacity.value = withSpring(1, SPRING_CONFIG);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: currentScreen.backgroundColor }}
    >
      <View className="flex-1 justify-between">
        {/* Skip and Storybook Buttons */}
        {currentScreen.showSkipButton ? (
          <View className="flex-row justify-between items-center px-4">
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
              containerStyles="bg-transparent"
              textStyles="font-medium"
            />
          </View>
        ) : (
          <View />
        )}

        <View>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={animatedStyle}>
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
            </Animated.View>
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
    </SafeAreaView>
  );
}
