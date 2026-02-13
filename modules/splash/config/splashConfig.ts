import type { SplashScreenData } from '@/modules/splash/types';

export const SPLASH_SCREENS: SplashScreenData[] = [
  {
    id: 1,
    title: "Connect With People Who Share Your World",
    description: "Discover new friends and build meaningful connections through chats, comments, and shared interests.",
    showSkipButton: true,
    buttonConfig: { type: 'single', primaryLabel: 'Next' },
  },
  {
    id: 2,
    title: "Share Your Life Through Photos and Stories",
    description: "Post memories and daily updates using creative tools and filters, and engage with others in real time.",
    showSkipButton: true,
    buttonConfig: { type: 'single', primaryLabel: 'Next' },
  },
  {
    id: 3,
    title: "Stay Close to What Matters Most to You",
    description: "Get instant updates and personalized feeds so you never miss posts from friends and favorite creators.",
    showSkipButton: true,
    buttonConfig: { type: 'single', primaryLabel: 'Next' },
  },
  {
    id: 4,
    title: "Discover Content That Matches Your Interests",
    description: "Explore viral videos, trending posts, and recommended creators and groups based on what you love.",
    showSkipButton: true,
    buttonConfig: { type: 'single', primaryLabel: 'Get Started' },
  },
  {
    id: 5,
    title: "Discover Content That Matches Your Interests",
    description: "Explore viral videos, trending posts, and recommended creators and groups based on what you love.",
    showSkipButton: false,
    buttonConfig: {
      type: 'dual',
      primaryLabel: 'Login',
      secondaryLabel: 'Sign Up'
    },
  },
];

export const TOTAL_STEPS = SPLASH_SCREENS.length;
