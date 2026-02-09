import { useState } from 'react';
import { View, Pressable, ActivityIndicator, Platform } from 'react-native';
import { Text } from '@/components';
import { GoogleIcon, AppleIcon } from '@/assets/icons';
import { useClerkAuth } from '@/app/(auth)/_hooks/useClerkAuth';
import { cn } from '@/lib/utils';

export default function SocialAuthButtons() {
  const { signInWithGoogle, signInWithApple } = useClerkAuth();
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null);

  const handleOAuth = async (provider: 'google' | 'apple', authFn: () => Promise<void>) => {
    setLoadingProvider(provider);
    try {
      await authFn();
    } catch (error: any) {
      if (error.code !== 'ERR_REQUEST_CANCELED') {
        console.error(`${provider} auth failed:`, error);
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
