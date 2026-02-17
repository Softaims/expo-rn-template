import { useRoutingUtils } from "@/lib/routingUtils";
import { storage } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { SPLASH_SCREENS, TOTAL_STEPS } from "@/modules/splash/config";
import type {
  ButtonConfig,
  UseSplashNavigationProps,
  UseSplashNavigationReturn,
} from "@/modules/splash/types";

export const useSplashNavigation = ({
  currentStep,
  animateToNextStep,
}: UseSplashNavigationProps): UseSplashNavigationReturn => {
  const { push } = useRoutingUtils();

  const currentScreen = SPLASH_SCREENS[currentStep - 1];
  const isLastStep = currentStep === TOTAL_STEPS;

  const markSeenAndNavigate = (path: Parameters<typeof push>[0]) => {
    console.log("Marking onboarding as seen and navigating to:", path);
    storage.set(STORAGE_KEYS.HAS_SEEN_ONBOARDING, "true");
    push(path);
  };

  const getButtonHandler = (button: ButtonConfig): (() => void) => {
    if (isLastStep) {
      if (button.type === "primary") return () => markSeenAndNavigate("/(auth)/login");
      if (button.type === "secondary") return () => markSeenAndNavigate("/(auth)/signup");
    }
    if (button.type === "primary") return animateToNextStep;
    return button.onPress;
  };

  const buttonsWithHandlers: ButtonConfig[] = currentScreen.buttonConfig.map(
    (button) => ({
      ...button,
      onPress: getButtonHandler(button),
    }),
  );

  const handleSkip = () => markSeenAndNavigate("/(auth)/login");
  const handleStorybook = () => push("/storybook");

  return {
    currentScreen,
    buttonsWithHandlers,
    handleSkip,
    handleStorybook,
  };
};
