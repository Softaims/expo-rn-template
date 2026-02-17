import { useState, useCallback, useRef } from "react";
import { FlatList, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { TOTAL_STEPS } from "@/modules/splash/config";
import type { SplashScreenData } from "@/modules/splash/types";

export const useSplashAnimation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const flatListRef = useRef<FlatList<SplashScreenData>>(null);

  // Animated step value for smooth bar transitions
  const animatedStep = useSharedValue(1);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;
    const newPosition = (offsetX / width) + 1; // 1-based index
    animatedStep.value = newPosition;
  }, [animatedStep]);

  const handleMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;
    const newStep = Math.round(offsetX / width) + 1; // 1-based index
    setCurrentStep(newStep);
  }, []);

  const scrollToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      flatListRef.current?.scrollToIndex({
        index: step - 1, // 0-based index for FlatList
        animated: true,
      });
    }
  }, []);

  const animateToNextStep = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      scrollToStep(currentStep + 1);
    }
  }, [currentStep, scrollToStep]);

  const animateToPrevStep = useCallback(() => {
    if (currentStep > 1) {
      scrollToStep(currentStep - 1);
    }
  }, [currentStep, scrollToStep]);

  return {
    currentStep,
    animatedStep,
    flatListRef,
    handleScroll,
    handleMomentumScrollEnd,
    animateToNextStep,
    animateToPrevStep,
    scrollToStep,
  };
};
