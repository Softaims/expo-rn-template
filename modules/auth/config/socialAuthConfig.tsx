import { GoogleIcon, AppleIcon } from "@/assets/icons";

export interface SocialAuthProviderConfig {
  id: string;
  icon: React.ReactNode;
}

export const socialAuthProviders: SocialAuthProviderConfig[] = [
  {
    id: "google",
    icon: <GoogleIcon width={24} height={24} />,
  },
  {
    id: "apple",
    icon: <AppleIcon width={24} height={24} />,
  },
];
