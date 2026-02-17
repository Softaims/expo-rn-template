import { useState } from "react";
import { View, Pressable, ActivityIndicator } from "react-native";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import { useGoogleOAuth, useAppleOAuth } from "@/modules/auth/hooks";
import { socialAuthProviders } from "@/modules/auth/config";
import type { SocialAuthButtonsProps } from "@/modules/auth/types";

export default function SocialAuthButtons({ providers = socialAuthProviders, dividerText = "or Continue with" }: SocialAuthButtonsProps) {
  const { signInWithGoogle } = useGoogleOAuth();
  const { signInWithApple } = useAppleOAuth();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const authHandlers: Record<string, () => Promise<void>> = {
    google: signInWithGoogle,
    apple: signInWithApple,
  };

  const handleOAuth = async (id: string) => {
    const authFn = authHandlers[id];
    if (!authFn) return;

    setLoadingId(id);
    await authFn();
    setLoadingId(null);
  };

  const isDisabled = loadingId !== null;

  return (
    <View className="gap-6 mt-[24px]">

      <View className="flex-row items-center gap-3">
        <View className="flex-1 h-[1px] bg-border" />
        <Text variant="bodyText2" className="text-muted-foreground">
          {dividerText}
        </Text>
        <View className="flex-1 h-[1px] bg-border" />
      </View>

      <View className="flex-row justify-center gap-6">
        {
          providers.map((provider) => (
            <Pressable
              key={provider.id}
              onPress={() => handleOAuth(provider.id)}
              disabled={isDisabled}
              className={cn(
                "w-14 h-14 rounded-full bg-background border border-border items-center justify-center",
                !isDisabled && "active:opacity-70",
              )}
            >
              {loadingId === provider.id ? (
                <ActivityIndicator size="small" />
              ) : (
                provider.icon
              )}
            </Pressable>
          ))
        }
      </View>
    </View>
  );
}
