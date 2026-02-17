import { GoogleIcon, AppleIcon } from "@/assets/icons";
import type { SocialAuthProviderConfig } from "@/modules/auth/types";

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
