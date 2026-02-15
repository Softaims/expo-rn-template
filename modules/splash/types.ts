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
