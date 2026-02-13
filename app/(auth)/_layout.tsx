import { Stack, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

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
      <Stack.Screen name="forgotPassword/index" />
      <Stack.Screen name="otpVerification/index" />
      <Stack.Screen name="resetPassword/index" />
    </Stack>
  );
}
