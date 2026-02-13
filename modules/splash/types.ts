export interface ButtonConfig {
  type: 'single' | 'dual';
  primaryLabel: string;
  secondaryLabel?: string;
}

export interface SplashScreenData {
  id: number;
  title: string;
  description: string;
  showSkipButton: boolean;
  buttonConfig: ButtonConfig;
}
