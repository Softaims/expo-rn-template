import { useState } from "react";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { TOTAL_STEPS } from "@/modules/splash/config";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;
const SWIPE_VELOCITY = 500;

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 180,
  mass: 0.4,
};

export const useSplashAnimation = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

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

  const animateToNextStep = () => {
    translateX.value = withSpring(-SCREEN_WIDTH, SPRING_CONFIG);
    opacity.value = withSpring(0, SPRING_CONFIG, () => {
      runOnJS(changeStep)(currentStep + 1);
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      const progress = Math.abs(event.translationX) / SCREEN_WIDTH;
      opacity.value = 1 - progress * 0.3;
    })
    .onEnd((event) => {
      const velocity = event.velocityX;
      const translation = event.translationX;

      const isFastSwipeLeft = velocity < -SWIPE_VELOCITY && currentStep < TOTAL_STEPS;
      const isFastSwipeRight = velocity > SWIPE_VELOCITY && currentStep > 1;

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

  return {
    currentStep,
    animatedStyle,
    panGesture,
    animateToNextStep,
  };
};
