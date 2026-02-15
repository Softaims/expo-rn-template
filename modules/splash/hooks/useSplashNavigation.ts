import { useRoutingUtils } from "@/lib/routingUtils";
import { SPLASH_SCREENS, TOTAL_STEPS } from "@/modules/splash/config";
import type { ButtonConfig, SplashScreenData } from "@/modules/splash/types";

interface UseSplashNavigationProps {
  currentStep: number;
  animateToNextStep: () => void;
}

interface UseSplashNavigationReturn {
  currentScreen: SplashScreenData;
  buttonsWithHandlers: ButtonConfig[];
  handleSkip: () => void;
  handleStorybook: () => void;
}

export const useSplashNavigation = ({
  currentStep,
  animateToNextStep,
}: UseSplashNavigationProps): UseSplashNavigationReturn => {
  const { push } = useRoutingUtils();

  const currentScreen = SPLASH_SCREENS[currentStep - 1];
  const isLastStep = currentStep === TOTAL_STEPS;

  const getButtonHandler = (button: ButtonConfig): (() => void) => {
    // For the last step, navigate based on button type
    if (isLastStep) {
      if (button.type === 'primary') {
        return () => push("/(auth)/login");
      }
      if (button.type === 'secondary') {
        return () => push("/(auth)/signup");
      }
    }
    // For non-last steps, primary button advances to next step
    if (button.type === 'primary') {
      return animateToNextStep;
    }
    // Fallback to the button's own onPress
    return button.onPress;
  };

  const buttonsWithHandlers: ButtonConfig[] = currentScreen.buttonConfig.map((button) => ({
    ...button,
    onPress: getButtonHandler(button),
  }));

  const handleSkip = () => push("/(auth)/login");
  const handleStorybook = () => push("/storybook");

  return {
    currentScreen,
    buttonsWithHandlers,
    handleSkip,
    handleStorybook,
  };
};
