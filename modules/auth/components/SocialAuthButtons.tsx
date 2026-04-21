import { useMemo, useState } from "react";
import { View, Pressable, ActivityIndicator } from "react-native";
import { Text } from "@/components/text";
import { useGoogleOAuth, useAppleOAuth } from "@/modules/auth/hooks";
import { socialAuthProviders } from "@/modules/auth/config";
import type { SocialAuthButtonsProps } from "@/modules/auth/types";
import { useTheme } from "@/lib/theme";
import { styles } from "./SocialAuthButtons.styles";

export default function SocialAuthButtons({
  providers = socialAuthProviders,
  dividerText = "or Continue with",
}: SocialAuthButtonsProps) {
  const { signInWithGoogle } = useGoogleOAuth();
  const { signInWithApple } = useAppleOAuth();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { colors, spacing } = useTheme();

  const rootStyle = useMemo(
    () => [styles.root, { gap: spacing.gap.xl }],
    [spacing.gap.xl]
  );

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
    <View style={rootStyle}>
      <View style={styles.dividerRow}>
        <View style={[styles.hairline, { backgroundColor: colors.border }]} />
        <Text
          variant="bodyText2"
          style={{ color: colors.mutedForeground }}
        >
          {dividerText}
        </Text>
        <View style={[styles.hairline, { backgroundColor: colors.border }]} />
      </View>

      <View style={styles.iconsRow}>
        {providers.map((provider) => (
          <Pressable
            key={provider.id}
            onPress={() => handleOAuth(provider.id)}
            disabled={isDisabled}
            style={[
              styles.iconButton,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                opacity: isDisabled ? 0.7 : 1,
              },
            ]}
          >
            {loadingId === provider.id ? (
              <ActivityIndicator size="small" />
            ) : (
              provider.icon
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
