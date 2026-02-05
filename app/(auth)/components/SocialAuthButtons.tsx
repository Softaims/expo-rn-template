import { View, Pressable, ActivityIndicator } from 'react-native';
import { Text } from '@/components';
import { AppleIcon, GoogleIcon, FacebookIcon } from '@/assets/icons';
import { useAuthClerk } from '@/app/(auth)/hooks';

interface SocialAuthButtonsProps {
  type: 'login' | 'signup';
}

export default function SocialAuthButtons({ type }: SocialAuthButtonsProps) {
  const { signInWithOAuth, signUpWithOAuth, isLoading } = useAuthClerk();

  const handleSocialAuth = async (strategy: 'oauth_google' | 'oauth_apple' | 'oauth_facebook') => {
    try {
      if (type === 'login') {
        await signInWithOAuth(strategy);
      } else {
        await signUpWithOAuth(strategy);
      }
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  return (
    <View className="gap-6">
      <View className="flex-row items-center gap-3">
        <View className="flex-1 h-[1px] bg-border" />
        <Text variant="bodyText2" className="text-muted-foreground">
          or {type === 'login' ? 'Login' : 'Signup'} with
        </Text>
        <View className="flex-1 h-[1px] bg-border" />
      </View>

      {isLoading ? (
        <View className="py-4">
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <View className="flex-row justify-center gap-6">
          {/* Apple Button */}
          <Pressable
            onPress={() => handleSocialAuth('oauth_apple')}
            className="w-14 h-14 rounded-full bg-background border border-border items-center justify-center active:opacity-70"
          >
            <AppleIcon width={24} height={24} />
          </Pressable>

          {/* Google Button */}
          <Pressable
            onPress={() => handleSocialAuth('oauth_google')}
            className="w-14 h-14 rounded-full bg-background border border-border items-center justify-center active:opacity-70"
          >
            <GoogleIcon width={24} height={24} />
          </Pressable>

          {/* Facebook Button */}
          <Pressable
            onPress={() => handleSocialAuth('oauth_facebook')}
            className="w-14 h-14 rounded-full bg-background border border-border items-center justify-center active:opacity-70"
          >
            <FacebookIcon width={24} height={24} />
          </Pressable>
        </View>
      )}
    </View>
  );
}
