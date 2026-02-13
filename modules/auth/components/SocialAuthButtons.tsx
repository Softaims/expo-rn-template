import { useState } from 'react';
import { View, Pressable, ActivityIndicator, Platform } from 'react-native';
import { Text } from '@/components/text';
import { GoogleIcon, AppleIcon } from '@/assets/icons';
import { useGoogleOAuth, useAppleOAuth } from '@/modules/auth/hooks';
import { cn } from '@/lib/utils';
import * as Sentry from "@sentry/react-native";

export default function SocialAuthButtons() {
  const { signInWithGoogle } = useGoogleOAuth();
  const { signInWithApple } = useAppleOAuth();
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null);

  const handleOAuth = async (provider: 'google' | 'apple', authFn: () => Promise<void>) => {
    setLoadingProvider(provider);
    try {
      await authFn();
    } catch (error: any) {
      // Only capture to Sentry if it's not a user cancellation
      if (error.code !== 'ERR_REQUEST_CANCELED') {
        Sentry.captureException(error, {
          tags: { component: "SocialAuthButtons", action: "oauth", provider },
        });
      }
    } finally {
      setLoadingProvider(null);
    }
  };

  const isDisabled = loadingProvider !== null;

  return (
    <View className="gap-6">
      <View className="flex-row items-center gap-3">
        <View className="flex-1 h-[1px] bg-border" />
        <Text variant="bodyText2" className="text-muted-foreground">
          or Continue with
        </Text>
        <View className="flex-1 h-[1px] bg-border" />
      </View>

      <View className="flex-row justify-center gap-6">
        <Pressable
          onPress={() => handleOAuth('google', signInWithGoogle)}
          disabled={isDisabled}
          className={cn(
            "w-14 h-14 rounded-full bg-background border border-border items-center justify-center",
            !isDisabled && "active:opacity-70"
          )}
        >
          {loadingProvider === 'google' ? (
            <ActivityIndicator size="small" />
          ) : (
            <GoogleIcon width={24} height={24} />
          )}
        </Pressable>

        {Platform.OS === 'ios' && (
          <Pressable
            onPress={() => handleOAuth('apple', signInWithApple)}
            disabled={isDisabled}
            className={cn(
              "w-14 h-14 rounded-full bg-background border border-border items-center justify-center",
              !isDisabled && "active:opacity-70"
            )}
          >
            {loadingProvider === 'apple' ? (
              <ActivityIndicator size="small" />
            ) : (
              <AppleIcon width={24} height={24} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}
