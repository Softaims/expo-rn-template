export interface ButtonConfig {
  type: 'primary' | 'secondary';
  label: string;
  onPress: () => void;
  containerStyles?: string;
  textStyles?: string;
}

export interface SplashScreenData {
  id: number;
  title: string;
  description: string;
  showSkipButton: boolean;
  buttonConfig: ButtonConfig[];
}

export interface UseSplashNavigationProps {
  currentStep: number;
  animateToNextStep: () => void;
}

export interface UseSplashNavigationReturn {
  currentScreen: SplashScreenData;
  buttonsWithHandlers: ButtonConfig[];
  handleSkip: () => void;
  handleStorybook: () => void;
}

export interface SplashContentProps {
  title: string;
  description: string;
}

export interface SplashButtonsProps {
  buttons: ButtonConfig[];
}
