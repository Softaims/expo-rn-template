import { Stack, Redirect } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import * as Sentry from "@sentry/react-native";

export default function AuthLayout() {
  const { user } = useUser();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        Sentry.setUser({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
        });
      }
    }
  }, [user, isLoaded]);

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)/(settings)/settings" />;
  }

  return (
    <Stack screenOptions={{ animation: "none", headerShown: false }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="forgot-password/index" />
      <Stack.Screen name="otp-verification/index" />
      <Stack.Screen name="reset-password/index" />
    </Stack>
  );
}
