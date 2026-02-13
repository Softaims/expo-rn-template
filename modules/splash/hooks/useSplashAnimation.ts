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
const DIRECTION_THRESHOLD = SCREEN_WIDTH * 0.15; // Set direction only after moving 15%

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 180,
  mass: 0.4,
};

export const useSplashAnimation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [swipeDirection, setSwipeDirection] = useState<"next" | "prev" | null>(null);

  // Use shared value to track if direction was set (safe in worklet context)
  const directionSetFlag = useSharedValue(0);

  const translateX = useSharedValue(0);
  const nextTranslateX = useSharedValue(SCREEN_WIDTH);
  const opacity = useSharedValue(1);
  const nextOpacity = useSharedValue(0);

  const changeStep = (newStep: number) => {
    if (newStep >= 1 && newStep <= TOTAL_STEPS) {
      setCurrentStep(newStep);
      setSwipeDirection(null);
      directionSetFlag.value = 0;
      translateX.value = 0;
      opacity.value = 1;
      nextTranslateX.value = SCREEN_WIDTH;
      nextOpacity.value = 0;
    } else {
      translateX.value = withSpring(0, SPRING_CONFIG);
      opacity.value = withSpring(1, SPRING_CONFIG);
      nextTranslateX.value = withSpring(SCREEN_WIDTH, SPRING_CONFIG);
      nextOpacity.value = withSpring(0, SPRING_CONFIG);
      setSwipeDirection(null);
      directionSetFlag.value = 0;
    }
  };

  const animateToNextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      // Animate current content out to the left
      translateX.value = withSpring(-SCREEN_WIDTH, SPRING_CONFIG);
      opacity.value = withSpring(0, SPRING_CONFIG);
      // Animate next content in from the right
      nextTranslateX.value = withSpring(0, SPRING_CONFIG, () => {
        runOnJS(changeStep)(currentStep + 1);
      });
      nextOpacity.value = withSpring(1, SPRING_CONFIG);
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      const progress = Math.abs(event.translationX) / SCREEN_WIDTH;
      opacity.value = 1 - progress * 0.3;

      // Show next content coming in from the right
      if (event.translationX < -DIRECTION_THRESHOLD && currentStep < TOTAL_STEPS) {
        if (directionSetFlag.value === 0) {
          directionSetFlag.value = 1;
          runOnJS(setSwipeDirection)("next");
        }
        nextTranslateX.value = SCREEN_WIDTH + event.translationX;
        nextOpacity.value = Math.max(0, -event.translationX / SCREEN_WIDTH) * 0.7 + 0.3;
      } else if (event.translationX > DIRECTION_THRESHOLD && currentStep > 1) {
        // Show previous content coming in from the left
        if (directionSetFlag.value === 0) {
          directionSetFlag.value = 1;
          runOnJS(setSwipeDirection)("prev");
        }
        nextTranslateX.value = event.translationX - SCREEN_WIDTH;
        nextOpacity.value = Math.max(0, event.translationX / SCREEN_WIDTH) * 0.7 + 0.3;
      }
    })
    .onEnd((event) => {
      directionSetFlag.value = 0;
      const velocity = event.velocityX;
      const translation = event.translationX;

      const isFastSwipeLeft = velocity < -SWIPE_VELOCITY && currentStep < TOTAL_STEPS;
      const isFastSwipeRight = velocity > SWIPE_VELOCITY && currentStep > 1;

      const shouldMoveNext = translation < -SWIPE_THRESHOLD && currentStep < TOTAL_STEPS;
      const shouldMovePrev = translation > SWIPE_THRESHOLD && currentStep > 1;

      if (isFastSwipeLeft || shouldMoveNext) {
        translateX.value = withSpring(-SCREEN_WIDTH, SPRING_CONFIG);
        opacity.value = withSpring(0, SPRING_CONFIG);
        nextTranslateX.value = withSpring(0, SPRING_CONFIG, () => {
          runOnJS(changeStep)(currentStep + 1);
        });
        nextOpacity.value = withSpring(1, SPRING_CONFIG);
      } else if (isFastSwipeRight || shouldMovePrev) {
        translateX.value = withSpring(SCREEN_WIDTH, SPRING_CONFIG);
        opacity.value = withSpring(0, SPRING_CONFIG);
        nextTranslateX.value = withSpring(0, SPRING_CONFIG, () => {
          runOnJS(changeStep)(currentStep - 1);
        });
        nextOpacity.value = withSpring(1, SPRING_CONFIG);
      } else {
        // Reset to current content
        translateX.value = withSpring(0, SPRING_CONFIG);
        opacity.value = withSpring(1, SPRING_CONFIG);
        nextTranslateX.value = withSpring(SCREEN_WIDTH, SPRING_CONFIG);
        nextOpacity.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const nextAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: nextTranslateX.value }],
    opacity: nextOpacity.value,
  }));

  return {
    currentStep,
    swipeDirection,
    animatedStyle,
    nextAnimatedStyle,
    panGesture,
    animateToNextStep,
  };
};
